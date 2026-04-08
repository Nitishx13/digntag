import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SiteHeader from './components/SiteHeaderSimple.jsx'
import SiteFooter from './components/SiteFooter.jsx'

export default function HomePage() {
  const [blogPosts, setBlogPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBlogPosts()
  }, [])

  const fetchBlogPosts = async () => {
    try {
      // Fetch from localStorage where admin saves blog posts
      const savedPosts = localStorage.getItem('blogPosts')
      if (savedPosts) {
        const posts = JSON.parse(savedPosts)
        // Get only published posts and sort by date
        const publishedPosts = posts
          .filter(post => post.status === 'published')
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 3) // Show only 3 most recent posts
        setBlogPosts(publishedPosts)
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      <SiteHeader />
      
      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-indigo-600 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container mx-auto px-4 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              Create Beautiful Lines
              <span className="block text-yellow-300">For Someone Instantly</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl mb-8 sm:mb-12 max-w-3xl mx-auto opacity-90">
              Transform your emotions into heartfelt poetry, stunning templates, and shareable social media posts
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/poet" 
                className="px-8 py-4 bg-yellow-400 text-gray-900 font-bold rounded-full hover:bg-yellow-300 transition transform hover:scale-105 shadow-xl text-lg"
              >
                ✍️ Start Creating
              </Link>
              <Link 
                to="/templates" 
                className="px-8 py-4 bg-white text-purple-600 font-bold rounded-full hover:bg-gray-100 transition transform hover:scale-105 shadow-xl text-lg"
              >
                🎨 Make Templates
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-pink-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-indigo-400 rounded-full opacity-20 animate-pulse"></div>
      </section>

      
      {/* Features Section */}
      <section id="features" className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Powerful Features
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to create, customize, and share beautiful poetry
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-100 hover:shadow-lg transition group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition">🌍</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Multiple Languages</h3>
              <p className="text-gray-600 leading-relaxed">
                Create poetry in Hindi, English and more languages with perfect translations and cultural nuances
              </p>
              <ul className="mt-4 text-sm text-gray-500 space-y-1">
                <li>• Hindi & English support</li>
                <li>• Cultural context</li>
                <li>• Perfect translations</li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-pink-50 to-indigo-50 p-8 rounded-2xl border border-pink-100 hover:shadow-lg transition group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition">🎨</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Custom Templates</h3>
              <p className="text-gray-600 leading-relaxed">
                Design stunning templates with custom backgrounds, fonts, colors, and perfect text positioning
              </p>
              <ul className="mt-4 text-sm text-gray-500 space-y-1">
                <li>• Custom backgrounds</li>
                <li>• Font styling</li>
                <li>• Text positioning</li>
                <li>• Color controls</li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl border border-indigo-100 hover:shadow-lg transition group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition">📱</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Social Media Ready</h3>
              <p className="text-gray-600 leading-relaxed">
                Perfect dimensions and formats for Instagram, WhatsApp, Facebook and all social platforms
              </p>
              <ul className="mt-4 text-sm text-gray-500 space-y-1">
                <li>• Instagram posts</li>
                <li>• WhatsApp status</li>
                <li>• Facebook sharing</li>
                <li>• Multiple formats</li>
              </ul>
            </div>

            {/* Feature 4 */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl border border-green-100 hover:shadow-lg transition group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition">⚡</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">AI-Powered</h3>
              <p className="text-gray-600 leading-relaxed">
                Advanced AI technology for instant poetry generation with emotional intelligence and creativity
              </p>
              <ul className="mt-4 text-sm text-gray-500 space-y-1">
                <li>• Instant generation</li>
                <li>• Emotional intelligence</li>
                <li>• Creative suggestions</li>
                <li>• Context awareness</li>
              </ul>
            </div>

            {/* Feature 5 */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-2xl border border-yellow-100 hover:shadow-lg transition group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition">💝</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Easy Sharing</h3>
              <p className="text-gray-600 leading-relaxed">
                One-click download and seamless sharing to all social media platforms and messaging apps
              </p>
              <ul className="mt-4 text-sm text-gray-500 space-y-1">
                <li>• One-click download</li>
                <li>• Direct sharing</li>
                <li>• Multiple formats</li>
                <li>• High quality export</li>
              </ul>
            </div>

            {/* Feature 6 */}
            <div className="bg-gradient-to-br from-red-50 to-pink-50 p-8 rounded-2xl border border-red-100 hover:shadow-lg transition group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition">❤️</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Emotional Impact</h3>
              <p className="text-gray-600 leading-relaxed">
                Create heartfelt poetry that touches hearts and expresses true emotions beautifully
              </p>
              <ul className="mt-4 text-sm text-gray-500 space-y-1">
                <li>• Heartfelt expressions</li>
                <li>• True emotions</li>
                <li>• Cultural relevance</li>
                <li>• Personal touch</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="py-16 sm:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Creative Tools
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Essential tools for creating beautiful poetry and templates
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Tool 1 - Line Generator */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition group">
              <div className="text-4xl mb-6 group-hover:scale-110 transition">✍️</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Line Generator</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Create beautiful shayari and poetry lines instantly with AI-powered technology. Generate heartfelt romantic lines, friendship quotes, birthday wishes, anniversary messages, and more in Hindi, English, and multiple languages. Perfect for social media posts, greeting cards, and special occasions.
              </p>
              
              {/* Google AdSense Place */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-center">
                <div className="text-xs text-gray-500 mb-2">Advertisement</div>
                <div className="bg-gray-200 rounded h-16 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">AdSense Ad Space</span>
                </div>
              </div>
              
              <a 
                href="https://www.digntag.in/poet" 
                className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                Generate Lines →
              </a>
            </div>

            {/* Tool 2 - Template Designer */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition group">
              <div className="text-4xl mb-6 group-hover:scale-110 transition">🎨</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Template Designer</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Design stunning templates with custom backgrounds, fonts, and perfect text positioning. Create beautiful social media posts, greeting cards, and digital art with our professional template designer. Perfect for Instagram, WhatsApp, Facebook and all social platforms.
              </p>
              
              {/* Google AdSense Place */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-center">
                <div className="text-xs text-gray-500 mb-2">Advertisement</div>
                <div className="bg-gray-200 rounded h-16 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">AdSense Ad Space</span>
                </div>
              </div>
              
              <a 
                href="https://www.digntag.in/templates" 
                className="inline-flex items-center px-6 py-3 bg-pink-600 text-white font-semibold rounded-full hover:bg-pink-700 transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                Design Templates →
              </a>
            </div>

            {/* Tool 3 - Gift Finder */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition group">
              <div className="text-4xl mb-6 group-hover:scale-110 transition">🎁</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Gift Finder</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Find the perfect poetry gifts for birthdays, anniversaries, and special occasions. Discover personalized poetry gifts, romantic shayari collections, friendship quotes, and heartfelt messages. Create lasting memories with our curated gift selection for every relationship and celebration.
              </p>
              
              {/* Google AdSense Place */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-center">
                <div className="text-xs text-gray-500 mb-2">Advertisement</div>
                <div className="bg-gray-200 rounded h-16 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">AdSense Ad Space</span>
                </div>
              </div>
              
              <a 
                href="https://www.digntag.in/gift-finder" 
                className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                Find Gifts →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Gift Section */}
      <section id="gift" className="py-16 sm:py-24 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Perfect Gifts for Loved Ones
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Create personalized poetry gifts that touch hearts and create lasting memories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Gift 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
              <div className="text-4xl mb-4">💝</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Birthday Poetry</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Personalized birthday shayari and wishes for special celebrations
              </p>
              <a 
                href="https://www.digntag.in/gift-finder" 
                className="inline-flex items-center px-6 py-3 bg-pink-600 text-white font-semibold rounded-full hover:bg-pink-700 transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                Create Birthday Gift →
              </a>
            </div>

            {/* Gift 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
              <div className="text-4xl mb-4">💕</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Anniversary Love</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Beautiful anniversary poetry to celebrate your love story
              </p>
              <a 
                href="https://www.digntag.in/gift-finder" 
                className="inline-flex items-center px-6 py-3 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                Create Anniversary Gift →
              </a>
            </div>

            {/* Gift 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
              <div className="text-4xl mb-4">🌹</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Friendship Special</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Heartfelt poetry to celebrate precious friendships
              </p>
              <a 
                href="https://www.digntag.in/gift-finder" 
                className="inline-flex items-center px-6 py-3 bg-yellow-600 text-white font-semibold rounded-full hover:bg-yellow-700 transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                Create Friendship Gift →
              </a>
            </div>

            {/* Gift 4 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
              <div className="text-4xl mb-4">🎊</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Congratulations</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Celebrate achievements and special moments with poetry
              </p>
              <a 
                href="https://www.digntag.in/gift-finder" 
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                Create Congratulations Gift →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Latest from Our Blog
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tips, guides, and inspiration for creating beautiful poetry
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="text-xl text-gray-600">Loading blog posts...</div>
            </div>
          ) : blogPosts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-gray-600">No blog posts yet. Check back soon!</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post, index) => (
                  <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition group">
                    {post.image ? (
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className={`h-48 bg-gradient-to-br ${
                        index === 0 ? 'from-purple-400 to-pink-400' :
                        index === 1 ? 'from-indigo-400 to-blue-400' :
                        'from-green-400 to-teal-400'
                      }`}></div>
                    )}
                    <div className="p-6">
                      <div className={`text-xs font-semibold mb-2 ${
                        post.category === 'tutorial' ? 'text-purple-600' :
                        post.category === 'guide' ? 'text-indigo-600' :
                        post.category === 'inspiration' ? 'text-green-600' :
                        'text-gray-600'
                      }`}>
                        {post.category.toUpperCase()}
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500">
                          {new Date(post.createdAt).toLocaleDateString()}
                          {post.readTime && ` • ${post.readTime}`}
                        </div>
                        <Link 
                          to={`/blog/${post.id}`} 
                          className={`inline-flex items-center font-semibold hover:underline transition ${
                            post.category === 'tutorial' ? 'text-purple-600 hover:text-purple-700' :
                            post.category === 'guide' ? 'text-indigo-600 hover:text-indigo-700' :
                            post.category === 'inspiration' ? 'text-green-600 hover:text-green-700' :
                            'text-gray-600 hover:text-gray-700'
                          }`}
                        >
                          Read More →
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="text-center mt-12">
                <Link 
                  to="/blog" 
                  className="inline-flex items-center px-8 py-3 bg-gray-800 text-white font-semibold rounded-full hover:bg-gray-900 transition"
                >
                  View All Blog Posts →
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 sm:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about creating poetry and templates
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {/* FAQ 1 */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                How do I create poetry in different languages?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Simply select your preferred language (Hindi, English, etc.) in the poetry generator, choose the recipient and occasion, and our AI will create beautiful poetry in your chosen language with cultural context and proper translations.
              </p>
            </div>

            {/* FAQ 2 */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                Can I customize the templates?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Yes! Our template designer offers full customization including background images, text colors, fonts, positioning, and sizes. You can create unique designs perfect for Instagram, WhatsApp, and all social media platforms.
              </p>
            </div>

            {/* FAQ 3 */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                Is the service really free?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Absolutely! There are no hidden costs, subscriptions, or limits. You can create unlimited poetry and templates, download them in high quality, and share without any watermarks or restrictions.
              </p>
            </div>

            {/* FAQ 4 */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                What formats are available for download?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We support multiple high-quality formats including PNG for images, and text formats for copying. Templates are optimized for social media platforms with perfect dimensions for Instagram posts, WhatsApp status, Facebook sharing, and more.
              </p>
            </div>

            {/* FAQ 5 */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                How do I share my creations?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Sharing is easy! You can download your creations and share directly to social media platforms, messaging apps, or with friends and family. We also provide direct sharing options for seamless distribution.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/faq" 
              className="inline-flex items-center px-8 py-3 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition"
            >
              View All FAQs →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Create Something Beautiful?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users creating heartfelt poetry every day
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/poet" 
              className="px-8 py-4 bg-white text-purple-600 font-bold rounded-full hover:bg-gray-100 transition transform hover:scale-105 shadow-xl text-lg"
            >
              ✍️ Create Poetry
            </Link>
            <Link 
              to="/templates" 
              className="px-8 py-4 bg-yellow-400 text-gray-900 font-bold rounded-full hover:bg-yellow-300 transition transform hover:scale-105 shadow-xl text-lg"
            >
              🎨 Make Templates
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  )
}
