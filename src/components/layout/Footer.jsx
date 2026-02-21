import { Link } from 'react-router-dom';
import { BookOpen, Mail, Phone, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 text-white mb-4">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-lg">
                <BookOpen size={24} />
              </div>
              <span className="font-bold text-xl">DigiLibrary</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">Your gateway to knowledge and learning.</p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 rounded-full flex items-center justify-center transition-all duration-300">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 rounded-full flex items-center justify-center transition-all duration-300">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 rounded-full flex items-center justify-center transition-all duration-300">
                <Github size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2 text-sm">
              <Link to="/" className="hover:text-indigo-400 transition-colors duration-300">Home</Link>
              <Link to="/search" className="hover:text-indigo-400 transition-colors duration-300">Browse</Link>
              <Link to="/about" className="hover:text-indigo-400 transition-colors duration-300">About Us</Link>
              <Link to="/my-library" className="hover:text-indigo-400 transition-colors duration-300">My Library</Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <div className="flex flex-col gap-2 text-sm">
              <Link to="/support" className="hover:text-indigo-400 transition-colors duration-300">Help Center</Link>
              <Link to="/support" className="hover:text-indigo-400 transition-colors duration-300">FAQs</Link>
              <Link to="/support" className="hover:text-indigo-400 transition-colors duration-300">Contact Us</Link>
              <a href="#" className="hover:text-indigo-400 transition-colors duration-300">Privacy Policy</a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Contact</h3>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex items-center gap-2 hover:text-indigo-400 transition-colors duration-300">
                <Mail size={16} />
                <span>info@digilibrary.com</span>
              </div>
              <div className="flex items-center gap-2 hover:text-indigo-400 transition-colors duration-300">
                <Phone size={16} />
                <span>+1 234 567 890</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm">
          <p className="text-gray-400">&copy; 2024 DigiLibrary. All rights reserved. Made with <span className="text-red-500">❤</span> for learners worldwide.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
