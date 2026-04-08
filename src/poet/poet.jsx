import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import SiteHeader from '../components/SiteHeader.jsx'
import SiteFooter from '../components/SiteFooter.jsx'

const PoetPage = () => {
  const navigate = useNavigate()
  const [generatedPoem, setGeneratedPoem] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  
  // Form states
  const [recipient, setRecipient] = useState('')
  const [messageType, setMessageType] = useState('')
  const [language, setLanguage] = useState('')
  const [lineCount, setLineCount] = useState('')
  const [story, setStory] = useState('')
  const [error, setError] = useState('')

  // API origin - moved to top level
  const origin = useMemo(() => {
    const hostname = window.location.hostname
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:3005'
    }
    return 'https://www.digntag.in'
  }, [])

  // Message type options based on recipient
  const getMessageOptions = () => {
    if (!recipient) return []
    
    if (recipient.includes('Partner') || recipient.includes('Lover') || recipient.includes('Crush')) {
      return [
        'Love and Romance',
        'Missing You',
        'Anniversary Celebrations',
        'Thank You',
        'Sorry/Apology',
        'Good Morning/Good Night',
        'Thinking of You'
      ]
    } else if (recipient.includes('Mother') || recipient.includes('Father') || recipient.includes('Parents')) {
      return [
        'Thank You',
        'Birthday Wishes',
        'Love and Appreciation',
        'Gratitude',
        'Sorry/Apology',
        'Congratulations',
        'Good Morning/Good Night'
      ]
    } else if (recipient.includes('Friend') || recipient.includes('Best friend')) {
      return [
        'Friendship',
        'Missing You',
        'Thank You',
        'Sorry/Apology',
        'Good Luck',
        'Congratulations',
        'Thinking of You'
      ]
    } else if (recipient.includes('Teacher') || recipient.includes('Mentor') || recipient.includes('Colleague') || recipient.includes('Boss')) {
      return [
        'Thank You',
        'Congratulations',
        'Good Luck',
        'Inspiration',
        'Gratitude',
        'Professional Appreciation'
      ]
    } else {
      return [
        'Love and Romance',
        'Missing You',
        'Anniversary Celebrations',
        'Thank You',
        'Sorry/Apology',
        'Good Morning/Good Night',
        'Thinking of You'
      ]
    }
  }

  // Generate poetry
  const generatePoetry = async () => {
    console.log('=== FORM DATA BEFORE SUBMISSION ===')
    console.log('Recipient:', recipient)
    console.log('Message Type:', messageType)
    console.log('Language:', language)
    console.log('Line Count:', lineCount)
    console.log('Story:', story)
    console.log('====================================')

    if (!recipient || !language || !lineCount) {
      setError('Please fill in all required fields')
      return
    }

    setIsGenerating(true)
    setError('')
    setGeneratedPoem('')

    try {
      const apiUrl = `${origin}/api/generate-poem`
      const response = await axios.post(apiUrl, {
        recipient,
        messageType,
        language,
        lineCount,
        story
      })

      const poem = response.data.poem
      setGeneratedPoem(poem)
      // Save generated shayari to localStorage for templates with proper encoding
      localStorage.setItem('generatedShayari', poem)
      console.log('Generated poem:', poem)
    } catch (err) {
      console.error('Error generating poetry:', err)
      console.error('Error response:', err.response)
      console.error('Error status:', err.response?.status)
      console.error('Error data:', err.response?.data)
      
      // Handle specific API quota exceeded error
      if (err.response?.status === 429 || err.message?.includes('quota exceeded')) {
        const defaultPoem = getDefaultPoetry()
        setGeneratedPoem(defaultPoem)
        // Save default poetry to localStorage for templates
        localStorage.setItem('generatedShayari', defaultPoem)
        console.log('Using default poem:', defaultPoem)
        setError('AI quota exceeded. Showing you a beautiful default poem instead!')
      } else if (err.response?.status === 404) {
        const errorData = err.response?.data
        if (errorData?.error === 'DATABASE_IS_EMPTY') {
          setError('📚 DATABASE IS EMPTY! Please add shayari to the database first using the admin panel.')
        } else if (errorData?.error === 'NO_MATCH') {
          setError(`🔍 NO MATCH FOUND! No shayari available for ${language} with ${lineCount} lines. Please add shayari for this combination.`)
        } else {
          setError(errorData?.message || 'No matching shayari found in database.')
        }
      } else if (err.response?.status === 400) {
        setError('Please fill in all required fields.')
      } else if (err.code === 'ECONNREFUSED' || err.message?.includes('Network Error')) {
        setError('Cannot connect to poetry server. Please make sure the server is running.')
      } else {
        setError(`Server error: ${err.response?.data?.error || err.message || 'Please try again later.'}`)
      }
    } finally {
      setIsGenerating(false)
    }
  }

  // Default beautiful poetry function
  const getDefaultPoetry = () => {
    const defaultPoems = {
      'Hindi': {
        '2': `तेरी यादें मेरे दिल में बसी हैं,
हर पल तेरा ही खयाल आता है।

तुम मेरे दिल की धड़कन हो,
तेरे बिना ये जीवन अधूरा है।`,
        '4': `तेरी यादें मेरे दिल में बसी हैं,
हर पल तेरा ही खयाल आता है।

तुम मेरे दिल की धड़कन हो,
तेरे बिना ये जीवन अधूरा है।

तेरी मुस्कान मेरी दुनिया है,
तेरे चेहरे पर आता है नूर।

तुमसे मिलकर मैं खुश हूँ,
तेरी हर बात मुझे प्यारी है।`,
        '8': `तेरी यादें मेरे दिल में बसी हैं,
हर पल तेरा ही खयाल आता है।

तुम मेरे दिल की धड़कन हो,
तेरे बिना ये जीवन अधूरा है।

तेरी मुस्कान मेरी दुनिया है,
तेरे चेहरे पर आता है नूर।

तुमसे मिलकर मैं खुश हूँ,
तेरी हर बात मुझे प्यारी है।

तेरी आँखों में समां है गहरा,
वहाँ मैं खो जाता हूँ।

तेरी बाहों में पनाह है,
वहाँ मैं पाता हूँ सुकून।

तेरे साथ हर लम्हा है खास,
तेरे बिना सब कुछ वीरान है।

तुम मेरी जिंदगी का हिस्सा हो,
तेरे साथ ही गुजारना है।`
      },
      'English': {
        '2': `Your memories reside in my heart,
Every moment brings thoughts of you.

You are the heartbeat of my soul,
Without you, life feels incomplete.`,
        '4': `Your memories reside in my heart,
Every moment brings thoughts of you.

You are the heartbeat of my soul,
Without you, life feels incomplete.

Your smile lights up my world,
Your face radiates pure light.

With you, I find true happiness,
Every word you speak is precious.`,
        '8': `Your memories reside in my heart,
Every moment brings thoughts of you.

You are the heartbeat of my soul,
Without you, life feels incomplete.

Your smile lights up my world,
Your face radiates pure light.

With you, I find true happiness,
Every word you speak is precious.

Your eyes hold depths of wonder,
Where I lose myself completely.

Your arms offer me shelter,
There I find my peace and comfort.

Every moment with you is special,
Without you, everything feels empty.

You are a part of my life's journey,
With you is how I want to live.`
      }
    }

    // Get default poem based on language and line count
    const langPoems = defaultPoems[language] || defaultPoems['English']
    return langPoems[lineCount] || langPoems['4']
  }

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="container mx-auto px-4 py-4 sm:py-8">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-4xl font-bold text-purple-800 mb-2 sm:mb-4">Line Generator</h1>
            <p className="text-sm sm:text-lg text-gray-600 mb-4">Create beautiful shayari and poetry lines instantly with AI-powered technology</p>
            <p className="text-sm text-gray-500">Generate heartfelt romantic lines, friendship quotes, birthday wishes, anniversary messages, and more in Hindi, English, and multiple languages. Perfect for social media posts, greeting cards, and special occasions.</p>
          </div>

          {/* Google AdSense Banner */}
          <div className="mb-8">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-xs text-gray-500 mb-2">Advertisement</div>
              <div className="bg-gray-200 rounded h-20 flex items-center justify-center">
                <span className="text-gray-400 text-sm">AdSense Banner Ad Space</span>
              </div>
            </div>
          </div>

          {/* Poetry Generation Form */}
          <div id="generator" className="bg-white p-4 sm:p-8 rounded-xl shadow-lg" style={{ backgroundColor: '#fffcfc', borderColor: '#F5668D', borderWidth: '1px' }}>
            
            {/* Who is this for? */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <span className="flex items-center justify-center w-6 h-6 rounded-full text-white mr-3"
                  style={{ backgroundColor: '#F5668D', fontSize: '0.8rem' }}
                >1</span>
                <h3 className="text-xl font-semibold" style={{ color: '#34161E' }}>Who is this for?</h3>
              </div>
              <div className="flex flex-wrap gap-3 mb-4">
                {['Partner / Lover', 'Crush', 'Best friend', 'Friend', 'Mother', 'Father', 'Parents', 'Brother', 'Sister', 'Child', 'Teacher / Mentor', 'Colleague / Boss', 'Myself', 'Someone else'].map((relation, index) => (
                  <button 
                    key={index} 
                    className={`px-4 py-2 rounded-full border transition hover:opacity-80 ${
                      recipient === relation ? '' : ''
                    }`}
                    style={{ 
                      borderColor: '#F5668D', 
                      backgroundColor: recipient === relation ? '#F5668D' : 'transparent',
                      color: recipient === relation ? 'white' : '#34161E'
                    }}
                    onClick={() => {
                      console.log('Recipient selected:', relation)
                      setRecipient(relation)
                    }}
                  >
                    {relation}
                  </button>
                ))}
              </div>
              <p className="text-sm" style={{ color: '#666' }}>
                We'll tune the words based on who you select.
              </p>
            </div>

            {/* What do you want to say? */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <span className="flex items-center justify-center w-6 h-6 rounded-full text-white mr-3"
                  style={{ backgroundColor: '#F5668D', fontSize: '0.8rem' }}
                >2</span>
                <h3 className="text-xl font-semibold" style={{ color: '#34161E' }}>What do you want to say?</h3>
              </div>
              <div className="flex flex-wrap gap-3 mb-4">
                {getMessageOptions().map((option, index) => (
                  <button 
                    key={index} 
                    className={`px-4 py-2 rounded-full border transition hover:opacity-80 ${
                      messageType === option ? '' : ''
                    }`}
                    style={{ 
                      borderColor: '#F5668D', 
                      backgroundColor: messageType === option ? '#F5668D' : 'transparent',
                      color: messageType === option ? 'white' : '#34161E'
                    }}
                    onClick={() => {
                      console.log('Message type selected:', option)
                      setMessageType(option)
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <p className="text-sm" style={{ color: '#666' }}>
                No need to overthink it—just pick what feels closest.
              </p>
            </div>

            {/* In which language? */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <span className="flex items-center justify-center w-6 h-6 rounded-full text-white mr-3"
                  style={{ backgroundColor: '#F5668D', fontSize: '0.8rem' }}
                >3</span>
                <h3 className="text-xl font-semibold" style={{ color: '#34161E' }}>In which language?</h3>
              </div>
              <div className="flex flex-wrap gap-3 mb-4">
                {['Hindi', 'English'].map((lang, index) => (
                  <button 
                    key={index} 
                    className={`px-4 py-2 rounded-full border transition hover:opacity-80 ${
                      language === lang ? '' : ''
                    }`}
                    style={{ 
                      borderColor: '#F5668D', 
                      backgroundColor: language === lang ? '#F5668D' : 'transparent',
                      color: language === lang ? 'white' : '#34161E'
                    }}
                    onClick={() => {
                      console.log('Language selected:', lang)
                      setLanguage(lang)
                    }}
                  >
                    {lang}
                  </button>
                ))}
              </div>
              <p className="text-sm" style={{ color: '#666' }}>
                Choose the language that feels closest to your heart.
              </p>
            </div>

            {/* How many lines do you want? */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <span className="flex items-center justify-center w-6 h-6 rounded-full text-white mr-3"
                  style={{ backgroundColor: '#F5668D', fontSize: '0.8rem' }}
                >4</span>
                <h3 className="text-xl font-semibold" style={{ color: '#34161E' }}>How many lines do you want?</h3>
              </div>
              <div className="flex flex-wrap gap-3 mb-4">
                {[
                  { value: '2', label: '2 lines', desc: 'Short and sweet' },
                  { value: '4', label: '4 lines', desc: 'A perfect little verse' },
                  { value: '8', label: '8-10 lines', desc: 'More detailed and heartfelt' }
                ].map((option, index) => (
                  <button 
                    key={index} 
                    className={`px-4 py-2 rounded-full border transition hover:opacity-80 ${
                      lineCount === option.value ? '' : ''
                    }`}
                    style={{ 
                      borderColor: '#F5668D', 
                      backgroundColor: lineCount === option.value ? '#F5668D' : 'transparent',
                      color: lineCount === option.value ? 'white' : '#34161E'
                    }}
                    onClick={() => {
                      console.log('Line count selected:', option.value)
                      setLineCount(option.value)
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              <div className="text-sm" style={{ color: '#666' }}>
                {lineCount === '2' && 'Short and sweet'}
                {lineCount === '4' && 'A perfect little verse'}
                {lineCount === '8' && 'More detailed and heartfelt'}
              </div>
            </div>

            {/* Add your story */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <span className="flex items-center justify-center w-6 h-6 rounded-full text-white mr-3"
                  style={{ backgroundColor: '#F5668D', fontSize: '0.8rem' }}
                >✒️</span>
                <h3 className="text-xl font-semibold" style={{ color: '#34161E' }}>Add your story</h3>
              </div>
              <textarea
                value={story}
                onChange={(e) => setStory(e.target.value)}
                placeholder="Optional: Share any special memories, inside jokes, or details that would make this poem more personal..."
                className="w-full p-4 border rounded-lg resize-none"
                style={{ borderColor: '#F5668D', backgroundColor: '#FFF4F7' }}
                rows="4"
              />
              <p className="text-sm mt-2" style={{ color: '#666' }}>
                Optional
              </p>
            </div>

            {/* Generate Button */}
            <div className="text-center">
              <button
                onClick={generatePoetry}
                disabled={isGenerating || !recipient || !language || !lineCount}
                className="px-8 py-3 rounded-full text-white font-semibold transition disabled:opacity-50"
                style={{ backgroundColor: '#F5668D' }}
              >
                {isGenerating ? 'Creating Poetry...' : 'Create My Poetry'}
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-4 rounded-lg text-center" style={{ backgroundColor: '#fee', color: '#c00' }}>
                {error}
              </div>
            )}
          </div>

          {/* Generated Poem */}
          {generatedPoem && (
            <div className="mt-8 p-6 bg-gray-50 rounded-xl">
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#34161E' }}>Your Generated Poetry</h3>
              <div className="whitespace-pre-line text-lg leading-relaxed" style={{ color: '#34161E' }}>
                {generatedPoem}
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:flex sm:gap-4">
                <button
                  onClick={() => navigator.clipboard.writeText(generatedPoem)}
                  className="px-4 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition text-sm sm:px-6 sm:py-2"
                >
                  📋 Copy Poetry
                </button>
                <button
                  onClick={() => setGeneratedPoem('')}
                  className="px-4 py-3 bg-gray-200 text-gray-700 font-semibold rounded-full hover:bg-gray-300 transition text-sm sm:px-6 sm:py-2"
                >
                  🔄 Generate New
                </button>
                <a
                  href="/templates"
                  className="px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:from-purple-600 hover:to-pink-600 transition text-sm sm:px-6 sm:py-2 text-center"
                >
                  🎨 Create Template
                </a>
                <a
                  href="/shayari"
                  className="px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-full hover:from-blue-600 hover:to-indigo-600 transition text-sm sm:px-6 sm:py-2 text-center"
                >
                  📖 View All Shayari
                </a>
              </div>
            </div>
          )}

          {/* Section 3: Additional Features */}
          <div id="features" className="mt-16 bg-white p-8 rounded-xl shadow-lg" style={{ backgroundColor: '#fffcfc', borderColor: '#F5668D', borderWidth: '1px' }}>
            <div className="text-center mb-8">
              <span className="flex items-center justify-center w-6 h-6 rounded-full text-white mr-3"
                style={{ backgroundColor: '#F5668D', fontSize: '0.8rem' }}
              >3</span>
              <h3 className="text-xl font-semibold" style={{ color: '#34161E' }}>Advanced Features</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div id="poetry-styles" className="text-center p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                <div className="text-4xl font-bold mb-2" style={{ color: '#34161E' }}>🎨</div>
                <h4 className="text-lg font-semibold mb-2" style={{ color: '#34161E' }}>Poetry Styles</h4>
                <p className="text-gray-700">Choose from various poetry styles and themes</p>
              </div>
              <div id="writing-templates" className="text-center p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                <div className="text-4xl font-bold mb-2" style={{ color: '#34161E' }}>📝</div>
                <h4 className="text-lg font-semibold mb-2" style={{ color: '#34161E' }}>Writing Templates</h4>
                <p className="text-gray-700">Professional templates for different occasions</p>
              </div>
            </div>
          </div>

          {/* Section 4: Testimonials */}
          <div id="testimonials" className="mt-16 bg-white p-8 rounded-xl shadow-lg" style={{ backgroundColor: '#fffcfc', borderColor: '#F5668D', borderWidth: '1px' }}>
            <div className="text-center mb-8">
              <span className="flex items-center justify-center w-6 h-6 rounded-full text-white mr-3"
                style={{ backgroundColor: '#F5668D', fontSize: '0.8rem' }}
              >4</span>
              <h3 className="text-xl font-semibold" style={{ color: '#34161E' }}>User Testimonials</h3>
            </div>
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 flex items-center justify-center text-white font-bold text-xl">
                    ★★★★★
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold" style={{ color: '#34161E' }}>Sarah M.</h4>
                    <p className="text-gray-600 italic">"This poetry generator helped me create the most beautiful birthday poem for my mother. The AI understands emotions perfectly!"</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 flex items-center justify-center text-white font-bold text-xl">
                    ★★★★★
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold" style={{ color: '#34161E' }}>Rahul K.</h4>
                    <p className="text-gray-600 italic">"Amazing Hindi poetry generation! The language support is incredible and poems are so heartfelt."</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-teal-400 flex items-center justify-center text-white font-bold text-xl">
                    ★★★★★
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold" style={{ color: '#34161E' }}>Priya S.</h4>
                    <p className="text-gray-600 italic">"I love how I can generate poetry in multiple languages. The paragraph feature is exactly what I needed!"</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  )
}

export default PoetPage
