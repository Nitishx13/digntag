const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')

const app = express()
const port = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Load environment variables
let geminiApiKey = process.env.GEMINI_API_KEY

// Try to load from .env file if not found
if (!geminiApiKey) {
  try {
    const envPath = path.join(__dirname, '.env')
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8')
      const envLines = envContent.split('\n')
      for (const line of envLines) {
        if (line.startsWith('GEMINI_API_KEY=')) {
          geminiApiKey = line.split('=')[1].trim()
          break
        }
      }
    }
  } catch (error) {
    console.log('Could not read .env file:', error.message)
  }
}

// Fallback to hardcoded key if still not found
if (!geminiApiKey) {
  geminiApiKey = 'AIzaSyCKgWCw0Bz_9JZBiX3KUXrhcY8lSw5SNcM'
}

console.log('API Key loaded:', geminiApiKey ? 'YES' : 'NO')

// Initialize Gemini AI - with error handling
let genAI, model
try {
  console.log('=== GEMINI INITIALIZATION DEBUG ===')
  console.log('API Key length:', geminiApiKey ? geminiApiKey.length : 0)
  console.log('API Key starts with:', geminiApiKey ? geminiApiKey.substring(0, 10) + '...' : 'none')
  
  // Dynamic import with error handling
  try {
    const { GoogleGenerativeAI } = await import('@google/generative-ai')
    console.log('GoogleGenerativeAI imported successfully')
    
    genAI = new GoogleGenerativeAI(geminiApiKey)
    console.log('GoogleGenerativeAI instance created')
  } catch (importError) {
    console.error('Failed to import GoogleGenerativeAI:', importError.message)
    throw importError
  }
  
  // Try the most basic model name that should work
  const modelsToTry = [
    'gemini-1.5-pro-latest',  // Latest version
    'gemini-1.5-pro',           // Pro version
    'gemini-pro',                  // Standard version
    'gemini-1.5-flash',          // Flash version
    'gemini-1.5-flash-latest'    // Latest flash
  ]
  let modelInitialized = false
  
  for (const modelName of modelsToTry) {
    try {
      console.log(`Trying model: ${modelName}`)
      model = genAI.getGenerativeModel({ model: modelName })
      console.log(`✅ Model ${modelName} initialized successfully`)
      modelInitialized = true
      break
    } catch (modelError) {
      console.log(`❌ Model ${modelName} failed:`, modelError.message)
      console.log(`❌ Error details:`, modelError.stack)
    }
  }
  
  if (!modelInitialized) {
    console.log('No Gemini model could be initialized. Falling back to default model.')
    model = genAI.getGenerativeModel({ model: 'default' })
  }
  
  console.log('=== GEMINI INITIALIZATION COMPLETE ===')
} catch (error) {
  console.error('=== GEMINI INITIALIZATION FAILED ===')
  console.error('Error:', error.message)
  console.error('Stack:', error.stack)
  console.log('=== FALLBACK MODE ENABLED ===')
}

