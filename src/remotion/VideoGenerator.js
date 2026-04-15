import { bundle } from '@remotion/bundler'
import { renderMedia } from '@remotion/renderer'
import { createReadStream, createWriteStream } from 'fs'
import path from 'path'

// Remotion Video Generator - Professional Solution
export class RemotionVideoGenerator {
  constructor() {
    this.isGenerating = false
    this.progressCallback = null
  }

  // Generate countdown video using Remotion
  async generateCountdownVideo(config, onProgress) {
    if (this.isGenerating) {
      throw new Error('Video generation already in progress')
    }

    this.isGenerating = true
    this.progressCallback = onProgress

    try {
      console.log('=== REMOTION VIDEO GENERATION START ===')
      console.log('Config:', config)

      // Create temporary composition file
      const compositionCode = this.generateCompositionCode(config)
      const tempDir = path.join(process.cwd(), 'temp-remotion')
      
      // Bundle the composition
      console.log('Bundling Remotion composition...')
      const bundled = await bundle({
        entryPoint: path.join(tempDir, 'composition.js'),
        webpackOverride: (config) => {
          return {
            ...config,
            externals: {
              ...config.externals,
              'react': 'React',
              'react-dom': 'ReactDOM'
            }
          }
        }
      })

      console.log('Bundling completed')

      // Render video with Remotion
      console.log('Starting video render...')
      const outputLocation = path.join(tempDir, `countdown-${Date.now()}.mp4`)
      
      await renderMedia({
        composition: 'CountdownTimer',
        serveUrl: bundled,
        codec: 'h264',
        outputLocation,
        inputProps: config,
        framesToRender: config.duration * 30, // 30 FPS
        onProgress: (progress) => {
          const percentage = Math.round(progress * 100)
          console.log(`Render progress: ${percentage}%`)
          if (this.progressCallback) {
            this.progressCallback(percentage)
          }
        },
        // Professional encoding settings
        encodingOptions: {
          crf: 23, // Good quality/size balance
          preset: 'medium',
          tune: 'film'
        }
      })

      console.log('=== REMOTION VIDEO GENERATION COMPLETE ===')
      
      // Return the video URL
      const videoUrl = `file://${outputLocation}`
      return videoUrl

    } catch (error) {
      console.error('Remotion video generation error:', error)
      throw error
    } finally {
      this.isGenerating = false
      this.progressCallback = null
    }
  }

  // Generate composition code dynamically
  generateCompositionCode(config) {
    return `
import React from 'react'
import { Composition, useCurrentFrame, useVideoConfig } from 'remotion'

const CountdownTimer = () => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  
  // Calculate current second in video
  const currentSecondInVideo = Math.floor(frame / fps)
  const remainingTime = Math.max(0, ${config.duration} - currentSecondInVideo)
  
  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return \`\${mins.toString().padStart(2, '0')}:\${secs.toString().padStart(2, '0')}\`
  }
  
  const backgroundStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: '${config.fontFamily}',
    fontSize: \`\${config.fontSize}px\`,
    fontWeight: 'bold',
    color: '${config.textColor}',
    textShadow: \`0 0 20px \${config.textColor}\`,
    textAlign: 'center',
    overflow: 'hidden',
    ${config.backgroundType === 'solid' ? `backgroundColor: '${config.backgroundColor}'` : ''}
  }
  
  return React.createElement('div', {
    style: backgroundStyle
  }, formatTime(remainingTime))
}

export const CountdownComposition = CountdownTimer

export const RemotionVideo = () => {
  const resolutions = {
    '480p': { width: 854, height: 480 },
    '720p': { width: 1280, height: 720 },
    '1080p': { width: 1920, height: 1080 },
    '1440p': { width: 2560, height: 1440 },
    '4K': { width: 3840, height: 2160 }
  }
  
  const currentResolution = resolutions['${config.resolution}'] || resolutions['720p']
  
  return React.createElement(Composition, {
    id: 'CountdownTimer',
    component: CountdownComposition,
    durationInFrames: ${config.duration} * 30,
    fps: 30,
    width: currentResolution.width,
    height: currentResolution.height,
    props: ${JSON.stringify(config)}
  })
}

export default RemotionVideo
    `
  }

  // Cancel generation
  cancel() {
    // Remotion doesn't have built-in cancellation, but we can set a flag
    this.isGenerating = false
    console.log('Video generation cancelled')
  }
}

export default RemotionVideoGenerator
