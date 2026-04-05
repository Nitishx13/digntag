const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const app = express()
const port = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Load environment variables
console.log('=== LOADING API KEY ===')
let geminiApiKey = process.env.GEMINI_API_KEY

// Try to load from .env file if not found
if (!geminiApiKey) {
  try {
    const envPath = path.join(__dirname, '.env')
    console.log('Checking .env at:', envPath)
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8')
      console.log('.env content length:', envContent.length)
      const envLines = envContent.split('\n')
      for (const line of envLines) {
        if (line.startsWith('GEMINI_API_KEY=')) {
          geminiApiKey = line.split('=')[1].trim()
          console.log('✅ API Key loaded from .env')
          break
        }
      }
    }
  } catch (error) {
    console.log('Could not read .env file:', error.message)
  }
}

if (!geminiApiKey) {
  console.log('⚠️ No API key found, using placeholder')
  geminiApiKey = 'YOUR_NEW_API_KEY_HERE'
}

console.log('=== API KEY LOADING COMPLETE ===')
console.log('Final API Key status:', geminiApiKey ? 'LOADED' : 'NOT LOADED')
console.log('API Key length:', geminiApiKey ? geminiApiKey.length : 0)
console.log('=============================')

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
    let prompt = `Write a poem in ${language} for ${recipient}`
    
    // Add specific paragraph count instruction with explicit formatting
    if (lineCount === '2') {
      prompt += `. The poem must have exactly 2 paragraphs. Format the poem with each paragraph separated by a blank line.`
    } else if (lineCount === '4') {
      prompt += `. The poem must have exactly 4 paragraphs. Format the poem with each paragraph separated by a blank line.`
    } else if (lineCount === '8') {
      prompt += `. The poem must have exactly 8-10 paragraphs. Format the poem with each paragraph separated by a blank line.`
    } else {
      prompt += `. The poem must have exactly ${lineCount} paragraphs. Format the poem with each paragraph separated by a blank line.`
    }
    
    if (story) {
      prompt += ` Context: ${story}`
    }
    
    if (messageType) {
      prompt += `. Tone: ${messageType}`
    }
    
    // Add specific language instruction
    if (language && language.toLowerCase() !== 'english') {
      prompt += `. IMPORTANT: Write this poem ENTIRELY in ${language}. Do not mix languages. The response must be 100% in ${language}.`
    }
    
    prompt += `. Make it heartfelt and personal. Ensure each paragraph is separated by a blank line.`

    console.log('Generated prompt:', prompt)

    // Use Gemini AI only - no fallback
    if (!geminiApiKey || geminiApiKey === 'YOUR_NEW_API_KEY_HERE') {
      return res.status(500).json({ error: 'Gemini AI model not available. Please check server configuration.' })
    }

    console.log('=== GEMINI API CALL ===')
    console.log('API Key being used:', geminiApiKey ? geminiApiKey.substring(0, 10) + '...' : 'NONE')
    console.log('Prompt being sent:', prompt)

    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': geminiApiKey.trim()
      },
      body: JSON.stringify({
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
        generationConfig: {
          maxOutputTokens: 300,
          temperature: 0.8,
        }
      })
    })

    console.log('Response status:', response.status)
    console.log('Response ok:', response.ok)

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Gemini API error:', errorData)
      return res.status(response.status).json({ 
        error: 'Gemini API error: ' + errorData.error.message,
        details: errorData.error.message
      })
    }

    const result = await response.json()
    const poem = result.candidates?.[0]?.content?.parts?.[0]?.text || 'No poem generated'
    
    console.log('✅ Gemini API call successful')
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
    console.error('Error stack:', error.stack)

    // Handle different types of errors
    if (error.message.includes('404')) {
      return res.status(404).json({ error: 'Gemini API endpoint not found. Check model availability.' })
    } else if (error.message.includes('401') || error.message.includes('403')) {
      return res.status(401).json({ error: 'Invalid Gemini API key.' })
    } else if (error.message.includes('429')) {
      return res.status(429).json({ error: 'Gemini API quota exceeded. Please try again later.' })
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
    if (!geminiApiKey || geminiApiKey === 'YOUR_NEW_API_KEY_HERE') {
      return res.status(500).json({ error: 'Gemini API key not configured' })
    }
    
    console.log('=== API KEY TEST ===')
    console.log('API Key exists:', !!geminiApiKey)
    console.log('API Key length:', geminiApiKey ? geminiApiKey.length : 0)
    console.log('API Key first 10 chars:', geminiApiKey ? geminiApiKey.substring(0, 10) : 'NONE')
    console.log('API Key last 10 chars:', geminiApiKey ? geminiApiKey.substring(geminiApiKey.length - 10) : 'NONE')
    console.log('=============================')
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': geminiApiKey.trim()
      },
      body: JSON.stringify({
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
    })

    console.log('Response status:', response.status)
    console.log('Response ok:', response.ok)

    if (!response.ok) {
      const errorData = await response.json()
      console.error('API key test failed:', errorData)
      return res.status(response.status).json({ 
        error: 'API key test failed: ' + errorData.error.message,
        details: errorData.error.message
      })
    }

    const result = await response.json()
    const testResponse = result.candidates?.[0]?.content?.parts?.[0]?.text || 'Test failed'
    
    console.log('Test response:', testResponse)
    console.log('Test success:', testResponse.includes('API key is working'))
    console.log('=== TEST COMPLETE ===')
    
    res.json({ 
      status: 'OK',
      message: 'API key test completed',
      result: testResponse,
      success: testResponse.includes('API key is working')
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
    model: 'gemini-2.5-flash',
    gemini: geminiApiKey ? 'configured' : 'not configured',
    api_version: 'v1'
  })
})

// Root route handler
app.get('/', (req, res) => {
  res.json({ 
    message: 'Simple Poetry API Server is running',
    status: 'OK',
    endpoints: {
      'POST /api/generate-poem': 'Generate poetry',
      'GET /api/health': 'Health check',
      'GET /api/test-key': 'Test API key'
    },
    instructions: 'Use POST /api/generate-poem for poetry generation'
  })
})

app.listen(port, () => {
  console.log(`🚀 Poet API server running on port ${port}`)
  console.log(`🤖 Gemini API: ${geminiApiKey ? 'Configured' : 'Not configured'}`)
  console.log(`⚡ Model: gemini-2.5-flash (Fast & Efficient)`)
  console.log(`🔗 API Version: v1`)
})
