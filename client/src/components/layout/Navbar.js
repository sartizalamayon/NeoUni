// src/components/layout/Navbar.js

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FiMenu, FiBell, FiSettings, FiLogOut, FiMoon, FiSun } from 'react-icons/fi';
import useUIStore from '@/store/uiStore';
import useAuthStore from '@/store/authStore';

export default function Navbar() {
  const router = useRouter();
  const { toggleSidebar, colorMode, toggleColorMode } = useUIStore();
  const { user, logout } = useAuthStore();
  
  const handleLogout = () => {
    logout();
    router.push('/login');
  };
  
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-[#2d2d42] shadow-sm z-30 flex items-center px-4">
      <div className="flex-1 flex items-center">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900 mr-2"
        >
          <FiMenu className="text-purple-800 dark:text-white" size={20} />
        </button>
        
        <Link href="/dashboard" className="flex items-center">
          <h1 className="text-xl font-bold text-purple-800 dark:text-white">
            <span className="hidden md:inline">NeoUni</span>
            <span className="md:hidden">NU</span>
          </h1>
        </Link>
      </div>
      
      <div className="flex items-center space-x-2">
        <button 
          onClick={toggleColorMode}
          className="p-2 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900"
        >
          {colorMode === 'dark' ? (
            <FiSun className="text-white" size={20} />
          ) : (
            <FiMoon className="text-purple-800" size={20} />
          )}
        </button>
        
        <button className="p-2 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900 relative">
          <FiBell className="text-purple-800 dark:text-white" size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <button className="p-2 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900">
          <FiSettings className="text-purple-800 dark:text-white" size={20} />
        </button>
        
        {user ? (
          <div className="flex items-center ml-2">
            <div className="mr-2 text-right hidden md:block">
              <p className="text-sm font-medium text-gray-700 dark:text-white">{user.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-300 capitalize">{user.role}</p>
            </div>
            <div className="relative">
              <Image 
                src={user.image || "/images/default-avatar.png"} 
                alt="User" 
                width={40} 
                height={40} 
                className="rounded-full border-2 border-purple-500"
              />
            </div>
            <button 
              onClick={handleLogout}
              className="p-2 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900 ml-2"
            >
              <FiLogOut className="text-purple-800 dark:text-white" size={20} />
            </button>
          </div>
        ) : (
          <Link 
            href="/login"
            className="ml-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}