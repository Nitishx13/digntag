const express = require('express')
const cors = require('cors')
const { createCanvas } = require('canvas')
const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')
const { promisify } = require('util')

const execAsync = promisify(exec)

const app = express()
const PORT = 3007

app.use(cors())
app.use(express.json())

// Create temp directories
const TEMP_DIR = path.join(__dirname, 'temp-video')
const FRAMES_DIR = path.join(TEMP_DIR, 'frames')
const OUTPUT_DIR = path.join(TEMP_DIR, 'output')

// Ensure directories exist
[TEMP_DIR, FRAMES_DIR, OUTPUT_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
})

// Clean up old files periodically
setInterval(() => {
  try {
    const now = Date.now()
    const files = fs.readdirSync(TEMP_DIR, { recursive: true })
    
    files.forEach(file => {
      const filePath = path.join(TEMP_DIR, file)
      const stats = fs.statSync(filePath)
      const fileAge = now - stats.mtime.getTime()
      
      // Delete files older than 1 hour
      if (fileAge > 3600000) {
        fs.unlinkSync(filePath)
      }
    })
  } catch (error) {
    console.log('Cleanup error:', error.message)
  }
}, 300000) // Every 5 minutes

// Generate frame image
function generateFrame(config, frameNumber, totalFrames) {
  const { width, height, backgroundColor, textColor, fontSize, fontFamily, duration } = config
  
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')
  
  // Clear canvas
  ctx.fillStyle = backgroundColor
  ctx.fillRect(0, 0, width, height)
  
  // Calculate current second in video
  const fps = 30
  const currentSecondInVideo = Math.floor(frameNumber / fps)
  const remainingTime = Math.max(0, duration - currentSecondInVideo)
  
  // Format time
  const mins = Math.floor(remainingTime / 60)
  const secs = Math.floor(remainingTime % 60)
  const timeText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  
  // Draw text
  ctx.fillStyle = textColor
  ctx.font = `bold ${fontSize}px ${fontFamily}`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(timeText, width / 2, height / 2)
  
  return canvas
}

// Generate video using FFmpeg
async function generateVideoWithFFmpeg(config, sessionId, onProgress) {
  const { duration, resolution } = config
  const resolutions = {
    '480p': { width: 854, height: 480 },
    '720p': { width: 1280, height: 720 },
    '1080p': { width: 1920, height: 1080 },
    '1440p': { width: 2560, height: 1440 },
    '4K': { width: 3840, height: 2160 }
  }
  
  const { width, height } = resolutions[resolution] || resolutions['720p']
  const fps = 30
  const totalFrames = duration * fps
  
  const sessionFramesDir = path.join(FRAMES_DIR, sessionId)
  const outputFile = path.join(OUTPUT_DIR, `${sessionId}.mp4`)
  
  // Create session directory
  if (!fs.existsSync(sessionFramesDir)) {
    fs.mkdirSync(sessionFramesDir, { recursive: true })
  }
  
  console.log(`=== BULLETPROOF VIDEO GENERATION START ===`)
  console.log(`Session: ${sessionId}`)
  console.log(`Duration: ${duration}s, FPS: ${fps}, Total Frames: ${totalFrames}`)
  console.log(`Resolution: ${width}x${height}`)
  
  try {
    // Step 1: Generate all frames as images
    console.log('Step 1: Generating frames...')
    for (let frame = 0; frame < totalFrames; frame++) {
      const canvas = generateFrame({ ...config, width, height }, frame, totalFrames)
      const framePath = path.join(sessionFramesDir, `frame_${frame.toString().padStart(6, '0')}.png`)
      
      const buffer = canvas.toBuffer('image/png')
      fs.writeFileSync(framePath, buffer)
      
      // Update progress
      const progress = Math.round((frame / totalFrames) * 50) // Frame generation is 50% of total
      if (onProgress) {
        onProgress(progress)
      }
      
      // Log progress every 30 frames
      if (frame % 30 === 0) {
        console.log(`Generated frame ${frame}/${totalFrames} (${Math.round((frame / totalFrames) * 100)}%)`)
      }
    }
    
    console.log(`Frame generation complete: ${totalFrames} frames`)
    
    // Step 2: Use FFmpeg to create MP4
    console.log('Step 2: Creating MP4 with FFmpeg...')
    
    const ffmpegCommand = [
      'ffmpeg',
      '-y', // Overwrite output file
      '-framerate', fps.toString(),
      '-i', path.join(sessionFramesDir, 'frame_%06d.png'),
      '-c:v', 'libx264',
      '-pix_fmt', 'yuv420p',
      '-preset', 'medium',
      '-crf', '23',
      '-movflags', '+faststart',
      '-r', fps.toString(),
      outputFile
    ].join(' ')
    
    console.log('FFmpeg command:', ffmpegCommand)
    
    const { stdout, stderr } = await execAsync(ffmpegCommand)
    
    console.log('FFmpeg stdout:', stdout)
    console.log('FFmpeg stderr:', stderr)
    
    // Step 3: Verify output file
    if (!fs.existsSync(outputFile)) {
      throw new Error('FFmpeg failed to create output file')
    }
    
    const stats = fs.statSync(outputFile)
    console.log(`Video created: ${outputFile} (${stats.size} bytes)`)
    
    // Update progress to 100%
    if (onProgress) {
      onProgress(100)
    }
    
    console.log('=== BULLETPROOF VIDEO GENERATION COMPLETE ===')
    
    return {
      success: true,
      filePath: outputFile,
      fileName: `${sessionId}.mp4`,
      fileSize: stats.size
    }
    
  } catch (error) {
    console.error('Bulletproof video generation error:', error)
    throw error
  } finally {
    // Clean up frames directory
    try {
      if (fs.existsSync(sessionFramesDir)) {
        fs.rmSync(sessionFramesDir, { recursive: true, force: true })
      }
    } catch (cleanupError) {
      console.log('Cleanup error:', cleanupError.message)
    }
  }
}

// API endpoint for video generation
app.post('/api/generate-video', async (req, res) => {
  try {
    const config = req.body
    const sessionId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    console.log('Received video generation request:', config)
    
    // Start video generation
    const result = await generateVideoWithFFmpeg(config, sessionId, (progress) => {
      // Send progress update via WebSocket or store for polling
      console.log(`Progress: ${progress}%`)
    })
    
    // Return the video file
    res.sendFile(result.filePath, (err) => {
      if (err) {
        console.error('Error sending file:', err)
        res.status(500).json({ error: 'Failed to send video file' })
      } else {
        // Clean up output file after sending
        setTimeout(() => {
          try {
            fs.unlinkSync(result.filePath)
          } catch (cleanupError) {
            console.log('Output file cleanup error:', cleanupError.message)
          }
        }, 5000) // Delete after 5 seconds
      }
    })
    
  } catch (error) {
    console.error('API error:', error)
    res.status(500).json({ error: error.message })
  }
})

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() })
})

// Start server
app.listen(PORT, () => {
  console.log(`Bulletproof Video Generator Server running on port ${PORT}`)
  console.log(`Health check: http://localhost:${PORT}/api/health`)
  console.log(`Video generation: POST http://localhost:${PORT}/api/generate-video`)
})

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down gracefully...')
  process.exit(0)
})

process.on('SIGTERM', () => {
  console.log('Shutting down gracefully...')
  process.exit(0)
})
