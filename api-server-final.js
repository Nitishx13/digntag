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
console.log('=== LOADING API KEY ===')
console.log('Current directory:', __dirname)
console.log('Looking for .env file...')

let geminiApiKey = process.env.GEMINI_API_KEY

// Try to load from config.env file if not found (not blocked by .gitignore)
if (!geminiApiKey) {
  try {
    const envPath = path.join(__dirname, 'config.env')
    console.log('Checking config.env at:', envPath)
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8')
      console.log('config.env content length:', envContent.length)
      const envLines = envContent.split('\n')
      for (const line of envLines) {
        if (line.startsWith('GEMINI_API_KEY=')) {
          geminiApiKey = line.split('=')[1].trim()
          console.log('API Key loaded from config.env')
          break
        }
      }
    }
  } catch (error) {
    console.log('Could not read config.env file:', error.message)
  }
}

// Try to load from .env.local file if still not found
if (!geminiApiKey) {
  try {
    const envPath = path.join(__dirname, '.env.local')
    console.log('Checking .env.local at:', envPath)
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8')
      console.log('.env.local content length:', envContent.length)
      const envLines = envContent.split('\n')
      for (const line of envLines) {
        if (line.startsWith('GEMINI_API_KEY=')) {
          geminiApiKey = line.split('=')[1].trim()
          console.log('API Key loaded from .env.local')
          break
        }
      }
    }
  } catch (error) {
    console.log('Could not read .env.local file:', error.message)
  }
}

// Try to load from .env file if still not found
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
          console.log('API Key loaded from .env')
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
  console.log('No API key found in any file, using placeholder')
  geminiApiKey = 'YOUR_NEW_API_KEY_HERE' // Replace with your new key
}

console.log('=== API KEY LOADING COMPLETE ===')
console.log('Final API Key status:', geminiApiKey ? 'LOADED' : 'NOT LOADED')
console.log('API Key length:', geminiApiKey ? geminiApiKey.length : 0)
console.log('API Key first 10 chars:', geminiApiKey ? geminiApiKey.substring(0, 10) : 'NONE')
console.log('API Key last 10 chars:', geminiApiKey ? geminiApiKey.substring(geminiApiKey.length - 10) : 'NONE')
console.log('API Key full key:', geminiApiKey || 'NONE')
console.log('=============================')

console.log('API Key loaded:', geminiApiKey ? 'YES' : 'NO')

