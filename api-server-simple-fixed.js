import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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
  geminiApiKey = 'YOUR_NEW_API_KEY_HERE' // Replace with your new key
}

console.log('API Key loaded:', geminiApiKey ? 'YES' : 'NO')

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

    // Use a simple working approach - direct API call
    try {
      console.log('=== GEMINI API CALL ===')
      console.log('API Key being used:', geminiApiKey ? geminiApiKey.substring(0, 10) + '...' : 'none')
      
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': geminiApiKey
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
  } catch (error) {
    console.error('Error generating poem:', error)
    console.error('Error stack:', error.stack)
    res.status(500).json({ error: 'Server error: ' + error.message })
  }
})

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Poet API server is running',
    gemini: geminiApiKey ? 'configured' : 'not configured',
    api_version: 'v1beta'
  })
})

// Test API key endpoint
app.get('/api/test-key', async (req, res) => {
  try {
    if (!geminiApiKey) {
      return res.status(500).json({ error: 'Gemini API key not configured' })
    }
    
    console.log('Testing API key with simple request...')
    
    // Try v1 API with different model names
    const v1Models = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-pro', 'gemini-1.0-pro']
    let v1ModelInitialized = false
    
    for (const modelName of v1Models) {
      try {
        console.log(`Trying v1 model: ${modelName}`)
        const v1Model = genAI.getGenerativeModel({ model: modelName })
        console.log(`✅ V1 Model ${modelName} initialized successfully`)
        model = v1Model
        v1ModelInitialized = true
        break
      } catch (modelError) {
        console.log(`❌ V1 Model ${modelName} failed:`, modelError.message)
      }
    }
    
    if (!v1ModelInitialized) {
      throw new Error('No Gemini model could be initialized')
    }
    
    console.log('=== GEMINI INITIALIZATION COMPLETE ===')
    console.log(`Using model: ${model ? model.modelName || 'unknown'}`)
  } catch (error) {
    console.error('=== GEMINI INITIALIZATION FAILED ===')
    console.error('Error:', error.message)
    console.error('Stack:', error.stack)
    console.log('=== FALLBACK MODE ENABLED ===')
  }
})

app.listen(port, () => {
  console.log(`Poet API server running on port ${port}`)
  console.log(`Gemini API: ${geminiApiKey ? 'Configured' : 'Not configured'}`)
  console.log(`API Version: v1beta`)
})
