import express from 'express'
import cors from 'cors'
import { GoogleGenerativeAI } from '@google/generative-ai'
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
  geminiApiKey = 'AIzaSyCKgWCw0Bz_9JZBiX3KUXrhcY8lSw5SNcM'
}

console.log('API Key loaded:', geminiApiKey ? 'YES' : 'NO')

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(geminiApiKey)
const model = genAI.getGenerativeModel({ model: "gemini-pro" })

// Poetry generation endpoint
app.post('/api/generate-poem', async (req, res) => {
  try {
    const { recipient, messageType, language, lineCount, story, style } = req.body

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
    
    prompt += `. Make it heartfelt and personal.`

    const completion = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `You are a master poet who can create beautiful, emotionally resonant poetry in multiple languages and styles. Your poems should be creative, well-structured, and capture the essence of the given theme and relationship.\n\n${prompt}`
            }
          ]
        }
      ],
      generationConfig: {
        maxOutputTokens: 300,
        temperature: 0.8,
      }
    })

    const poem = completion.response.text().trim()

    res.json({ poem })
  } catch (error) {
    console.error('Error generating poem:', error)
    
    // Handle different types of errors
    if (error.status === 429) {
      return res.status(429).json({ error: 'Gemini API quota exceeded. Please try again later.' })
    } else if (error.status === 401) {
      return res.status(401).json({ error: 'Invalid Gemini API key.' })
    } else {
      // Fallback response if Gemini fails
      const fallbackPoem = `In realms where words like rivers flow,\nYour feelings dance and gently glow.\nA tapestry of thought and soul,\nWhere poetry takes its precious toll.\n\n${language || 'English'} poetry for ${recipient || 'someone'},\n${lineCount || 'beautiful'} lines of heartfelt grace.`
      
      res.json({ poem: fallbackPoem })
    }
  }
})

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Poet API server is running',
    gemini: geminiApiKey ? 'configured' : 'not configured'
  })
})

app.listen(port, () => {
  console.log(`Poet API server running on port ${port}`)
  console.log(`Gemini API: ${geminiApiKey ? 'Configured' : 'Not configured'}`)
})