// Simple poetry generation using Gemini 1.5 Flash
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

    // Simple direct API call
    try {
      console.log('=== GEMINI 1.5 FLASH API CALL ===')
      console.log('API Key being used:', geminiApiKey ? geminiApiKey.substring(0, 10) + '...' : 'none')
      
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent`, {
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

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Poet API server is running',
    model: 'gemini-1.5-flash',
    gemini: geminiApiKey ? 'configured' : 'not configured',
    api_version: 'v1beta'
  })
})

// Test API key endpoint with detailed debugging
app.get('/api/test-key', async (req, res) => {
  try {
    if (!geminiApiKey) {
      return res.status(500).json({ error: 'Gemini API key not configured' })
    }
    
    console.log('=== DETAILED API KEY TEST ===')
    console.log('API Key exists:', !!geminiApiKey)
    console.log('API Key length:', geminiApiKey ? geminiApiKey.length : 0)
    console.log('API Key first 10 chars:', geminiApiKey ? geminiApiKey.substring(0, 10) : 'NONE')
    console.log('API Key last 10 chars:', geminiApiKey ? geminiApiKey.substring(geminiApiKey.length - 10) : 'NONE')
    console.log('API Key full key:', geminiApiKey || 'NONE')
    console.log('API Key char codes:', geminiApiKey ? Array.from(geminiApiKey).map(c => c.charCodeAt(0)) : 'NONE')
    console.log('=============================')
    
    if (!geminiApiKey || geminiApiKey.length < 10) {
      return res.status(500).json({ 
        error: 'API key missing or too short',
        details: 'API key must be at least 10 characters'
      })
    }
    
    // Test with a simple validation first
    console.log('Testing simple validation endpoint...')
    try {
      const testResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent`, {
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
                  text: "Test"
                }
              ]
            }
          ],
          generationConfig: {
            maxOutputTokens: 10,
            temperature: 0.1,
          }
        })
      })

      console.log('Simple validation response status:', testResponse.status)
      console.log('Simple validation response ok:', testResponse.ok)

      if (!testResponse.ok) {
        const errorData = await testResponse.json()
        console.error('Simple validation failed:', errorData)
        return res.status(testResponse.status).json({ 
          error: 'API key validation failed: ' + errorData.error.message,
          details: errorData.error.message
        })
      }

      const result = await testResponse.json()
      console.log('Simple validation successful')
      
      // Now test with full poetry generation
      console.log('Testing full poetry generation...')
      
      const poetryResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent`, {
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
                  text: "Write a 2 line poem in Hindi for friend. Make it heartfelt and personal."
                }
              ]
            }
          ],
          generationConfig: {
            maxOutputTokens: 50,
            temperature: 0.8,
          }
        })
      })

      console.log('Poetry generation response status:', poetryResponse.status)
      console.log('Poetry generation response ok:', poetryResponse.ok)

      if (!poetryResponse.ok) {
        const errorData = await poetryResponse.json()
        console.error('Poetry generation failed:', errorData)
        return res.status(poetryResponse.status).json({ 
          error: 'Poetry generation failed: ' + errorData.error.message,
          details: errorData.error.message
        })
      }

      const poetryResult = await poetryResponse.json()
      const poem = poetryResult.candidates?.[0]?.content?.parts?.[0]?.text || 'No poem generated'
      
      console.log('Poetry generation successful')
      console.log('Generated poem:', poem)
      console.log('=== TEST COMPLETE ===')
      
      res.json({ 
        status: 'OK',
        message: 'API key test completed',
        result: poem,
        success: poem && poem.length > 0,
        debug: {
          apiKeyLength: geminiApiKey ? geminiApiKey.length : 0,
          apiKeyFirst10: geminiApiKey ? geminiApiKey.substring(0, 10) : 'NONE',
          apiKeyLast10: geminiApiKey ? geminiApiKey.substring(geminiApiKey.length - 10) : 'NONE',
          simpleValidation: testResponse.ok,
          poetryGeneration: poetryResponse.ok,
        }
      ],
      generationConfig: {
        maxOutputTokens: 10,
        temperature: 0.1,
      }
    })
  })

  console.log('Simple validation response status:', testResponse.status)
  console.log('Simple validation response ok:', testResponse.ok)

  if (!testResponse.ok) {
    const errorData = await testResponse.json()
    console.error('Simple validation failed:', errorData)
    return res.status(testResponse.status).json({ 
      error: 'API key validation failed: ' + errorData.error.message,
      details: errorData.error.message
    })
  }

  const result = await testResponse.json()
  console.log('Simple validation successful')
  
  // Now test with full poetry generation
  console.log('Testing full poetry generation...')
  
  const poetryResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent`, {
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
              text: "Write a 2 line poem in Hindi for friend. Make it heartfelt and personal."
            }
          ]
        }
      ],
      generationConfig: {
        maxOutputTokens: 50,
        temperature: 0.8,
      }
    })
  })

  console.log('Poetry generation response status:', poetryResponse.status)
  console.log('Poetry generation response ok:', poetryResponse.ok)

  if (!poetryResponse.ok) {
    const errorData = await poetryResponse.json()
    console.error('Poetry generation failed:', errorData)
    return res.status(poetryResponse.status).json({ 
      error: 'Poetry generation failed: ' + errorData.error.message,
      details: errorData.error.message
    })
  }

  const poetryResult = await poetryResponse.json()
  const poem = poetryResult.candidates?.[0]?.content?.parts?.[0]?.text || 'No poem generated'
  
  console.log('Poetry generation successful')
  console.log('Generated poem:', poem)
  console.log('=== TEST COMPLETE ===')
  
  res.json({ 
    status: 'OK',
    message: 'API key test completed',
    result: poem,
    success: poem && poem.length > 0,
    debug: {
      apiKeyLength: geminiApiKey ? geminiApiKey.length : 0,
      apiKeyFirst10: geminiApiKey ? geminiApiKey.substring(0, 10) : 'NONE',
      apiKeyLast10: geminiApiKey ? geminiApiKey.substring(geminiApiKey.length - 10) : 'NONE',
      simpleValidation: testResponse.ok,
      poetryGeneration: poetryResponse.ok,
      responseStatus: poetryResponse.status,
      responseOk: poetryResponse.ok
    }
  })
} catch (error) {
  console.error('API key test failed:', error.message)
  res.status(500).json({ 
    error: 'API key test failed: ' + error.message,
    details: error.message
  })
}
}).json({ error: 'Gemini API key not configured' })
}

