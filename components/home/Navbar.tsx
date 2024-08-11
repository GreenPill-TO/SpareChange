import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';
import { useTheme } from '@/context/ThemeContext';

type User = {
  username: string;
  email: string;
};

type NavbarProps = {
  onAuthClick?: () => void;
};

function Navbar({ onAuthClick }: NavbarProps) {
  const { theme, setTheme } = useTheme();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isVisible, setIsVisible] = useState(true); // State to control visibility
  const lastScrollY = useRef(0); // To track the last scroll position
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser) as User);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY > lastScrollY.current && scrollY > 50) {
        // If scrolling down and past a certain point, hide the navbar
        setIsVisible(false);
      } else {
        // If scrolling up, show the navbar
        setIsVisible(true);
      }

      lastScrollY.current = scrollY;
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDropdownOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/';
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    setDropdownOpen(false);
  };

  return (
    <nav
      className={`${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      } shadow w-full z-20 fixed top-0 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center max-w-7xl mx-auto">
          <Link href="/" className="text-2xl font-bold">
            SpareChange
          </Link>
          <div className="hidden sm:flex sm:items-center sm:space-x-8 mx-auto">
            <a href="#features" className="hover:text-blue-500">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-blue-500">
              How It Works
            </a>
            <a href="#testimonials" className="hover:text-blue-500">
              Testimonials
            </a>
            {user && (
              <Link href="/dashboard" className="hover:text-blue-500">
                Dashboard
              </Link>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button onClick={toggleDropdown} className="focus:outline-none">
                {theme === 'light' && (
                  <SunIcon className="w-6 h-6 text-yellow-500" />
                )}
                {theme === 'dark' && (
                  <MoonIcon className="w-6 h-6 text-white" />
                )}
                {theme === 'system' && (
                  <ComputerDesktopIcon className="w-6 h-6 text-gray-500" />
                )}
              </button>
              {isDropdownOpen && (
                <div
                  className={`absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded shadow-lg z-50 text-black dark:text-white`}
                >
                  <button
                    onClick={() => handleThemeChange('light')}
                    className="flex items-center w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <SunIcon className="w-5 h-5 text-yellow-500 mr-2" /> Light
                  </button>
                  <button
                    onClick={() => handleThemeChange('dark')}
                    className="flex items-center w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <MoonIcon className="w-5 h-5 text-gray-300 mr-2" /> Dark
                  </button>
                  <button
                    onClick={() => handleThemeChange('system')}
                    className="flex items-center w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <ComputerDesktopIcon className="w-5 h-5 text-gray-500 mr-2" />{' '}
                    System
                  </button>
                </div>
              )}
            </div>
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button onClick={toggleDropdown} className="focus:outline-none">
                  <img
                    src="/path-to-user-icon.png"
                    alt="User Icon"
                    className="w-6 h-6 rounded-full"
                  />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded shadow-lg z-50 text-black dark:text-white">
                    <div className="px-4 py-2">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {user.username}
                      </p>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700"></div>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      User Profile
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      App Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={
                  onAuthClick
                    ? onAuthClick
                    : () => (window.location.href = '/auth')
                }
                className={`px-4 py-2 rounded-lg shadow-md focus:outline-none ${
                  theme === 'dark'
                    ? 'bg-blue-500 text-white hover:bg-blue-700'
                    : 'bg-blue-500 text-white hover:bg-blue-700'
                }`}
              >
                Authenticate
              </button>
            )}
          </div>
          <div className="sm:hidden">
            <button onClick={toggleDropdown} className="focus:outline-none">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isDropdownOpen
                      ? 'M6 18L18 6M6 6l12 12'
                      : 'M4 6h16M4 12h16m-7 6h7'
                  }
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
