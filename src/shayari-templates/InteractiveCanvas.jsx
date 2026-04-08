import React, { useRef, useEffect, useState } from 'react'

export default function InteractiveCanvas({
  selectedShayari,
  uploadedImage,
  selectedBackground,
  textSize,
  textColor,
  textAlign,
  fontFamily,
  textX,
  textY,
  isTextSelected,
  templateType,
  onCanvasClick,
  onCanvasMouseDown,
  onCanvasMouseMove,
  onCanvasMouseUp,
  onTextBoundsChange
}) {
  const canvasRef = useRef(null)
  const [localTextBounds, setLocalTextBounds] = useState({ width: 200, height: 100, x: 50, y: 50 })

  // Get exact template dimensions based on template type
  const getTemplateDimensions = () => {
    switch (templateType) {
      case 'post':
        return { width: 1080, height: 1080 }
      case 'reels':
        return { width: 1080, height: 1920 }
      case 'story':
        return { width: 1080, height: 1920 }
      case 'whatsapp':
        return { width: 1080, height: 1080 }
      default:
        return { width: 1080, height: 1080 }
    }
  }

  const drawText = (ctx, width, height) => {
    // Set text style
    ctx.fillStyle = textColor
    ctx.textAlign = textAlign
    ctx.textBaseline = 'middle'

    // Use font
    ctx.font = `bold ${textSize}px ${fontFamily}, sans-serif`

    // Add text shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'
    ctx.shadowBlur = 4
    ctx.shadowOffsetX = 2
    ctx.shadowOffsetY = 2

    // Calculate text position
    const textLines = selectedShayari.split('\n')
    const lineHeight = textSize * 1.5
    
    let xPosition
    if (textAlign === 'center') {
      xPosition = (width / 100) * textX
    } else if (textAlign === 'left') {
      xPosition = (width / 100) * textX
    } else {
      xPosition = width - ((width / 100) * textX)
    }

    const startY = (height / 100) * textY

    // Calculate text bounds
    const textWidth = Math.max(...textLines.map(line => ctx.measureText(line).width))
    const totalHeight = textLines.length * lineHeight
    const bounds = {
      width: textWidth + 20,
      height: totalHeight + 20,
      x: xPosition - textWidth / 2,
      y: startY - totalHeight / 2
    }
    
    setLocalTextBounds(bounds)
    onTextBoundsChange(bounds)

    // Draw text line by line
    textLines.forEach((line, index) => {
      const y = startY + index * lineHeight
      ctx.fillText(line, xPosition, y)
    })

    // Draw selection border if text is selected
    if (isTextSelected) {
      ctx.strokeStyle = '#3B82F6'
      ctx.lineWidth = 2
      ctx.setLineDash([5, 5])
      
      ctx.strokeRect(bounds.x - 10, bounds.y - 10, bounds.width, bounds.height)
      
      // Draw resize handles
      ctx.fillStyle = '#3B82F6'
      const handleSize = 8
      const handles = [
        { x: bounds.x - 10, y: bounds.y - 10 },
        { x: bounds.x + bounds.width - 10, y: bounds.y - 10 },
        { x: bounds.x - 10, y: bounds.y + bounds.height - 10 },
        { x: bounds.x + bounds.width - 10, y: bounds.y + bounds.height - 10 },
      ]
      
      handles.forEach(handle => {
        ctx.fillRect(handle.x - handleSize/2, handle.y - handleSize/2, handleSize, handleSize)
      })
      
      ctx.setLineDash([])
    }
  }

  const drawCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    const width = canvas.width
    const height = canvas.height
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height)
    
    // Draw background
    if (uploadedImage) {
      const img = new Image()
      img.onload = () => {
        const scale = Math.max(width / img.width, height / img.height)
        const x = (width - img.width * scale) / 2
        const y = (height - img.height * scale) / 2
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale)
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'
        ctx.fillRect(0, 0, width, height)
        drawText(ctx, width, height)
      }
      img.src = uploadedImage
    } else if (selectedBackground) {
      const gradient = ctx.createLinearGradient(0, 0, width, height)
      const colors = selectedBackground.color.match(/#[a-fA-F0-9]{6}/g)
      if (colors && colors.length >= 2) {
        gradient.addColorStop(0, colors[0])
        gradient.addColorStop(1, colors[1])
      } else {
        gradient.addColorStop(0, '#667eea')
        gradient.addColorStop(1, '#764ba2')
      }
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)
      drawText(ctx, width, height)
    } else {
      ctx.fillStyle = '#667eea'
      ctx.fillRect(0, 0, width, height)
      drawText(ctx, width, height)
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    // Use exact template dimensions
    const dimensions = getTemplateDimensions()
    canvas.width = dimensions.width
    canvas.height = dimensions.height
    
    drawCanvas()
  }, [selectedShayari, uploadedImage, selectedBackground, textSize, textColor, textAlign, fontFamily, textX, textY, isTextSelected, templateType])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      const bounds = localTextBounds
      const scaledBounds = {
        x: (bounds.x / canvas.width) * rect.width,
        y: (bounds.y / canvas.height) * rect.height,
        width: (bounds.width / canvas.width) * rect.width,
        height: (bounds.height / canvas.height) * rect.height
      }
      
      // Check if click is within text bounds
      if (x >= scaledBounds.x && x <= scaledBounds.x + scaledBounds.width &&
          y >= scaledBounds.y && y <= scaledBounds.y + scaledBounds.height) {
        onCanvasClick(e, canvas)
      }
    }

    const handleMouseDown = (e) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      const bounds = localTextBounds
      const scaledBounds = {
        x: (bounds.x / canvas.width) * rect.width,
        y: (bounds.y / canvas.height) * rect.height,
        width: (bounds.width / canvas.width) * rect.width,
        height: (bounds.height / canvas.height) * rect.height
      }
      
      // Check if clicking on resize handles
      const handleSize = 8
      const handles = [
        { x: scaledBounds.x, y: scaledBounds.y, type: 'nw' },
        { x: scaledBounds.x + scaledBounds.width, y: scaledBounds.y, type: 'ne' },
        { x: scaledBounds.x, y: scaledBounds.y + scaledBounds.height, type: 'sw' },
        { x: scaledBounds.x + scaledBounds.width, y: scaledBounds.y + scaledBounds.height, type: 'se' }
      ]
      
      for (const handle of handles) {
        if (x >= handle.x - handleSize/2 && x <= handle.x + handleSize/2 &&
            y >= handle.y - handleSize/2 && y <= handle.y + handleSize/2) {
          onCanvasMouseDown(e, canvas)
          return
        }
      }
      
      // Check if clicking inside text area for dragging
      if (x >= scaledBounds.x && x <= scaledBounds.x + scaledBounds.width &&
          y >= scaledBounds.y && y <= scaledBounds.y + scaledBounds.height) {
        onCanvasMouseDown(e, canvas)
      }
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      // Change cursor based on position
      if (isTextSelected && localTextBounds) {
        const bounds = localTextBounds
        const scaledBounds = {
          x: (bounds.x / canvas.width) * rect.width,
          y: (bounds.y / canvas.height) * rect.height,
          width: (bounds.width / canvas.width) * rect.width,
          height: (bounds.height / canvas.height) * rect.height
        }
        
        // Check if over resize handles
        const handleSize = 8
        const handles = [
          { x: scaledBounds.x, y: scaledBounds.y, cursor: 'nw-resize' },
          { x: scaledBounds.x + scaledBounds.width, y: scaledBounds.y, cursor: 'ne-resize' },
          { x: scaledBounds.x, y: scaledBounds.y + scaledBounds.height, cursor: 'sw-resize' },
          { x: scaledBounds.x + scaledBounds.width, y: scaledBounds.y + scaledBounds.height, cursor: 'se-resize' }
        ]
        
        let cursorSet = false
        for (const handle of handles) {
          if (x >= handle.x - handleSize/2 && x <= handle.x + handleSize/2 &&
              y >= handle.y - handleSize/2 && y <= handle.y + handleSize/2) {
            canvas.style.cursor = handle.cursor
            cursorSet = true
            break
          }
        }
        
        // Check if over text area
        if (!cursorSet && x >= scaledBounds.x && x <= scaledBounds.x + scaledBounds.width &&
            y >= scaledBounds.y && y <= scaledBounds.y + scaledBounds.height) {
          canvas.style.cursor = 'move'
        } else if (!cursorSet) {
          canvas.style.cursor = 'default'
        }
      }
      
      onCanvasMouseMove(e, canvas)
    }

    const handleMouseUp = () => {
      onCanvasMouseUp()
    }

    const handleMouseLeave = () => {
      onCanvasMouseUp()
    }

    canvas.addEventListener('click', handleClick)
    canvas.addEventListener('mousedown', handleMouseDown)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseup', handleMouseUp)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      canvas.removeEventListener('click', handleClick)
      canvas.removeEventListener('mousedown', handleMouseDown)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseup', handleMouseUp)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [onCanvasClick, onCanvasMouseDown, onCanvasMouseMove, onCanvasMouseUp, localTextBounds])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full cursor-pointer"
      style={{ touchAction: 'none' }}
    />
  )
}
