// src/components/layout/Sidebar.js

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FiHome, FiBook, FiBriefcase, FiCalendar, FiMap, 
  FiClock, FiMapPin, FiUsers, FiTarget, FiSettings 
} from 'react-icons/fi';
import useUIStore from '@/store/uiStore';
import useAuthStore from '@/store/authStore';

export default function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar, activeLayer, setActiveLayer } = useUIStore();
  const { user } = useAuthStore();
  
  // Define navigation links based on user role
  const getNavLinks = () => {
    const links = [
      { label: 'Dashboard', href: '/dashboard', icon: <FiHome size={20} /> },
      { label: 'Cafeteria', href: '/dashboard/cafeteria', icon: <FiBriefcase size={20} /> },
      { label: 'Bus Routes', href: '/dashboard/buses', icon: <FiMap size={20} /> },
      { label: 'Classes', href: '/dashboard/classes', icon: <FiBook size={20} /> },
      { label: 'Events', href: '/dashboard/events', icon: <FiCalendar size={20} /> },
      { label: 'Navigation', href: '/dashboard/navigation', icon: <FiMapPin size={20} /> },
    ];
    
    // Add admin-specific links
    if (user?.role === 'admin') {
      links.push({ label: 'Admin', href: '/admin', icon: <FiSettings size={20} /> });
    }
    
    return links;
  };
  
  const navLinks = getNavLinks();
  
  // Define parallel reality layers
  const layers = [
    { id: 'time', label: 'Time Layer', icon: <FiClock size={16} /> },
    { id: 'place', label: 'Place Layer', icon: <FiMapPin size={16} /> },
    { id: 'social', label: 'Social Layer', icon: <FiUsers size={16} /> },
    { id: 'need', label: 'Need Layer', icon: <FiTarget size={16} /> },
  ];
  
  return (
    <aside 
      className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white dark:bg-[#2d2d42] shadow-md z-20 transition-all duration-300 ${
        sidebarOpen ? 'w-64' : 'w-20'
      }`}
    >
      <div className="h-full flex flex-col justify-between overflow-y-auto">
        <div>
          <nav className="mt-6 px-2">
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                      pathname === link.href || pathname.startsWith(link.href + '/')
                        ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-white'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <span className="mr-3">{link.icon}</span>
                    {sidebarOpen && <span>{link.label}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        
        {/* Parallel Reality Layers */}
        <div className="mt-auto mb-6 px-4 py-4 border-t border-gray-200 dark:border-gray-700">
          {sidebarOpen && (
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Reality Layers
            </h3>
          )}
          <div className="flex flex-col space-y-2">
            {layers.map((layer) => (
              <button
                key={layer.id}
                onClick={() => setActiveLayer(layer.id)}
                className={`flex items-center p-2 rounded-md transition-colors ${
                  activeLayer === layer.id
                    ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                <span className="mr-2">{layer.icon}</span>
                {sidebarOpen && <span className="text-sm">{layer.label}</span>}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}