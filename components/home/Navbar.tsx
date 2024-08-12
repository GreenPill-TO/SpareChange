import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from '@/context/ThemeContext';

// Shared properties and types
type NavbarProps = {
  onAuthClick: () => void;
  onLogoutClick: () => void;
};

const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) => {
  e.preventDefault();
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

// Detect and set the system theme on first load
function useSystemTheme(setTheme) {
  useEffect(() => {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    setTheme(systemTheme);
  }, [setTheme]);
}

function ThemeSelector({ theme, setTheme }) {
  const handleThemeChange = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme); // Save the user's preference
  };

  return (
    <button onClick={handleThemeChange} className="focus:outline-none">
      {theme === 'dark' ? (
        <SunIcon className="w-6 h-6 text-yellow-500" />
      ) : (
        <MoonIcon className="w-6 h-6 text-gray-800" />
      )}
    </button>
  );
}

// Navbar for unauthenticated users
function NavbarUnauthenticated({ onAuthClick }: NavbarProps) {
  const { theme, setTheme } = useTheme();
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useSystemTheme(setTheme); // Apply the system theme on first load

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY <= lastScrollY.current || scrollY <= 50);
      lastScrollY.current = scrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`shadow w-full z-20 fixed top-0 transition-transform duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center max-w-7xl mx-auto">
          <Link href="/" className="text-2xl font-bold">SpareChange</Link>
          <div className="hidden sm:flex sm:items-center sm:space-x-8 mx-auto">
            <a href="#features" onClick={(e) => handleSmoothScroll(e, 'features')} className="hover:text-blue-500">Features</a>
            <a href="#how-it-works" onClick={(e) => handleSmoothScroll(e, 'how-it-works')} className="hover:text-blue-500">How It Works</a>
            <a href="#testimonials" onClick={(e) => handleSmoothScroll(e, 'testimonials')} className="hover:text-blue-500">Testimonials</a>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeSelector theme={theme} setTheme={setTheme} />
            <button onClick={onAuthClick} className={`px-4 py-2 rounded-lg shadow-md focus:outline-none ${theme === 'dark' ? 'bg-blue-500 text-white hover:bg-blue-700' : 'bg-blue-500 text-white hover:bg-blue-700'}`}>Authenticate</button>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Navbar for authenticated users
function NavbarAuthenticated({ onLogoutClick }: NavbarProps) {
  const { theme, setTheme } = useTheme();
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useSystemTheme(setTheme); // Apply the system theme on first load

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY <= lastScrollY.current || scrollY <= 50);
      lastScrollY.current = scrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`shadow w-full z-20 fixed top-0 transition-transform duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center max-w-7xl mx-auto">
          <Link href="/" className="text-2xl font-bold">SpareChange</Link>
          <div className="hidden sm:flex sm:items-center sm:space-x-8 mx-auto">
            <a href="#features" onClick={(e) => handleSmoothScroll(e, 'features')} className="hover:text-blue-500">Features</a>
            <a href="#how-it-works" onClick={(e) => handleSmoothScroll(e, 'how-it-works')} className="hover:text-blue-500">How It Works</a>
            <a href="#testimonials" onClick={(e) => handleSmoothScroll(e, 'testimonials')} className="hover:text-blue-500">Testimonials</a>
            <Link href="/dashboard" className="hover:text-blue-500">Dashboard</Link>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeSelector theme={theme} setTheme={setTheme} />
            <div className="relative">
              <button onClick={onLogoutClick} className="focus:outline-none">
                <img src="/path-to-user-icon.png" alt="User Icon" className="w-6 h-6 rounded-full" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Export both components
export { NavbarUnauthenticated, NavbarAuthenticated };
