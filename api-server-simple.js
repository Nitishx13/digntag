import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import { OpenAI } from 'openai'
import { readFileSync } from 'fs'

// Get current directory
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Read .env file directly
const envPath = path.join(__dirname, '.env')
let OPENAI_API_KEY = ''

try {
  const envContent = readFileSync(envPath, 'utf8')
  const lines = envContent.split('\n')
  for (const line of lines) {
    if (line.startsWith('OPENAI_API_KEY=')) {
      OPENAI_API_KEY = line.split('=')[1].trim()
      break
    }
  }
} catch (error) {
  console.error('Error reading .env file:', error)
}

const app = express()
const port = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
})

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

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a master poet who can create beautiful, emotionally resonant poetry in multiple languages and styles. Your poems should be creative, well-structured, and capture the essence of given theme and relationship."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 300,
      temperature: 0.8,
    })

    const poem = completion.choices[0].message.content.trim()

    res.json({ poem })
  } catch (error) {
    console.error('Error generating poem:', error)
    
    // Handle different types of errors
    if (error.response?.status === 429) {
      return res.status(429).json({ error: 'OpenAI API quota exceeded. Please check your billing or try again later.' })
    } else if (error.response?.status === 401) {
      return res.status(401).json({ error: 'Invalid OpenAI API key.' })
    } else {
      // Fallback response if OpenAI fails
      const { recipient, language, lineCount } = req.body || {}
      const fallbackPoem = `In realms where words like rivers flow,\nYour feelings dance and gently glow.\nA tapestry of thought and soul,\nWhere poetry takes its precious toll.\n\n${language || 'English'} poetry for ${recipient || 'someone'},\n${lineCount || 'beautiful'} lines of heartfelt grace.`
      
      res.json({ poem: fallbackPoem })
    }
  }
})

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

app.listen(port, () => {
  console.log(`Poet API server running on port ${port}`)
  console.log(`API Key loaded: ${OPENAI_API_KEY ? 'YES' : 'NO'}`)
})
