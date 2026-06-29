import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  FilmIcon, 
  TvIcon, 
  BookmarkIcon, 
  UserIcon, 
  MagnifyingGlassIcon,
  TrophyIcon
} from '@heroicons/react/24/outline';

const LOGO_IMAGE = 'https://nowzyplus.live/upload/files/1780682882236-removebg-preview__1___1_-removebg-preview.png?_t=1781771491';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: HomeIcon, label: 'Home', path: '/' },
    { icon: FilmIcon, label: 'Movies', path: '/movies' },
    { icon: TvIcon, label: 'TV Shows', path: '/tv' },
    { icon: TrophyIcon, label: 'Sports', path: 'EXTERNAL_SPORTS' }, // Handled as external redirect
    { icon: BookmarkIcon, label: 'Watchlist', path: '/watchlist' },
    { icon: UserIcon, label: 'Profile', path: '/profile' }
  ];

  const handleNavigation = (path) => {
    if (path === 'EXTERNAL_SPORTS') {
      window.location.href = 'https://nowzyplus.live';
    } else {
      navigate(path);
    }
  };

  return (
    <aside className="w-64 fixed inset-y-0 left-0 bg-[#070b14] border-r border-white/5 flex flex-col z-50">
      {/* Brand Header Logo Panel */}
      <div className="p-6 flex items-center gap-3 border-b border-white/5">
        <div className="w-10 h-10 rounded-xl overflow-hidden bg-black/20 flex items-center justify-center">
          <img src={LOGO_IMAGE} alt="NowzyFlix Logo" className="w-full h-full object-contain" />
        </div>
        <div>
          <span className="text-lg font-black tracking-tight text-white block">Nowzy<span className="text-cyan-400">Flix</span></span>
          <span className="text-[10px] tracking-widest text-gray-500 uppercase font-bold block mt-0.5">Streaming</span>
        </div>
      </div>

      {/* Navigation Layout Links Panel */}
      <nav className="flex-1 p-4 flex flex-col gap-1.5 overflow-y-auto">
        {/* Search Deck Button */}
        <button
          onClick={() => navigate('/search')}
          className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl border transition-all text-left mb-4 ${
            location.pathname === '/search'
              ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
              : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10'
          }`}
        >
          <MagnifyingGlassIcon className="w-5 h-5" />
          <span className="text-sm font-semibold">Search Catalog</span>
        </button>

        <span className="px-4 text-[10px] font-bold tracking-wider text-gray-500 uppercase mb-2 block">Menu Navigation</span>

        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={index}
              onClick={() => handleNavigation(item.path)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl font-semibold text-sm transition-all text-left ${
                isActive
                  ? 'bg-cyan-500/10 border border-cyan-500/20 text-cyan-400'
                  : 'text-gray-400 hover:bg-white/5 border border-transparent'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-cyan-400' : 'text-gray-400'}`} />
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
