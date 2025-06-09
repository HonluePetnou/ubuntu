import React from 'react';
import { Calendar, MapPin, Users, Star, Clock } from 'lucide-react';

const EventsSection = ({ countryData, theme = 'blue', themeOverrides = {} }) => {

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

  // Timeline events data
  const getTimelineEvents = () => {
    const events = [];
    
    // Add cultural festivals
    if (countryData?.culture?.festivals) {
      countryData.culture.festivals.forEach((festival, index) => {
        events.push({
          id: `festival-${index}`,
          title: festival,
          type: 'Cultural Festival',
          description: `Annual cultural celebration showcasing the traditions, music, dance, and heritage of ${countryData?.name}.`,
          location: `Various locations across ${countryData?.name}`,
          icon: Calendar,
          color: 'bg-blue-500',
          month: 'Year-round'
        });
      });
    }
    
    // Add special events
    const specialEvents = [
      {
        id: 'independence',
        title: 'Independence Day',
        type: 'National Holiday',
        description: `National celebration commemorating the independence of ${countryData?.name} with parades, cultural displays, and festivities.`,
        location: 'Nationwide',
        icon: Star,
        color: 'bg-red-500',
        month: 'Annual'
      },
      {
        id: 'harvest',
        title: 'Harvest Celebrations',
        type: 'Seasonal Event',
        description: 'Traditional harvest festivals celebrating agricultural abundance and community unity across rural areas.',
        location: 'Rural communities',
        icon: Users,
        color: 'bg-green-500',
        month: 'Seasonal'
      },
      {
        id: 'cultural-week',
        title: 'Cultural Week',
        type: 'Annual Event',
        description: `Week-long celebration featuring traditional arts, crafts, music, and dance performances from across ${countryData?.name}.`,
        location: 'Major cities',
        icon: Calendar,
        color: 'bg-purple-500',
        month: 'Annual'
      }
    ];
    
    events.push(...specialEvents);
    return events;
  };
  
  const timelineEvents = getTimelineEvents();

  if (timelineEvents.length === 0) {
    return (
      <section className="py-16 px-4 bg-gradient-to-br from-[#FAF3E0] via-[#F5E6D3] to-[#E8D5B7]">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-[#A0522D] mb-4">
            Events & Festivals of {countryData?.name}
          </h2>
          <p className="text-gray-500">No event information available</p>
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
            Events & Festivals of {countryData?.name}
          </h2>
          <div className={`w-24 h-1 ${currentTheme.primary} mx-auto mb-6`}></div>
          <p className="text-lg text-[#8B4513] max-w-3xl mx-auto">
            Experience the vibrant celebrations, cultural festivals, and special events that bring communities together throughout {countryData?.name}.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-[#A0522D] to-[#E8D5B7] h-full"></div>
          
          {/* Timeline Events */}
          <div className="space-y-12">
            {timelineEvents.map((event, index) => {
              const Icon = event.icon;
              const isLeft = index % 2 === 0;
              
              return (
                <div key={event.id} className={`relative flex items-center ${isLeft ? 'justify-start' : 'justify-end'}`}>
                  {/* Timeline Node */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                    <div className={`w-12 h-12 rounded-full ${currentTheme.primary} flex items-center justify-center shadow-lg border-4 border-white`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  {/* Event Card */}
                  <div className={`w-5/12 ${isLeft ? 'pr-8' : 'pl-8'}`}>
                    <div className={`group p-6 rounded-xl border ${currentTheme.border} ${currentTheme.hover} transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white cursor-pointer`}>
                      {/* Event Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors">
                            {event.title}
                          </h3>
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${currentTheme.secondary} ${currentTheme.accent} mt-2`}>
                            {event.type}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span>{event.month}</span>
                        </div>
                      </div>
                      
                      {/* Event Details */}
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                        
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                      
                      {/* Event Footer */}
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span className="text-xs text-gray-500">Community Event</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-xs text-gray-500">Featured</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Event Statistics */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className={`text-center p-6 rounded-xl ${currentTheme.secondary} border ${currentTheme.border}`}>
            <Calendar className={`w-12 h-12 mx-auto mb-4 ${currentTheme.accent}`} />
            <h3 className={`text-xl font-semibold mb-2 ${currentTheme.accent}`}>Cultural Festivals</h3>
            <p className="text-gray-600">{countryData?.culture?.festivals?.length || 0} annual celebrations</p>
          </div>
          <div className={`text-center p-6 rounded-xl ${currentTheme.secondary} border ${currentTheme.border}`}>
            <Star className={`w-12 h-12 mx-auto mb-4 ${currentTheme.accent}`} />
            <h3 className={`text-xl font-semibold mb-2 ${currentTheme.accent}`}>Special Events</h3>
            <p className="text-gray-600">3 major annual events</p>
          </div>
          <div className={`text-center p-6 rounded-xl ${currentTheme.secondary} border ${currentTheme.border}`}>
            <Users className={`w-12 h-12 mx-auto mb-4 ${currentTheme.accent}`} />
            <h3 className={`text-xl font-semibold mb-2 ${currentTheme.accent}`}>Community Events</h3>
            <p className="text-gray-600">Year-round celebrations</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;