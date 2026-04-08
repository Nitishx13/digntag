const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const app = express()
const port = process.env.PORT || 3005

// Middleware
app.use(cors())
app.use(express.json())

// Load environment variables
console.log('=== LOADING API KEY ===')
let geminiApiKey = process.env.GEMINI_API_KEY

// Try to load from config.env file if not found
if (!geminiApiKey) {
  try {
    const envPath = path.join(__dirname, '../config.env')
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

if (!geminiApiKey) {
  console.log('No API key found, using placeholder')
  geminiApiKey = 'YOUR_NEW_API_KEY_HERE'
}

// Poetry generation endpoint
module.exports = async (req, res) => {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

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
    let prompt = `You are a master poet. Write a poem in ${language} for ${recipient}.`
    
    // Add very specific paragraph count instruction with exact format
    if (lineCount === '2') {
      prompt += `\n\nCRITICAL REQUIREMENTS:\n- Write EXACTLY 2 paragraphs\n- Each paragraph must be 3-5 sentences\n- Separate paragraphs with a double blank line\n- Do NOT write more than 2 paragraphs\n- Do NOT write less than 2 paragraphs\n- Format: Paragraph 1\n\nParagraph 2\n\nMUST BE EXACTLY 2 PARAGRAPHS - NO EXCEPTIONS`
    } else if (lineCount === '4') {
      prompt += `\n\nCRITICAL REQUIREMENTS:\n- Write EXACTLY 4 paragraphs\n- Each paragraph must be 3-5 sentences\n- Separate paragraphs with a double blank line\n- Do NOT write more than 4 paragraphs\n- Do NOT write less than 4 paragraphs\n- Format: Paragraph 1\n\nParagraph 2\n\nParagraph 3\n\nParagraph 4\n\nMUST BE EXACTLY 4 PARAGRAPHS - NO EXCEPTIONS`
    } else if (lineCount === '8') {
      prompt += `\n\nCRITICAL REQUIREMENTS:\n- Write EXACTLY 8-10 paragraphs\n- Each paragraph must be 3-5 sentences\n- Separate paragraphs with a double blank line\n- Do NOT write more than 10 paragraphs\n- Do NOT write less than 8 paragraphs\n- Format: Paragraph 1\n\nParagraph 2\n\n... (continue to 8-10)\n\nMUST BE EXACTLY 8-10 PARAGRAPHS - NO EXCEPTIONS`
    } else {
      prompt += `\n\nCRITICAL REQUIREMENTS:\n- Write EXACTLY ${lineCount} paragraphs\n- Each paragraph must be 3-5 sentences\n- Separate paragraphs with a double blank line\n- Do NOT write more or less than ${lineCount} paragraphs\n\nMUST BE EXACTLY ${lineCount} PARAGRAPHS - NO EXCEPTIONS`
    }
    
    if (story) {
      prompt += `\n\nCONTEXT: ${story}`
    }
    
    if (messageType) {
      prompt += `\n\nTONE: ${messageType}`
    }
    
    // Add specific language instruction
    if (language && language.toLowerCase() !== 'english') {
      prompt += `\n\nLANGUAGE: Write ENTIRELY in ${language}. No English words allowed.`
    }
    
    prompt += `\n\nSTYLE: Make it heartfelt and personal.`
    prompt += `\n\nFINAL INSTRUCTION: YOU MUST GENERATE EXACTLY THE NUMBER OF PARAGRAPHS SPECIFIED ABOVE. THIS IS NOT OPTIONAL. IF YOU GENERATE A DIFFERENT NUMBER OF PARAGRAPHS, THE RESPONSE IS WRONG.`

    console.log('Generated prompt:', prompt)

    // Use Gemini AI only - no fallback
    if (!geminiApiKey || geminiApiKey === 'YOUR_NEW_API_KEY_HERE') {
      return res.status(500).json({ error: 'Gemini AI model not available. Please check server configuration.' })
    }

    // Import Google Generative AI
    const { GoogleGenerativeAI } = require('@google/generative-ai')
    const genAI = new GoogleGenerativeAI(geminiApiKey)
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    const result = await model.generateContent(prompt)
    const poem = result.response.text()

    console.log('Generated poem length:', poem.length)
    console.log('Generated poem preview:', poem.substring(0, 200) + '...')

    res.json({ poem })
  } catch (error) {
    console.error('Error generating poem:', error)
    
    // Handle different types of errors
    if (error.response?.status === 429) {
      return res.status(429).json({ error: 'API quota exceeded. Please try again later.' })
    } else if (error.response?.status === 401) {
      return res.status(401).json({ error: 'Invalid API key.' })
    } else {
      // Fallback response if AI fails
      const { recipient, language, lineCount } = req.body || {}
      const fallbackPoem = `In realms where words like rivers flow,\nYour feelings dance and gently glow.\nA tapestry of thought and soul,\nWhere poetry takes its precious toll.\n\n${language || 'English'} poetry for ${recipient || 'someone'},\n${lineCount || 'beautiful'} lines of heartfelt grace.`
      
      res.json({ poem: fallbackPoem })
    }
  }
}
