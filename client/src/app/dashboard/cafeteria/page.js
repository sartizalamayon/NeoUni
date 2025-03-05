// src/app/dashboard/cafeteria/page.js

'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { FiFilter, FiClock, FiMapPin, FiShoppingCart, FiHeart } from 'react-icons/fi';
import useUIStore from '@/store/uiStore';

export default function CafeteriaPage() {
  const { activeLayer } = useUIStore();
  const [activeTab, setActiveTab] = useState('meals');
  const [selectedMeal, setSelectedMeal] = useState('lunch');
  const [favorites, setFavorites] = useState([]);
  
  // Sample cafeteria data
  const meals = {
    breakfast: [
      { id: 1, name: 'Continental Breakfast', description: 'Assorted pastries, fresh fruit, yogurt, and granola', price: '$5.99', calories: 450, dietary: ['Vegetarian'], image: '/images/continental.jpg' },
      { id: 2, name: 'American Breakfast', description: 'Eggs, bacon, hash browns, and toast', price: '$7.99', calories: 750, dietary: [], image: '/images/american.jpg' },
      { id: 3, name: 'Healthy Start', description: 'Egg white omelette with vegetables, whole grain toast, and fruit', price: '$6.99', calories: 350, dietary: ['Healthy'], image: '/images/healthy.jpg' },
      { id: 4, name: 'Breakfast Burrito', description: 'Scrambled eggs, cheese, potatoes, and salsa in a tortilla', price: '$6.49', calories: 550, dietary: [], image: '/images/burrito.jpg' },
    ],
    lunch: [
      { id: 5, name: 'Chicken Caesar Salad', description: 'Grilled chicken, romaine lettuce, croutons, parmesan cheese with Caesar dressing', price: '$8.99', calories: 450, dietary: ['Protein'], image: '/images/caesar.jpg' },
      { id: 6, name: 'Vegetable Stir Fry', description: 'Mixed vegetables stir-fried with tofu and served over rice', price: '$7.99', calories: 400, dietary: ['Vegetarian', 'Vegan'], image: '/images/stirfry.jpg' },
      { id: 7, name: 'Cheeseburger & Fries', description: 'Beef patty with cheese, lettuce, tomato, and onion on a brioche bun', price: '$9.99', calories: 850, dietary: [], image: '/images/burger.jpg' },
      { id: 8, name: 'Mediterranean Bowl', description: 'Quinoa, hummus, falafel, roasted vegetables, and tzatziki sauce', price: '$8.49', calories: 550, dietary: ['Vegetarian', 'Healthy'], image: '/images/medbowl.jpg' },
    ],
    dinner: [
      { id: 9, name: 'Grilled Salmon', description: 'Atlantic salmon with lemon herb sauce, roasted potatoes, and seasonal vegetables', price: '$12.99', calories: 550, dietary: ['Healthy', 'Protein'], image: '/images/salmon.jpg' },
      { id: 10, name: 'Pasta Primavera', description: 'Penne pasta with assorted vegetables in a light cream sauce', price: '$9.99', calories: 650, dietary: ['Vegetarian'], image: '/images/pasta.jpg' },
      { id: 11, name: 'Beef Stir Fry', description: 'Sliced beef with broccoli, bell peppers, and carrots in a teriyaki sauce', price: '$11.99', calories: 700, dietary: ['Protein'], image: '/images/beefstir.jpg' },
      { id: 12, name: 'Vegan Plate', description: 'Grilled portobello mushroom, quinoa pilaf, and roasted seasonal vegetables', price: '$8.99', calories: 450, dietary: ['Vegetarian', 'Vegan', 'Healthy'], image: '/images/vegan.jpg' },
    ],
  };
  
  const cafeteriaLocations = [
    { id: 1, name: 'Main Cafeteria', hours: '7:00 AM - 9:00 PM', location: 'Student Center, 1st Floor', status: 'Open', crowdLevel: 'Moderate' },
    { id: 2, name: 'Science Building Café', hours: '8:00 AM - 5:00 PM', location: 'Science Building, Ground Floor', status: 'Open', crowdLevel: 'Low' },
    { id: 3, name: 'Library Coffee Shop', hours: '7:30 AM - 10:00 PM', location: 'Main Library, Entrance Level', status: 'Open', crowdLevel: 'High' },
    { id: 4, name: 'Sports Complex Grill', hours: '10:00 AM - 8:00 PM', location: 'Sports Complex, East Wing', status: 'Closed', crowdLevel: 'N/A' },
  ];
  
  const schedules = {
    breakfast: { weekday: '7:00 AM - 10:30 AM', weekend: '8:00 AM - 11:00 AM' },
    lunch: { weekday: '11:00 AM - 2:30 PM', weekend: '11:30 AM - 2:00 PM' },
    dinner: { weekday: '5:00 PM - 8:30 PM', weekend: '5:00 PM - 8:00 PM' },
  };
  
  // Toggle favorite status
  const toggleFavorite = (mealId) => {
    if (favorites.includes(mealId)) {
      setFavorites(favorites.filter(id => id !== mealId));
    } else {
      setFavorites([...favorites, mealId]);
    }
  };
  
  // Get current meal based on time
  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 7 && currentHour < 11) {
      setSelectedMeal('breakfast');
    } else if (currentHour >= 11 && currentHour < 15) {
      setSelectedMeal('lunch');
    } else if (currentHour >= 17 && currentHour < 21) {
      setSelectedMeal('dinner');
    }
  }, []);
  
  // Render layer-specific features
  const renderLayerFeatures = () => {
    switch (activeLayer) {
      case 'time':
        return (
          <div className="mb-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-800 flex items-center">
            <FiClock className="text-purple-600 text-xl mr-3" />
            <div>
              <h3 className="font-medium text-purple-800 dark:text-purple-300">Current Meal: {selectedMeal.charAt(0).toUpperCase() + selectedMeal.slice(1)}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Hours: {schedules[selectedMeal].weekday} (Weekdays) | {schedules[selectedMeal].weekend} (Weekends)
              </p>
            </div>
          </div>
        );
      case 'place':
        return (
          <div className="mb-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-100 dark:border-indigo-800 flex items-center">
            <FiMapPin className="text-indigo-600 text-xl mr-3" />
            <div>
              <h3 className="font-medium text-indigo-800 dark:text-indigo-300">Nearest Dining: Main Cafeteria</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Currently <span className="text-green-600 font-medium">Open</span> • 5 minute walk from your location
              </p>
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
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-0">University Dining</h1>
        <div className="flex space-x-2">
          <Button 
            variant="ghost" 
            size="sm"
            className="flex items-center"
          >
            <FiFilter className="mr-1" /> Filter
          </Button>
          <Button
            variant="secondary"
            size="sm"
          >
            <FiShoppingCart className="mr-1" /> Order Online
          </Button>
        </div>
      </div>
      
      {renderLayerFeatures()}
      
      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
        <button
          className={`py-2 px-4 font-medium text-sm ${activeTab === 'meals' ? 'text-purple-600 border-b-2 border-purple-600 dark:text-purple-400 dark:border-purple-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
          onClick={() => setActiveTab('meals')}
        >
          Menu & Meals
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm ${activeTab === 'locations' ? 'text-purple-600 border-b-2 border-purple-600 dark:text-purple-400 dark:border-purple-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
          onClick={() => setActiveTab('locations')}
        >
          Locations & Hours
        </button>
      </div>
      
      {activeTab === 'meals' ? (
        <div>
          {/* Meal Type Selector */}
          <div className="flex space-x-2 mb-6">
            <Button
              variant={selectedMeal === 'breakfast' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setSelectedMeal('breakfast')}
            >
              Breakfast
            </Button>
            <Button
              variant={selectedMeal === 'lunch' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setSelectedMeal('lunch')}
            >
              Lunch
            </Button>
            <Button
              variant={selectedMeal === 'dinner' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setSelectedMeal('dinner')}
            >
              Dinner
            </Button>
          </div>
          
          {/* Meal Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {meals[selectedMeal].map((meal) => (
              <Card key={meal.id} className="h-full">
                <div className="relative h-44 mb-4 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-700">
                  <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400">
                    <span>Image</span>
                  </div>
                  <button
                    className="absolute top-2 right-2 p-1.5 bg-white dark:bg-gray-800 rounded-full shadow-md z-10"
                    onClick={() => toggleFavorite(meal.id)}
                  >
                    <FiHeart 
                      size={18} 
                      className={favorites.includes(meal.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'} 
                    />
                  </button>
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-1">{meal.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{meal.description}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-purple-600 dark:text-purple-400">{meal.price}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{meal.calories} cal</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {meal.dietary.map((diet, index) => (
                    <Badge key={index} variant="primary" size="sm">{diet}</Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cafeteriaLocations.map((location) => (
              <Card key={location.id} className="h-full">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-white">{location.name}</h3>
                  <Badge 
                    variant={location.status === 'Open' ? 'success' : 'danger'}
                    size="sm"
                  >
                    {location.status}
                  </Badge>
                </div>
                <div className="text-sm space-y-1 mb-3">
                  <p className="text-gray-600 dark:text-gray-300"><strong>Hours:</strong> {location.hours}</p>
                  <p className="text-gray-600 dark:text-gray-300"><strong>Location:</strong> {location.location}</p>
                  {location.status === 'Open' && (
                    <p className="text-gray-600 dark:text-gray-300">
                      <strong>Crowd Level:</strong>{' '}
                      <span 
                        className={`font-medium ${location.crowdLevel === 'Low' ? 'text-green-600 dark:text-green-400' : location.crowdLevel === 'Moderate' ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'}`}
                      >
                        {location.crowdLevel}
                      </span>
                    </p>
                  )}
                </div>
                <Button size="sm">View Menu</Button>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
