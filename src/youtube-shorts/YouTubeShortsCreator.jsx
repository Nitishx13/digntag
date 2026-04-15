import React, { useState, useRef, useEffect } from 'react'
import SiteHeader from '../components/SiteHeader.jsx'
import SiteFooter from '../components/SiteFooter.jsx'

const YouTubeShortsCreator = () => {
  const [videoFile, setVideoFile] = useState(null)
  const [videoUrl, setVideoUrl] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [trimmedVideo, setTrimmedVideo] = useState(null)
  const [startTime, setStartTime] = useState(0)
  const [endTime, setEndTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(1)
  const [playbackSpeed, setPlaybackSpeed] = useState(1)
  const [filter, setFilter] = useState('none')
  const [aspectRatio, setAspectRatio] = useState('9:16')
  const [exportProgress, setExportProgress] = useState(0)
  const [exportStatus, setExportStatus] = useState('')
  
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const fileInputRef = useRef(null)

  // Time formatting
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Handle video file upload
  const handleVideoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 500 * 1024 * 1024) { // 500MB limit
        alert('Video file must be less than 500MB')
        return
      }
      setVideoFile(file)
      const url = URL.createObjectURL(file)
      setVideoUrl(url)
      setStartTime(0)
      setEndTime(0)
      setCurrentTime(0)
      setDuration(0)
      setTrimmedVideo(null)
    }
  }

  // Video metadata loaded
  const handleVideoLoaded = () => {
    const video = videoRef.current
    if (video) {
      setDuration(video.duration)
      setEndTime(Math.min(60, video.duration)) // Default to 60 seconds or video duration
    }
  }

  // Time update handler
  const handleTimeUpdate = () => {
    const video = videoRef.current
    if (video) {
      setCurrentTime(video.currentTime)
    }
  }

  // Play/Pause toggle
  const togglePlayPause = () => {
    const video = videoRef.current
    if (video) {
      if (isPlaying) {
        video.pause()
      } else {
        video.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Set trim start
  const setTrimStart = () => {
    const video = videoRef.current
    if (video) {
      setStartTime(video.currentTime)
      if (video.currentTime >= endTime) {
        setEndTime(Math.min(video.currentTime + 10, duration))
      }
    }
  }

  // Set trim end
  const setTrimEnd = () => {
    const video = videoRef.current
    if (video) {
      setEndTime(video.currentTime)
      if (video.currentTime <= startTime) {
        setStartTime(Math.max(0, video.currentTime - 10))
      }
    }
  }

  // Apply filter
  const applyFilter = (filterType) => {
    setFilter(filterType)
    const video = videoRef.current
    if (video) {
      switch(filterType) {
        case 'grayscale':
          video.style.filter = 'grayscale(100%)'
          break
        case 'sepia':
          video.style.filter = 'sepia(100%)'
          break
        case 'blur':
          video.style.filter = 'blur(2px)'
          break
        case 'brightness':
          video.style.filter = 'brightness(1.2)'
          break
        case 'contrast':
          video.style.filter = 'contrast(1.2)'
          break
        default:
          video.style.filter = 'none'
      }
    }
  }

  // Process video for YouTube Shorts
  const processVideo = async () => {
    if (!videoFile || !videoRef.current) return
    
    setIsProcessing(true)
    setExportProgress(0)
    setExportStatus('Processing video...')

    try {
      const video = videoRef.current
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')

      // Set canvas dimensions for YouTube Shorts (9:16 ratio)
      canvas.width = 1080
      canvas.height = 1920

      const fps = 30
      const trimDuration = endTime - startTime
      const totalFrames = Math.floor(trimDuration * fps)

      const chunks = []
      const stream = canvas.captureStream(fps)
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp9'
      })

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data)
        }
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' })
        const url = URL.createObjectURL(blob)
        setTrimmedVideo(url)
        setExportStatus('Video processed successfully!')
        setExportProgress(100)
        setIsProcessing(false)
      }

      mediaRecorder.start()

      // Process video frames
      for (let frame = 0; frame < totalFrames; frame++) {
        const currentTime = startTime + (frame / fps)
        video.currentTime = currentTime

        await new Promise(resolve => {
          video.onseeked = resolve
        })

        // Draw video frame to canvas
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

        // Update progress
        const progress = (frame / totalFrames) * 100
        setExportProgress(progress)
        setExportStatus(`Processing frame ${frame + 1}/${totalFrames}...`)

        // Small delay to prevent blocking
        if (frame % 10 === 0) {
          await new Promise(resolve => setTimeout(resolve, 1))
        }
      }

      mediaRecorder.stop()

    } catch (error) {
      console.error('Error processing video:', error)
      setExportStatus('Error processing video. Please try again.')
      setIsProcessing(false)
    }
  }

  // Download processed video
  const downloadVideo = () => {
    if (trimmedVideo) {
      const a = document.createElement('a')
      a.href = trimmedVideo
      a.download = 'youtube-short.webm'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }

  // Reset everything
  const resetAll = () => {
    setVideoFile(null)
    setVideoUrl('')
    setTrimmedVideo(null)
    setCurrentTime(0)
    setDuration(0)
    setStartTime(0)
    setEndTime(0)
    setIsPlaying(false)
    setVolume(1)
    setPlaybackSpeed(1)
    setFilter('none')
    setExportProgress(0)
    setExportStatus('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              YouTube Shorts Creator
            </h1>
            <p className="text-lg text-gray-600">
              Create perfect YouTube Shorts videos with time counter and editing tools
            </p>
            <div className="mt-4 inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
              <span className="text-2xl">FREE</span>
              <span className="font-semibold">No Login Required</span>
            </div>
          </div>

          {/* Upload Section */}
          {!videoUrl && (
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                <div className="text-6xl mb-4">Upload</div>
                <h3 className="text-xl font-semibold mb-2">Upload Your Video</h3>
                <p className="text-gray-600 mb-4">
                  Maximum file size: 500MB<br />
                  Supported formats: MP4, WebM, AVI, MOV
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  onChange={handleVideoUpload}
                  className="hidden"
                  id="video-upload"
                />
                <label
                  htmlFor="video-upload"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-blue-700 transition"
                >
                  Choose Video File
                </label>
              </div>
            </div>
          )}

          {/* Video Editor Section */}
          {videoUrl && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Video Preview */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Video Preview</h3>
                <div className="relative bg-black rounded-lg overflow-hidden" style={{ aspectRatio: '9/16' }}>
                  <video
                    ref={videoRef}
                    src={videoUrl}
                    className="w-full h-full object-contain"
                    onLoadedMetadata={handleVideoLoaded}
                    onTimeUpdate={handleTimeUpdate}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  />
                  
                  {/* Time Counter Overlay */}
                  <div className="absolute top-4 left-4 bg-black bg-opacity-75 text-white px-3 py-1 rounded-lg text-sm font-mono">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </div>
                  
                  {/* YouTube Shorts Guidelines Overlay */}
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-lg text-xs font-semibold">
                    9:16
                  </div>
                </div>

                {/* Video Controls */}
                <div className="mt-4 space-y-4">
                  {/* Play/Pause & Progress */}
                  <div className="flex items-center gap-4">
                    <button
                      onClick={togglePlayPause}
                      className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      {isPlaying ? 'Pause' : 'Play'}
                    </button>
                    <div className="flex-1">
                      <input
                        type="range"
                        min="0"
                        max={duration}
                        value={currentTime}
                        onChange={(e) => {
                          const video = videoRef.current
                          if (video) {
                            video.currentTime = parseFloat(e.target.value)
                            setCurrentTime(parseFloat(e.target.value))
                          }
                        }}
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Volume Control */}
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium">Volume:</span>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={(e) => {
                        const video = videoRef.current
                        if (video) {
                          video.volume = parseFloat(e.target.value)
                          setVolume(parseFloat(e.target.value))
                        }
                      }}
                      className="flex-1"
                    />
                    <span className="text-sm">{Math.round(volume * 100)}%</span>
                  </div>

                  {/* Playback Speed */}
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium">Speed:</span>
                    <select
                      value={playbackSpeed}
                      onChange={(e) => {
                        const video = videoRef.current
                        if (video) {
                          video.playbackRate = parseFloat(e.target.value)
                          setPlaybackSpeed(parseFloat(e.target.value))
                        }
                      }}
                      className="border rounded px-3 py-1"
                    >
                      <option value="0.5">0.5x</option>
                      <option value="1">1x</option>
                      <option value="1.5">1.5x</option>
                      <option value="2">2x</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Editing Controls */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Editing Controls</h3>
                
                {/* Trim Controls */}
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Trim Video (Max 60 seconds)</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={setTrimStart}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                      >
                        Set Start
                      </button>
                      <span className="text-sm">Start: {formatTime(startTime)}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={setTrimEnd}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                      >
                        Set End
                      </button>
                      <span className="text-sm">End: {formatTime(endTime)}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Duration: {formatTime(endTime - startTime)}
                    </div>
                  </div>
                </div>

                {/* Filter Controls */}
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Video Filters</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {['none', 'grayscale', 'sepia', 'blur', 'brightness', 'contrast'].map((f) => (
                      <button
                        key={f}
                        onClick={() => applyFilter(f)}
                        className={`px-3 py-2 rounded text-sm capitalize ${
                          filter === f
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        } transition`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Process Button */}
                <div className="space-y-4">
                  <button
                    onClick={processVideo}
                    disabled={isProcessing || !videoFile}
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? 'Processing...' : 'Create YouTube Short'}
                  </button>

                  {/* Progress Bar */}
                  {isProcessing && (
                    <div className="space-y-2">
                      <div className="bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${exportProgress}%` }}
                        />
                      </div>
                      <p className="text-sm text-gray-600 text-center">{exportStatus}</p>
                    </div>
                  )}

                  {/* Download Button */}
                  {trimmedVideo && !isProcessing && (
                    <div className="space-y-2">
                      <button
                        onClick={downloadVideo}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                      >
                        Download YouTube Short
                      </button>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <p className="text-green-800 text-sm font-medium">
                          Your YouTube Short is ready! Download and upload to YouTube.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Reset Button */}
                  <button
                    onClick={resetAll}
                    className="w-full bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition"
                  >
                    Start Over
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
            <h3 className="text-lg font-semibold mb-4">How to Create YouTube Shorts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-3xl mb-2">1</div>
                <h4 className="font-medium">Upload Video</h4>
                <p className="text-sm text-gray-600">Choose your video file (max 500MB)</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">2</div>
                <h4 className="font-medium">Trim & Edit</h4>
                <p className="text-sm text-gray-600">Set start/end times, add filters</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">3</div>
                <h4 className="font-medium">Process</h4>
                <p className="text-sm text-gray-600">Convert to 9:16 YouTube Shorts format</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">4</div>
                <h4 className="font-medium">Download</h4>
                <p className="text-sm text-gray-600">Get your YouTube Short ready to upload</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Hidden Canvas for Processing */}
      <canvas ref={canvasRef} className="hidden" />

      <SiteFooter />
    </div>
  )
}

export default YouTubeShortsCreator
