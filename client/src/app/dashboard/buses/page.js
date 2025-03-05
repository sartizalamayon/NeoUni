// src/app/dashboard/buses/page.js

'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { FiClock, FiMapPin, FiNavigation, FiAlertCircle, FiSearch, FiStar } from 'react-icons/fi';
import useUIStore from '@/store/uiStore';

export default function BusesPage() {
  const { activeLayer } = useUIStore();
  const [activeRoute, setActiveRoute] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [favoriteRoutes, setFavoriteRoutes] = useState([1, 3]); // Pre-populated with some favorites
  
  // Sample bus route data
  const busRoutes = [
    {
      id: 1,
      name: 'Campus Loop',
      color: 'blue',
      stops: [
        { id: 1, name: 'Student Center', time: 0, amenities: ['Shelter', 'Seating'] },
        { id: 2, name: 'Library', time: 3, amenities: ['Shelter'] },
        { id: 3, name: 'Science Building', time: 6, amenities: ['Shelter', 'Seating', 'Info Kiosk'] },
        { id: 4, name: 'Residence Hall A', time: 9, amenities: ['Shelter', 'Seating'] },
        { id: 5, name: 'Sports Complex', time: 12, amenities: ['Seating'] },
        { id: 6, name: 'Administration Building', time: 16, amenities: ['Shelter', 'Seating'] },
        { id: 7, name: 'Student Center', time: 20, amenities: ['Shelter', 'Seating'] },
      ],
      frequency: 'Every 10 minutes',
      hours: '7:00 AM - 10:00 PM',
      alerts: [],
      status: 'Normal Service'
    },
    {
      id: 2,
      name: 'Downtown Express',
      color: 'green',
      stops: [
        { id: 8, name: 'Student Center', time: 0, amenities: ['Shelter', 'Seating'] },
        { id: 9, name: 'Off-Campus Housing', time: 5, amenities: ['Shelter'] },
        { id: 10, name: 'City Hall', time: 15, amenities: ['Shelter', 'Seating'] },
        { id: 11, name: 'Downtown Station', time: 20, amenities: ['Shelter', 'Seating', 'Info Kiosk'] },
        { id: 12, name: 'Downtown Mall', time: 25, amenities: ['Shelter'] },
        { id: 13, name: 'Downtown Station', time: 30, amenities: ['Shelter', 'Seating', 'Info Kiosk'] },
        { id: 14, name: 'City Hall', time: 35, amenities: ['Shelter', 'Seating'] },
        { id: 15, name: 'Off-Campus Housing', time: 45, amenities: ['Shelter'] },
        { id: 16, name: 'Student Center', time: 50, amenities: ['Shelter', 'Seating'] },
      ],
      frequency: 'Every 30 minutes',
      hours: '7:30 AM - 9:30 PM',
      alerts: [{ type: 'info', message: 'Limited service on weekends.' }],
      status: 'Normal Service'
    },
    {
      id: 3,
      name: 'North Campus',
      color: 'red',
      stops: [
        { id: 17, name: 'Student Center', time: 0, amenities: ['Shelter', 'Seating'] },
        { id: 18, name: 'Research Center', time: 7, amenities: ['Shelter', 'Seating'] },
        { id: 19, name: 'Agricultural Complex', time: 12, amenities: ['Seating'] },
        { id: 20, name: 'North Parking Lot', time: 17, amenities: ['Shelter'] },
        { id: 21, name: 'Research Center', time: 22, amenities: ['Shelter', 'Seating'] },
        { id: 22, name: 'Student Center', time: 30, amenities: ['Shelter', 'Seating'] },
      ],
      frequency: 'Every 15 minutes',
      hours: '8:00 AM - 8:00 PM',
      alerts: [],
      status: 'Normal Service'
    },
    {
      id: 4,
      name: 'Medical Center',
      color: 'purple',
      stops: [
        { id: 23, name: 'Student Center', time: 0, amenities: ['Shelter', 'Seating'] },
        { id: 24, name: 'Science Building', time: 5, amenities: ['Shelter', 'Seating', 'Info Kiosk'] },
        { id: 25, name: 'University Medical Center', time: 12, amenities: ['Shelter', 'Seating', 'Info Kiosk'] },
        { id: 26, name: 'Nursing School', time: 15, amenities: ['Shelter'] },
        { id: 27, name: 'University Medical Center', time: 18, amenities: ['Shelter', 'Seating', 'Info Kiosk'] },
        { id: 28, name: 'Science Building', time: 25, amenities: ['Shelter', 'Seating', 'Info Kiosk'] },
        { id: 29, name: 'Student Center', time: 30, amenities: ['Shelter', 'Seating'] },
      ],
      frequency: 'Every 20 minutes',
      hours: '7:00 AM - 9:00 PM',
      alerts: [{ type: 'warning', message: 'Delays due to construction near Medical Center.' }],
      status: 'Minor Delays'
    },
  ];
  
  // Current location and next buses (simulated real-time data)
  const currentLocation = 'Student Center';
  const nextBuses = [
    { routeId: 1, routeName: 'Campus Loop', routeColor: 'blue', arrival: '2 min', destination: 'Library' },
    { routeId: 2, routeName: 'Downtown Express', routeColor: 'green', arrival: '8 min', destination: 'Downtown Station' },
    { routeId: 3, routeName: 'North Campus', routeColor: 'red', arrival: '12 min', destination: 'Research Center' },
    { routeId: 4, routeName: 'Medical Center', routeColor: 'purple', arrival: '18 min', destination: 'University Medical Center' },
  ];
  
  // Filter routes based on search query
  const filteredRoutes = busRoutes.filter(route => {
    if (!searchQuery) return true;
    return route.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
           route.stops.some(stop => stop.name.toLowerCase().includes(searchQuery.toLowerCase()));
  });
  
  // Toggle favorite route
  const toggleFavorite = (routeId) => {
    if (favoriteRoutes.includes(routeId)) {
      setFavoriteRoutes(favoriteRoutes.filter(id => id !== routeId));
    } else {
      setFavoriteRoutes([...favoriteRoutes, routeId]);
    }
  };
  
  // Render layer-specific features
  const renderLayerFeatures = () => {
    switch (activeLayer) {
      case 'time':
        return (
          <div className="mb-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-800">
            <h3 className="flex items-center text-lg font-medium text-purple-800 dark:text-purple-300 mb-2">
              <FiClock className="mr-2" /> Next Departures from {currentLocation}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-3">
              {nextBuses.map((bus, index) => (
                <div key={index} className="flex items-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <div 
                    className="w-3 h-3 rounded-full mr-3"
                    style={{ backgroundColor: bus.routeColor }}
                  ></div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{bus.routeName}</p>
                    <p className="text-sm">
                      <span className="text-green-600 dark:text-green-400 font-medium">{bus.arrival}</span> to {bus.destination}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'place':
        return (
          <div className="mb-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-100 dark:border-indigo-800">
            <h3 className="flex items-center text-lg font-medium text-indigo-800 dark:text-indigo-300 mb-2">
              <FiMapPin className="mr-2" /> Your Location: {currentLocation}
            </h3>
            <div className="flex items-center mt-2">
              <FiNavigation className="text-indigo-600 mr-2" />
              <span className="text-gray-600 dark:text-gray-300">Nearest bus stop is <strong>Student Center</strong> (You are here)</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-0">Bus Routes & Schedules</h1>
        <div className="relative flex items-center w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search routes or stops..."
            className="pl-9 pr-4 py-2 w-full sm:w-64 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 bg-white dark:bg-gray-800 dark:text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FiSearch className="absolute left-3 text-gray-400" />
        </div>
      </div>
      
      {renderLayerFeatures()}
      
      {/* System Alerts */}
      {busRoutes.some(route => route.alerts.length > 0) && (
        <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-100 dark:border-yellow-800">
          <h3 className="flex items-center text-lg font-medium text-yellow-800 dark:text-yellow-300 mb-2">
            <FiAlertCircle className="mr-2" /> System Alerts
          </h3>
          <ul className="space-y-2">
            {busRoutes.flatMap(route => 
              route.alerts.map((alert, index) => (
                <li key={`${route.id}-${index}`} className="flex items-start">
                  <Badge 
                    variant={alert.type === 'warning' ? 'warning' : 'info'}
                    className="mt-0.5 mr-2"
                  >
                    {alert.type === 'warning' ? 'Warning' : 'Info'}
                  </Badge>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">{route.name}:</span> {alert.message}
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
      
      {/* Routes */}
      <div className="space-y-6">
        {favoriteRoutes.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Favorite Routes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {busRoutes
                .filter(route => favoriteRoutes.includes(route.id))
                .map(route => (
                  <RouteCard 
                    key={route.id} 
                    route={route} 
                    isFavorite={favoriteRoutes.includes(route.id)}
                    onFavoriteToggle={toggleFavorite}
                    isActive={activeRoute === route.id}
                    onSelect={() => setActiveRoute(activeRoute === route.id ? null : route.id)}
                  />
                ))}
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 my-8"></div>
          </div>
        )}
        
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">All Routes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredRoutes.map(route => (
            <RouteCard 
              key={route.id} 
              route={route} 
              isFavorite={favoriteRoutes.includes(route.id)}
              onFavoriteToggle={toggleFavorite}
              isActive={activeRoute === route.id}
              onSelect={() => setActiveRoute(activeRoute === route.id ? null : route.id)}
            />
          ))}
        </div>
        
        {filteredRoutes.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No routes found matching "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Route Card Component
function RouteCard({ route, isFavorite, onFavoriteToggle, isActive, onSelect }) {
  return (
    <Card className={`transition-shadow ${isActive ? 'ring-2 ring-purple-500 shadow-md' : ''}`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <div 
            className="w-4 h-4 rounded-full mr-3"
            style={{ backgroundColor: route.color }}
          ></div>
          <h3 className="font-medium text-lg text-gray-900 dark:text-white">{route.name}</h3>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onFavoriteToggle(route.id)}
            className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FiStar 
              size={18} 
              className={isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'} 
            />
          </button>
        </div>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
          <span className="font-medium mr-2">Frequency:</span> {route.frequency}
        </div>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
          <span className="font-medium mr-2">Hours:</span> {route.hours}
        </div>
        <div className="flex items-center text-sm">
          <span className="font-medium mr-2">Status:</span> 
          <Badge 
            variant={route.status === 'Normal Service' ? 'success' : 'warning'}
            size="sm"
          >
            {route.status}
          </Badge>
        </div>
      </div>
      
      {isActive && (
        <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Route Stops</h4>
          <div className="relative pl-6">
            <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
            {route.stops.map((stop, index) => (
              <div key={stop.id} className="mb-3 relative">
                <div className="absolute left-[-0.625rem] w-3 h-3 rounded-full bg-gray-400 dark:bg-gray-500 border-2 border-white dark:border-gray-800"></div>
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{stop.name}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {stop.amenities.map((amenity, i) => (
                        <Badge key={i} variant="default" size="sm" className="text-xs">{amenity}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {stop.time > 0 ? `+${stop.time} min` : 'Start'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="mt-3">
        <Button 
          size="sm" 
          variant={isActive ? 'primary' : 'secondary'}
          fullWidth
          onClick={onSelect}
        >
          {isActive ? 'Hide Details' : 'View Details'}
        </Button>
      </div>
    </Card>
  );
}
