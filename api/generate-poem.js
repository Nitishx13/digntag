import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'AIzaSyCKgWCw0Bz_9JZBiX3KUXrhcY8lSw5SNcM')
const model = genAI.getGenerativeModel({ model: "gemini-pro" })

export default async function handler(req, res) {
  // Enable CORS
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
}
