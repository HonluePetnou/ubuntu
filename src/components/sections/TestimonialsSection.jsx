import React, { useState } from 'react';
import { Star, Quote, User, MapPin, Heart, Globe, ChevronLeft, ChevronRight } from 'lucide-react';

const TestimonialsSection = ({ countryData, theme = 'blue', themeOverrides = {} }) => {
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

  const currentTheme = {
    ...themes[theme],
    ...themeOverrides
  };

  // Helper function to get testimony avatar image
  const getTestimonyAvatar = (testimonialId) => {
    const imageIndex = ((testimonialId - 1) % 8) + 1;
    return `/images/testimonies/person${imageIndex}.jpg`;
  };

  // Sample testimonials data
  const getTestimonials = () => {
    const countryName = countryData?.name || 'this beautiful country';
    return [
      {
        id: 1,
        name: 'Sarah Johnson',
        location: 'New York, USA',
        rating: 5,
        text: `My journey to ${countryName} was absolutely transformative. The rich cultural heritage, warm hospitality, and breathtaking landscapes left me speechless. Every moment was filled with discovery and wonder.`,
        experience: 'Cultural Heritage Tour',
        avatar: getTestimonyAvatar(1),
        visitDate: 'March 2024',
        highlight: 'Traditional ceremonies'
      },
      {
        id: 2,
        name: 'Marcus Chen',
        location: 'Toronto, Canada',
        rating: 5,
        text: `The authentic cultural experiences in ${countryName} exceeded all my expectations. From the vibrant markets to the traditional music performances, every day brought new adventures and insights into this incredible culture.`,
        experience: 'Arts & Crafts Workshop',
        avatar: getTestimonyAvatar(2),
        visitDate: 'January 2024',
        highlight: 'Local artisan workshops'
      },
      {
        id: 3,
        name: 'Elena Rodriguez',
        location: 'Madrid, Spain',
        rating: 5,
        text: `What struck me most about ${countryName} was the genuine warmth of the people. Their stories, traditions, and way of life taught me so much about community and cultural preservation. Truly unforgettable!`,
        experience: 'Community Immersion',
        avatar: getTestimonyAvatar(3),
        visitDate: 'February 2024',
        highlight: 'Village homestay'
      },
      {
        id: 4,
        name: 'David Thompson',
        location: 'London, UK',
        rating: 5,
        text: `The culinary journey through ${countryName} was phenomenal. Each dish told a story of tradition and innovation. The cooking classes with local chefs were the highlight of my entire trip.`,
        experience: 'Culinary Adventure',
        avatar: getTestimonyAvatar(4),
        visitDate: 'April 2024',
        highlight: 'Traditional cooking classes'
      },
      {
        id: 5,
        name: 'Amara Okafor',
        location: 'Lagos, Nigeria',
        rating: 5,
        text: `Reconnecting with my roots in ${countryName} was an emotional and enlightening experience. The cultural festivals and traditional ceremonies helped me understand my heritage in a deeper way.`,
        experience: 'Heritage Discovery',
        avatar: getTestimonyAvatar(5),
        visitDate: 'December 2023',
        highlight: 'Cultural festivals'
      },
      {
        id: 6,
        name: 'Sophie Laurent',
        location: 'Paris, France',
        rating: 5,
        text: `The artistic heritage of ${countryName} is simply magnificent. From ancient sculptures to contemporary art, every piece reflects the soul of this nation. The museum tours were incredibly insightful.`,
        experience: 'Art & History Tour',
        avatar: getTestimonyAvatar(6),
        visitDate: 'May 2024',
        highlight: 'Museum collections'
      }
    ];
  };

  const testimonials = getTestimonials();

  // Testimonials Carousel Component
  const TestimonialsCarousel = ({ testimonials }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerView = 3;
    const maxIndex = Math.max(0, testimonials.length - itemsPerView);

    const nextSlide = () => {
      setCurrentIndex(prev => prev >= maxIndex ? 0 : prev + 1);
    };

    const prevSlide = () => {
      setCurrentIndex(prev => prev <= 0 ? maxIndex : prev - 1);
    };

    const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + itemsPerView);

    return (
      <div className="relative">
        {/* Navigation Controls */}
         <div className="flex items-center justify-end mb-8">
           <div className="flex items-center gap-2">
             <button
               onClick={prevSlide}
               className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-all duration-200"
             >
               <ChevronLeft className="w-5 h-5 text-gray-600" />
             </button>
             <button
               onClick={nextSlide}
               className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-all duration-200"
             >
               <ChevronRight className="w-5 h-5 text-gray-600" />
             </button>
           </div>
         </div>

        {/* Testimonials Slider */}
        <div className="overflow-hidden">
          <div className="px-4 md:px-6">
            <div 
              className="flex transition-transform duration-500 ease-in-out gap-4 md:gap-6"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="flex-shrink-0 w-[calc(100%-1rem)] sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] bg-white rounded-xl shadow-lg p-4 md:p-6 border border-gray-100 min-h-[280px]"
              >
                {/* User Info */}
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                    onError={(e) => {
                      e.target.src = '/api/placeholder/60/60';
                    }}
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.experience}</p>
                  </div>
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-gray-600 text-sm leading-relaxed mb-4">
                  {testimonial.text}
                </blockquote>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  {renderStars(testimonial.rating)}
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: maxIndex + 1 }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex ? 'bg-[#A0522D]' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    );
  };

  // Render star rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  // Get experience type color
  const getExperienceColor = (experience) => {
    const colors = {
      'Cultural Heritage Tour': 'bg-blue-100 text-blue-800',
      'Arts & Crafts Workshop': 'bg-purple-100 text-purple-800',
      'Community Immersion': 'bg-green-100 text-green-800',
      'Culinary Adventure': 'bg-orange-100 text-orange-800',
      'Heritage Discovery': 'bg-red-100 text-red-800',
      'Art & History Tour': 'bg-indigo-100 text-indigo-800'
    };
    return colors[experience] || 'bg-gray-100 text-gray-800';
  };

  return (
    <section className="py-16 bg-gradient-to-br from-[#FAF3E0] to-[#F5E6D3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-orange-500 text-sm font-medium mb-2">What our Customers say about us</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Testimonials
          </h2>
        </div>



        {/* Testimonials Carousel */}
        <TestimonialsCarousel testimonials={testimonials} />

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-[#A0522D] to-[#8B4513] rounded-2xl p-8 text-white shadow-xl">
            <h3 className="text-2xl font-bold mb-4">Share Your Experience</h3>
            <p className="text-lg mb-6 opacity-90">
              Have you visited {countryData?.name || 'our country'}? We'd love to hear about your cultural journey!
            </p>
            <button className="bg-white text-[#A0522D] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-lg">
              Write a Review
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;