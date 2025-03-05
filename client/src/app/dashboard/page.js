// src/app/dashboard/page.js

'use client';

import { useState, useEffect } from 'react';
import { FiBook, FiBriefcase, FiCalendar, FiMap, FiUsers, FiInfo, FiClock } from 'react-icons/fi';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import useAuthStore from '@/store/authStore';
import useUIStore from '@/store/uiStore';

export default function Dashboard() {
  const { user } = useAuthStore();
  const { activeLayer } = useUIStore();
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Update clock every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Sample data for dashboard cards
  const upcomingClasses = [
    { id: 1, name: 'Advanced Mathematics', time: '10:00 AM', location: 'Hall A', instructor: 'Dr. Smith' },
    { id: 2, name: 'Computer Science', time: '1:30 PM', location: 'Lab 3', instructor: 'Prof. Johnson' },
    { id: 3, name: 'Physics Seminar', time: '3:45 PM', location: 'Science Center', instructor: 'Dr. Williams' },
  ];
  
  const cafeteriaMenu = [
    { id: 1, meal: 'Breakfast', items: ['Scrambled Eggs', 'Toast', 'Fresh Fruit'], time: '7:00 AM - 9:30 AM' },
    { id: 2, meal: 'Lunch', items: ['Grilled Chicken Sandwich', 'Vegetable Soup', 'Caesar Salad'], time: '11:30 AM - 2:00 PM' },
    { id: 3, meal: 'Dinner', items: ['Pasta Primavera', 'Beef Stir Fry', 'Rice Pilaf'], time: '5:30 PM - 8:00 PM' },
  ];
  
  const upcomingEvents = [
    { id: 1, name: 'Student Council Meeting', date: 'Today, 4:30 PM', location: 'Student Center' },
    { id: 2, name: 'Career Fair', date: 'Tomorrow, 10:00 AM', location: 'Main Hall' },
    { id: 3, name: 'Basketball Game', date: 'Friday, 7:00 PM', location: 'Sports Complex' },
  ];
  
  const nextBuses = [
    { id: 1, route: 'Campus Loop', arrival: '5 min', destination: 'Student Housing' },
    { id: 2, route: 'Downtown Express', arrival: '12 min', destination: 'City Center' },
    { id: 3, route: 'North Campus', arrival: '20 min', destination: 'Research Center' },
  ];
  
  // Render different content based on active layer
  const renderLayerContent = () => {
    switch (activeLayer) {
      case 'time':
        return (
          <div className="mb-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-800">
            <h3 className="flex items-center text-lg font-medium text-purple-800 dark:text-purple-300 mb-2">
              <FiClock className="mr-2" /> Time-Aware Insights
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-3">
              Based on the current time ({currentTime.toLocaleTimeString()}), here are your personalized recommendations:
            </p>
            <ul className="space-y-1 text-gray-600 dark:text-gray-300">
              {currentTime.getHours() < 10 ? (
                <li>• Breakfast is currently being served at the Main Cafeteria until 9:30 AM.</li>
              ) : currentTime.getHours() < 14 ? (
                <li>• Lunch is currently being served at the Main Cafeteria until 2:00 PM.</li>
              ) : currentTime.getHours() < 20 ? (
                <li>• Dinner will be served starting at 5:30 PM at the Main Cafeteria.</li>
              ) : (
                <li>• The Late Night Café is open until midnight.</li>
              )}
              <li>• Your next class, {upcomingClasses[0].name}, begins at {upcomingClasses[0].time} in {upcomingClasses[0].location}.</li>
              <li>• The next campus shuttle arrives in {nextBuses[0].arrival}.</li>
            </ul>
          </div>
        );
      
      case 'place':
        return (
          <div className="mb-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-100 dark:border-indigo-800">
            <h3 className="flex items-center text-lg font-medium text-indigo-800 dark:text-indigo-300 mb-2">
              <FiMap className="mr-2" /> Location-Based Information
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-3">
              Based on your current location (Student Center), here's what's nearby:
            </p>
            <ul className="space-y-1 text-gray-600 dark:text-gray-300">
              <li>• The Main Cafeteria is 50 meters to your east.</li>
              <li>• Library is 100 meters to your north.</li>
              <li>• Student Services office is on the 2nd floor of this building.</li>
              <li>• There are 3 study rooms available on this floor.</li>
            </ul>
          </div>
        );
      
      case 'social':
        return (
          <div className="mb-6 p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg border border-pink-100 dark:border-pink-800">
            <h3 className="flex items-center text-lg font-medium text-pink-800 dark:text-pink-300 mb-2">
              <FiUsers className="mr-2" /> Social Connections
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-3">
              Your social network activity and connections:
            </p>
            <ul className="space-y-1 text-gray-600 dark:text-gray-300">
              <li>• 3 friends are currently in the Student Center.</li>
              <li>• You have 2 study group meetups scheduled for today.</li>
              <li>• 5 people from your classes are attending the Career Fair tomorrow.</li>
              <li>• Your professor Dr. Smith has office hours today from 2-4 PM.</li>
            </ul>
          </div>
        );
      
      case 'need':
        return (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800">
            <h3 className="flex items-center text-lg font-medium text-green-800 dark:text-green-300 mb-2">
              <FiInfo className="mr-2" /> Activity Recommendations
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-3">
              Based on your schedule and preferences, you might be interested in:
            </p>
            <ul className="space-y-1 text-gray-600 dark:text-gray-300">
              <li>• You have a 2-hour break between classes - perfect time to visit the library.</li>
              <li>• Your assignment for Advanced Mathematics is due in 2 days.</li>
              <li>• The gym is currently at 30% capacity - good time for a workout.</li>
              <li>• Your favorite meal (Pasta Primavera) is on tonight's dinner menu.</li>
            </ul>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Welcome, {user?.name || 'Student'}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="primary">
            {activeLayer.charAt(0).toUpperCase() + activeLayer.slice(1)} Layer Active
          </Badge>
        </div>
      </div>
      
      {/* Layer-specific content */}
      {renderLayerContent()}
      
      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Class Schedule Card */}
        <Card title="Today's Classes" className="lg:col-span-1">
          <div className="space-y-4">
            {upcomingClasses.map((cls) => (
              <div key={cls.id} className="flex items-start pb-3 border-b last:border-0 border-gray-200 dark:border-gray-700">
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded text-purple-800 dark:text-purple-100 mr-3">
                  <FiBook size={18} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{cls.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{cls.time} • {cls.location}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{cls.instructor}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
        
        {/* Cafeteria Menu Card */}
        <Card title="Today's Menu" className="lg:col-span-1">
          <div className="space-y-4">
            {cafeteriaMenu.map((menu) => (
              <div key={menu.id} className="pb-3 border-b last:border-0 border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-1">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded text-orange-800 dark:text-orange-100 mr-3">
                    <FiBriefcase size={18} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{menu.meal}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{menu.time}</p>
                  </div>
                </div>
                <ul className="pl-10 text-sm text-gray-600 dark:text-gray-300">
                  {menu.items.map((item, idx) => (
                    <li key={idx} className="list-disc">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Card>
        
        {/* Upcoming Events Card */}
        <Card title="Upcoming Events" className="lg:col-span-1">
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-start pb-3 border-b last:border-0 border-gray-200 dark:border-gray-700">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded text-green-800 dark:text-green-100 mr-3">
                  <FiCalendar size={18} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{event.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{event.date}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{event.location}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
        
        {/* Bus Schedule Card */}
        <Card title="Next Buses" className="md:col-span-2 lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {nextBuses.map((bus) => (
              <div key={bus.id} className="flex items-start p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded text-blue-800 dark:text-blue-100 mr-3">
                  <FiMap size={18} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{bus.route}</h4>
                  <p className="text-sm text-green-600 dark:text-green-400">Arrives in {bus.arrival}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">To: {bus.destination}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
