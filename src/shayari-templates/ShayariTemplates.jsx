import React, { useState, useEffect } from 'react'
import SiteHeader from '../components/SiteHeader.jsx'
import SiteFooter from '../components/SiteFooter.jsx'
import InteractiveCanvas from './InteractiveCanvas.jsx'

export default function ShayariTemplates() {
  const [selectedShayari, setSelectedShayari] = useState('')
  const [uploadedImage, setUploadedImage] = useState(null)
  const [selectedBackground, setSelectedBackground] = useState(null)
  const [templateType, setTemplateType] = useState('post') // post, reels, story, whatsapp
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedTemplate, setGeneratedTemplate] = useState(null)
  const [shayariList, setShayariList] = useState([])
  const [loadingShayari, setLoadingShayari] = useState(false)
  
  // Text editing controls
  const [textSize, setTextSize] = useState(24)
  const [textX, setTextX] = useState(50)
  const [textY, setTextY] = useState(50)
  const [textColor, setTextColor] = useState('#FFFFFF')
  const [textAlign, setTextAlign] = useState('center')
  const [fontFamily, setFontFamily] = useState('Arial')
  
  // Interactive text controls
  const [isTextSelected, setIsTextSelected] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [textBounds, setTextBounds] = useState({ width: 200, height: 100 })

  // Predefined backgrounds
  const backgrounds = [
    { id: 1, name: 'Sunset Gradient', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { id: 2, name: 'Ocean Blue', color: 'linear-gradient(135deg, #667eea 0%, #4facfe 100%)' },
    { id: 3, name: 'Rose Gold', color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
    { id: 4, name: 'Forest Green', color: 'linear-gradient(135deg, #0ba360 0%, #3cba92 100%)' },
    { id: 5, name: 'Royal Purple', color: 'linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)' },
    { id: 6, name: 'Golden Hour', color: 'linear-gradient(135deg, #F7971E 0%, #FFD200 100%)' },
    { id: 7, name: 'Midnight Blue', color: 'linear-gradient(135deg, #2C3E50 0%, #3498DB 100%)' },
    { id: 8, name: 'Coral Pink', color: 'linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%)' },
    { id: 9, name: 'Mint Fresh', color: 'linear-gradient(135deg, #00B4DB 0%, #0083B0 100%)' },
    { id: 10, name: 'Chocolate Brown', color: 'linear-gradient(135deg, #64495D 0%, #815855 100%)' }
  ]

  useEffect(() => {
    // Check if there's a generated shayari from poetry generator
    const generatedShayari = localStorage.getItem('generatedShayari')
    if (generatedShayari) {
      setSelectedShayari(generatedShayari)
      console.log('Loaded generated shayari from localStorage')
    } else {
      loadShayariFromDatabase()
    }
  }, [])

  // Auto-regenerate template when text controls change (if template exists)
  useEffect(() => {
    if (generatedTemplate && selectedShayari) {
      const timer = setTimeout(() => {
        generateTemplate()
      }, 500) // Debounce to avoid too many regenerations
      return () => clearTimeout(timer)
    }
  }, [textSize, textX, textY, textColor, textAlign, fontFamily])

  const loadShayariFromDatabase = async () => {
    setLoadingShayari(true)
    try {
      const response = await fetch('/api/shayari-list')
      const result = await response.json()
      
      if (result.success) {
        setShayariList(result.data || [])
        console.log('Shayari loaded:', result.data)
      } else {
        console.error('API returned error:', result.error)
        setShayariList([])
      }
    } catch (error) {
      console.error('Error loading shayari:', error)
      setShayariList([])
    } finally {
      setLoadingShayari(false)
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUploadedImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const generateTemplate = async () => {
    if (!selectedShayari.trim()) {
      alert('Please select or enter shayari text')
      return
    }

    setIsGenerating(true)
    
    try {
      // Create canvas for template generation
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      
      // Set canvas size based on template type
      let width, height
      switch (templateType) {
        case 'post':
          width = 1080
          height = 1080
          break
        case 'reels':
          width = 1080
          height = 1920
          break
        case 'story':
          width = 1080
          height = 1920
          break
        case 'whatsapp':
          width = 1080
          height = 1080
          break
        default:
          width = 1080
          height = 1080
      }
      
      canvas.width = width
      canvas.height = height

      // Draw background
      if (uploadedImage) {
        const img = new Image()
        img.onload = () => {
          // Draw and scale image to fit canvas
          const scale = Math.max(width / img.width, height / img.height)
          const x = (width - img.width * scale) / 2
          const y = (height - img.height * scale) / 2
          ctx.drawImage(img, x, y, img.width * scale, img.height * scale)
          
          // Add overlay for text readability
          ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'
          ctx.fillRect(0, 0, width, height)
          
          drawText(ctx, width, height, canvas)
        }
        img.src = uploadedImage
      } else if (selectedBackground) {
        // Apply gradient background
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
        
        drawText(ctx, width, height, canvas)
      } else {
        // Default background
        ctx.fillStyle = '#667eea'
        ctx.fillRect(0, 0, width, height)
        drawText(ctx, width, height, canvas)
      }
    } catch (error) {
      console.error('Error generating template:', error)
      alert('Error generating template')
    } finally {
      setIsGenerating(false)
    }
  }

  const drawText = (ctx, width, height, canvas, isInteractive = false) => {
    // Set text style with user controls
    ctx.fillStyle = textColor
    ctx.textAlign = textAlign
    ctx.textBaseline = 'middle'

    // Use user-defined font size and family
    ctx.font = `bold ${textSize}px ${fontFamily}, sans-serif`

    // Add text shadow for better readability
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'
    ctx.shadowBlur = 4
    ctx.shadowOffsetX = 2
    ctx.shadowOffsetY = 2

    // Calculate text position based on user controls
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

    // Calculate text bounds for interactive mode
    if (isInteractive) {
      const textWidth = Math.max(...textLines.map(line => ctx.measureText(line).width))
      const totalHeight = textLines.length * lineHeight
      setTextBounds({
        width: textWidth + 20,
        height: totalHeight + 20,
        x: xPosition - textWidth / 2,
        y: startY - totalHeight / 2
      })
    }

    // Draw text line by line
    textLines.forEach((line, index) => {
      const y = startY + index * lineHeight
      ctx.fillText(line, xPosition, y)
    })

    // Draw selection border if text is selected (interactive mode only)
    if (isInteractive && isTextSelected) {
      ctx.strokeStyle = '#3B82F6'
      ctx.lineWidth = 2
      ctx.setLineDash([5, 5])
      
      const bounds = textBounds
      ctx.strokeRect(bounds.x - 10, bounds.y - 10, bounds.width, bounds.height)
      
      // Draw resize handles
      ctx.fillStyle = '#3B82F6'
      const handleSize = 8
      const handles = [
        { x: bounds.x - 10, y: bounds.y - 10 }, // top-left
        { x: bounds.x + bounds.width - 10, y: bounds.y - 10 }, // top-right
        { x: bounds.x - 10, y: bounds.y + bounds.height - 10 }, // bottom-left
        { x: bounds.x + bounds.width - 10, y: bounds.y + bounds.height - 10 }, // bottom-right
      ]
      
      handles.forEach(handle => {
        ctx.fillRect(handle.x - handleSize/2, handle.y - handleSize/2, handleSize, handleSize)
      })
      
      ctx.setLineDash([])
    }

    // Convert canvas to image
    if (canvas && !isInteractive) {
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob)
        setGeneratedTemplate(url)
      })
    }
  }

  // Interactive canvas event handlers
  const handleCanvasClick = (e, canvas) => {
    if (!canvas) return
    
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const bounds = textBounds
    if (!bounds) return
    
    const scaledBounds = {
      x: (bounds.x / canvas.width) * rect.width,
      y: (bounds.y / canvas.height) * rect.height,
      width: (bounds.width / canvas.width) * rect.width,
      height: (bounds.height / canvas.height) * rect.height
    }
    
    // Check if click is within text bounds
    if (x >= scaledBounds.x && x <= scaledBounds.x + scaledBounds.width &&
        y >= scaledBounds.y && y <= scaledBounds.y + scaledBounds.height) {
      setIsTextSelected(!isTextSelected)
    } else {
      setIsTextSelected(false)
    }
    
    // Redraw canvas
    redrawInteractiveCanvas(canvas)
  }

  const handleMouseDown = (e, canvas) => {
    if (!isTextSelected || !canvas) return
    
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const bounds = textBounds
    if (!bounds) return
    
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
        setIsResizing(true)
        setDragStart({ x, y, type: handle.type })
        return
      }
    }
    
    // Check if clicking inside text area for dragging
    if (x >= scaledBounds.x && x <= scaledBounds.x + scaledBounds.width &&
        y >= scaledBounds.y && y <= scaledBounds.y + scaledBounds.height) {
      setIsDragging(true)
      setDragStart({ x, y })
    }
  }

  const handleMouseMove = (e, canvas) => {
    if (!isTextSelected || !canvas) return
    
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    if (isDragging) {
      const dx = x - dragStart.x
      const dy = y - dragStart.y
      
      // Update text position
      const newX = Math.max(10, Math.min(90, textX + (dx / rect.width) * 100))
      const newY = Math.max(10, Math.min(90, textY + (dy / rect.height) * 100))
      
      setTextX(newX)
      setTextY(newY)
      setDragStart({ x, y })
    } else if (isResizing) {
      const dx = x - dragStart.x
      const dy = y - dragStart.y
      
      // Update font size based on resize - make it more responsive
      const sizeChange = (dy / rect.height) * 200 // Increased sensitivity
      const newSize = Math.max(12, Math.min(60, textSize + sizeChange))
      setTextSize(newSize)
      setDragStart({ x, y })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setIsResizing(false)
  }

  const redrawInteractiveCanvas = (canvas) => {
    const ctx = canvas.getContext('2d')
    const width = canvas.width
    const height = canvas.height
    
    // Clear and redraw background
    ctx.clearRect(0, 0, width, height)
    
    // Redraw background
    if (uploadedImage) {
      const img = new Image()
      img.onload = () => {
        const scale = Math.max(width / img.width, height / img.height)
        const x = (width - img.width * scale) / 2
        const y = (height - img.height * scale) / 2
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale)
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'
        ctx.fillRect(0, 0, width, height)
        drawText(ctx, width, height, canvas, true)
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
      drawText(ctx, width, height, canvas, true)
    } else {
      ctx.fillStyle = '#667eea'
      ctx.fillRect(0, 0, width, height)
      drawText(ctx, width, height, canvas, true)
    }
  }

  const downloadTemplate = () => {
    if (generatedTemplate) {
      const link = document.createElement('a')
      link.href = generatedTemplate
      link.download = `shayari-template-${templateType}-${Date.now()}.png`
      link.click()
    }
  }

  const getTemplateDimensions = () => {
    switch (templateType) {
      case 'post':
        return '1080 × 1080px (Square)'
      case 'reels':
        return '1080 × 1920px (Portrait)'
      case 'story':
        return '1080 × 1920px (Portrait)'
      case 'whatsapp':
        return '1080 × 1080px (Square)'
      default:
        return '1080 × 1080px (Square)'
    }
  }

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto px-4 py-4 sm:py-8">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-4xl font-bold text-purple-800 mb-2 sm:mb-4">Template Designer</h1>
            <p className="text-sm sm:text-lg text-gray-600 mb-4">Design stunning templates with custom backgrounds, fonts, and perfect text positioning</p>
            <p className="text-sm text-gray-500">Create beautiful social media posts, greeting cards, and digital art with our professional template designer. Perfect for Instagram, WhatsApp, Facebook and all social platforms.</p>
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
            {/* Left Panel - Input */}
            <div className="space-y-6">
              {/* Shayari Selection */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Select Shayari</h3>
                <textarea
                  value={selectedShayari}
                  onChange={(e) => setSelectedShayari(e.target.value)}
                  className="w-full p-3 border rounded-lg resize-none"
                  rows={4}
                  placeholder="Enter your shayari here or select from sample..."
                />
                
                <div className="mt-4">
                  {selectedShayari && localStorage.getItem('generatedShayari') ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-sm text-green-800 font-medium mb-2">✅ Generated Shayari Ready:</p>
                      <div className="whitespace-pre-line text-sm text-gray-800 bg-white rounded p-3 border">
                        {selectedShayari}
                      </div>
                      <p className="text-xs text-gray-600 mt-2">This is your generated shayari. You can edit it above or proceed to create template.</p>
                    </div>
                  ) : (
                    <>
                      <p className="text-sm text-gray-600 mb-2">
                        {shayariList.length > 0 ? `Available Shayari (${shayariList.length}):` : 'Loading shayari...'}
                      </p>
                      {loadingShayari ? (
                        <div className="text-center py-4">
                          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                        </div>
                      ) : shayariList.length > 0 ? (
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                          {shayariList.map((shayari) => (
                            <button
                              key={shayari.id}
                              onClick={() => setSelectedShayari(shayari.text)}
                              className="block w-full text-left p-2 text-sm bg-gray-50 hover:bg-gray-100 rounded border"
                            >
                              <div className="flex items-center justify-between">
                                <span className="truncate flex-1">
                                  {shayari.text.substring(0, 50)}{shayari.text.length > 50 ? '...' : ''}
                                </span>
                                <div className="flex items-center gap-1 ml-2">
                                  <span className="text-xs bg-blue-100 text-blue-800 px-1 py-0.5 rounded">
                                    {shayari.language}
                                  </span>
                                  <span className="text-xs bg-green-100 text-green-800 px-1 py-0.5 rounded">
                                    {shayari.lineCount}
                                  </span>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-4 text-gray-500">
                          <p>No shayari available</p>
                          <p className="text-xs mt-1">Add shayari using the admin panel first</p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Template Type Selection */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Template Type</h3>
                <div className="grid grid-cols-2 gap-3">
                  {['post', 'reels', 'story', 'whatsapp'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setTemplateType(type)}
                      className={`p-3 rounded-lg border-2 transition ${
                        templateType === type
                          ? 'border-primary bg-primary text-white'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-semibold capitalize">{type}</div>
                      <div className="text-xs opacity-75">
                        {type === 'post' && 'Instagram Post'}
                        {type === 'reels' && 'Instagram Reels'}
                        {type === 'story' && 'Instagram Story'}
                        {type === 'whatsapp' && 'WhatsApp Share'}
                      </div>
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  Dimensions: {getTemplateDimensions()}
                </p>
              </div>

              {/* Background Selection */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Background</h3>
                
                {/* Upload Image */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Custom Background
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>

                {/* Or choose from predefined backgrounds */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Or choose from backgrounds:</p>
                  <div className="grid grid-cols-5 gap-2">
                    {backgrounds.map((bg) => (
                      <button
                        key={bg.id}
                        onClick={() => setSelectedBackground(bg)}
                        className={`h-12 rounded-lg border-2 transition ${
                          selectedBackground?.id === bg.id
                            ? 'border-primary'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        style={{ background: bg.color }}
                        title={bg.name}
                      />
                    ))}
                  </div>
                </div>

                {uploadedImage && (
                  <div className="mt-4">
                    <img
                      src={uploadedImage}
                      alt="Uploaded background"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => setUploadedImage(null)}
                      className="mt-2 text-sm text-red-600 hover:text-red-800"
                    >
                      Remove Image
                    </button>
                  </div>
                )}
              </div>

              {/* Generate Button */}
              <button
                onClick={generateTemplate}
                disabled={isGenerating || !selectedShayari.trim()}
                className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition disabled:opacity-50"
              >
                {isGenerating ? 'Generating...' : 'Generate Template'}
              </button>
            </div>

            {/* Right Panel - Preview */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Template Preview</h3>
                
                {/* Text Editing Controls */}
                <div className="mb-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-3 text-sm sm:text-base">Text Controls</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs sm:text-sm text-gray-600">Font Size: {textSize}px</label>
                      <input
                        type="range"
                        min="12"
                        max="60"
                        value={textSize}
                        onChange={(e) => setTextSize(Number(e.target.value))}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm text-gray-600">Text Color</label>
                      <input
                        type="color"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="w-full h-8 rounded"
                      />
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm text-gray-600">X Position: {textX}%</label>
                      <input
                        type="range"
                        min="10"
                        max="90"
                        value={textX}
                        onChange={(e) => setTextX(Number(e.target.value))}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm text-gray-600">Y Position: {textY}%</label>
                      <input
                        type="range"
                        min="10"
                        max="90"
                        value={textY}
                        onChange={(e) => setTextY(Number(e.target.value))}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm text-gray-600">Font Family</label>
                      <select
                        value={fontFamily}
                        onChange={(e) => setFontFamily(e.target.value)}
                        className="w-full p-2 text-xs sm:text-sm border rounded"
                      >
                        <option value="Arial">Arial</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Courier New">Courier New</option>
                        <option value="Verdana">Verdana</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm text-gray-600">Text Align</label>
                      <select
                        value={textAlign}
                        onChange={(e) => setTextAlign(e.target.value)}
                        className="w-full p-2 text-xs sm:text-sm border rounded"
                      >
                        <option value="center">Center</option>
                        <option value="left">Left</option>
                        <option value="right">Right</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                {/* Final Template Display */}
                {generatedTemplate ? (
                  <div className="space-y-4">
                    <h4 className="font-semibold">Final Template</h4>
                    <div className="relative">
                      <img
                        src={generatedTemplate}
                        alt="Generated template"
                        className="w-full rounded-lg shadow-lg"
                      />
                      <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                        {templateType.toUpperCase()} {templateType === 'post' || templateType === 'whatsapp' ? '1080×1080' : '1080×1920'}
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                      <button
                        onClick={downloadTemplate}
                        className="flex-1 py-3 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition text-sm sm:text-base"
                      >
                        Download Template
                      </button>
                      
                      <button
                        onClick={() => {
                          // Share functionality can be implemented here
                          alert('Share functionality coming soon!')
                        }}
                        className="flex-1 py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition text-sm sm:text-base"
                      >
                        Share
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-400">
                    <div className="text-6xl mb-4">🎨</div>
                    <p>Generate template to see final result</p>
                    <p className="text-sm mt-2">Select shayari, background, and click Generate Template</p>
                  </div>
                )}
              </div>

              {/* Google AdSense After Generated Template */}
              {generatedTemplate && (
                <div className="mt-6">
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-xs text-gray-500 mb-2">Advertisement</div>
                    <div className="bg-gray-200 rounded h-16 flex items-center justify-center">
                      <span className="text-gray-400 text-sm">AdSense Ad Space</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tips */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">💡 Tips</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Use high-quality images for best results</li>
                  <li>• Keep shayari text concise for better readability</li>
                  <li>• Choose contrasting backgrounds for text visibility</li>
                  <li>• Different sizes work best for different platforms</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
