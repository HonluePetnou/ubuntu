import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, MoreHorizontal, Shuffle, Repeat, Music as MusicIcon } from 'lucide-react';

const Music = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(180); // 3 minutes
  const [volume, setVolume] = useState(75);
  
  const [playlists] = useState([
    {
      id: 1,
      name: 'Afrobeats Hits',
      description: 'The hottest Afrobeats tracks',
      cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300',
      tracks: 24,
      duration: '1h 32m'
    },
    {
      id: 2,
      name: 'Traditional Rhythms',
      description: 'Classic African traditional music',
      cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300',
      tracks: 18,
      duration: '58m'
    },
    {
      id: 3,
      name: 'Modern African Jazz',
      description: 'Contemporary African jazz fusion',
      cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300',
      tracks: 15,
      duration: '1h 12m'
    }
  ]);

  const [tracks] = useState([
    {
      id: 1,
      title: 'Ye',
      artist: 'Burna Boy',
      album: 'Outside',
      duration: '3:12',
      cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=150',
      genre: 'Afrobeats',
      plays: '45.2M'
    },
    {
      id: 2,
      title: 'Jerusalema',
      artist: 'Master KG ft. Nomcebo Zikode',
      album: 'Jerusalema',
      duration: '3:54',
      cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=150',
      genre: 'Amapiano',
      plays: '89.7M'
    },
    {
      id: 3,
      title: 'Soco',
      artist: 'Wizkid ft. Ceeza Milli, Spotless & Terri',
      album: 'Soco',
      duration: '3:23',
      cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=150',
      genre: 'Afrobeats',
      plays: '67.3M'
    },
    {
      id: 4,
      title: 'Pana',
      artist: 'Tekno',
      album: 'Pana',
      duration: '3:45',
      cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=150',
      genre: 'Afrobeats',
      plays: '34.8M'
    },
    {
      id: 5,
      title: 'Mama Africa',
      artist: 'Sauti Sol',
      album: 'Live and Die in Afrika',
      duration: '4:12',
      cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=150',
      genre: 'Afro-pop',
      plays: '23.1M'
    }
  ]);

  const handlePlayPause = (track = null) => {
    if (track && track.id !== currentTrack?.id) {
      setCurrentTrack(track);
      setIsPlaying(true);
      setCurrentTime(0);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-full bg-gradient-to-br from-[#FAF3E0] via-[#F5E6D3] to-[#E8D5B7] p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#A0522D] to-[#D2691E] rounded-2xl p-8 text-white">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <MusicIcon className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">African Music</h2>
            <p className="text-orange-100">Discover the sounds of Africa</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-2xl font-bold">2.4M+</div>
            <div className="text-orange-100 text-sm">Songs</div>
          </div>
          <div>
            <div className="text-2xl font-bold">150K+</div>
            <div className="text-orange-100 text-sm">Artists</div>
          </div>
          <div>
            <div className="text-2xl font-bold">54</div>
            <div className="text-orange-100 text-sm">Countries</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Featured Playlists */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Featured Playlists</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {playlists.map((playlist) => (
                <div key={playlist.id} className="group cursor-pointer">
                  <div className="relative mb-3">
                    <img
                      src={playlist.cover}
                      alt={playlist.name}
                      className="w-full aspect-square object-cover rounded-xl group-hover:scale-105 transition-transform duration-200"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-xl transition-all duration-200 flex items-center justify-center">
                      <button className="w-12 h-12 bg-[#A0522D] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:scale-110">
                        <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
                      </button>
                    </div>
                  </div>
                  <h4 className="font-semibold text-gray-900 group-hover:text-[#A0522D] transition-colors">
                    {playlist.name}
                  </h4>
                  <p className="text-sm text-gray-600">{playlist.description}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {playlist.tracks} tracks • {playlist.duration}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Tracks */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Popular Tracks</h3>
            <div className="space-y-2">
              {tracks.map((track, index) => (
                <div
                  key={track.id}
                  className={`flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-50 transition-colors group ${
                    currentTrack?.id === track.id ? 'bg-orange-50' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3 flex-1">
                    <span className="w-6 text-sm text-gray-500 text-center">
                      {currentTrack?.id === track.id && isPlaying ? (
                        <div className="flex space-x-1">
                          <div className="w-1 h-4 bg-[#A0522D] animate-pulse"></div>
                          <div className="w-1 h-4 bg-[#A0522D] animate-pulse" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-1 h-4 bg-[#A0522D] animate-pulse" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      ) : (
                        index + 1
                      )}
                    </span>
                    
                    <div className="relative">
                      <img
                        src={track.cover}
                        alt={track.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <button
                        onClick={() => handlePlayPause(track)}
                        className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
                      >
                        {currentTrack?.id === track.id && isPlaying ? (
                          <Pause className="w-5 h-5 text-white" fill="currentColor" />
                        ) : (
                          <Play className="w-5 h-5 text-white ml-0.5" fill="currentColor" />
                        )}
                      </button>
                    </div>
                    
                    <div className="flex-1">
                      <h4 className={`font-medium ${
                        currentTrack?.id === track.id ? 'text-[#A0522D]' : 'text-gray-900'
                      }`}>
                        {track.title}
                      </h4>
                      <p className="text-sm text-gray-600">{track.artist}</p>
                    </div>
                  </div>
                  
                  <div className="hidden md:block text-sm text-gray-600">
                    {track.album}
                  </div>
                  
                  <div className="hidden md:block text-sm text-gray-500">
                    {track.plays}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-2 hover:bg-gray-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <Heart className="w-4 h-4 text-gray-600" />
                    </button>
                    <span className="text-sm text-gray-500 w-12 text-right">{track.duration}</span>
                    <button className="p-2 hover:bg-gray-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Now Playing */}
          {currentTrack && (
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Now Playing</h3>
              <div className="text-center">
                <img
                  src={currentTrack.cover}
                  alt={currentTrack.title}
                  className="w-full aspect-square object-cover rounded-xl mb-4"
                />
                <h4 className="font-semibold text-gray-900">{currentTrack.title}</h4>
                <p className="text-sm text-gray-600 mb-4">{currentTrack.artist}</p>
                
                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>{formatTime(currentTime)}</span>
                    <span>{currentTrack.duration}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1">
                    <div 
                      className="bg-[#A0522D] h-1 rounded-full transition-all duration-300"
                      style={{ width: `${(currentTime / duration) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Controls */}
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <Shuffle className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <SkipBack className="w-5 h-5 text-gray-600" />
                  </button>
                  <button
                    onClick={() => handlePlayPause()}
                    className="w-12 h-12 bg-[#A0522D] hover:bg-[#8B4513] rounded-full flex items-center justify-center transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6 text-white" fill="currentColor" />
                    ) : (
                      <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
                    )}
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <SkipForward className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <Repeat className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                
                {/* Volume */}
                <div className="flex items-center space-x-2">
                  <Volume2 className="w-4 h-4 text-gray-600" />
                  <div className="flex-1">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={(e) => setVolume(e.target.value)}
                      className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                  <span className="text-xs text-gray-500 w-8">{volume}</span>
                </div>
              </div>
            </div>
          )}

          {/* Genres */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Browse Genres</h3>
            <div className="space-y-2">
              {['Afrobeats', 'Amapiano', 'Highlife', 'Soukous', 'Mbalax', 'Kwaito', 'Afro-Jazz'].map((genre) => (
                <button
                  key={genre}
                  className="w-full text-left px-3 py-2 text-gray-700 hover:bg-orange-50 hover:text-[#A0522D] rounded-lg transition-colors"
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Music;