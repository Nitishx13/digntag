import React, { useEffect, useState } from 'react'

export default function ShayariManagement() {
  const [shayariDatabase, setShayariDatabase] = useState({})
  const [newShayari, setNewShayari] = useState('')
  const [recipient, setRecipient] = useState('')
  const [messageType, setMessageType] = useState('')
  const [language, setLanguage] = useState('Hindi')
  const [lineCount, setLineCount] = useState('4')
  const [story, setStory] = useState('')
  const [shayariLoading, setShayariLoading] = useState(false)
  const [addShayariLoading, setAddShayariLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  // Message type options based on recipient
  const getMessageOptions = () => {
    if (!recipient) return []
    
    if (recipient.includes('Partner') || recipient.includes('Lover') || recipient.includes('Crush')) {
      return [
        'Love and Romance',
        'Missing You',
        'Anniversary',
        'Birthday',
        'Good Morning/Good Night',
        'Thinking of You'
      ]
    } else if (recipient.includes('Mother') || recipient.includes('Father') || recipient.includes('Parents')) {
      return [
        'Thank You',
        'Birthday Wishes',
        'Anniversary',
        'Congratulations',
        'Good Morning/Good Night'
      ]
    } else if (recipient.includes('Friend') || recipient.includes('Best friend')) {
      return [
        'Friendship',
        'Missing You',
        'Birthday',
        'Congratulations',
        'Good Morning/Good Night',
        'Thinking of You'
      ]
    } else if (recipient.includes('Teacher') || recipient.includes('Mentor') || recipient.includes('Colleague') || recipient.includes('Boss')) {
      return [
        'Thank You',
        'Congratulations',
        'Good Morning/Good Night',
        'Farewell'
      ]
    } else {
      return [
        'Birthday',
        'Congratulations',
        'Thank You',
        'Good Morning/Good Night',
        'Thinking of You'
      ]
    }
  }

  const loadShayariFromDatabase = async () => {
    setShayariLoading(true)
    setErrorMessage('')
    try {
      console.log('Loading shayari from database...')
      const response = await fetch('/api/admin-shayari-manage')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const result = await response.json()
      console.log('Shayari response:', result)
      if (result.success) {
        setShayariDatabase(result.data || {})
        console.log('Shayari database loaded:', result.data)
        
        // Show success message if shayari is available
        const totalShayari = Object.values(result.data || {}).reduce((sum, lang) => 
          sum + Object.values(lang).reduce((langSum, count) => 
            langSum + count.length, 0), 0
        )
        
        if (totalShayari > 0) {
          setSuccessMessage(`✅ ${totalShayari} shayari available in database!`)
        } else {
          setSuccessMessage('')
        }
      } else {
        console.error('API returned error:', result.error)
        setErrorMessage('Error loading shayari: ' + result.error)
      }
    } catch (error) {
      console.error('Error loading shayari:', error)
      setShayariDatabase({})
      setErrorMessage('Error loading shayari: ' + error.message)
    } finally {
      setShayariLoading(false)
    }
  }

  useEffect(() => {
    loadShayariFromDatabase()
  }, [])

  const onAddShayari = async (e) => {
    e.preventDefault()
    console.log('Add Shayari button clicked!')
    console.log('Form data:', { recipient, messageType, language, lineCount, story, newShayari })
    
    setErrorMessage('')
    setSuccessMessage('')
    
    if (!newShayari.trim() || !recipient.trim() || !language.trim() || !lineCount.trim()) {
      setErrorMessage('⚠️ Please fill in all required fields (Recipient, Language, Line Count, and Shayari Text)')
      return
    }
    
    setAddShayariLoading(true)
    
    try {
      console.log('Sending request to API...')
      const response = await fetch('/api/admin-shayari-manage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: language,
          lineCount: lineCount,
          text: newShayari,
          recipient: recipient,
          messageType: messageType,
          story: story
        })
      })
      
      console.log('Response status:', response.status)
      const result = await response.json()
      console.log('API response:', result)
      
      if (result.success) {
        console.log('Shayari added successfully!')
        await loadShayariFromDatabase()
        // Reset form
        setNewShayari('')
        setRecipient('')
        setMessageType('')
        setStory('')
        setSuccessMessage('✅ Shayari added successfully! Now available in database.')
      } else {
        console.error('API error:', result.error)
        setErrorMessage('❌ Error adding shayari: ' + result.error)
      }
    } catch (error) {
      console.error('Network error:', error)
      setErrorMessage('❌ Error adding shayari: ' + error.message)
    } finally {
      setAddShayariLoading(false)
    }
  }

  const onDeleteShayari = async (id) => {
    if (!confirm('Are you sure you want to delete this shayari?')) return
    
    try {
      const response = await fetch(`/api/admin-shayari-manage?id=${id}`, {
        method: 'DELETE'
      })
      
      const result = await response.json()
      if (result.success) {
        await loadShayariFromDatabase()
      } else {
        alert('Error deleting shayari: ' + result.error)
      }
    } catch (error) {
      console.error('Error deleting shayari:', error)
      alert('Error deleting shayari')
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-primary">Shayari Management</h1>
        <p className="text-gray-600 mt-2">Add and manage shayari for the poetry generator.</p>
      </div>

      {/* Success and Error Messages */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="text-green-800 font-medium">{successMessage}</div>
        </div>
      )}
      
      {errorMessage && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="text-red-800 font-medium">{errorMessage}</div>
        </div>
      )}

      <div className="flex items-end justify-between gap-6 flex-wrap">
        <div></div>
        <button
          type="button"
          onClick={loadShayariFromDatabase}
          className="inline-flex px-4 py-2 bg-white text-primary font-bold rounded-full shadow-lg hover:bg-gray-50 transition duration-150 ring-1 ring-gray-100"
          disabled={shayariLoading}
        >
          {shayariLoading ? 'Loading...' : 'Refresh'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6">
          <h2 className="font-extrabold text-primary">Add New Shayari</h2>
          <form className="mt-4 space-y-6" onSubmit={onAddShayari}>
            {/* Who is this for? */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Who is this for? *</label>
              <div className="flex flex-wrap gap-2">
                {['Partner', 'Lover', 'Crush', 'Mother', 'Father', 'Parents', 'Friend', 'Best friend', 'Teacher', 'Mentor', 'Colleague', 'Boss', 'Sister', 'Brother', 'Other'].map((relation) => (
                  <button 
                    key={relation} 
                    type="button"
                    className={`px-4 py-2 rounded-full border transition hover:opacity-80 ${
                      recipient === relation ? '' : ''
                    }`}
                    style={{ 
                      borderColor: '#F5668D', 
                      backgroundColor: recipient === relation ? '#F5668D' : 'transparent',
                      color: recipient === relation ? 'white' : '#34161E'
                    }}
                    onClick={() => {
                      setRecipient(relation)
                      setMessageType('') // Reset message type when recipient changes
                    }}
                  >
                    {relation}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Type */}
            {recipient && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Message Type</label>
                <div className="flex flex-wrap gap-2">
                  {getMessageOptions().map((option) => (
                    <button 
                      key={option} 
                      type="button"
                      className={`px-4 py-2 rounded-full border transition hover:opacity-80 ${
                        messageType === option ? '' : ''
                      }`}
                      style={{ 
                        borderColor: '#F5668D', 
                        backgroundColor: messageType === option ? '#F5668D' : 'transparent',
                        color: messageType === option ? 'white' : '#34161E'
                      }}
                      onClick={() => setMessageType(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Language */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Language *</label>
              <div className="flex flex-wrap gap-2">
                {['Hindi', 'English'].map((lang) => (
                  <button 
                    key={lang} 
                    type="button"
                    className={`px-4 py-2 rounded-full border transition hover:opacity-80 ${
                      language === lang ? '' : ''
                    }`}
                    style={{ 
                      borderColor: '#F5668D', 
                      backgroundColor: language === lang ? '#F5668D' : 'transparent',
                      color: language === lang ? 'white' : '#34161E'
                    }}
                    onClick={() => setLanguage(lang)}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Line Count */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Line Count *</label>
              <div className="flex flex-wrap gap-2">
                {['2', '4', '8'].map((count) => (
                  <button 
                    key={count} 
                    type="button"
                    className={`px-4 py-2 rounded-full border transition hover:opacity-80 ${
                      lineCount === count ? '' : ''
                    }`}
                    style={{ 
                      borderColor: '#F5668D', 
                      backgroundColor: lineCount === count ? '#F5668D' : 'transparent',
                      color: lineCount === count ? 'white' : '#34161E'
                    }}
                    onClick={() => setLineCount(count)}
                  >
                    {count === '8' ? '8 Lines' : `${count} Lines`}
                  </button>
                ))}
              </div>
            </div>

            {/* Add your story */}
            <div>
              <div className="flex items-center mb-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full text-white mr-3"
                  style={{ backgroundColor: '#F5668D', fontSize: '0.8rem' }}
                >✒️</span>
                <label className="text-sm font-semibold text-gray-700">Add your story</label>
              </div>
              <textarea
                value={story}
                onChange={(e) => setStory(e.target.value)}
                placeholder="Optional: Share any special memories, inside jokes, or details that would make this shayari more personal..."
                className="w-full p-4 border rounded-lg resize-none"
                style={{ borderColor: '#F5668D', backgroundColor: '#FFF4F7' }}
                rows={4}
              />
            </div>

            {/* Shayari Text */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Shayari Text *</label>
              <textarea
                value={newShayari}
                onChange={(e) => setNewShayari(e.target.value)}
                className="w-full p-4 border rounded-lg resize-none"
                style={{ borderColor: '#F5668D', backgroundColor: '#FFF4F7' }}
                rows={6}
                placeholder="Enter shayari here... Use \n\n for paragraph breaks"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full px-8 py-3 rounded-full text-white font-semibold transition disabled:opacity-50"
              style={{ backgroundColor: '#F5668D' }}
              disabled={addShayariLoading || !recipient || !language || !lineCount || !newShayari.trim()}
            >
              {addShayariLoading ? 'Adding...' : 'Add Shayari'}
            </button>
          </form>
        </div>

        <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6">
          <h2 className="font-extrabold text-primary">Current Shayari Database</h2>
          
          {/* Database Stats */}
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-white rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-primary">
                {Object.values(shayariDatabase).reduce((sum, lang) => 
                  sum + Object.values(lang).reduce((langSum, count) => 
                    langSum + count.length, 0), 0
                )}
              </div>
              <div className="text-xs text-gray-600">Total Shayari</div>
            </div>
            <div className="bg-white rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-primary">{Object.keys(shayariDatabase).length}</div>
              <div className="text-xs text-gray-600">Languages</div>
            </div>
            <div className="bg-white rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-primary">
                {Object.values(shayariDatabase).reduce((sum, lang) => 
                  sum + Object.keys(lang).length, 0
                )}
              </div>
              <div className="text-xs text-gray-600">Categories</div>
            </div>
            <div className="bg-white rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-primary">
                {Object.values(shayariDatabase).reduce((sum, lang) => 
                  sum + Object.values(lang).reduce((langSum, count) => 
                    langSum + count.filter(s => s.recipient).length, 0), 0
                )}
              </div>
              <div className="text-xs text-gray-600">With Recipient</div>
            </div>
          </div>

          <div className="mt-4 space-y-4 max-h-96 overflow-auto">
            {shayariLoading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <div className="text-gray-600 mt-2">Loading shayari database...</div>
              </div>
            ) : Object.keys(shayariDatabase).length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-600">No shayari in database yet.</div>
                <div className="text-sm text-gray-500 mt-2">Add your first shayari using the form!</div>
              </div>
            ) : (
              Object.keys(shayariDatabase).map((language) => (
                <div key={language} className="border border-gray-200 rounded-xl p-4 bg-white">
                  <h3 className="font-bold text-primary flex items-center justify-between">
                    {language}
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                      {Object.values(shayariDatabase[language]).reduce((sum, count) => sum + count.length, 0)} shayari
                    </span>
                  </h3>
                  {Object.keys(shayariDatabase[language]).map((lineCount) => (
                    <div key={lineCount} className="mt-3">
                      <h4 className="text-sm font-semibold text-gray-700 flex items-center justify-between">
                        {lineCount === '8' ? '8 Lines' : `${lineCount} Lines`}
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {shayariDatabase[language][lineCount].length} items
                        </span>
                      </h4>
                      <div className="mt-2 space-y-2">
                        {shayariDatabase[language][lineCount].map((shayari) => (
                          <div key={shayari.id} className="flex items-start justify-between gap-3 rounded-lg border border-gray-100 bg-gray-50 p-3 hover:bg-gray-100 transition">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                {shayari.recipient && (
                                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                                    {shayari.recipient}
                                  </span>
                                )}
                                {shayari.message_type && (
                                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                    {shayari.message_type}
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-800 whitespace-pre-line">{shayari.text}</p>
                              <div className="text-xs text-gray-500 mt-1">
                                Added: {new Date(shayari.created_at).toLocaleDateString()} at {new Date(shayari.created_at).toLocaleTimeString()}
                              </div>
                              {shayari.story && (
                                <div className="mt-2 p-2 bg-yellow-50 rounded text-xs text-gray-700">
                                  <strong>Story:</strong> {shayari.story.substring(0, 100)}{shayari.story.length > 100 ? '...' : ''}
                                </div>
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={() => onDeleteShayari(shayari.id)}
                              className="text-red-600 hover:text-red-800 text-sm font-bold px-2 py-1 rounded hover:bg-red-50 transition"
                            >
                              Delete
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
