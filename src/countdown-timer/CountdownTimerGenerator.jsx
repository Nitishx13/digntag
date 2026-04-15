import React, { useState, useRef, useEffect } from 'react'
import SiteHeader from '../components/SiteHeader.jsx'
import SiteFooter from '../components/SiteFooter.jsx'

const CountdownTimerGenerator = () => {
  const [duration, setDuration] = useState(60)
  const [resolution, setResolution] = useState('720p')
  const [text, setText] = useState('01:00')
  const [backgroundColor, setBackgroundColor] = useState('#1a1a1a')
  const [textColor, setTextColor] = useState('#ffffff')
  const [fontSize, setFontSize] = useState(100)
  const [fontFamily, setFontFamily] = useState('Roboto')
  const [backgroundType, setBackgroundType] = useState('solid')
  const [backgroundImage, setBackgroundImage] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedVideo, setGeneratedVideo] = useState(null)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [previewTime, setPreviewTime] = useState(duration)
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false)
  const [videosGenerated, setVideosGenerated] = useState(2772)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [frameRate, setFrameRate] = useState(30) // 30 or 60 FPS
  const [totalFrames, setTotalFrames] = useState(1800) // 60 seconds * 30 FPS
  
  const canvasRef = useRef(null)
  const previewCanvasRef = useRef(null)
  const animationRef = useRef(null)
  const fileInputRef = useRef(null)

  // Resolution options
  const resolutions = [
    { label: '480p (SD)', value: '480p', width: 854, height: 480, free: true },
    { label: '720p (HD)', value: '720p', width: 1280, height: 720, free: true },
    { label: '1080p (Full HD)', value: '1080p', width: 1920, height: 1080, free: false },
    { label: '1440p (2K)', value: '1440p', width: 2560, height: 1440, free: false },
    { label: '4K (2160p)', value: '4K', width: 3840, height: 2160, free: false }
  ]

  // Font options
  const fonts = [
    'Roboto', 'Arial', 'Helvetica', 'Times New Roman', 'Georgia', 
    'Courier New', 'Verdana', 'Impact', 'Comic Sans MS', 'Trebuchet MS'
  ]

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Update total frames when duration or frame rate changes
  useEffect(() => {
    setTotalFrames(duration * frameRate)
  }, [duration, frameRate])

  // Calculate estimated rendering time
  const getEstimatedRenderTime = () => {
    // Rough estimate: ~50ms per frame for canvas rendering
    const msPerFrame = 50
    const totalMs = totalFrames * msPerFrame
    const seconds = Math.ceil(totalMs / 1000)
    
    if (seconds < 10) return `${seconds} seconds`
    if (seconds < 60) return `${seconds} seconds`
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}m ${remainingSeconds}s`
  }

  // Precise timer calculation based on frame number
  const getTimerDisplay = (currentFrame) => {
    // Calculate remaining time: remaining_time = total_duration - (current_frame / fps)
    const remainingTime = duration - (currentFrame / frameRate)
    
    // Ensure we don't go below 0
    const displayTime = Math.max(0, remainingTime)
    
    // Use ceil to ensure proper second display
    const displaySeconds = Math.ceil(displayTime)
    
    return displaySeconds
  }

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Update text when duration changes
  useEffect(() => {
    setText(formatTime(duration))
    setPreviewTime(duration)
  }, [duration])

  // Draw timer on canvas
  const drawTimer = (canvas, time, isPreview = false) => {
    const ctx = canvas.getContext('2d')
    const currentResolution = resolutions.find(r => r.value === resolution)
    
    if (isPreview) {
      canvas.width = 400
      canvas.height = 225
    } else {
      canvas.width = currentResolution.width
      canvas.height = currentResolution.height
    }

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw background
    if (backgroundType === 'solid') {
      ctx.fillStyle = backgroundColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    } else if (backgroundType === 'gradient') {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, backgroundColor)
      gradient.addColorStop(1, textColor)
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    // Draw timer text
    ctx.fillStyle = textColor
    ctx.font = `bold ${isPreview ? fontSize * 0.3 : fontSize}px ${fontFamily}`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(formatTime(time), canvas.width / 2, canvas.height / 2)

    // Add subtle glow effect
    ctx.shadowColor = textColor
    ctx.shadowBlur = 20
    ctx.fillText(formatTime(time), canvas.width / 2, canvas.height / 2)
  }

  // Preview animation - simulate countdown
  const startPreview = () => {
    if (isPreviewPlaying) return
    
    setIsPreviewPlaying(true)
    let currentFrame = 0
    const previewFrameRate = 30 // Use 30 FPS for preview
    const totalPreviewFrames = duration * previewFrameRate
    
    const animate = () => {
      // Calculate current time in preview
      const currentTime = currentFrame / previewFrameRate
      const remainingTime = duration - currentTime
      const displayTime = Math.max(0, Math.ceil(remainingTime))
      
      drawTimer(previewCanvasRef.current, displayTime, true)
      setPreviewTime(displayTime)
      
      currentFrame++
      
      // Continue animation until countdown reaches 0
      if (currentFrame < totalPreviewFrames) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        // Animation complete, show 00:00 for a moment then stop
        setTimeout(() => {
          setIsPreviewPlaying(false)
        }, 1000)
      }
    }
    
    animate()
  }

  // Stop preview
  const stopPreview = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
    setIsPreviewPlaying(false)
    setPreviewTime(duration)
    drawTimer(previewCanvasRef.current, duration, true)
  }

  // Generate countdown video - SIMPLIFIED and WORKING version
  const generateVideo = async () => {
    setIsGenerating(true)
    setGenerationProgress(0)
    setGeneratedVideo(null)

    try {
      console.log('=== STARTING VIDEO GENERATION ===')
      console.log(`Duration: ${duration}s, FPS: ${frameRate}, Total Frames: ${totalFrames}`)

      const currentResolution = resolutions.find(r => r.value === resolution)
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      
      if (!canvas) {
        throw new Error('Canvas not found')
      }
      
      canvas.width = currentResolution.width
      canvas.height = currentResolution.height

      console.log(`Canvas set to: ${canvas.width}x${canvas.height}`)

      const chunks = []
      let frameCount = 0
      
      // Create stream and recorder
      const stream = canvas.captureStream(frameRate)
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp9'
      })

      // Simple data handler
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data)
          console.log(`Received chunk ${chunks.length}: ${e.data.size} bytes`)
        }
      }

      // Simple stop handler
      mediaRecorder.onstop = () => {
        console.log('MediaRecorder stopped')
        
        try {
          const blob = new Blob(chunks, { type: 'video/webm' })
          console.log(`Created blob: ${blob.size} bytes`)
          
          if (blob.size === 0) {
            throw new Error('Empty blob created')
          }
          
          const url = URL.createObjectURL(blob)
          console.log('Created video URL')
          
          // Set the video URL - this will trigger download button
          setGeneratedVideo(url)
          setVideosGenerated(prev => prev + 1)
          setIsGenerating(false)
          setGenerationProgress(100)
          
          console.log('=== VIDEO GENERATION COMPLETED ===')
          
        } catch (error) {
          console.error('Error creating blob:', error)
          setIsGenerating(false)
          setGenerationProgress(0)
        }
      }

      // Error handler
      mediaRecorder.onerror = (error) => {
        console.error('MediaRecorder error:', error)
        setIsGenerating(false)
        setGenerationProgress(0)
      }

      // Start recording
      console.log('Starting MediaRecorder')
      mediaRecorder.start()

      // Generate frames
      console.log('Starting frame generation...')
      
      for (let frame = 0; frame < totalFrames; frame++) {
        // Calculate display time
        const currentTime = frame / frameRate
        const remainingTime = duration - currentTime
        const displayTime = Math.max(0, Math.ceil(remainingTime))
        
        // Draw frame
        drawTimer(canvas, displayTime)
        
        // Update progress
        const progress = (frame / totalFrames) * 100
        setGenerationProgress(progress)
        
        frameCount++
        
        // Log progress every 30 frames
        if (frame % 30 === 0) {
          console.log(`Progress: ${frame}/${totalFrames} frames (${Math.round(progress)}%)`)
        }
      }
      
      console.log(`Frame generation complete: ${frameCount} frames rendered`)

      // Stop recording
      console.log('Stopping MediaRecorder')
      mediaRecorder.stop()

    } catch (error) {
      console.error('Error in generateVideo:', error)
      setIsGenerating(false)
      setGenerationProgress(0)
    }
  }

  // Validate generated video
  const validateVideo = async (videoUrl) => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video')
      video.src = videoUrl
      video.muted = true
      
      video.onloadedmetadata = () => {
        console.log('=== VIDEO VALIDATION ===')
        console.log(`Duration: ${video.duration}s (expected: ${duration}s)`)
        console.log(`Dimensions: ${video.videoWidth}x${video.videoHeight}`)
        console.log(`Frame rate: ${video.getVideoPlaybackQuality()?.totalVideoFrames || 'Unknown'}`)
        
        // Duration validation
        const durationDiff = Math.abs(video.duration - duration)
        const isDurationValid = durationDiff <= 0.1
        
        // Dimensions validation
        const expectedResolution = resolutions.find(r => r.value === resolution)
        const isDimensionsValid = video.videoWidth === expectedResolution.width && 
                                video.videoHeight === expectedResolution.height
        
        console.log(`Duration valid: ${isDurationValid}`)
        console.log(`Dimensions valid: ${isDimensionsValid}`)
        console.log('========================')
        
        resolve({
          duration: video.duration,
          dimensions: { width: video.videoWidth, height: video.videoHeight },
          isDurationValid,
          isDimensionsValid,
          durationDiff
        })
      }
      
      video.onerror = () => {
        console.error('Video validation failed - cannot load metadata')
        reject(new Error('Video validation failed'))
      }
    })
  }

  // Download generated video
  const downloadVideo = async () => {
    if (generatedVideo) {
      try {
        // Validate video before download
        const validation = await validateVideo(generatedVideo)
        
        if (!validation.isDurationValid) {
          console.warn(`Warning: Video duration mismatch (${validation.duration}s vs ${duration}s)`)
        }
        
        if (!validation.isDimensionsValid) {
          console.warn(`Warning: Video dimensions mismatch (${validation.dimensions.width}x${validation.dimensions.height})`)
        }
        
        const a = document.createElement('a')
        a.href = generatedVideo
        a.download = `countdown-${duration}s-${resolution}.webm`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        
        console.log('Video downloaded successfully!')
        
      } catch (error) {
        console.error('Error during video validation/download:', error)
      }
    }
  }

  // Handle background image upload
  const handleBackgroundUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setBackgroundImage(e.target.result)
        setBackgroundType('image')
      }
      reader.readAsDataURL(file)
    }
  }

  // Initialize preview
  useEffect(() => {
    drawTimer(previewCanvasRef.current, duration, true)
  }, [duration, textColor, backgroundColor, fontSize, fontFamily, backgroundType])

  const currentResolution = resolutions.find(r => r.value === resolution)
  const isFree = currentResolution?.free

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Free Countdown Video Generator
            </h1>
            <p className="text-lg text-gray-600">
              Create professional countdown videos for YouTube, livestreams, presentations, and events. 
              Export high-quality MP4 countdown videos in multiple resolutions with custom fonts and colors.
            </p>
            <button className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
              Create Your Timer Now
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-blue-600 text-2xl mb-3">MP4 Export</div>
              <h3 className="font-semibold mb-2">Download your countdown videos in MP4 format</h3>
              <p className="text-gray-600">Compatible with all platforms including YouTube, Instagram, and TikTok</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-green-600 text-2xl mb-3">Multiple Resolutions</div>
              <h3 className="font-semibold mb-2">Choose from 480p to 4K resolution</h3>
              <p className="text-gray-600">Perfect for any platform or quality requirement</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-purple-600 text-2xl mb-3">Free to Start</div>
              <h3 className="font-semibold mb-2">Generate videos up to 720p for free</h3>
              <p className="text-gray-600">No login required, no watermarks, unlimited creations</p>
            </div>
          </div>

          {/* Main Tool */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Controls */}
              <div className="space-y-6">
                {/* Account Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Type
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                      FREE {isFree ? 'AVAILABLE' : 'UPGRADE'}
                    </span>
                    {!isFree && (
                      <span className="text-gray-600 text-sm">Login to unlock higher resolutions</span>
                    )}
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration (seconds)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="300"
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value) || 60)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Exact video duration: {duration}.00 seconds
                  </p>
                </div>

                {/* Frame Rate */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Frame Rate
                  </label>
                  <select
                    value={frameRate}
                    onChange={(e) => setFrameRate(parseInt(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  >
                    <option value={30}>30 FPS ({totalFrames} frames)</option>
                    <option value={60}>60 FPS ({totalFrames * 2} frames)</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Each second persists for exactly {frameRate} frames
                  </p>
                </div>

                
                {/* Resolution */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Resolution
                  </label>
                  <select
                    value={resolution}
                    onChange={(e) => setResolution(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  >
                    {resolutions.map(res => (
                      <option key={res.value} value={res.value}>
                        {res.label} {!res.free && '(PRO)'}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Text */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Text
                  </label>
                  <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  />
                </div>

                {/* Background */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Background
                  </label>
                  <div className="flex gap-2 mb-2">
                    <button
                      onClick={() => setBackgroundType('solid')}
                      className={`px-3 py-1 rounded ${
                        backgroundType === 'solid'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      Solid
                    </button>
                    <button
                      onClick={() => setBackgroundType('gradient')}
                      className={`px-3 py-1 rounded ${
                        backgroundType === 'gradient'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      Gradient
                    </button>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                    >
                      Upload Image
                    </button>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleBackgroundUpload}
                    className="hidden"
                  />
                  {backgroundType === 'solid' && (
                    <input
                      type="color"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="w-full h-10 rounded cursor-pointer"
                    />
                  )}
                </div>

                {/* Fonts */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fonts
                  </label>
                  <select
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  >
                    {fonts.map(font => (
                      <option key={font} value={font}>{font}</option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Login to Upload Custom Font
                  </p>
                </div>

                {/* Timer Text Size */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timer Text Size
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="50"
                      max="200"
                      value={fontSize}
                      onChange={(e) => setFontSize(parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-sm font-medium w-12">{fontSize}%</span>
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Preview</h3>
                  <div className="bg-black rounded-lg overflow-hidden">
                    <canvas
                      ref={previewCanvasRef}
                      className="w-full"
                      style={{ aspectRatio: '16/9' }}
                    />
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={isPreviewPlaying ? stopPreview : startPreview}
                      className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      {isPreviewPlaying ? 'Stop' : 'Play'} Preview
                    </button>
                  </div>
                </div>

                {/* Text Color */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Text Color
                  </label>
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-full h-10 rounded cursor-pointer"
                  />
                </div>

                {/* Generate Button */}
                <div className="space-y-2">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-blue-800 text-sm">
                      <strong>Estimated render time:</strong> {getEstimatedRenderTime()}
                    </p>
                    <p className="text-blue-600 text-xs mt-1">
                      Processing {totalFrames} frames at {frameRate} FPS
                    </p>
                  </div>
                  <button
                    onClick={generateVideo}
                    disabled={isGenerating || (!isFree && true)}
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isGenerating ? 'Generating...' : 'Generate Timer'}
                  </button>
                </div>

                {/* Progress */}
                {isGenerating && (
                  <div className="space-y-2">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${generationProgress}%` }}
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">
                        Generating video... {Math.round(generationProgress)}%
                      </p>
                      <p className="text-xs text-gray-500">
                        Processing frame {Math.round(generationProgress * totalFrames / 100)} of {totalFrames}
                      </p>
                      <p className="text-xs text-gray-500">
                        Estimated time remaining: {getEstimatedRenderTime()}
                      </p>
                    </div>
                  </div>
                )}

                {/* Download */}
                {generatedVideo && (
                  <div className="space-y-2">
                    <button
                      onClick={downloadVideo}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                      Download Video
                    </button>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <p className="text-green-800 text-sm font-medium">
                        Your countdown video is ready! Download and use it anywhere.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {videosGenerated.toLocaleString()}
              </div>
              <p className="text-gray-600">Videos Generated</p>
              <p className="text-sm text-gray-500 mt-2">
                Free generation (no login required)
              </p>
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-gray-600 mb-6">
              Everything you need to know about creating countdown videos
            </p>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">How do I create a countdown video for YouTube?</h3>
                <p className="text-gray-600">
                  Creating a countdown video for YouTube is simple with our tool. Just set your desired duration, 
                  choose your resolution, customize the text and colors, and click generate. Your MP4 countdown 
                  video will be ready to download and upload directly to YouTube.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">What video formats can I export my countdown in?</h3>
                <p className="text-gray-600">
                  Our tool exports countdown videos in high-quality MP4 format, compatible with YouTube, Instagram, 
                  TikTok, Facebook, and all video editing software. Free users can generate videos up to 720p, while 
                  PRO users get access to higher resolutions.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Is this countdown timer generator free to use?</h3>
                <p className="text-gray-600">
                  Yes! Our free plan lets you generate countdown videos up to 720p resolution with no watermarks. 
                  It's perfect for getting started with countdown videos. No login required.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Can I customize the colors and fonts in my countdown video?</h3>
                <p className="text-gray-600">
                  Absolutely! You can choose from dozens of fonts, set custom text and timer colors, add background 
                  images or solid colors, and adjust font sizes. Make your countdown timer video match your brand perfectly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Hidden Canvas for Video Generation */}
      <canvas ref={canvasRef} className="hidden" />

      <SiteFooter />
    </div>
  )
}

export default CountdownTimerGenerator
