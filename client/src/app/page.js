// src/app/page.js

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiClock, FiMapPin, FiUsers, FiTarget } from 'react-icons/fi';

export default function Home() {
  const features = [
    {
      icon: <FiClock size={40} className="text-purple-600" />,
      title: 'Time Layer',
      description: 'Schedule-aware interfaces that adapt to your academic calendar and personal schedule.'
    },
    {
      icon: <FiMapPin size={40} className="text-purple-600" />,
      title: 'Place Layer',
      description: 'Location-based services that provide contextual information based on where you are on campus.'
    },
    {
      icon: <FiUsers size={40} className="text-purple-600" />,
      title: 'Social Layer',
      description: 'People-centered features that connect you with classmates, faculty, and university staff.'
    },
    {
      icon: <FiTarget size={40} className="text-purple-600" />,
      title: 'Need Layer',
      description: 'Activity-driven interfaces that adapt to your current needs and activities.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50 dark:from-[#1a1a2e] dark:to-[#16213e]">
      {/* Hero Section */}
      <div className="relative pt-16 pb-32 flex content-center items-center justify-center" style={{ minHeight: '85vh' }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center">
            <div className="w-full md:w-6/12 px-4 mr-auto ml-auto text-center md:text-left">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight text-gray-900 dark:text-white mb-6">
                Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">NeoUni</span>
              </h1>
              <p className="text-xl leading-relaxed mt-4 mb-8 text-gray-600 dark:text-gray-300">
                Experience university life through parallel realities, tailored to your schedule, location, social connections, and needs.
              </p>
              <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center md:justify-start">
                <Link href="/login" className="px-8 py-3 bg-purple-600 text-white font-bold rounded-md hover:bg-purple-700 transition-colors">
                  Sign In
                </Link>
                <Link href="/register" className="px-8 py-3 border border-purple-600 text-purple-600 font-bold rounded-md hover:bg-purple-50 dark:hover:bg-purple-900 transition-colors">
                  Register
                </Link>
              </div>
            </div>
            <div className="w-full md:w-5/12 px-4 mr-auto ml-auto mt-12 md:mt-0">
              <Image 
                src="/images/neouniversity.png" 
                alt="NeoUni App" 
                width={600} 
                height={400}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-[#1a1a2e]">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center text-center mb-16">
            <div className="w-full lg:w-6/12 px-4">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Parallel Reality Layers</h2>
              <p className="text-lg leading-relaxed m-4 text-gray-600 dark:text-gray-400">
                Experience the university in four interconnected reality layers, each providing a unique perspective.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap">
            {features.map((feature, index) => (
              <div key={index} className="w-full md:w-6/12 lg:w-3/12 px-4 text-center mb-12">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-purple-600">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center">
            <div className="w-full lg:w-7/12 px-4 ml-auto mr-auto text-center">
              <h2 className="text-4xl font-bold text-white mb-6">Ready to experience the future of university life?</h2>
              <p className="text-xl text-purple-200 mb-8">
                Join NeoUni today and discover a new way to interact with your academic environment.
              </p>
              <Link href="/register" className="px-8 py-3 bg-white text-purple-600 font-bold rounded-md hover:bg-gray-100 transition-colors">
                Get Started Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}