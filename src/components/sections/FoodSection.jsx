import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChefHat, Coffee, Wheat, ChevronLeft, ChevronRight } from 'lucide-react';

const FoodSection = ({ countryData, theme = 'blue', themeOverrides = {} }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleViewAllFood = () => {
    const countryCode = countryData?.countryCode;
    if (countryCode) {
      navigate(`/country/${countryCode.toLowerCase()}/food`);
    }
  };

  // Theme configurations matching site's design system
  const themes = {
    blue: {
      primary: 'bg-[#A0522D]',
      secondary: 'bg-[#FAF3E0]',
      accent: 'text-[#A0522D]',
      border: 'border-[#E8D5B7]',
      hover: 'hover:bg-[#F5E6D3]'
    },
    green: {
      primary: 'bg-[#A0522D]',
      secondary: 'bg-[#FAF3E0]',
      accent: 'text-[#A0522D]',
      border: 'border-[#E8D5B7]',
      hover: 'hover:bg-[#F5E6D3]'
    },
    orange: {
      primary: 'bg-[#A0522D]',
      secondary: 'bg-[#FAF3E0]',
      accent: 'text-[#A0522D]',
      border: 'border-[#E8D5B7]',
      hover: 'hover:bg-[#F5E6D3]'
    }
  };

  // Apply theme overrides
  const currentTheme = {
    ...themes[theme],
    ...themeOverrides
  };

  // Helper function to get image path for food items
  const getFoodImage = (foodName, countryCode) => {
    if (!countryCode) {
      return null;
    }
    
    // Mapping for specific food names to image filenames (based on actual files)
    const foodImageMap = {
      'cm': {
        'Ndolé': 'ndolet',
        'Poulet DG': 'cornchaff',
        'Koki': 'koki',
        'Achu': 'achu',
        'Eru': 'eru',
        'Okok': 'okok',
        'Sanga': 'sanga',
        'Bil-bil': 'fufu',
        'Matango': 'egusi pudding',
        'Palm wine': 'fufu',
        'Plantain': 'fufu',
        'Cassava': 'fufu',
        'Yam': 'achu',
        'Peanuts': 'cornchaff'
      }
    };
    
    const countryKey = countryCode.toLowerCase();
    const imageFilename = foodImageMap[countryKey]?.[foodName];
    
    if (imageFilename) {
      // Properly encode the filename for URL
      const encodedFilename = encodeURIComponent(imageFilename);
      return `/images/foods/${countryKey}/${encodedFilename}.jpg`;
    } else {
      // Fallback: convert food name to filename format (lowercase, replace spaces with nothing)
      const filename = foodName.toLowerCase().replace(/\s+/g, '');
      return `/images/foods/${countryKey}/${filename}.jpg`;
    }
  };

  // Get all food items for carousel - memoized to prevent infinite re-renders
  const foodItems = useMemo(() => {
    const items = [];
    const gastronomy = countryData?.gastronomy;
    const countryCode = countryData?.countryCode;
    
    if (gastronomy?.mainDishes) {
      gastronomy.mainDishes.forEach(dish => {
        items.push({ 
          type: 'dish', 
          name: dish, 
          icon: ChefHat, 
          category: 'Main Dish',
          image: getFoodImage(dish, countryCode)
        });
      });
    }
    
    if (gastronomy?.beverages) {
      gastronomy.beverages.forEach(beverage => {
        items.push({ 
          type: 'beverage', 
          name: beverage, 
          icon: Coffee, 
          category: 'Beverage',
          image: getFoodImage(beverage, countryCode)
        });
      });
    }
    
    if (gastronomy?.ingredients) {
      gastronomy.ingredients.forEach(ingredient => {
        items.push({ 
          type: 'ingredient', 
          name: ingredient, 
          icon: Wheat, 
          category: 'Ingredient',
          image: getFoodImage(ingredient, countryCode)
        });
      });
    }
    
    return items;
  }, [countryData?.gastronomy, countryData?.countryCode]);
  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(foodItems.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getCurrentSlideItems = () => {
    const startIndex = currentSlide * itemsPerSlide;
    return foodItems.slice(startIndex, startIndex + itemsPerSlide);
  };

  if (foodItems.length === 0) {
    return (
      <section className="py-16 px-4 bg-gradient-to-br from-[#FAF3E0] via-[#F5E6D3] to-[#E8D5B7]">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-[#A0522D] mb-4">
            Culinary Heritage of {countryData?.name}
          </h2>
          <p className="text-gray-500">No culinary information available</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-[#FAF3E0] via-[#F5E6D3] to-[#E8D5B7]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#A0522D] mb-4">
            Culinary Heritage of {countryData?.name}
          </h2>
          <div className={`w-24 h-1 ${currentTheme.primary} mx-auto mb-6`}></div>
          <p className="text-lg text-[#8B4513] max-w-3xl mx-auto">
            Experience the authentic flavors, traditional beverages, and essential ingredients that define the gastronomic identity of {countryData?.name}.
          </p>
        </div>

        {/* Food Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={prevSlide}
                className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 ${currentTheme.primary} text-white rounded-full shadow-lg hover:opacity-90 transition-opacity flex items-center justify-center`}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 ${currentTheme.primary} text-white rounded-full shadow-lg hover:opacity-90 transition-opacity flex items-center justify-center`}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Carousel Container */}
          <div className="overflow-hidden mx-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {getCurrentSlideItems().map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={`${item.name}-${index}`}
                    className={`${currentTheme.secondary} rounded-xl shadow-lg overflow-hidden ${currentTheme.hover} transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${currentTheme.border} border`}
                  >
                    {/* Food Image */}
                    <div className="h-48 bg-gray-200 overflow-hidden relative">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                          onError={(e) => {
                            // If image fails to load, try placeholder
                            if (!e.target.src.includes('placeholder-food.jpg')) {
                              e.target.src = '/images/placeholder-food.jpg';
                            } else {
                              // If placeholder also fails, hide the image
                              e.target.style.display = 'none';
                            }
                          }}
                        />
                      )}
                      {!item.image && (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                          <IconComponent className={`w-16 h-16 ${currentTheme.accent}`} />
                        </div>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <div className="flex items-center mb-3">
                        <div className={`w-10 h-10 rounded-full ${currentTheme.primary} flex items-center justify-center mr-3`}>
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <span className={`text-sm font-medium ${currentTheme.accent} uppercase tracking-wide`}>
                          {item.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Traditional {item.type} representing the rich culinary heritage of {countryData?.name}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Slide Indicators */}
          {totalSlides > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentSlide
                      ? currentTheme.primary
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          )}
        </div>



        {/* View All Food Button */}
        <div className="text-center mt-8">
          <button
            onClick={handleViewAllFood}
            className={`px-8 py-3 ${currentTheme.primary} text-white rounded-lg hover:opacity-90 transition-opacity font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200`}
          >
            View All Food & Cuisine
          </button>
        </div>
      </div>
    </section>
  );
};

export default FoodSection;