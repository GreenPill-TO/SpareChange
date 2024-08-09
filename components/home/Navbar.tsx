// components/home/Navbar.tsx
import { useState } from 'react';
import Link from 'next/link';
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';
import { useTheme } from '@/context/ThemeContext';

type NavbarProps = {
  onAuthClick: () => void;
};

function Navbar({ onAuthClick }: NavbarProps) {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    setDropdownOpen(false);
  };

  return (
    <nav
      className={`${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      } shadow w-full z-10`}
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
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button onClick={toggleDropdown} className="focus:outline-none">
                {theme === 'light' && <SunIcon className="w-6 h-6 text-yellow-500" />}
                {theme === 'dark' && <MoonIcon className="w-6 h-6 text-white" />}
                {theme === 'system' && <ComputerDesktopIcon className="w-6 h-6 text-gray-500" />}
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg">
                  <button
                    onClick={() => handleThemeChange('light')}
                    className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
                  >
                    <SunIcon className="w-5 h-5 text-yellow-500 mr-2" /> Light
                  </button>
                  <button
                    onClick={() => handleThemeChange('dark')}
                    className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
                  >
                    <MoonIcon className="w-5 h-5 text-gray-800 mr-2" /> Dark
                  </button>
                  <button
                    onClick={() => handleThemeChange('system')}
                    className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
                  >
                    <ComputerDesktopIcon className="w-5 h-5 text-gray-500 mr-2" /> System
                  </button>
                </div>
              )}
            </div>
            <button
              onClick={onAuthClick}
              className={`px-4 py-2 rounded-lg shadow-md focus:outline-none ${
                theme === 'dark' ? 'bg-blue-500 text-white hover:bg-blue-700' : 'bg-blue-500 text-white hover:bg-blue-700'
              }`}
            >
              Authenticate
            </button>
          </div>
          <div className="sm:hidden">
            <button onClick={toggleMenu} className="focus:outline-none">
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
                  d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div
          className={`absolute top-16 left-0 w-full shadow-lg z-20 ${
            theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
          }`}
        >
          <div className="flex flex-col items-start p-4 space-y-4">
            <a href="#features" className="hover:text-blue-500" onClick={toggleMenu}>
              Features
            </a>
            <a href="#how-it-works" className="hover:text-blue-500" onClick={toggleMenu}>
              How It Works
            </a>
            <a href="#testimonials" className="hover:text-blue-500" onClick={toggleMenu}>
              Testimonials
            </a>
            <button
              onClick={() => {
                onAuthClick();
                toggleMenu();
              }}
              className={`px-4 py-2 rounded-lg shadow-md focus:outline-none ${
                theme === 'dark' ? 'bg-blue-500 text-white hover:bg-blue-700' : 'bg-blue-500 text-white hover:bg-blue-700'
              }`}
            >
              Authenticate
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
