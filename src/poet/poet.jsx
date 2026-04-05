import React, { useState } from 'react'
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
    if (!recipient || !language || !lineCount) {
      setError('Please fill in all required fields')
      return
    }

    setIsGenerating(true)
    setError('')
    setGeneratedPoem('')

    try {
      const getApiUrl = () => {
        const hostname = window.location.hostname
        if (hostname.includes('vercel.app') || hostname === 'www.digntag.in' || hostname === 'digntag.in') {
          return '/api/generate-poem'
        }
        if (hostname === 'localhost') {
          return 'http://localhost:3001/api/generate-poem'
        }
        return '/api/generate-poem'
      }

      const apiUrl = getApiUrl()
      console.log('API URL:', apiUrl)

      const response = await axios.post(apiUrl, {
        recipient,
        messageType,
        language,
        lineCount,
        story
      })

      setGeneratedPoem(response.data.poem)
    } catch (err) {
      console.error('Error generating poetry:', err)
      setError('Server error. Please try again later.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fdf8f8' }}>
      <SiteHeader />
      
      {/* Hero Section with CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-white to-gray-50 w-full py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary leading-[1.05] tracking-tight mb-6">
              Create Beautiful Poetry in Seconds
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              Transform your emotions into heartfelt poetry with our AI-powered generator. 
              Support multiple languages and create personalized poems for your loved ones.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#generator" 
                className="px-8 py-4 bg-cta text-white font-bold text-base rounded-full shadow-xl hover:bg-cta/90 transition duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-cta/50 text-center"
              >
                Start Creating Poetry
              </a>
              <a 
                href="/services" 
                className="px-8 py-4 bg-white text-primary font-bold text-base rounded-full shadow-xl hover:bg-gray-50 transition duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-white/50 text-center ring-1 ring-gray-100"
              >
                Explore All Features
              </a>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4" style={{ color: '#34161E' }}>
              Personalized Poetry Generator
            </h1>
            <p className="text-lg" style={{ color: '#666' }}>
              Create beautiful, heartfelt poetry for your loved ones
            </p>
          </div>

          {/* Poetry Generation Form */}
          <div id="generator" className="bg-white p-8 rounded-xl shadow-lg" style={{ backgroundColor: '#fffcfc', borderColor: '#F5668D', borderWidth: '1px' }}>
            
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
                    onClick={() => setRecipient(relation)}
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
                    onClick={() => setMessageType(option)}
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
                {['Hindi', 'Hinglish', 'Marathi', 'Gujarati', 'English', 'Urdu'].map((lang, index) => (
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
                    onClick={() => setLanguage(lang)}
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
                    onClick={() => setLineCount(option.value)}
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
            <div className="mt-8 bg-white p-8 rounded-xl shadow-lg" style={{ backgroundColor: '#fffcfc', borderColor: '#F5668D', borderWidth: '1px' }}>
              <h3 className="text-xl font-semibold mb-4 text-center" style={{ color: '#34161E' }}>
                Your Personalized Poetry
              </h3>
              <div className="text-center">
                <pre className="whitespace-pre-wrap font-serif text-lg leading-relaxed" style={{ color: '#34161E' }}>
                  {generatedPoem}
                </pre>
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
    </div>
  )
}

export default PoetPage
