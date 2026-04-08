import React, { useState, useEffect } from 'react'
import SiteHeader from '../components/SiteHeader.jsx'
import SiteFooter from '../components/SiteFooter.jsx'

export default function ShayariDisplay() {
  const [shayariList, setShayariList] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedLanguage, setSelectedLanguage] = useState('All')
  const [selectedLineCount, setSelectedLineCount] = useState('All')

  useEffect(() => {
    loadShayari()
  }, [])

  const loadShayari = async () => {
    try {
      const response = await fetch('/api/shayari-list')
      const result = await response.json()
      if (result.success) {
        setShayariList(result.data)
      }
    } catch (error) {
      console.error('Error loading shayari:', error)
    } finally {
      setLoading(false)
    }
  }

  // Filter shayari based on selections
  const filteredShayari = shayariList.filter(shayari => {
    const languageMatch = selectedLanguage === 'All' || shayari.language === selectedLanguage
    const lineCountMatch = selectedLineCount === 'All' || shayari.lineCount === selectedLineCount
    return languageMatch && lineCountMatch
  })

  // Group shayari by language and line count
  const groupedShayari = {}
  filteredShayari.forEach(shayari => {
    if (!groupedShayari[shayari.language]) {
      groupedShayari[shayari.language] = {}
    }
    if (!groupedShayari[shayari.language][shayari.lineCount]) {
      groupedShayari[shayari.language][shayari.lineCount] = []
    }
    groupedShayari[shayari.language][shayari.lineCount].push(shayari)
  })

  const languages = ['All', ...new Set(shayariList.map(s => s.language))]
  const lineCounts = ['All', ...new Set(shayariList.map(s => s.lineCount))]

  if (loading) {
    return (
      <>
        <SiteHeader />
        <main className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            <p className="mt-4 text-gray-600">Loading beautiful shayari...</p>
          </div>
        </main>
        <SiteFooter />
      </>
    )
  }

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-purple-800 mb-4">Beautiful Shayari Collection</h1>
            <p className="text-gray-600 text-lg">Handpicked shayari for every emotion and occasion</p>
          </div>

          {/* Filters */}
          <div className="flex justify-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Language:</label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {languages.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Lines:</label>
              <select
                value={selectedLineCount}
                onChange={(e) => setSelectedLineCount(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {lineCounts.map(count => (
                  <option key={count} value={count}>{count} Lines</option>
                ))}
              </select>
            </div>
          </div>

          {/* Shayari Display */}
          {Object.keys(groupedShayari).length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-gray-500 text-lg">No shayari found matching your filters</p>
              <button
                onClick={() => {
                  setSelectedLanguage('All')
                  setSelectedLineCount('All')
                }}
                className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {Object.keys(groupedShayari).map(language => (
                <div key={language}>
                  <h2 className="text-2xl font-bold text-purple-800 mb-4 flex items-center">
                    <span className="mr-2">{language === 'Hindi' ? '🇮🇳' : '🇬🇧'}</span>
                    {language} Shayari
                  </h2>
                  
                  {Object.keys(groupedShayari[language]).map(lineCount => (
                    <div key={lineCount} className="mb-6">
                      <h3 className="text-lg font-semibold text-purple-700 mb-3">
                        {lineCount} Lines ({groupedShayari[language][lineCount].length} shayari)
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {groupedShayari[language][lineCount].map((shayari, index) => (
                          <div
                            key={shayari.id}
                            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-purple-100"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                                {shayari.recipient}
                              </span>
                              <span className="text-xs bg-pink-100 text-pink-800 px-2 py-1 rounded-full">
                                {shayari.messageType}
                              </span>
                            </div>
                            
                            <div className="whitespace-pre-line text-gray-800 leading-relaxed mb-4" style={{ 
                              fontFamily: language === 'Hindi' ? "'Noto Sans Devanagari', sans-serif" : "'Georgia', serif",
                              fontSize: language === 'Hindi' ? '1.1rem' : '1rem'
                            }}>
                              {shayari.text}
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <button
                                onClick={() => navigator.clipboard.writeText(shayari.text)}
                                className="text-sm text-purple-600 hover:text-purple-800 font-medium transition"
                              >
                                📋 Copy
                              </button>
                              <span className="text-xs text-gray-500">
                                {new Date(shayari.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            
                            {shayari.story && (
                              <div className="mt-3 pt-3 border-t border-gray-100">
                                <p className="text-xs text-gray-600">
                                  <strong>Story:</strong> {shayari.story.substring(0, 100)}
                                  {shayari.story.length > 100 ? '...' : ''}
                                </p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* Stats */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-6 bg-white rounded-lg shadow-md px-6 py-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-800">{shayariList.length}</div>
                <div className="text-xs text-gray-600">Total Shayari</div>
              </div>
              <div className="w-px h-8 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-800">{languages.length - 1}</div>
                <div className="text-xs text-gray-600">Languages</div>
              </div>
              <div className="w-px h-8 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-800">{filteredShayari.length}</div>
                <div className="text-xs text-gray-600">Filtered</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
