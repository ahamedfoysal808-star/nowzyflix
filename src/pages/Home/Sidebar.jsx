import React from 'react';
import { 
  HomeIcon, 
  FilmIcon, 
  TvIcon, 
  BookmarkIcon, 
  MagnifyingGlassIcon,
  TrophyIcon
} from '@heroicons/react/24/outline';

const LOGO_IMAGE = 'https://nowzyplus.live/upload/files/1780682882236-removebg-preview__1___1_-removebg-preview.png?_t=1781771491';

export default function Sidebar({ 
  activePage, 
  onNavigate, 
  selectedGenreId, 
  onGenreSelect, 
  onOpenAuthModal 
}) {

  const navItems = [
    { id: 'home',      icon: HomeIcon, fontIcon: false, label: 'Home' },
    { id: 'movies',    icon: FilmIcon, fontIcon: false, label: 'Movies' },
    { id: 'series',    icon: TvIcon, fontIcon: false, label: 'TV Shows' },
    { id: 'EXTERNAL_SPORTS', icon: TrophyIcon, fontIcon: false, label: 'Sports' },
    { id: 'watchlist', icon: BookmarkIcon, fontIcon: false, label: 'Watchlist' }
  ];

  return (
    <aside className="w-[84px] fixed inset-y-0 left-0 bg-[#070b14] border-r border-white/[0.04] flex flex-col items-center py-6 z-50 hidden md:flex">
      {/* Brand Header Logo Panel */}
      <div className="mb-8 flex flex-col items-center justify-center group cursor-pointer" onClick={() => onNavigate('home')}>
        <div className="w-12 h-12 rounded-2xl overflow-hidden bg-black/20 flex items-center justify-center p-1 border border-white/5 group-hover:border-cyan-500/30 transition-colors duration-300">
          <img src={LOGO_IMAGE} alt="NowzyFlix Logo" className="w-full h-full object-contain" />
        </div>
      </div>

      {/* Navigation Layout Links Panel */}
      <nav className="flex-1 w-full px-3 flex flex-col gap-3 items-center">
        {/* Search Deck Button */}
        <button
          onClick={() => onNavigate('search')}
          className={`w-12 h-12 flex items-center justify-center rounded-2xl border transition-all duration-300 ${
            activePage === 'search'
              ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 shadow-lg shadow-cyan-950/20'
              : 'bg-white/[0.02] border-white/[0.04] text-gray-500 hover:text-gray-300 hover:bg-white/[0.05]'
          }`}
          title="Search Catalog"
        >
          <MagnifyingGlassIcon className="w-5 h-5" />
        </button>

        <div className="w-8 h-px bg-white/[0.06] my-2" />

        {/* Dynamic Navigation Map Loop */}
        {navItems.map((item) => {
          const isActive = activePage === item.id || (item.id === 'EXTERNAL_SPORTS' && activePage === 'sports');
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-12 h-12 flex flex-col items-center justify-center rounded-2xl border transition-all duration-300 relative group ${
                isActive
                  ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 shadow-lg shadow-cyan-950/20'
                  : 'bg-transparent border-transparent text-gray-500 hover:text-gray-300 hover:bg-white/[0.04]'
              }`}
              title={item.label}
            >
              <item.icon className="w-5 h-5 transition-transform group-hover:scale-105" />
              
              {/* Active Indicator Micro DOT */}
              {isActive && (
                <span className="absolute left-0 w-1 h-4 rounded-r-full bg-cyan-400" />
              )}
              
              {/* Tooltip Hover Bubble */}
              <span className="absolute left-20 px-2.5 py-1.5 rounded-xl bg-gray-950 border border-white/10 text-xs font-semibold text-white opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 shadow-xl">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Account Login Floating Vector */}
      <div className="w-full px-3 flex flex-col items-center">
        <div className="w-8 h-px bg-white/[0.06] mb-4" />
        <button
          onClick={onOpenAuthModal}
          className="w-12 h-12 flex items-center justify-center rounded-2xl border border-transparent bg-white/[0.02] text-gray-500 hover:text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/20 transition-all duration-300 group"
          title="Account Profile"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0a8.966 8.966 0 0 1-5.982 2.275 8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        </button>
      </div>
    </aside>
  );
}
