import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us - Digntag',
  description: 'Learn more about Digntag and our mission to revolutionize digital identity management.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            About <span className="text-blue-600">Digntag</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Empowering your digital presence with innovative solutions
          </p>
        </div>

        <div className="mt-16">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            <div className="mb-12 lg:mb-0">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="prose prose-lg text-gray-500 space-y-6">
                <p>
                  Founded in 2023, Digntag was born from a simple idea: to make digital identity management 
                  accessible to everyone. We believe that in today's digital world, your online presence 
                  should be as unique and professional as you are.
                </p>
                <p>
                  Our team of passionate developers and designers work tirelessly to create tools that help 
                  individuals and businesses establish a strong, cohesive digital identity across all platforms.
                </p>
              </div>
            </div>

            <div className="lg:mt-0">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <div className="prose prose-lg text-gray-500 space-y-6">
                <p>
                  At Digntag, we're on a mission to simplify digital identity management. We want to help 
                  you create a professional online presence that truly represents who you are and what you do.
                </p>
                <p>
                  Whether you're an individual professional, a small business, or a large enterprise, our 
                  tools are designed to help you stand out in the digital landscape.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-20">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: 'Innovation',
                  description: 'We constantly push boundaries to deliver cutting-edge solutions that set new standards in digital identity management.'
                },
                {
                  name: 'Simplicity',
                  description: 'We believe in making complex technology simple and accessible to everyone, regardless of technical expertise.'
                },
                {
                  name: 'Integrity',
                  description: 'We build trust through transparency, honesty, and by always putting our users first in every decision we make.'
                }
              ].map((value) => (
                <div key={value.name} className="pt-6
                ">
                  <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8 h-full">
                    <div className="-mt-6">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                        <span className="text-xl font-bold">{value.name[0]}</span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900">{value.name}</h3>
                      <p className="mt-5 text-base text-gray-500">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Ready to get started?</h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-8">
              Join thousands of satisfied users who trust Digntag for their digital identity needs.
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Get Started Today
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
