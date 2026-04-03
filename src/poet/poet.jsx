import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import SiteHeader from '../components/SiteHeader.jsx'
import SiteFooter from '../components/SiteFooter.jsx'

const PoetPage = () => {
  const navigate = useNavigate()
  const [selectedOption, setSelectedOption] = useState('sonnet')
  const [inputText, setInputText] = useState('')
  const [generatedPoem, setGeneratedPoem] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  
  // Form states
  const [recipient, setRecipient] = useState('')
  const [messageType, setMessageType] = useState('')
  const [language, setLanguage] = useState('')
  const [lineCount, setLineCount] = useState('')
  const [story, setStory] = useState('')
  const [charCount, setCharCount] = useState(0)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Message type options based on recipient
  const getMessageOptions = () => {
    if (!recipient) return []
    
    const commonOptions = [
      'Love and Romance',
      'Birthday Wishes', 
      'Anniversary Celebrations',
      'Thank You',
      'Sorry/Apology',
      'Congratulations',
      'Good Luck',
      'Get Well Soon',
      'Missing You',
      'Friendship',
      'Inspiration',
      'Gratitude'
    ]

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
        'Sorry/Apology',
        'Get Well Soon',
        'Gratitude',
        'Missing You'
      ]
    } else if (recipient.includes('Best friend') || recipient.includes('Friend')) {
      return [
        'Friendship',
        'Thank You',
        'Birthday Wishes',
        'Missing You',
        'Good Luck',
        'Congratulations',
        'Sorry/Apology'
      ]
    } else if (recipient.includes('Teacher') || recipient.includes('Mentor')) {
      return [
        'Thank You',
        'Gratitude',
        'Inspiration',
        'Guidance',
        'Respect',
        'Appreciation'
      ]
    } else if (recipient.includes('Colleague') || recipient.includes('Boss')) {
      return [
        'Thank You',
        'Good Luck',
        'Congratulations',
        'Farewell',
        'Appreciation',
        'Team Spirit'
      ]
    } else if (recipient.includes('Myself')) {
      return [
        'Self Love',
        'Motivation',
        'Reflection',
        'Goals',
        'Inspiration',
        'Self Care'
      ]
    }
    
    return commonOptions
  }

  const testimonials = [
    {
      text: "This AI poet helped me express feelings I couldn't put into words. Absolutely magical!",
      author: "Sarah Johnson",
      role: "Writer"
    },
    {
      text: "The quality of poetry generated is exceptional. It captures emotions perfectly.",
      author: "Michael Chen",
      role: "Poetry Enthusiast"
    },
    {
      text: "I use this daily for my creative writing. It's like having a muse at my fingertips.",
      author: "Emma Williams",
      role: "Author"
    }
  ]

  const features = [
    {
      title: "AI-Powered Creativity",
      description: "Advanced algorithms understand your emotions and craft beautiful poetry",
      icon: "🤖"
    },
    {
      title: "Multiple Poetry Styles",
      description: "Choose from sonnets, haikus, free verse, and more",
      icon: "📝"
    },
    {
      title: "Instant Generation",
      description: "Get personalized poetry in seconds, not hours",
      icon: "⚡"
    },
    {
      title: "Emotion Recognition",
      description: "Our AI detects subtle emotional nuances in your input",
      icon: "💭"
    }
  ]

  const generatePoem = async () => {
    // Clear previous messages
    setError('')
    setSuccess('')
    
    // Validate required fields
    if (!recipient) {
      setError('Please select who this poem is for')
      return
    }
    
    if (!language) {
      setError('Please select a language for the poem')
      return
    }
    
    if (!lineCount) {
      setError('Please select how many lines you want')
      return
    }

    setIsGenerating(true)
    try {
      const response = await axios.post('http://localhost:3001/api/generate-poem', {
        recipient,
        messageType,
        language,
        lineCount,
        story,
        style: lineCount
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      })

      setGeneratedPoem(response.data.poem)
      setSuccess('Poetry generated successfully!')
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000)
      
    } catch (error) {
      console.error('Error generating poem:', error)
      
      // Handle different types of errors
      if (error.response) {
        // Server responded with error status
        if (error.response.status === 429) {
          setError('OpenAI API quota exceeded. Please check your billing or try again later.')
        } else if (error.response.status === 400) {
          setError('Please fill in all required fields correctly')
        } else if (error.response.data && error.response.data.error) {
          setError(error.response.data.error)
        } else {
          setError('Server error. Please try again later.')
        }
      } else if (error.request) {
        // Network error - server not responding
        setError('Cannot connect to poetry server. Please make sure the backend is running.')
      } else {
        // Other error
        setError('An unexpected error occurred. Please try again.')
      }
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPoem)
      .then(() => alert('Poetry copied to clipboard!'))
      .catch(err => console.error('Failed to copy:', err))
  }

  const handleStoryChange = (e) => {
    const text = e.target.value
    if (text.length <= 500) {
      setStory(text)
      setCharCount(text.length)
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fdf8f8' }}>
      <SiteHeader />
      
      {/* Hero Section - Exact Match from new image */}
      <section className="py-16 px-4" style={{ backgroundColor: '#fdf8f8' }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full mb-8"
            style={{ backgroundColor: '#FFF4F7', color: '#34161E', fontSize: '0.9rem', fontWeight: '600' }}
          >
            <span className="mr-2" role="img" aria-label="sparkles">✨</span> For Every Occasion
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 leading-tight"
            style={{ color: '#34161E' }}
          >
            Say Happy Birthday, Happy Anniversary & More
          </h1>
          <p className="text-xl mb-10 max-w-3xl mx-auto"
            style={{ color: '#34161E' }}
          >
            Make every special moment unforgettable with personalized poetry — 
            birthdays, anniversaries, farewells & beyond.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <button className="flex items-center px-6 py-3 rounded-full border-2 transition hover:opacity-90"
              style={{ borderColor: '#F5668D', color: '#34161E', backgroundColor: 'white' }}
            >
              <span className="mr-2 text-xl" role="img" aria-label="birthday cake">🎂</span> Birthday Poems
            </button>
            <button className="flex items-center px-6 py-3 rounded-full border-2 transition hover:opacity-90"
              style={{ borderColor: '#F5668D', color: '#34161E', backgroundColor: 'white' }}
            >
              <span className="mr-2 text-xl" role="img" aria-label="gift">🎁</span> Anniversary Wishes
            </button>
            <button className="flex items-center px-6 py-3 rounded-full border-2 transition hover:opacity-90"
              style={{ borderColor: '#F5668D', color: '#34161E', backgroundColor: 'white' }}
            >
              <span className="mr-2 text-xl" role="img" aria-label="sparkles">✨</span> Farewell & Thank You
            </button>
          </div>
          <button 
            onClick={() => document.getElementById('generator').scrollIntoView({ behavior: 'smooth' })}
            className="px-10 py-4 rounded-full text-lg font-semibold transition transform hover:scale-105"
            style={{ backgroundColor: '#F5668D', color: 'white' }}
          >
            Create Poetry Now <span className="ml-2">→</span>
          </button>
          <p className="mt-8 text-sm" style={{ color: '#34161E' }}>
            <span className="mr-1" role="img" aria-label="sparkles">✨</span> Perfect for cards, messages & social media
          </p>
        </div>
      </section>

      {/* Poetry That Touches Hearts Section - Exact Match */}
      <section className="py-20 px-4" style={{ backgroundColor: '#fdf8f8' }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full mb-8"
            style={{ backgroundColor: '#FFF4F7', color: '#34161E', fontSize: '0.9rem', fontWeight: '600' }}
          >
            <span className="mr-2" role="img" aria-label="quill pen"> Feather</span> Feel the Words
          </div>
          <h2 className="text-5xl md:text-6xl font-serif font-bold mb-6 leading-tight"
            style={{ color: '#34161E' }}
          >
            Poetry That Touches Hearts
          </h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto"
            style={{ color: '#34161E' }}
          >
            Every poem is unique — crafted from your feelings, your story, your words.
          </p>

          {/* Poem Card */}
          <div className="relative bg-white p-8 rounded-xl shadow-lg mx-auto max-w-lg"
            style={{ backgroundColor: '#fffcfc', borderColor: '#F5668D', borderWidth: '1px' }}
          >
            <span className="absolute top-6 left-6 text-5xl font-serif" style={{ color: '#F5668D' }}>"</span>
            <p className="text-2xl font-serif leading-relaxed mb-6"
              style={{ color: '#34161E' }}
            >
              तेरे बिना ये घर,<br/>
              मकान भर रह गया।<br/>
              हर कमरा पूछता है –<br/>
              वो हँसी कहाँ गई
            </p>
            <span className="absolute bottom-6 right-6 text-5xl font-serif" style={{ color: '#F5668D' }}>"</span>
            <p className="text-sm tracking-widest uppercase mt-4" style={{ color: '#34161E' }}>
              Missing · Hindi
            </p>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center mt-12 space-x-3">
            <span className="block w-3 h-3 rounded-full" style={{ backgroundColor: '#F5668D' }}></span>
            <span className="block w-3 h-3 rounded-full" style={{ backgroundColor: '#F5668D' }}></span>
            <span className="block w-3 h-3 rounded-full" style={{ backgroundColor: '#34161E' }}></span>
            <span className="block w-3 h-3 rounded-full" style={{ backgroundColor: '#F5668D' }}></span>
            <span className="block w-3 h-3 rounded-full" style={{ backgroundColor: '#F5668D' }}></span>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Exact Match */}
      <section className="py-20 px-4" style={{ backgroundColor: '#fdf8f8' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full mb-8"
              style={{ backgroundColor: '#FFF4F7', color: '#34161E', fontSize: '0.9rem', fontWeight: '600' }}
            >
              <span className="mr-2" role="img" aria-label="sparkles">✨</span> Voices of Love
            </div>
            <h2 className="text-5xl md:text-6xl font-serif font-bold mb-6 leading-tight"
              style={{ color: '#34161E' }}
            >
              What People Are Saying
            </h2>
            <p className="text-xl mb-12 max-w-3xl mx-auto"
              style={{ color: '#34161E' }}
            >
              Real stories from real people who found the perfect words.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="p-6 rounded-xl shadow-lg hover:shadow-xl transition cursor-pointer"
                style={{ backgroundColor: '#fffcfc', borderColor: '#F5668D', borderWidth: '1px' }}
                onClick={() => setActiveTestimonial(index)}
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} style={{ color: '#F5668D' }} className="text-xl">★</span>
                  ))}
                </div>
                <p className="mb-4 italic leading-relaxed" style={{ color: '#34161E' }}>
                  "{testimonial.text}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full mr-3" style={{ backgroundColor: '#F5668D' }}></div>
                  <div>
                    <p className="font-semibold" style={{ color: '#34161E' }}>{testimonial.author}</p>
                    <p className="text-sm" style={{ color: '#666' }}>{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Carousel Indicators */}
          <div className="flex justify-center mt-12 space-x-3">
            <span className="block w-3 h-3 rounded-full" style={{ backgroundColor: '#F5668D' }}></span>
            <span className="block w-3 h-3 rounded-full" style={{ backgroundColor: '#F5668D' }}></span>
            <span className="block w-3 h-3 rounded-full" style={{ backgroundColor: '#34161E' }}></span>
            <span className="block w-3 h-3 rounded-full" style={{ backgroundColor: '#F5668D' }}></span>
            <span className="block w-3 h-3 rounded-full" style={{ backgroundColor: '#F5668D' }}></span>
          </div>
        </div>
      </section>

      {/* Poetry Generator Form Section - Exact Match */}
      <section id="generator" className="py-16 px-4" style={{ backgroundColor: '#fdf8f8' }}>
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg"
          style={{ backgroundColor: '#fffcfc', borderColor: '#F5668D', borderWidth: '1px' }}
        >
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
                  className={`flex items-center px-4 py-2 rounded-full border transition hover:opacity-80 ${
                    recipient === relation ? '' : ''
                  }`}
                  style={{ 
                    borderColor: '#F5668D', 
                    color: '#34161E', 
                    backgroundColor: recipient === relation ? '#F5668D' : 'white'
                  }}
                  onClick={() => setRecipient(relation)}
                >
                  {relation}
                </button>
              ))}
            </div>
            <p className="text-sm" style={{ color: '#34161E' }}>
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
            <p className="text-sm mb-4" style={{ color: '#34161E' }}>
              No need to overthink it—just pick what feels closest.
            </p>
            {recipient ? (
              <div className="flex flex-wrap gap-3">
                {getMessageOptions().map((option, index) => (
                  <button 
                    key={index}
                    className={`px-4 py-2 rounded-full border-2 transition hover:opacity-80 ${
                      messageType === option ? '' : ''
                    }`}
                    style={{ 
                      borderColor: '#F5668D', 
                      color: '#34161E', 
                      backgroundColor: messageType === option ? '#F5668D' : 'white'
                    }}
                    onClick={() => setMessageType(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-lg border-2 border-dashed"
                style={{ borderColor: '#F5668D', backgroundColor: '#FFF4F7' }}
              >
                <p className="text-center" style={{ color: '#666' }}>
                  Select a recipient first to see message options.
                </p>
              </div>
            )}
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
                  className={`px-6 py-3 rounded-full border-2 transition hover:opacity-80 ${
                    language === lang ? '' : ''
                  }`}
                  style={{ 
                    borderColor: '#F5668D', 
                    color: '#34161E', 
                    backgroundColor: language === lang ? '#F5668D' : 'white'
                  }}
                  onClick={() => setLanguage(lang)}
                >
                  {lang}
                </button>
              ))}
            </div>
            <p className="text-sm" style={{ color: '#34161E' }}>
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
            <div className="space-y-3">
              <button 
                className={`w-full p-4 rounded-lg border-2 text-left transition hover:opacity-80 ${
                  lineCount === '2 lines' ? '' : ''
                }`}
                style={{ 
                  borderColor: '#F5668D', 
                  color: '#34161E', 
                  backgroundColor: lineCount === '2 lines' ? '#F5668D' : 'white'
                }}
                onClick={() => setLineCount('2 lines')}
              >
                <div className="font-semibold">2 lines</div>
                <div className="text-sm">Short and sweet</div>
              </button>
              <button 
                className={`w-full p-4 rounded-lg border-2 text-left transition hover:opacity-80 ${
                  lineCount === '4 lines' ? '' : ''
                }`}
                style={{ 
                  borderColor: '#F5668D', 
                  color: '#34161E', 
                  backgroundColor: lineCount === '4 lines' ? '#F5668D' : 'white'
                }}
                onClick={() => setLineCount('4 lines')}
              >
                <div className="font-semibold">4 lines</div>
                <div className="text-sm">A perfect little verse</div>
              </button>
              <button 
                className={`w-full p-4 rounded-lg border-2 text-left transition hover:opacity-80 ${
                  lineCount === '8-10 lines' ? '' : ''
                }`}
                style={{ 
                  borderColor: '#F5668D', 
                  color: '#34161E', 
                  backgroundColor: lineCount === '8-10 lines' ? '#F5668D' : 'white'
                }}
                onClick={() => setLineCount('8-10 lines')}
              >
                <div className="font-semibold">8-10 lines</div>
                <div className="text-sm">More detailed and heartfelt</div>
              </button>
            </div>
          </div>

          {/* Add your story (Optional) */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <span className="mr-2 text-xl" role="img" aria-label="quill">✒️</span>
              <h3 className="text-xl font-semibold" style={{ color: '#34161E' }}>Add your story</h3>
              <span className="ml-2 px-2 py-1 rounded text-xs" style={{ backgroundColor: '#FFF4F7', color: '#666' }}>Optional</span>
            </div>
            <div className="relative">
              <textarea
                className="w-full p-4 rounded-lg border resize-none focus:outline-none"
                style={{ borderColor: '#F5668D', backgroundColor: '#FFF4F7' }}
                rows="4"
                placeholder="Share a memory, moment, or feeling — type it or speak it in your language."
                value={story}
                onChange={handleStoryChange}
              />
              <div className="absolute bottom-2 right-2 flex items-center gap-2">
                <span className="text-sm" style={{ color: '#666' }}>{charCount}/500</span>
                <button className="p-2 rounded-full transition hover:opacity-80"
                  style={{ backgroundColor: '#F5668D', color: 'white' }}
                >
                  🎤
                </button>
              </div>
            </div>
            <p className="text-sm mt-2" style={{ color: '#34161E' }}>
              E.g. We met during the monsoons, and every rain reminds me of our first conversation under that old banyan tree...
            </p>
          </div>

          {/* Create my lines button */}
          <button 
            onClick={generatePoem}
            disabled={isGenerating}
            className="w-full py-4 rounded-full text-lg font-semibold transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            style={{ backgroundColor: '#F5668D', color: 'white' }}
          >
            <span className="mr-2 text-xl" role="img" aria-label="quill">✒️</span>
            {isGenerating ? 'Creating...' : 'Create my lines'}
          </button>

          {/* Error and Success Messages */}
          {error && (
            <div className="mt-4 p-3 rounded-lg border"
              style={{ backgroundColor: '#FEE2E2', borderColor: '#F87171', color: '#DC2626' }}
            >
              <div className="flex items-center">
                <span className="mr-2" role="img" aria-label="error">⚠️</span>
                <p className="text-sm font-medium">{error}</p>
              </div>
            </div>
          )}
          
          {success && (
            <div className="mt-4 p-3 rounded-lg border"
              style={{ backgroundColor: '#D1FAE5', borderColor: '#34D399', color: '#059669' }}
            >
              <div className="flex items-center">
                <span className="mr-2" role="img" aria-label="success">✅</span>
                <p className="text-sm font-medium">{success}</p>
              </div>
            </div>
          )}

          <p className="text-center mt-4 text-sm" style={{ color: '#34161E' }}>
            Please complete all required fields above
          </p>

          {/* Output area */}
          <div className="mt-8 p-6 rounded-lg border-2 border-dashed"
            style={{ borderColor: '#F5668D', backgroundColor: '#FFF4F7' }}
          >
            {generatedPoem ? (
              <div>
                <h3 className="text-xl font-semibold mb-4" style={{ color: '#34161E' }}>
                  Your Generated Poetry
                </h3>
                <div className="whitespace-pre-line text-lg leading-relaxed font-serif" 
                  style={{ color: '#34161E' }}
                >
                  {generatedPoem}
                </div>
                <div className="mt-4 flex gap-3">
                  <button 
                    onClick={copyToClipboard}
                    className="px-4 py-2 rounded-lg border-2 hover:bg-opacity-10 transition"
                    style={{ 
                      backgroundColor: 'white',
                      borderColor: '#F5668D',
                      color: '#34161E'
                    }}
                  >
                    Copy to Clipboard
                  </button>
                  <button className="px-4 py-2 rounded-lg border-2 hover:bg-opacity-10 transition"
                    style={{ 
                      backgroundColor: 'white',
                      borderColor: '#F5668D',
                      color: '#34161E'
                    }}
                  >
                    Download as PDF
                  </button>
                  <button className="px-4 py-2 rounded-lg border-2 hover:bg-opacity-10 transition"
                    style={{ 
                      backgroundColor: 'white',
                      borderColor: '#F5668D',
                      color: '#34161E'
                    }}
                  >
                    Share
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-center" style={{ color: '#666' }}>
                Your personalised lines will appear here.
              </p>
            )}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}

export default PoetPage
