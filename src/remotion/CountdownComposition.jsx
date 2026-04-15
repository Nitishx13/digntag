import React from 'react'
import { Composition, useCurrentFrame, useVideoConfig } from 'remotion'

// Countdown Timer Component
const CountdownTimer = ({ 
  duration, 
  backgroundColor, 
  textColor, 
  fontSize, 
  fontFamily,
  backgroundType,
  backgroundImage,
  resolution 
}) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  
  // Calculate current second in video
  const currentSecondInVideo = Math.floor(frame / fps)
  const remainingTime = Math.max(0, duration - currentSecondInVideo)
  
  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  
  // Background styles
  const backgroundStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: fontFamily,
    fontSize: `${fontSize}px`,
    fontWeight: 'bold',
    color: textColor,
    textShadow: `0 0 20px ${textColor}`,
    textAlign: 'center',
    overflow: 'hidden'
  }
  
  // Handle different background types
  let backgroundElement
  if (backgroundType === 'solid') {
    backgroundElement = (
      <div style={{
        ...backgroundStyle,
        backgroundColor: backgroundColor
      }}>
        {formatTime(remainingTime)}
      </div>
    )
  } else if (backgroundType === 'gradient') {
    backgroundElement = (
      <div style={{
        ...backgroundStyle,
        background: `linear-gradient(45deg, ${backgroundColor}, ${textColor})`
      }}>
        {formatTime(remainingTime)}
      </div>
    )
  } else if (backgroundType === 'image' && backgroundImage) {
    backgroundElement = (
      <div style={{
        ...backgroundStyle,
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        {formatTime(remainingTime)}
      </div>
    )
  } else {
    // Default solid background
    backgroundElement = (
      <div style={{
        ...backgroundStyle,
        backgroundColor: backgroundColor
      }}>
        {formatTime(remainingTime)}
      </div>
    )
  }
  
  return backgroundElement
}

// Remotion Composition Export
export const CountdownComposition = React.memo(CountdownTimer)

// Root component for Remotion
export const RemotionVideo = ({ 
  duration, 
  backgroundColor, 
  textColor, 
  fontSize, 
  fontFamily,
  backgroundType,
  backgroundImage,
  resolution 
}) => {
  const resolutions = {
    '480p': { width: 854, height: 480 },
    '720p': { width: 1280, height: 720 },
    '1080p': { width: 1920, height: 1080 },
    '1440p': { width: 2560, height: 1440 },
    '4K': { width: 3840, height: 2160 }
  }
  
  const currentResolution = resolutions[resolution] || resolutions['720p']
  
  return (
    <Composition
      id="CountdownTimer"
      component={CountdownComposition}
      durationInFrames={duration * 30} // 30 FPS
      fps={30}
      width={currentResolution.width}
      height={currentResolution.height}
      props={{
        duration,
        backgroundColor,
        textColor,
        fontSize,
        fontFamily,
        backgroundType,
        backgroundImage,
        resolution
      }}
    />
  )
}

export default RemotionVideo
