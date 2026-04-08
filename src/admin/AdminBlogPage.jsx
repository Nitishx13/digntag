import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function AdminBlogPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingPost, setEditingPost] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'tutorial',
    featured: false,
    image: '',
    tags: '',
    status: 'draft'
  })

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      // Fetch from localStorage or API
      const savedPosts = localStorage.getItem('blogPosts')
      let posts = []
      
      if (savedPosts) {
        posts = JSON.parse(savedPosts)
      } else {
        // Default sample posts for first time
        posts = [
          {
            id: 1,
            title: 'How to Write Perfect Shayari',
            excerpt: 'Learn the art of creating heartfelt shayari that touches hearts',
            content: 'Creating beautiful shayari is an art that combines emotion, culture, and poetic expression. In this comprehensive guide, we\'ll explore the techniques used by master poets and modern content creators to craft shayari that resonates with readers on a deep emotional level.\n\nWhether you\'re writing for Instagram, WhatsApp status, or personal expression, understanding the fundamentals of shayari creation will help you develop your unique voice and style.',
            category: 'tutorial',
            featured: true,
            image: 'https://via.placeholder.com/400x300?text=Shayari+Tutorial',
            createdAt: '2024-01-15T10:30:00Z',
            author: 'Admin',
            tags: ['shayari', 'tutorial', 'writing', 'hindi', 'english'],
            readTime: '5 min read'
          },
          {
            id: 2,
            title: 'Best Fonts for Poetry Templates',
            excerpt: 'Discover the perfect fonts that make your poetry stand out',
            content: 'The right font can transform your poetry from ordinary to extraordinary. In this guide, we explore the best fonts for different types of shayari - from romantic to motivational, from traditional to modern. Learn how font psychology impacts reader emotions and how to choose the perfect typography for your poetry templates.\n\nWe\'ll cover:\n- Classic Hindi fonts for traditional shayari\n- Modern fonts for contemporary poetry\n- Romantic scripts for love shayari\n- Bold fonts for impactful statements\n- Readability tips for mobile templates',
            category: 'guide',
            featured: false,
            image: 'https://via.placeholder.com/400x300?text=Fonts+Guide',
            createdAt: '2024-01-10T14:20:00Z',
            author: 'Admin',
            tags: ['fonts', 'typography', 'templates', 'design', 'hindi', 'english'],
            readTime: '8 min read'
          },
          {
            id: 3,
            title: '50 Romantic Shayari Ideas',
            excerpt: 'Get inspired with beautiful romantic shayari perfect for expressing feelings',
            content: 'Romance is a universal language that speaks directly to the heart. In this collection, we\'ve curated 50 of the most beautiful and touching romantic shayari that will help you express your deepest feelings.\n\nThis collection includes:\n- Love shayari for new relationships\n- Romantic poetry for long-term partners\n- Heart-touching lines for special moments\n- Modern and traditional romantic expressions\n- Shayari for different relationship stages\n- Perfect for WhatsApp status and Instagram posts\n\nEach shayari is carefully selected for emotional impact and cultural relevance.',
            category: 'inspiration',
            featured: true,
            image: 'https://via.placeholder.com/400x300?text=Romantic+Ideas',
            createdAt: '2024-01-05T09:15:00Z',
            author: 'Admin',
            tags: ['romantic', 'love', 'shayari', 'inspiration', 'hindi', 'english', 'whatsapp'],
            readTime: '6 min read'
          }
        ]
        // Save to localStorage for persistence
        localStorage.setItem('blogPosts', JSON.stringify(posts))
      }
      
      setPosts(posts)
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      if (editingPost) {
        // Update existing post
        console.log('Updating post:', editingPost.id, formData)
        const updatedPost = {
          ...editingPost,
          ...formData,
          updatedAt: new Date().toISOString(),
          author: 'Admin'
        }
        
        // Update posts array
        setPosts(posts.map(post => 
          post.id === editingPost.id 
            ? updatedPost
            : post
        ))
        
        // Update localStorage
        const updatedPosts = posts.map(post => 
          post.id === editingPost.id 
            ? updatedPost
            : post
        )
        localStorage.setItem('blogPosts', JSON.stringify(updatedPosts))
        
        setEditingPost(null)
      } else {
        // Create new post
        console.log('Creating new post:', formData)
        const newPost = {
          id: Date.now(),
          ...formData,
          createdAt: new Date().toISOString(),
          author: 'Admin',
          status: 'published'
        }
        
        const updatedPosts = [newPost, ...posts]
        setPosts(updatedPosts)
        localStorage.setItem('blogPosts', JSON.stringify(updatedPosts))
      }
      
      // Reset form
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        category: 'tutorial',
        featured: false,
        image: '',
        tags: '',
        status: 'draft'
      })
      setShowForm(false)
      
      // Show success message
      alert(editingPost ? 'Post updated successfully!' : 'Post created successfully!')
    } catch (error) {
      console.error('Error saving post:', error)
      alert('Error saving post. Please try again.')
    }
  }

  const handleEdit = (post) => {
    setEditingPost(post)
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      featured: post.featured,
      image: post.image,
      tags: post.tags || '',
      status: post.status || 'draft'
    })
    setShowForm(true)
  }

  const handleDelete = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        console.log('Deleting post:', postId)
        // API call to delete post would go here
        setPosts(posts.filter(post => post.id !== postId))
      } catch (error) {
        console.error('Error deleting post:', error)
      }
    }
  }

  const toggleFeatured = async (postId) => {
    try {
      console.log('Toggling featured status for post:', postId)
      // API call to update featured status would go here
      setPosts(posts.map(post => 
        post.id === postId 
          ? { ...post, featured: !post.featured }
          : post
      ))
    } catch (error) {
      console.error('Error updating featured status:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading blog posts...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
            <div className="flex gap-4">
              <button
                onClick={() => setShowForm(!showForm)}
                className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
              >
                {showForm ? 'Cancel' : 'Create New Post'}
              </button>
              <Link
                to="/admin"
                className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>

        {/* Blog Form */}
        {showForm && (
          <div className="mb-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {editingPost ? 'Edit Blog Post' : 'Create New Blog Post'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter blog post title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="tutorial">Tutorial</option>
                    <option value="guide">Guide</option>
                    <option value="inspiration">Inspiration</option>
                    <option value="news">News</option>
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Excerpt
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  rows={3}
                  placeholder="Brief description for preview"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  rows={10}
                  placeholder="Write your blog post content here..."
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({...formData, tags: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="shayari, tutorial, writing, hindi"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Image URL
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                    className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <label htmlFor="featured" className="ml-2 text-sm font-medium text-gray-700">
                    Featured Post
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
                >
                  {editingPost ? 'Update Post' : 'Create Post'}
                </button>
                {showForm && (
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false)
                      setEditingPost(null)
                      setFormData({
                        title: '',
                        excerpt: '',
                        content: '',
                        category: 'tutorial',
                        featured: false,
                        image: '',
                        tags: '',
                        status: 'draft'
                      })
                    }}
                    className="px-6 py-3 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition"
                  >
                    Clear
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {/* Blog Posts List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Blog Posts ({posts.length})
            </h2>
          </div>

          {posts.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <div className="text-6xl mb-4">📝</div>
              <p>No blog posts yet. Create your first post above!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Featured
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tags
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {posts.map((post) => (
                    <tr key={post.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {post.image && (
                            <img 
                              src={post.image} 
                              alt={post.title}
                              className="h-12 w-12 rounded object-cover mr-3"
                            />
                          )}
                          <div>
                            <div className="text-sm font-medium text-gray-900">{post.title}</div>
                            <div className="text-xs text-gray-500">{post.category}</div>
                            {post.tags && (
                              <div className="text-xs text-gray-400 mt-1">
                                {post.tags.split(',').slice(0, 3).map((tag, index) => (
                                  <span key={index} className="inline-block bg-gray-100 text-gray-600 px-2 py-1 rounded-full mr-1">
                                    {tag.trim()}
                                  </span>
                                ))}
                                {post.tags.split(',').length > 3 && (
                                  <span className="text-xs text-gray-400">+{post.tags.split(',').length - 3}</span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          post.category === 'tutorial' ? 'bg-purple-100 text-purple-800' :
                          post.category === 'guide' ? 'bg-blue-100 text-blue-800' :
                          post.category === 'inspiration' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {post.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          post.status === 'published' ? 'bg-green-100 text-green-800' :
                          post.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {post.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => toggleFeatured(post.id)}
                          className={`px-3 py-1 text-xs font-semibold rounded-full transition ${
                            post.featured 
                              ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' 
                              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          }`}
                        >
                          {post.featured ? '★ Featured' : '☆ Feature'}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(post)}
                            className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full hover:bg-blue-700 transition"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded-full hover:bg-red-700 transition"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-2xl font-bold text-purple-600 mb-2">{posts.length}</div>
            <div className="text-sm text-gray-600">Total Posts</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-2xl font-bold text-green-600 mb-2">
              {posts.filter(post => post.featured).length}
            </div>
            <div className="text-sm text-gray-600">Featured Posts</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-2xl font-bold text-blue-600 mb-2">
              {posts.filter(post => post.status === 'published').length}
            </div>
            <div className="text-sm text-gray-600">Published</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-2xl font-bold text-yellow-600 mb-2">
              {posts.filter(post => post.status === 'draft').length}
            </div>
            <div className="text-sm text-gray-600">Drafts</div>
          </div>
        </div>
      </div>
    </div>
  )
}
