import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';
import { useTheme } from '@/context/ThemeContext';

type User = {
  username: string;
  email: string;
  // Add other properties as needed
};

type NavbarProps = {
  onAuthClick?: () => void;  // Optional prop, in case you want to handle clicks for authentication
};

function Navbar({ onAuthClick }: NavbarProps) {
  const { theme, setTheme } = useTheme();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser) as User);
    }
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
    <nav className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} shadow w-full z-10`}>
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
            {user ? (
              <div className="relative">
                <button onClick={toggleDropdown} className="focus:outline-none">
                  <img src="/path-to-user-icon.png" alt="User Icon" className="w-6 h-6 rounded-full" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                    <div className="px-4 py-2">
                      <p className="text-sm font-medium text-gray-700">{user.username}</p>
                    </div>
                    <div className="border-t border-gray-200"></div>
                    <Link href="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Settings
                    </Link>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onAuthClick ? onAuthClick : () => (window.location.href = '/auth')} // Optional onAuthClick
                className={`px-4 py-2 rounded-lg shadow-md focus:outline-none ${
                  theme === 'dark' ? 'bg-blue-500 text-white hover:bg-blue-700' : 'bg-blue-500 text-white hover:bg-blue-700'
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
                  d={isDropdownOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
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
