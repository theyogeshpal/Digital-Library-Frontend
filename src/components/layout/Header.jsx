import { Link } from 'react-router-dom';
import { BookOpen, User, Menu, X, Sparkles, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white/70 backdrop-blur-md sticky top-0 z-50 border-b border-white/20 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-xl">
                <BookOpen size={28} className="text-white" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">DigiLibrary</span>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Sparkles size={10} />
                <span>Knowledge Hub</span>
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="relative text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-300 group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/search" className="relative text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-300 group">
              Browse
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/about" className="relative text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-300 group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link to="/support" className="relative text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-300 group">
              Support
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            {isLoggedIn ? (
              <>
                <Link to="/my-library" className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-full hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105">
                  <User size={18} />
                  <span className="font-medium">My Library</span>
                </Link>
                <button onClick={handleLogout} className="flex items-center gap-2 text-gray-700 hover:text-red-600 font-medium transition-colors duration-300">
                  <LogOut size={18} />
                </button>
              </>
            ) : (
              <Link to="/login" className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-full hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105">
                <User size={18} />
                <span className="font-medium">Login</span>
              </Link>
            )}
          </nav>

          <button className="md:hidden p-2 hover:bg-white/50 rounded-lg transition-colors duration-300" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden mt-4 flex flex-col gap-3">
            <Link to="/" className="py-2.5 px-4 hover:bg-white/50 rounded-lg transition-colors duration-300 font-medium" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/search" className="py-2.5 px-4 hover:bg-white/50 rounded-lg transition-colors duration-300 font-medium" onClick={() => setIsMenuOpen(false)}>Browse</Link>
            <Link to="/about" className="py-2.5 px-4 hover:bg-white/50 rounded-lg transition-colors duration-300 font-medium" onClick={() => setIsMenuOpen(false)}>About</Link>
            <Link to="/support" className="py-2.5 px-4 hover:bg-white/50 rounded-lg transition-colors duration-300 font-medium" onClick={() => setIsMenuOpen(false)}>Support</Link>
            <Link to="/my-library" className="py-2.5 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium" onClick={() => setIsMenuOpen(false)}>My Library</Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
