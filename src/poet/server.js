import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import { GoogleGenerativeAI } from '@google/generative-ai'
import dotenv from 'dotenv'

// Get current directory
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables from root directory
dotenv.config({ path: path.join(__dirname, '../../.env') })

const app = express()
const port = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

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

    const result = await model.generateContent(prompt)
    const poem = result.response.text().trim()

    res.json({ poem })
  } catch (error) {
    console.error('Error generating poem:', error)
    
    // Extract request data for fallback
    const { recipient, language, lineCount } = req.body || {}
    
    // Fallback response if Gemini fails
    const fallbackPoem = `In realms where words like rivers flow,\nYour feelings dance and gently glow.\nA tapestry of thought and soul,\nWhere poetry takes its precious toll.\n\n${language || 'English'} poetry for ${recipient || 'someone'},\n${lineCount || 'beautiful'} lines of heartfelt grace.`
    
    res.json({ poem: fallbackPoem })
  }
})

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

app.listen(port, () => {
  console.log(`Poet API server running on port ${port}`)
})
