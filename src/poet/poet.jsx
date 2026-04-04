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
  const [selectedFormat, setSelectedFormat] = useState('standard')
  const [selectedTemplate, setSelectedTemplate] = useState('elegant')
  // Enhanced image generation features
  const [selectedImageTemplate, setSelectedImageTemplate] = useState('classic')
  const [generatedImage, setGeneratedImage] = useState('')
  const [isGeneratingImage, setIsGeneratingImage] = useState(false)
  const [customImageSize, setCustomImageSize] = useState({ width: 1080, height: 1080 })
  const [selectedFont, setSelectedFont] = useState('georgia')
  const [fontSize, setFontSize] = useState(24)
  const [textColor, setTextColor] = useState('#34161E')
  const [backgroundColor, setBackgroundColor] = useState('#FFF4F7')
  const [textAlignment, setTextAlignment] = useState('center')
  const [imageQuality, setImageQuality] = useState('high')
  const [addWatermark, setAddWatermark] = useState(false)
  const [selectedFrame, setSelectedFrame] = useState('none')
  const [imageFilter, setImageFilter] = useState('none')
  const [textShadow, setTextShadow] = useState(false)
  // Enhanced image display features
  const [imageTextSize, setImageTextSize] = useState(100)
  const [imageTextColor, setImageTextColor] = useState('#000000')
  const [imageBackgroundColor, setImageBackgroundColor] = useState('#ffffff')
  const [backgroundPattern, setBackgroundPattern] = useState('none')
  const [customBackgroundImage, setCustomBackgroundImage] = useState(null)
  const [backgroundOpacity, setBackgroundOpacity] = useState(1.0)
  
  // Enhanced social media features
  const [selectedPlatform, setSelectedPlatform] = useState('instagram')
  const [selectedTone, setSelectedTone] = useState('professional')
  const [selectedAudience, setSelectedAudience] = useState('general')
  const [selectedPurpose, setSelectedPurpose] = useState('inspiration')
  const [includeEmojis, setIncludeEmojis] = useState(true)
  const [includeHashtags, setIncludeHashtags] = useState(true)
  const [includeCTA, setIncludeCTA] = useState(true)
  const [hashtagCount, setHashtagCount] = useState(10)
  const [customHashtags, setCustomHashtags] = useState('')
  const [selectedLength, setSelectedLength] = useState('medium')
  const [selectedSocialLanguage, setSelectedSocialLanguage] = useState('english')
  const [includeTimestamp, setIncludeTimestamp] = useState(false)
  const [includeLocation, setIncludeLocation] = useState(false)
  const [selectedMood, setSelectedMood] = useState('happy')
  const [includeQuestions, setIncludeQuestions] = useState(false)
  const [includeQuotes, setIncludeQuotes] = useState(false)
  
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
      // Use different API URLs for development vs production
      const apiUrl = window.location.hostname === 'localhost' 
        ? 'http://localhost:3001/api/generate-poem'
        : '/api/generate-poem'
        
      const response = await axios.post(apiUrl, {
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
        if (window.location.hostname === 'localhost') {
          setError('Cannot connect to poetry server. Please run "npm run server" in another terminal.')
        } else {
          setError('Cannot connect to poetry server. Please try again later.')
        }
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

  // Helper function for hue rotation
  const getHueRotation = (color) => {
    // Simple color to hue conversion (basic implementation)
    const colors = {
      '#ff0000': 0,    // Red
      '#00ff00': 120,  // Green
      '#0000ff': 240,  // Blue
      '#ffff00': 60,   // Yellow
      '#ff00ff': 300,  // Magenta
      '#00ffff': 180,  // Cyan
      '#ffffff': 0,    // White
      '#000000': 0     // Black
    }
    return colors[color.toLowerCase()] || 0
  }

  // Handle custom background image upload
  const handleBackgroundUpload = (e) => {
    const file = e.target.files[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const img = new Image()
        img.onload = () => {
          setCustomBackgroundImage(img)
        }
        img.src = event.target.result
      }
      reader.readAsDataURL(file)
    }
  }

  // Enhanced transformation functions with 20+ features
  const getEnhancedTransformedContent = () => {
    if (!generatedPoem) return ''
    
    let content = generatedPoem
    
    // 1. Add platform-specific formatting
    const platformFormats = {
      instagram: { maxChars: 2200, lineBreak: '\n\n' },
      twitter: { maxChars: 280, lineBreak: '\n\n' },
      facebook: { maxChars: 63206, lineBreak: '\n\n' },
      linkedin: { maxChars: 3000, lineBreak: '\n\n' },
      tiktok: { maxChars: 150, lineBreak: '\n' },
      pinterest: { maxChars: 500, lineBreak: '\n\n' }
    }
    
    const platform = platformFormats[selectedPlatform] || platformFormats.instagram
    
    // 2. Add tone-based modifications
    const toneModifiers = {
      professional: { prefix: '💼 Professional Insight:', suffix: '#Professional #Business' },
      casual: { prefix: '😊 Just sharing:', suffix: '#Casual #Everyday' },
      funny: { prefix: '😄 Laugh with me:', suffix: '#Funny #Humor' },
      romantic: { prefix: '💕 From the heart:', suffix: '#Romantic #Love' },
      inspirational: { prefix: '✨ Daily inspiration:', suffix: '#Inspiration #Motivation' },
      educational: { prefix: '📚 Learn something:', suffix: '#Education #Learning' }
    }
    
    const tone = toneModifiers[selectedTone] || toneModifiers.professional
    
    // 3. Add audience-specific content
    const audienceContent = {
      general: 'Perfect for everyone! 🌍',
      teens: 'Hey young minds! 🎓',
      adults: 'For mature readers 📖',
      business: 'Professional content 💼',
      creative: 'For artistic souls 🎨',
      family: 'Family-friendly content 👨‍👩‍👧‍👦'
    }
    
    // 4. Add purpose-driven elements
    const purposeElements = {
      inspiration: ['🌟', '💪', '🚀'],
      education: ['📚', '🎓', '💡'],
      entertainment: ['🎭', '🎪', '🎬'],
      marketing: ['📈', '🎯', '💰'],
      personal: ['❤️', '🏠', '🌸'],
      social: ['👥', '🤝', '🌐']
    }
    
    // 5. Add mood-based styling
    const moodEmojis = {
      happy: ['😊', '😄', '🎉'],
      sad: ['😢', '💔', '🌧️'],
      excited: ['🎉', '🎊', '✨'],
      calm: ['😌', '🧘', '🌊'],
      energetic: ['⚡', '🔥', '💥'],
      thoughtful: ['🤔', '💭', '🌙']
    }
    
    // 6. Generate relevant hashtags
    const generateHashtags = () => {
      const baseHashtags = ['#poetry', '#writing', '#creativity', '#art', '#literature']
      const platformHashtags = {
        instagram: ['#instapoetry', '#poetsofinstagram', '#wordsmith', '#creativewriting'],
        twitter: ['#poetrycommunity', '#amwriting', '#poetrylovers', '#writerslife'],
        facebook: ['#poetrygroup', '#poetrysociety', '#poetrylovers', '#literaryarts'],
        linkedin: ['#contentcreation', '#creativewriting', '#personalbranding', '#thoughtleadership'],
        tiktok: ['#poetrytok', '#writingtok', '#booktok', '#creatortok'],
        pinterest: ['#poetryquotes', '#writingtips', '#literaryquotes', '#bookquotes']
      }
      
      const toneHashtags = {
        professional: ['#business', '#leadership', '#success'],
        casual: ['#lifestyle', '#everyday', '#relatable'],
        funny: ['#humor', '#comedy', '#laughs'],
        romantic: ['#love', '#relationships', '#romance'],
        inspirational: ['#motivation', '#success', '#growth'],
        educational: ['#learning', '#knowledge', '#wisdom']
      }
      
      let allHashtags = [
        ...baseHashtags,
        ...(platformHashtags[selectedPlatform] || []),
        ...(toneHashtags[selectedTone] || []),
        ...(purposeElements[selectedPurpose] || [])
      ]
      
      if (customHashtags) {
        allHashtags.push(...customHashtags.split(',').map(tag => tag.trim().startsWith('#') ? tag.trim() : `#${tag.trim()}`))
      }
      
      return allHashtags.slice(0, hashtagCount).join(' ')
    }
    
    // 7. Add call-to-action
    const getCTA = () => {
      const ctas = {
        inspiration: '✨ Share this inspiration with someone who needs it!',
        education: '📚 What did you learn? Comment below!',
        entertainment: '🎭 Did this make you smile? Like and share!',
        marketing: '📈 Want more content? Follow for daily updates!',
        personal: '❤️ This came from my heart - hope it touches yours!',
        social: '👥 Tag someone who would appreciate this!'
      }
      return includeCTA ? ctas[selectedPurpose] || ctas.inspiration : ''
    }
    
    // 8. Add questions for engagement
    const getQuestion = () => {
      const questions = [
        'What does this poetry mean to you? 🤔',
        'Share your favorite line in the comments! 💬',
        'Have you experienced something similar? 🌟',
        'What emotions does this evoke? ❤️',
        'Tag someone who needs to hear this! 👥'
      ]
      return includeQuestions ? questions[Math.floor(Math.random() * questions.length)] : ''
    }
    
    // 9. Add quotes for authority
    const getQuote = () => {
      const quotes = [
        '"Poetry is when an emotion has found its thought and the thought has found words." - Robert Frost',
        '"Poetry is the rhythmical creation of beauty in words." - Edgar Allan Poe',
        '"Poetry is the language of the soul." - Laura Jane'
      ]
      return includeQuotes ? quotes[Math.floor(Math.random() * quotes.length)] : ''
    }
    
    // 10. Add timestamp
    const getTimestamp = () => {
      if (!includeTimestamp) return ''
      const now = new Date()
      return `📅 ${now.toLocaleDateString()} • ${now.toLocaleTimeString()}`
    }
    
    // 11. Add location placeholder
    const getLocation = () => {
      if (!includeLocation) return ''
      return '📍 Your Location Here'
    }
    
    // 12. Add length-based truncation
    const adjustForLength = (text) => {
      const lengthLimits = {
        short: 100,
        medium: 300,
        long: 1000
      }
      const limit = lengthLimits[selectedLength] || 300
      return text.length > limit ? text.substring(0, limit - 3) + '...' : text
    }
    
    // 13. Add language-specific formatting
    const getLanguageGreeting = () => {
      const greetings = {
        english: '✨',
        spanish: '¡Hola!',
        french: 'Bonjour!',
        german: 'Hallo!',
        italian: 'Ciao!',
        portuguese: 'Olá!'
      }
      return greetings[selectedSocialLanguage] || '✨'
    }
    
    // Build the final content
    let finalContent = []
    
    // Add greeting
    finalContent.push(getLanguageGreeting())
    
    // Add tone prefix
    finalContent.push(tone.prefix)
    
    // Add main content (adjusted for length)
    finalContent.push(adjustForLength(content))
    
    // Add mood emojis
    if (includeEmojis && moodEmojis[selectedMood]) {
      finalContent.push(moodEmojis[selectedMood].join(' '))
    }
    
    // Add audience content
    finalContent.push(audienceContent[selectedAudience] || '')
    
    // Add quote
    if (includeQuotes) {
      finalContent.push(getQuote())
    }
    
    // Add question
    if (includeQuestions) {
      finalContent.push(getQuestion())
    }
    
    // Add CTA
    if (includeCTA) {
      finalContent.push(getCTA())
    }
    
    // Add timestamp
    if (includeTimestamp) {
      finalContent.push(getTimestamp())
    }
    
    // Add location
    if (includeLocation) {
      finalContent.push(getLocation())
    }
    
    // Add hashtags
    if (includeHashtags) {
      finalContent.push(generateHashtags())
    }
    
    // Add tone suffix
    finalContent.push(tone.suffix)
    
    // Join and clean up
    let result = finalContent.filter(item => item && item.trim()).join(platform.lineBreak)
    
    // Ensure it fits platform limits
    if (result.length > platform.maxChars) {
      result = result.substring(0, platform.maxChars - 3) + '...'
    }
    
    return result
  }

  // Enhanced image generation function
  const generateImage = async () => {
    if (!generatedPoem) {
      setError('Please generate poetry first before creating an image')
      return
    }

    setIsGeneratingImage(true)
    try {
      // Create canvas for image generation
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      
      // Set canvas size - always use custom size for enhanced image creator
      canvas.width = customImageSize.width
      canvas.height = customImageSize.height
      
      // Enhanced background with patterns, filters, and custom images
      if (customBackgroundImage) {
        // Draw custom background image
        ctx.globalAlpha = backgroundOpacity
        ctx.drawImage(customBackgroundImage, 0, 0, canvas.width, canvas.height)
        ctx.globalAlpha = 1.0
      } else if (backgroundPattern === 'dots') {
        ctx.fillStyle = backgroundColor
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = textColor + '20'
        for (let x = 0; x < canvas.width; x += 20) {
          for (let y = 0; y < canvas.height; y += 20) {
            ctx.beginPath()
            ctx.arc(x, y, 2, 0, 2 * Math.PI)
            ctx.fill()
          }
        }
      } else if (backgroundPattern === 'lines') {
        ctx.fillStyle = backgroundColor
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.strokeStyle = textColor + '20'
        ctx.lineWidth = 1
        for (let i = 0; i < canvas.width; i += 15) {
          ctx.beginPath()
          ctx.moveTo(i, 0)
          ctx.lineTo(i, canvas.height)
          ctx.stroke()
        }
      } else if (backgroundPattern === 'gradient') {
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
        gradient.addColorStop(0, backgroundColor)
        gradient.addColorStop(1, textColor + '40')
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      } else {
        ctx.fillStyle = backgroundColor
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }
      
      // Apply image filters
      if (imageFilter === 'vintage') {
        ctx.filter = 'sepia(0.3) contrast(1.2) brightness(0.9)'
      } else if (imageFilter === 'dramatic') {
        ctx.filter = 'contrast(1.5) saturate(1.2)'
      } else if (imageFilter === 'soft') {
        ctx.filter = 'blur(0.5px) brightness(1.1)'
      } else if (imageFilter === 'blackwhite') {
        ctx.filter = 'grayscale(1) contrast(1.2)'
      }
      
      // Add decorative frame
      if (selectedFrame !== 'none') {
        ctx.strokeStyle = textColor
        ctx.lineWidth = selectedFrame === 'thick' ? 20 : selectedFrame === 'medium' ? 10 : 5
        if (selectedFrame === 'rounded') {
          ctx.lineCap = 'round'
          ctx.lineJoin = 'round'
        }
        ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40)
      }
      
      // Enhanced text styling
      ctx.fillStyle = textColor
      
      // Apply text shadow if enabled
      if (textShadow) {
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'
        ctx.shadowBlur = 4
        ctx.shadowOffsetX = 2
        ctx.shadowOffsetY = 2
      }
      
      // Font selection
      const fonts = {
        georgia: 'Georgia, serif',
        arial: 'Arial, sans-serif',
        helvetica: 'Helvetica, sans-serif',
        times: 'Times New Roman, serif',
        courier: 'Courier New, monospace',
        comic: 'Comic Sans MS, cursive',
        impact: 'Impact, sans-serif',
        verdana: 'Verdana, sans-serif'
      }
      
      ctx.font = `${fontSize}px ${fonts[selectedFont] || fonts.georgia}`
      
      // Text alignment
      ctx.textAlign = textAlignment
      ctx.textBaseline = 'middle'
      
      // Calculate text position based on alignment
      let textX = canvas.width / 2
      if (textAlignment === 'left') textX = 60
      if (textAlignment === 'right') textX = canvas.width - 60
      
      // Word wrap poetry text
      const words = generatedPoem.split(' ')
      const lines = []
      let currentLine = ''
      const maxWidth = canvas.width - 120
      
      for (const word of words) {
        const testLine = currentLine + word + ' '
        const metrics = ctx.measureText(testLine)
        if (metrics.width > maxWidth && currentLine !== '') {
          lines.push(currentLine.trim())
          currentLine = word + ' '
        } else {
          currentLine = testLine
        }
      }
      lines.push(currentLine.trim())
      
      // Draw each line
      const lineHeight = fontSize + 10
      const totalTextHeight = lines.length * lineHeight
      const startY = (canvas.height - totalTextHeight) / 2
      
      lines.forEach((line, index) => {
        ctx.fillText(line, textX, startY + (index * lineHeight))
      })
      
      // Add watermark if enabled
      if (addWatermark) {
        ctx.save()
        ctx.globalAlpha = 0.3
        ctx.font = '14px Arial'
        ctx.fillStyle = textColor
        ctx.textAlign = 'right'
        ctx.fillText('AI Poet Generator', canvas.width - 20, canvas.height - 20)
        ctx.restore()
      }
      
      // Template-specific decorations
      if (selectedImageTemplate === 'classic') {
        // Add decorative corners
        ctx.strokeStyle = textColor
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(70, 70)
        ctx.lineTo(90, 50)
        ctx.moveTo(canvas.width - 70, 70)
        ctx.lineTo(canvas.width - 90, 50)
        ctx.moveTo(70, canvas.height - 70)
        ctx.lineTo(90, canvas.height - 50)
        ctx.moveTo(canvas.width - 70, canvas.height - 70)
        ctx.lineTo(canvas.width - 90, canvas.height - 50)
        ctx.stroke()
      } else if (selectedImageTemplate === 'modern') {
        // Add modern geometric shapes
        ctx.strokeStyle = textColor + '30'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(50, 50)
        ctx.lineTo(150, 50)
        ctx.lineTo(100, 100)
        ctx.closePath()
        ctx.stroke()
        
        ctx.beginPath()
        ctx.moveTo(canvas.width - 50, canvas.height - 50)
        ctx.lineTo(canvas.width - 150, canvas.height - 50)
        ctx.lineTo(canvas.width - 100, canvas.height - 100)
        ctx.closePath()
        ctx.stroke()
      } else if (selectedImageTemplate === 'minimal') {
        // Add minimal line accents
        ctx.strokeStyle = textColor + '20'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(50, canvas.height / 2)
        ctx.lineTo(100, canvas.height / 2)
        ctx.moveTo(canvas.width - 100, canvas.height / 2)
        ctx.lineTo(canvas.width - 50, canvas.height / 2)
        ctx.stroke()
      } else if (selectedImageTemplate === 'bold') {
        // Add bold diagonal lines
        ctx.strokeStyle = textColor + '40'
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(100, 100)
        ctx.moveTo(canvas.width, 0)
        ctx.lineTo(canvas.width - 100, 100)
        ctx.moveTo(0, canvas.height)
        ctx.lineTo(100, canvas.height - 100)
        ctx.moveTo(canvas.width, canvas.height)
        ctx.lineTo(canvas.width - 100, canvas.height - 100)
        ctx.stroke()
      }
      
      // Reset filter for quality
      ctx.filter = 'none'
      
      // Convert to image with quality settings
      const quality = imageQuality === 'high' ? 1.0 : imageQuality === 'medium' ? 0.8 : 0.6
      const imageUrl = canvas.toDataURL('image/png', quality)
      setGeneratedImage(imageUrl)
      
    } catch (error) {
      console.error('Error generating image:', error)
      setError('Failed to generate image. Please try again.')
    } finally {
      setIsGeneratingImage(false)
    }
  }

  const downloadImage = () => {
    if (!generatedImage) return
    
    const link = document.createElement('a')
    link.download = `poetry-${selectedImageTemplate}-${Date.now()}.png`
    link.href = generatedImage
    link.click()
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
                {/* Format Selection */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4" style={{ color: '#34161E' }}>
                    🚀 Transform for Social Media (20+ Features)
                  </h3>
                  
                  {/* Quick Actions Bar */}
                  <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: '#FFF4F7', border: '1px solid #F5668D' }}>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => {
                          setIncludeEmojis(!includeEmojis)
                          setIncludeHashtags(!includeHashtags)
                          setIncludeCTA(!includeCTA)
                        }}
                        className="px-3 py-1 rounded text-sm"
                        style={{ backgroundColor: '#F5668D', color: 'white' }}
                      >
                        🎯 Quick Toggle All
                      </button>
                      <button
                        onClick={() => {
                          setSelectedPlatform('instagram')
                          setSelectedTone('inspirational')
                          setSelectedMood('happy')
                          setIncludeEmojis(true)
                          setIncludeHashtags(true)
                        }}
                        className="px-3 py-1 rounded text-sm"
                        style={{ backgroundColor: '#F5668D', color: 'white' }}
                      >
                        📱 Instagram Ready
                      </button>
                      <button
                        onClick={() => {
                          setSelectedPlatform('twitter')
                          setSelectedTone('casual')
                          setSelectedLength('short')
                          setIncludeEmojis(true)
                        }}
                        className="px-3 py-1 rounded text-sm"
                        style={{ backgroundColor: '#F5668D', color: 'white' }}
                      >
                        🐦 Twitter Ready
                      </button>
                      <button
                        onClick={() => {
                          setSelectedPlatform('linkedin')
                          setSelectedTone('professional')
                          setSelectedAudience('business')
                          setIncludeEmojis(false)
                        }}
                        className="px-3 py-1 rounded text-sm"
                        style={{ backgroundColor: '#F5668D', color: 'white' }}
                      >
                        💼 LinkedIn Ready
                      </button>
                    </div>
                  </div>

                  {/* Main Controls Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    
                    {/* Platform Selection */}
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#34161E' }}>
                        📱 Platform
                      </label>
                      <select 
                        value={selectedPlatform}
                        onChange={(e) => setSelectedPlatform(e.target.value)}
                        className="w-full p-2 rounded-lg border"
                        style={{ borderColor: '#F5668D', backgroundColor: 'white', color: '#34161E' }}
                      >
                        <option value="instagram">📷 Instagram (2200 chars)</option>
                        <option value="twitter">🐦 Twitter (280 chars)</option>
                        <option value="facebook">📘 Facebook (63K chars)</option>
                        <option value="linkedin">💼 LinkedIn (3000 chars)</option>
                        <option value="tiktok">🎵 TikTok (150 chars)</option>
                        <option value="pinterest">📌 Pinterest (500 chars)</option>
                      </select>
                    </div>

                    {/* Tone Selection */}
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#34161E' }}>
                        🎭 Tone
                      </label>
                      <select 
                        value={selectedTone}
                        onChange={(e) => setSelectedTone(e.target.value)}
                        className="w-full p-2 rounded-lg border"
                        style={{ borderColor: '#F5668D', backgroundColor: 'white', color: '#34161E' }}
                      >
                        <option value="professional">💼 Professional</option>
                        <option value="casual">😊 Casual</option>
                        <option value="funny">😄 Funny</option>
                        <option value="romantic">💕 Romantic</option>
                        <option value="inspirational">✨ Inspirational</option>
                        <option value="educational">📚 Educational</option>
                      </select>
                    </div>

                    {/* Audience Selection */}
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#34161E' }}>
                        👥 Audience
                      </label>
                      <select 
                        value={selectedAudience}
                        onChange={(e) => setSelectedAudience(e.target.value)}
                        className="w-full p-2 rounded-lg border"
                        style={{ borderColor: '#F5668D', backgroundColor: 'white', color: '#34161E' }}
                      >
                        <option value="general">🌍 General</option>
                        <option value="teens">🎓 Teens</option>
                        <option value="adults">📖 Adults</option>
                        <option value="business">💼 Business</option>
                        <option value="creative">🎨 Creative</option>
                        <option value="family">👨‍👩‍👧‍👦 Family</option>
                      </select>
                    </div>

                    {/* Purpose Selection */}
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#34161E' }}>
                        🎯 Purpose
                      </label>
                      <select 
                        value={selectedPurpose}
                        onChange={(e) => setSelectedPurpose(e.target.value)}
                        className="w-full p-2 rounded-lg border"
                        style={{ borderColor: '#F5668D', backgroundColor: 'white', color: '#34161E' }}
                      >
                        <option value="inspiration">🌟 Inspiration</option>
                        <option value="education">📚 Education</option>
                        <option value="entertainment">🎭 Entertainment</option>
                        <option value="marketing">📈 Marketing</option>
                        <option value="personal">❤️ Personal</option>
                        <option value="social">🤝 Social</option>
                      </select>
                    </div>

                    {/* Mood Selection */}
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#34161E' }}>
                        😊 Mood
                      </label>
                      <select 
                        value={selectedMood}
                        onChange={(e) => setSelectedMood(e.target.value)}
                        className="w-full p-2 rounded-lg border"
                        style={{ borderColor: '#F5668D', backgroundColor: 'white', color: '#34161E' }}
                      >
                        <option value="happy">😄 Happy</option>
                        <option value="sad">😢 Sad</option>
                        <option value="excited">🎉 Excited</option>
                        <option value="calm">😌 Calm</option>
                        <option value="energetic">⚡ Energetic</option>
                        <option value="thoughtful">🤔 Thoughtful</option>
                      </select>
                    </div>

                    {/* Length Selection */}
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#34161E' }}>
                        📏 Length
                      </label>
                      <select 
                        value={selectedLength}
                        onChange={(e) => setSelectedLength(e.target.value)}
                        className="w-full p-2 rounded-lg border"
                        style={{ borderColor: '#F5668D', backgroundColor: 'white', color: '#34161E' }}
                      >
                        <option value="short">📝 Short (100 chars)</option>
                        <option value="medium">📄 Medium (300 chars)</option>
                        <option value="long">📖 Long (1000 chars)</option>
                      </select>
                    </div>

                    {/* Language Selection */}
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#34161E' }}>
                        🌍 Language
                      </label>
                      <select 
                        value={selectedSocialLanguage}
                        onChange={(e) => setSelectedSocialLanguage(e.target.value)}
                        className="w-full p-2 rounded-lg border"
                        style={{ borderColor: '#F5668D', backgroundColor: 'white', color: '#34161E' }}
                      >
                        <option value="english">🇬🇧 English</option>
                        <option value="spanish">🇪🇸 Spanish</option>
                        <option value="french">🇫🇷 French</option>
                        <option value="german">🇩🇪 German</option>
                        <option value="italian">🇮🇹 Italian</option>
                        <option value="portuguese">🇵🇹 Portuguese</option>
                      </select>
                    </div>

                    {/* Hashtag Count */}
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#34161E' }}>
                        # Hashtag Count
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="30"
                        value={hashtagCount}
                        onChange={(e) => setHashtagCount(parseInt(e.target.value))}
                        className="w-full"
                      />
                      <div className="text-center text-sm" style={{ color: '#34161E' }}>{hashtagCount} hashtags</div>
                    </div>

                    {/* Custom Hashtags */}
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#34161E' }}>
                        🏷️ Custom Hashtags
                      </label>
                      <input
                        type="text"
                        value={customHashtags}
                        onChange={(e) => setCustomHashtags(e.target.value)}
                        placeholder="love, life, poetry"
                        className="w-full p-2 rounded-lg border"
                        style={{ borderColor: '#F5668D', backgroundColor: 'white', color: '#34161E' }}
                      />
                    </div>
                  </div>

                  {/* Toggle Options */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeEmojis}
                        onChange={(e) => setIncludeEmojis(e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-sm" style={{ color: '#34161E' }}>😊 Emojis</span>
                    </label>
                    
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeHashtags}
                        onChange={(e) => setIncludeHashtags(e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-sm" style={{ color: '#34161E' }}># Hashtags</span>
                    </label>
                    
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeCTA}
                        onChange={(e) => setIncludeCTA(e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-sm" style={{ color: '#34161E' }}>📢 CTA</span>
                    </label>
                    
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeQuestions}
                        onChange={(e) => setIncludeQuestions(e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-sm" style={{ color: '#34161E' }}>❓ Questions</span>
                    </label>
                    
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeQuotes}
                        onChange={(e) => setIncludeQuotes(e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-sm" style={{ color: '#34161E' }}>💬 Quotes</span>
                    </label>
                    
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeTimestamp}
                        onChange={(e) => setIncludeTimestamp(e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-sm" style={{ color: '#34161E' }}>📅 Time</span>
                    </label>
                  </div>
                </div>

                {/* Poetry Display */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-4" style={{ color: '#34161E' }}>
                    📝 Enhanced Social Media Content
                  </h3>
                  <div className="whitespace-pre-line text-lg leading-relaxed font-serif p-4 rounded-lg bg-white"
                    style={{ color: '#34161E', backgroundColor: '#fffcfc', border: `1px solid #F5668D` }}
                  >
                    {getEnhancedTransformedContent()}
                  </div>
                  
                  {/* Character Count */}
                  <div className="mt-2 text-sm text-right" style={{ color: '#666' }}>
                    {getEnhancedTransformedContent().length} characters
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  <button 
                    onClick={copyToClipboard}
                    className="px-4 py-2 rounded-lg border-2 hover:bg-opacity-10 transition"
                    style={{ 
                      backgroundColor: 'white',
                      borderColor: '#F5668D',
                      color: '#34161E'
                    }}
                  >
                    📋 Copy to Clipboard
                  </button>
                  <button className="px-4 py-2 rounded-lg border-2 hover:bg-opacity-10 transition"
                    style={{ 
                      backgroundColor: 'white',
                      borderColor: '#F5668D',
                      color: '#34161E'
                    }}
                  >
                    📥 Download as PDF
                  </button>
                  <button className="px-4 py-2 rounded-lg border-2 hover:bg-opacity-10 transition"
                    style={{ 
                      backgroundColor: 'white',
                      borderColor: '#F5668D',
                      color: '#34161E'
                    }}
                  >
                    📤 Share
                  </button>
                  {selectedFormat !== 'standard' && (
                    <button 
                      onClick={() => {
                        setSelectedFormat('standard')
                        setSelectedTemplate('elegant')
                      }}
                      className="px-4 py-2 rounded-lg border-2 hover:bg-opacity-10 transition"
                      style={{ 
                        backgroundColor: 'white',
                        borderColor: '#F5668D',
                        color: '#34161E'
                      }}
                    >
                      🔄 Reset to Original
                    </button>
                  )}
                </div>

                {/* Enhanced Image Generation Section */}
                <div className="mt-8 p-6 rounded-lg border-2 border-dashed"
                  style={{ borderColor: '#F5668D', backgroundColor: '#FFF4F7' }}
                >
                  <h3 className="text-xl font-semibold mb-4" style={{ color: '#34161E' }}>
                    🎨 Advanced Poetry Image Creator (15+ Features)
                  </h3>
                  
                  {/* Quick Presets */}
                  <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: '#FFF4F7', border: '1px solid #F5668D' }}>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => {
                          setSelectedImageTemplate('classic')
                          setSelectedFont('georgia')
                          setTextColor('#34161E')
                          setBackgroundColor('#FFF4F7')
                          setTextShadow(false)
                        }}
                        className="px-3 py-1 rounded text-sm"
                        style={{ backgroundColor: '#F5668D', color: 'white' }}
                      >
                        📜 Classic Style
                      </button>
                      <button
                        onClick={() => {
                          setSelectedImageTemplate('modern')
                          setSelectedFont('arial')
                          setTextColor('#ffffff')
                          setBackgroundColor('#667eea')
                          setTextShadow(true)
                        }}
                        className="px-3 py-1 rounded text-sm"
                        style={{ backgroundColor: '#F5668D', color: 'white' }}
                      >
                        🌟 Modern Style
                      </button>
                      <button
                        onClick={() => {
                          setSelectedImageTemplate('minimal')
                          setSelectedFont('helvetica')
                          setTextColor('#333333')
                          setBackgroundColor('#ffffff')
                          setTextShadow(false)
                        }}
                        className="px-3 py-1 rounded text-sm"
                        style={{ backgroundColor: '#F5668D', color: 'white' }}
                      >
                        ⚪ Minimal Style
                      </button>
                      <button
                        onClick={() => {
                          setSelectedImageTemplate('bold')
                          setSelectedFont('impact')
                          setTextColor('#ffffff')
                          setBackgroundColor('#F5668D')
                          setTextShadow(true)
                        }}
                        className="px-3 py-1 rounded text-sm"
                        style={{ backgroundColor: '#F5668D', color: 'white' }}
                      >
                        🔥 Bold Style
                      </button>
                    </div>
                  </div>

                  {/* Main Controls Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    
                    {/* Template Selection */}
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#34161E' }}>
                        🎨 Template Style
                      </label>
                      <select 
                        value={selectedImageTemplate}
                        onChange={(e) => setSelectedImageTemplate(e.target.value)}
                        className="w-full p-2 rounded-lg border"
                        style={{ borderColor: '#F5668D', backgroundColor: 'white', color: '#34161E' }}
                      >
                        <option value="classic">📜 Classic (Elegant)</option>
                        <option value="modern">🌟 Modern (Geometric)</option>
                        <option value="minimal">⚪ Minimal (Clean)</option>
                        <option value="bold">🔥 Bold (Dramatic)</option>
                      </select>
                    </div>

                    {/* Font Selection */}
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#34161E' }}>
                        🔤 Font Family
                      </label>
                      <select 
                        value={selectedFont}
                        onChange={(e) => setSelectedFont(e.target.value)}
                        className="w-full p-2 rounded-lg border"
                        style={{ borderColor: '#F5668D', backgroundColor: 'white', color: '#34161E' }}
                      >
                        <option value="georgia">Georgia (Serif)</option>
                        <option value="arial">Arial (Sans-serif)</option>
                        <option value="helvetica">Helvetica (Sans-serif)</option>
                        <option value="times">Times New Roman (Serif)</option>
                        <option value="courier">Courier New (Monospace)</option>
                        <option value="comic">Comic Sans MS (Casual)</option>
                        <option value="impact">Impact (Bold)</option>
                        <option value="verdana">Verdana (Web)</option>
                      </select>
                    </div>

                    {/* Font Size */}
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#34161E' }}>
                        📏 Font Size: {fontSize}px
                      </label>
                      <input
                        type="range"
                        min="12"
                        max="72"
                        value={fontSize}
                        onChange={(e) => setFontSize(parseInt(e.target.value))}
                        className="w-full"
                      />
                    </div>

                    {/* Text Color */}
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#34161E' }}>
                        🎨 Text Color
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={textColor}
                          onChange={(e) => setTextColor(e.target.value)}
                          className="w-12 h-8 rounded border"
                          style={{ borderColor: '#F5668D' }}
                        />
                        <input
                          type="text"
                          value={textColor}
                          onChange={(e) => setTextColor(e.target.value)}
                          className="flex-1 p-2 rounded-lg border"
                          style={{ borderColor: '#F5668D', backgroundColor: 'white', color: '#34161E' }}
                        />
                      </div>
                    </div>

                    {/* Background Color */}
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#34161E' }}>
                        🖼️ Background Color
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={backgroundColor}
                          onChange={(e) => setBackgroundColor(e.target.value)}
                          className="w-12 h-8 rounded border"
                          style={{ borderColor: '#F5668D' }}
                        />
                        <input
                          type="text"
                          value={backgroundColor}
                          onChange={(e) => setBackgroundColor(e.target.value)}
                          className="flex-1 p-2 rounded-lg border"
                          style={{ borderColor: '#F5668D', backgroundColor: 'white', color: '#34161E' }}
                        />
                      </div>
                    </div>

                    {/* Text Alignment */}
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#34161E' }}>
                        📐 Text Alignment
                      </label>
                      <select 
                        value={textAlignment}
                        onChange={(e) => setTextAlignment(e.target.value)}
                        className="w-full p-2 rounded-lg border"
                        style={{ borderColor: '#F5668D', backgroundColor: 'white', color: '#34161E' }}
                      >
                        <option value="left">⬅️ Left</option>
                        <option value="center">⬆️ Center</option>
                        <option value="right">➡️ Right</option>
                      </select>
                    </div>

                    {/* Background Pattern */}
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#34161E' }}>
                        🔲 Background Pattern
                      </label>
                      <select 
                        value={backgroundPattern}
                        onChange={(e) => setBackgroundPattern(e.target.value)}
                        className="w-full p-2 rounded-lg border"
                        style={{ borderColor: '#F5668D', backgroundColor: 'white', color: '#34161E' }}
                      >
                        <option value="none">⬜ None</option>
                        <option value="dots">⚪ Dots</option>
                        <option value="lines">📏 Lines</option>
                        <option value="gradient">🌈 Gradient</option>
                        <option value="custom">🖼️ Custom Image</option>
                      </select>
                    </div>

                    {/* Custom Background Upload */}
                    {backgroundPattern === 'custom' && (
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#34161E' }}>
                          📤 Upload Background Image
                        </label>
                        <div className="space-y-2">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleBackgroundUpload}
                            className="w-full p-2 rounded-lg border text-sm"
                            style={{ borderColor: '#F5668D', backgroundColor: 'white', color: '#34161E' }}
                          />
                          {customBackgroundImage && (
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-green-600">✅ Image loaded</span>
                              <button
                                onClick={() => setCustomBackgroundImage(null)}
                                className="text-xs px-2 py-1 rounded"
                                style={{ backgroundColor: '#F5668D', color: 'white' }}
                              >
                                Remove
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Background Opacity (for custom images) */}
                    {customBackgroundImage && (
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#34161E' }}>
                          🌊 Background Opacity: {Math.round(backgroundOpacity * 100)}%
                        </label>
                        <input
                          type="range"
                          min="0.1"
                          max="1"
                          step="0.1"
                          value={backgroundOpacity}
                          onChange={(e) => setBackgroundOpacity(parseFloat(e.target.value))}
                          className="w-full"
                        />
                      </div>
                    )}

                    {/* Image Filter */}
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#34161E' }}>
                        🎭 Image Filter
                      </label>
                      <select 
                        value={imageFilter}
                        onChange={(e) => setImageFilter(e.target.value)}
                        className="w-full p-2 rounded-lg border"
                        style={{ borderColor: '#F5668D', backgroundColor: 'white', color: '#34161E' }}
                      >
                        <option value="none">🎨 None</option>
                        <option value="vintage">📷 Vintage</option>
                        <option value="dramatic">🎭 Dramatic</option>
                        <option value="soft">☁️ Soft</option>
                        <option value="blackwhite">⚫ Black & White</option>
                      </select>
                    </div>

                    {/* Frame Style */}
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#34161E' }}>
                        🖼️ Frame Style
                      </label>
                      <select 
                        value={selectedFrame}
                        onChange={(e) => setSelectedFrame(e.target.value)}
                        className="w-full p-2 rounded-lg border"
                        style={{ borderColor: '#F5668D', backgroundColor: 'white', color: '#34161E' }}
                      >
                        <option value="none">⬜ No Frame</option>
                        <option value="thin">➖ Thin</option>
                        <option value="medium">➕ Medium</option>
                        <option value="thick">➖➖ Thick</option>
                        <option value="rounded">⭕ Rounded</option>
                      </select>
                    </div>

                    {/* Image Quality */}
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#34161E' }}>
                        📊 Image Quality
                      </label>
                      <select 
                        value={imageQuality}
                        onChange={(e) => setImageQuality(e.target.value)}
                        className="w-full p-2 rounded-lg border"
                        style={{ borderColor: '#F5668D', backgroundColor: 'white', color: '#34161E' }}
                      >
                        <option value="high">🔥 High (Best)</option>
                        <option value="medium">⚡ Medium (Balanced)</option>
                        <option value="low">💧 Low (Fast)</option>
                      </select>
                    </div>
                  </div>

                  {/* Canvas Size Controls */}
                  <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: '#FFF4F7', border: '1px solid #F5668D' }}>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#34161E' }}>
                      📐 Canvas Size
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex gap-2 items-center">
                        <div className="flex-1">
                          <input
                            type="number"
                            value={customImageSize.width}
                            onChange={(e) => setCustomImageSize(prev => ({ ...prev, width: parseInt(e.target.value) || 800 }))}
                            className="w-full p-2 rounded-lg border"
                            style={{ borderColor: '#F5668D', backgroundColor: 'white', color: '#34161E' }}
                            placeholder="Width"
                            min="100"
                            max="2000"
                          />
                        </div>
                        <span className="text-sm" style={{ color: '#34161E' }}>×</span>
                        <div className="flex-1">
                          <input
                            type="number"
                            value={customImageSize.height}
                            onChange={(e) => setCustomImageSize(prev => ({ ...prev, height: parseInt(e.target.value) || 600 }))}
                            className="w-full p-2 rounded-lg border"
                            style={{ borderColor: '#F5668D', backgroundColor: 'white', color: '#34161E' }}
                            placeholder="Height"
                            min="100"
                            max="2000"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setCustomImageSize({ width: 800, height: 600 })}
                          className="px-3 py-1 rounded text-sm"
                          style={{ backgroundColor: '#F5668D', color: 'white' }}
                        >
                          Small
                        </button>
                        <button
                          onClick={() => setCustomImageSize({ width: 1080, height: 1080 })}
                          className="px-3 py-1 rounded text-sm"
                          style={{ backgroundColor: '#F5668D', color: 'white' }}
                        >
                          Square
                        </button>
                        <button
                          onClick={() => setCustomImageSize({ width: 1920, height: 1080 })}
                          className="px-3 py-1 rounded text-sm"
                          style={{ backgroundColor: '#F5668D', color: 'white' }}
                        >
                          Wide
                        </button>
                        <button
                          onClick={() => setCustomImageSize({ width: 1080, height: 1920 })}
                          className="px-3 py-1 rounded text-sm"
                          style={{ backgroundColor: '#F5668D', color: 'white' }}
                        >
                          Story
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Toggle Options */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    <label className="flex items-center space-x-2 cursor-pointer p-2 rounded" style={{ backgroundColor: '#FFF4F7' }}>
                      <input
                        type="checkbox"
                        checked={textShadow}
                        onChange={(e) => setTextShadow(e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-sm" style={{ color: '#34161E' }}>🌑 Text Shadow</span>
                    </label>
                    
                    <label className="flex items-center space-x-2 cursor-pointer p-2 rounded" style={{ backgroundColor: '#FFF4F7' }}>
                      <input
                        type="checkbox"
                        checked={addWatermark}
                        onChange={(e) => setAddWatermark(e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-sm" style={{ color: '#34161E' }}>💧 Add Watermark</span>
                    </label>
                  </div>

                  {/* Generate Button */}
                  <div className="flex items-center">
                    <button 
                      onClick={generateImage}
                      disabled={isGeneratingImage || !generatedPoem}
                      className="w-full px-6 py-3 rounded-lg border-2 hover:bg-opacity-10 transition disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold"
                      style={{ 
                        backgroundColor: '#F5668D',
                        borderColor: '#F5668D',
                        color: 'white'
                      }}
                    >
                      {isGeneratingImage ? '🎨 Creating Your Masterpiece...' : '🎨 Generate Poetry Image'}
                    </button>
                  </div>

                  {/* Generated Image Display */}
                  {generatedImage && (
                    <div className="mt-4">
                      <h4 className="text-lg font-semibold mb-3" style={{ color: '#34161E' }}>
                        📱 Your Poetry Image - Mobile Social Media Ready
                      </h4>
                      
                      {/* Mobile Size Presets */}
                      <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: '#FFF4F7', border: '1px solid #F5668D' }}>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#34161E' }}>
                          📱 Mobile Social Media Sizes
                        </label>
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => setCustomImageSize({ width: 1080, height: 1080 })}
                            className="px-3 py-1 rounded text-sm"
                            style={{ backgroundColor: '#F5668D', color: 'white' }}
                          >
                            📷 Instagram Post
                          </button>
                          <button
                            onClick={() => setCustomImageSize({ width: 1080, height: 1920 })}
                            className="px-3 py-1 rounded text-sm"
                            style={{ backgroundColor: '#F5668D', color: 'white' }}
                          >
                            📱 Instagram Story
                          </button>
                          <button
                            onClick={() => setCustomImageSize({ width: 1200, height: 628 })}
                            className="px-3 py-1 rounded text-sm"
                            style={{ backgroundColor: '#F5668D', color: 'white' }}
                          >
                            📘 Facebook Post
                          </button>
                          <button
                            onClick={() => setCustomImageSize({ width: 1080, height: 1920 })}
                            className="px-3 py-1 rounded text-sm"
                            style={{ backgroundColor: '#F5668D', color: 'white' }}
                          >
                            🎵 TikTok Video
                          </button>
                          <button
                            onClick={() => setCustomImageSize({ width: 1000, height: 1500 })}
                            className="px-3 py-1 rounded text-sm"
                            style={{ backgroundColor: '#F5668D', color: 'white' }}
                          >
                            📌 Pinterest Pin
                          </button>
                          <button
                            onClick={() => setCustomImageSize({ width: 1600, height: 900 })}
                            className="px-3 py-1 rounded text-sm"
                            style={{ backgroundColor: '#F5668D', color: 'white' }}
                          >
            🐦 Twitter Header
                          </button>
                        </div>
                      </div>

                      {/* Display Controls */}
                      <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: '#FFF4F7', border: '1px solid #F5668D' }}>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#34161E' }}>
                          🎨 Display Controls
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {/* Text Size Control */}
                          <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: '#34161E' }}>
                              📏 Display Size: {imageTextSize}%
                            </label>
                            <input
                              type="range"
                              min="50"
                              max="150"
                              value={imageTextSize}
                              onChange={(e) => setImageTextSize(parseInt(e.target.value))}
                              className="w-full"
                            />
                          </div>
                          
                          {/* Text Color Control */}
                          <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: '#34161E' }}>
                              🎨 Text Overlay Color
                            </label>
                            <div className="flex gap-2">
                              <input
                                type="color"
                                value={imageTextColor}
                                onChange={(e) => setImageTextColor(e.target.value)}
                                className="w-12 h-8 rounded border"
                                style={{ borderColor: '#F5668D' }}
                              />
                              <input
                                type="text"
                                value={imageTextColor}
                                onChange={(e) => setImageTextColor(e.target.value)}
                                className="flex-1 p-2 rounded-lg border text-sm"
                                style={{ borderColor: '#F5668D', backgroundColor: 'white', color: '#34161E' }}
                              />
                            </div>
                          </div>
                          
                          {/* Background Color Control */}
                          <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: '#34161E' }}>
                              🖼️ Display Background
                            </label>
                            <div className="flex gap-2">
                              <input
                                type="color"
                                value={imageBackgroundColor}
                                onChange={(e) => setImageBackgroundColor(e.target.value)}
                                className="w-12 h-8 rounded border"
                                style={{ borderColor: '#F5668D' }}
                              />
                              <input
                                type="text"
                                value={imageBackgroundColor}
                                onChange={(e) => setImageBackgroundColor(e.target.value)}
                                className="flex-1 p-2 rounded-lg border text-sm"
                                style={{ borderColor: '#F5668D', backgroundColor: 'white', color: '#34161E' }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Image Display with Mobile Preview */}
                      <div className="bg-white p-4 rounded-lg border" style={{ borderColor: '#F5668D' }}>
                        {/* Mobile Preview Frame */}
                        <div className="mx-auto" style={{ 
                          maxWidth: '400px',
                          backgroundColor: imageBackgroundColor,
                          padding: '20px',
                          borderRadius: '20px',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                        }}>
                          {/* Mobile Status Bar */}
                          <div className="mb-2 text-center text-xs" style={{ color: imageTextColor, opacity: 0.7 }}>
                            9:41 AM 📶 🔋
                          </div>
                          
                          {/* Image Container */}
                          <div className="relative overflow-hidden rounded-lg" style={{ backgroundColor: '#f0f0f0' }}>
                            <img 
                              src={generatedImage} 
                              alt="Generated poetry image" 
                              className="w-full h-auto rounded-lg shadow-lg"
                              style={{ 
                                transform: `scale(${imageTextSize / 100})`,
                                transition: 'transform 0.3s ease',
                                filter: imageTextColor !== '#000000' ? `hue-rotate(${getHueRotation(imageTextColor)}deg)` : 'none'
                              }}
                            />
                            
                            {/* Mobile Engagement Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/50 to-transparent">
                              <div className="flex items-center justify-between text-white text-xs">
                                <div className="flex gap-3">
                                  <span>❤️ 1.2k</span>
                                  <span>💬 89</span>
                                  <span>📤 45</span>
                                </div>
                                <span>🔖</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Mobile Action Bar */}
                          <div className="mt-3 flex justify-around text-xs" style={{ color: imageTextColor }}>
                            <button className="flex flex-col items-center gap-1">
                              <span>🏠</span>
                              <span>Home</span>
                            </button>
                            <button className="flex flex-col items-center gap-1">
                              <span>🔍</span>
                              <span>Search</span>
                            </button>
                            <button className="flex flex-col items-center gap-1">
                              <span>➕</span>
                              <span>Create</span>
                            </button>
                            <button className="flex flex-col items-center gap-1">
                              <span>❤️</span>
                              <span>Activity</span>
                            </button>
                            <button className="flex flex-col items-center gap-1">
                              <span>👤</span>
                              <span>Profile</span>
                            </button>
                          </div>
                        </div>
                        
                        {/* Image Info */}
                        <div className="mt-4 text-center text-sm" style={{ color: '#666' }}>
                          📐 Size: {customImageSize.width} × {customImageSize.height}px | 
                          📱 Mobile Optimized | 
                          🎨 Display: {imageTextSize}%
                        </div>
                      </div>
                      
                      {/* Enhanced Action Buttons */}
                      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                        <button 
                          onClick={downloadImage}
                          className="px-4 py-2 rounded-lg border-2 hover:bg-opacity-10 transition"
                          style={{ 
                            backgroundColor: 'white',
                            borderColor: '#F5668D',
                            color: '#34161E'
                          }}
                        >
                          📥 Download Image
                        </button>
                        <button 
                          onClick={() => navigator.clipboard.writeText(generatedImage)}
                          className="px-4 py-2 rounded-lg border-2 hover:bg-opacity-10 transition"
                          style={{ 
                            backgroundColor: 'white',
                            borderColor: '#F5668D',
                            color: '#34161E'
                          }}
                        >
                          📋 Copy Image
                        </button>
                        <button className="px-4 py-2 rounded-lg border-2 hover:bg-opacity-10 transition"
                          style={{ 
                            backgroundColor: 'white',
                            borderColor: '#F5668D',
                            color: '#34161E'
                          }}
                        >
                          📤 Share Image
                        </button>
                        <button 
                          onClick={() => {
                            setImageTextSize(100)
                            setImageTextColor('#000000')
                            setImageBackgroundColor('#ffffff')
                          }}
                          className="px-4 py-2 rounded-lg border-2 hover:bg-opacity-10 transition"
                          style={{ 
                            backgroundColor: 'white',
                            borderColor: '#F5668D',
                            color: '#34161E'
                          }}
                        >
                          🔄 Reset Display
                        </button>
                      </div>
                    </div>
                  )}
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