// Poetry generation endpoint
app.post('/api/generate-poem', async (req, res) => {
  try {
    const { recipient, messageType, language, lineCount, story, style } = req.body

    console.log('=== POETRY REQUEST ===')
    console.log('Recipient:', recipient)
    console.log('Language:', language)
    console.log('Line Count:', lineCount)
    console.log('Message Type:', messageType)
    console.log('Story:', story ? story.substring(0, 100) + '...' : 'none')
    console.log('=====================')

    if (!recipient || !language || !lineCount) {
      return res.status(400).json({ error: 'Recipient, language, and line count are required' })
    }

    // Create a comprehensive prompt based on form data
    let prompt = `Write a ${lineCount} poem in ${language} for ${recipient}`
    
    if (story) {
      prompt += `. Context: ${story}`
    }
    
    if (messageType) {
      prompt += `. Tone: ${messageType}`
    }
    
    // Add specific language instruction
    if (language && language.toLowerCase() !== 'english') {
      prompt += `. IMPORTANT: Write this poem ENTIRELY in ${language}. Do not mix languages. The response must be 100% in ${language}.`
    }
    
    prompt += `. Make it heartfelt and personal.`

    console.log('Generated prompt:', prompt)

    // Use Gemini AI only - no fallback
    if (!model) {
      return res.status(500).json({ error: 'Gemini AI model not available. Please check server configuration.' })
    }

    console.log('=== GEMINI API CALL DEBUG ===')
    console.log('Model available:', !!model)
    console.log('Prompt being sent:', prompt)
    console.log('Prompt length:', prompt.length)
    
    const generationConfig = {
      maxOutputTokens: 300,
      temperature: 0.8,
    }
    console.log('Generation config:', generationConfig)
    
    const requestPayload = {
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `You are a master poet who can create beautiful, emotionally resonant poetry in multiple languages and styles. Your poems should be creative, well-structured, and capture the essence of the given theme and relationship. Write the poem in the requested language exactly as specified.\n\n${prompt}`
            }
          ]
        }
      ],
      generationConfig: generationConfig
    }
    console.log('Request payload created')
    
    console.log('Calling Gemini API...')
    const completion = await model.generateContent(requestPayload)
    console.log('✅ Gemini API call successful')
    console.log('Response received:', !!completion.response)
    
    const poem = completion.response.text().trim()
    console.log('Generated poem length:', poem.length)
    console.log('Generated poem preview:', poem.substring(0, 100) + '...')
    console.log('Generated poem full:', poem)
    console.log('=== GEMINI API CALL COMPLETE ===')

    console.log('Final poem being sent:', poem)
    console.log('=== END POETRY REQUEST ===')

    res.json({ poem })
  } catch (error) {
    console.error('=== GEMINI API CALL FAILED ===')
    console.error('Error type:', error.constructor.name)
    console.error('Error message:', error.message)
    console.error('Error status:', error.status)
    console.error('Error statusText:', error.statusText)
    console.error('Error details:', error.details)
    console.error('Full error:', error)
    console.error('Error stack:', error.stack)
    
    // Handle different types of errors
    if (error.status === 429) {
      return res.status(429).json({ error: 'Gemini API quota exceeded. Please try again later.' })
    } else if (error.status === 401) {
      return res.status(401).json({ error: 'Invalid Gemini API key.' })
    } else if (error.status === 403) {
      return res.status(403).json({ error: 'Gemini API access forbidden. Check API key permissions.' })
    } else if (error.status === 404) {
      return res.status(404).json({ error: 'Gemini API endpoint not found. Check model availability.' })
    } else {
      return res.status(500).json({ 
        error: 'Gemini API error: ' + error.message,
        details: 'Please check server logs for more information.'
      })
    }
  }
})

// Test API key endpoint
app.get('/api/test-key', async (req, res) => {
  try {
    if (!genAI) {
      return res.status(500).json({ error: 'Gemini AI not initialized' })
    }
    
    console.log('Testing API key with simple request...')
    const testModel = genAI.getGenerativeModel({ model: 'gemini-pro' })
    
    const testResult = await testModel.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: "Test message - just say 'API key is working' in English"
            }
          ]
        }
      ],
      generationConfig: {
        maxOutputTokens: 50,
        temperature: 0.1,
      }
    })
    
    const response = testResult.response.text().trim()
    console.log('API key test result:', response)
    
    res.json({ 
      status: 'OK',
      message: 'API key test completed',
      result: response,
      success: response.includes('API key is working')
    })
  } catch (error) {
    console.error('API key test failed:', error.message)
    res.status(500).json({ 
      error: 'API key test failed: ' + error.message,
      details: error.message
    })
  }
})

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Poet API server is running',
    gemini: geminiApiKey ? 'configured' : 'not configured',
    model: model ? 'initialized' : 'not initialized'
  })
})

app.listen(port, () => {
  console.log(`Poet API server running on port ${port}`)
  console.log(`Gemini API: ${geminiApiKey ? 'Configured' : 'Not configured'}`)
  console.log(`Model: ${model ? 'Initialized' : 'Not initialized'}`)
})
