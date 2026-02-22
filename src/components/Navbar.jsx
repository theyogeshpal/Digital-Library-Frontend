import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, BookOpen, User, Menu, X, Heart, LogOut } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const isLoggedIn = false; // Replace with actual auth state
  const location = useLocation()


  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-70  overflow-hidden rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <img src="/logo/horizontal-logo.png" alt="Core Archive Logo" className="w-full h-full object-cover" />
            </div>
            {/* <span className="text-xl font-bold bg-gradient-to-r from-indigo-700 to-teal-600 bg-clip-text text-transparent">Core Archive</span> */}
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search books, authors, topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all duration-300"
              />
            </div>
          </form>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className={location.pathname == "/" ? "text-blue-500 hover:text-indigo-600 font-medium transition-colors duration-300" : "text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-300"} >Home</Link>
            <Link to="/Collection" className={location.pathname == "/Collection" ? "text-blue-500 hover:text-indigo-600 font-medium transition-colors duration-300" : "text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-300"}>Collection</Link>
            <Link to="/About" className={location.pathname == "/About" ? "text-blue-500 hover:text-indigo-600 font-medium transition-colors duration-300" : "text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-300"}>About</Link>
            <Link to="/Contact" className={location.pathname == "/Contact" ? "text-blue-500 hover:text-indigo-600 font-medium transition-colors duration-300" : "text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-300"}>Contact</Link>

            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <Link to="/wishlist" className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-300">
                  <Heart size={20} className="text-gray-700" />
                </Link>
                <Link to="/Profile" className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-700 to-teal-600 text-white rounded-full hover:shadow-lg transition-all duration-300">
                  <User size={18} />
                  <span className="font-medium">Profile</span>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/Login" className={location.pathname == "/Login" ? "text-blue-500 hover:text-indigo-600 font-medium transition-colors duration-300" : "text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-300"}>Login</Link>
                <Link to="/Signup" className="px-5 py-2 bg-gradient-to-r from-indigo-700 to-teal-600 text-white rounded-full hover:shadow-lg transition-all duration-300 font-medium">Sign Up</Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors duration-300">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <form onSubmit={(e) => { handleSearch(e); setIsMenuOpen(false); }} className="mb-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </form>
            <div className="flex flex-col gap-2">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors duration-300">Home</Link>
              <Link to="/Collection" onClick={() => setIsMenuOpen(false)} className="px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors duration-300">Collection</Link>
              <Link to="/About" onClick={() => setIsMenuOpen(false)} className="px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors duration-300">About</Link>
              <Link to="/Contact" onClick={() => setIsMenuOpen(false)} className="px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors duration-300">Contact</Link>
              {isLoggedIn ? (
                <>
                  <Link to="/wishlist" onClick={() => setIsMenuOpen(false)} className="px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors duration-300 flex items-center gap-2">
                    <Heart size={18} />
                    <span>Wishlist</span>
                  </Link>
                  <Link to="/Profile" onClick={() => setIsMenuOpen(false)} className="px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors duration-300 flex items-center gap-2">
                    <User size={18} />
                    <span>Profile</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/Login" onClick={() => setIsMenuOpen(false)} className="px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors duration-300">Login</Link>
                  <Link to="/Signup" onClick={() => setIsMenuOpen(false)} className="px-4 py-2 bg-gradient-to-r from-indigo-700 to-teal-600 text-white rounded-lg text-center font-medium">Sign Up</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
