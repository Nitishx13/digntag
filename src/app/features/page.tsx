import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Features - Digntag',
  description: 'Discover the powerful features of Digntag for managing your digital identity and business growth.',
};

export default function FeaturesPage() {
  const features = [
    {
      title: 'Digital ID Cards',
      description: 'Create professional digital business cards that you can share with anyone, anywhere. Update your information in real-time without reprinting.',
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      link: '/#digital-id'
    },
    {
      title: 'Business Profiles',
      description: 'Showcase your business with a professional profile that includes all your important information, services, and contact details in one place.',
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      link: '/#business-profiles'
    },
    {
      title: 'Networking Tools',
      description: 'Connect with other professionals, exchange digital cards, and grow your network with our powerful networking tools.',
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      link: '/#networking'
    },
    {
      title: 'Analytics',
      description: 'Track who views your profile, which links get the most clicks, and gain valuable insights to grow your professional presence.',
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      link: '/#analytics'
    }
  ];

  return (
    <main className="min-h-screen pt-24 pb-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Powerful <span className="text-blue-600">Features</span>
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500">
            Everything you need to manage your digital identity and grow your professional network
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2">
          {features.map((feature, index) => (
            <div key={index} className="relative">
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-white">
                {feature.icon}
              </div>
              <div className="ml-16">
                <h3 className="text-lg font-medium text-gray-900">
                  <a href={feature.link} className="hover:text-blue-600 transition-colors">
                    {feature.title}
                    <span className="absolute inset-0" aria-hidden="true"></span>
                  </a>
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  {feature.description}
                </p>
                <div className="mt-3">
                  <a href={feature.link} className="text-sm font-medium text-blue-600 hover:text-blue-500">
                    Learn more <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-blue-50 rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Ready to get started?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Join thousands of professionals who trust Digntag for their digital identity needs.
            </p>
            <div className="mt-8 flex justify-center">
              <a
                href="/signup"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Get Started Today
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
