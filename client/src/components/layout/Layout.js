// src/components/layout/Layout.js

import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import useUIStore from '@/store/uiStore';

export default function Layout({ children }) {
  const { activeLayer, colorMode, sidebarOpen } = useUIStore();
  
  return (
    <div className={`min-h-screen flex flex-col ${colorMode === 'dark' ? 'dark' : ''}`}>
      <Navbar />
      <div className="flex flex-1 pt-16"> {/* pt-16 to account for navbar height */}
        <Sidebar />
        <main 
          className={`flex-1 transition-all duration-300 bg-[#f9f9ff] dark:bg-[#1a1a2e] p-4 md:p-6 ${
            sidebarOpen ? 'md:ml-64' : 'md:ml-20'
          }`}
          data-active-layer={activeLayer}
        >
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}