console.log('=== TESTING MULTIPLE POETRY GENERATIONS ===')
  
const testCases = [
  { language: 'Hindi', recipient: 'friend', lineCount: '2' },
  { language: 'English', recipient: 'mother', lineCount: '4' },
  { language: 'Spanish', recipient: 'partner', lineCount: '6' },
  { language: 'French', recipient: 'love', lineCount: '8' }
]
  
const results = []
  
for (let i = 0; i < testCases.length; i++) {
  const testCase = testCases[i]
  console.log(`Testing case ${i + 1}: ${testCase.language} poetry for ${testCase.recipient} (${testCase.lineCount} lines)`)
  
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent`, {
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
      { language: 'English', recipient: 'mother', lineCount: '4' },
      { language: 'Spanish', recipient: 'partner', lineCount: '6' },
      { language: 'French', recipient: 'love', lineCount: '8' }
    ]
    
    const results = []
    
    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i]
      console.log(`Testing case ${i + 1}: ${testCase.language} poetry for ${testCase.recipient} (${testCase.lineCount} lines)`)
      
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent`, {
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
                    text: `Write a ${testCase.lineCount} poem in ${testCase.language} for ${testCase.recipient}. Make it heartfelt and personal.`
                  }
                ]
              }
            ],
            generationConfig: {
              maxOutputTokens: 100,
              temperature: 0.8,
            }
          })
        })

        if (!response.ok) {
          const errorData = await response.json()
          console.error(`Case ${i + 1} failed:`, errorData.error.message)
          results.push({ case: i + 1, ...testCase, success: false, error: errorData.error.message })
        } else {
          const result = await response.json()
          const poem = result.candidates?.[0]?.content?.parts?.[0]?.text || 'No poem generated'
          console.log(`Case ${i + 1} success:`, poem.substring(0, 50) + '...')
          results.push({ case: i + 1, ...testCase, success: true, poem: poem })
        }
      } catch (error) {
        console.error(`Case ${i + 1} error:`, error.message)
        results.push({ case: i + 1, ...testCase, success: false, error: error.message })
      }
    }
    
    console.log('=== TESTING COMPLETE ===')
    console.log(`Total tests: ${testCases.length}`)
    console.log(`Successful: ${results.filter(r => r.success).length}`)
    console.log(`Failed: ${results.filter(r => !r.success).length}`)
    
    res.json({ 
      status: 'OK',
      message: 'Multiple poetry generation tests completed',
      totalTests: testCases.length,
      successful: results.filter(r => r.success).length,
      failed: results.filter(r => !r.success).length,
      results: results
    })
  } catch (error) {
    console.error('Test poetry generation failed:', error.message)
    res.status(500).json({ 
      error: 'Test poetry generation failed: ' + error.message,
      details: error.message
    })
  }
})

app.listen(port, () => {
  console.log(`🚀 Poet API server running on port ${port}`)
  console.log(`🤖 Gemini API: ${geminiApiKey ? 'Configured' : 'Not configured'}`)
  console.log(`⚡ Model: gemini-1.5-flash (Fast & Efficient)`)
  console.log(`🔗 API Version: v1beta`)
})
