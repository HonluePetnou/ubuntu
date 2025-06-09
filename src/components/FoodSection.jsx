import React, { useState } from 'react';
import { ChefHat, Coffee, Wheat, ChevronLeft, ChevronRight } from 'lucide-react';

const FoodSection = ({ countryData, theme = 'blue', themeOverrides = {} }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

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

  // Get all food items for carousel
  const getAllFoodItems = () => {
    const items = [];
    const gastronomy = countryData?.gastronomy;
    
    if (gastronomy?.mainDishes) {
      gastronomy.mainDishes.forEach(dish => {
        items.push({ type: 'dish', name: dish, icon: ChefHat, category: 'Main Dish' });
      });
    }
    
    if (gastronomy?.beverages) {
      gastronomy.beverages.forEach(beverage => {
        items.push({ type: 'beverage', name: beverage, icon: Coffee, category: 'Beverage' });
      });
    }
    
    if (gastronomy?.ingredients) {
      gastronomy.ingredients.forEach(ingredient => {
        items.push({ type: 'ingredient', name: ingredient, icon: Wheat, category: 'Ingredient' });
      });
    }
    
    return items;
  };
  
  const foodItems = getAllFoodItems();
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

        {/* Carousel */}
        <div className="relative">
          {/* Carousel Container */}
          <div className="overflow-hidden rounded-xl">
            <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {Array.from({ length: totalSlides }).map((_, slideIndex) => {
                const slideItems = foodItems.slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide);
                return (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div className="grid md:grid-cols-3 gap-6 px-4">
                      {slideItems.map((item, itemIndex) => {
                        const Icon = item.icon;
                        return (
                          <div key={itemIndex} className={`group p-6 rounded-xl border ${currentTheme.border} ${currentTheme.hover} transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white cursor-pointer`}>
                            <div className="flex items-center space-x-3 mb-4">
                              <div className={`w-12 h-12 rounded-full ${currentTheme.primary} flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                                <Icon className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold group-hover:text-gray-800 transition-colors">{item.name}</h3>
                                <span className={`text-xs font-medium ${currentTheme.accent} uppercase tracking-wide`}>
                                  {item.category}
                                </span>
                              </div>
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed">
                              {item.type === 'dish' && `Traditional dish representing the rich culinary heritage of ${countryData?.name}`}
                              {item.type === 'beverage' && `Traditional beverage that complements the cuisine of ${countryData?.name}`}
                              {item.type === 'ingredient' && `Essential ingredient used in ${countryData?.name}'s distinctive cuisine`}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Buttons */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={prevSlide}
                className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${currentTheme.primary} text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110`}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${currentTheme.primary} text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110`}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Slide Indicators */}
          {totalSlides > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? currentTheme.primary
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Food Categories Summary */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className={`text-center p-6 rounded-xl ${currentTheme.secondary} border ${currentTheme.border}`}>
            <ChefHat className={`w-12 h-12 mx-auto mb-4 ${currentTheme.accent}`} />
            <h3 className={`text-xl font-semibold mb-2 ${currentTheme.accent}`}>Main Dishes</h3>
            <p className="text-gray-600">{countryData?.gastronomy?.mainDishes?.length || 0} traditional recipes</p>
          </div>
          <div className={`text-center p-6 rounded-xl ${currentTheme.secondary} border ${currentTheme.border}`}>
            <Coffee className={`w-12 h-12 mx-auto mb-4 ${currentTheme.accent}`} />
            <h3 className={`text-xl font-semibold mb-2 ${currentTheme.accent}`}>Beverages</h3>
            <p className="text-gray-600">{countryData?.gastronomy?.beverages?.length || 0} traditional drinks</p>
          </div>
          <div className={`text-center p-6 rounded-xl ${currentTheme.secondary} border ${currentTheme.border}`}>
            <Wheat className={`w-12 h-12 mx-auto mb-4 ${currentTheme.accent}`} />
            <h3 className={`text-xl font-semibold mb-2 ${currentTheme.accent}`}>Ingredients</h3>
            <p className="text-gray-600">{countryData?.gastronomy?.ingredients?.length || 0} essential ingredients</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoodSection;