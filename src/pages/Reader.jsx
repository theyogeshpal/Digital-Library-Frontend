import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Bookmark, X, Settings, Moon, Sun } from 'lucide-react';

const Reader = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [darkMode, setDarkMode] = useState(false);
  const totalPages = 450;

  return (
    <div className={`h-screen flex flex-col ${darkMode ? 'bg-gray-950' : 'bg-gray-900'}`}>
      {/* Reader Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 py-4 flex items-center justify-between border-b border-gray-700 shadow-lg">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(`/resource/${id}`)} 
            className="hover:bg-gray-700 p-2 rounded-lg transition-all duration-300 hover:scale-110"
          >
            <X size={24} />
          </button>
          <div>
            <h1 className="text-lg font-semibold">The Art of Programming</h1>
            <p className="text-sm text-gray-400">by John Doe</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="hover:bg-gray-700 p-2 rounded-lg transition-all duration-300 hover:scale-110">
            <Bookmark size={20} />
          </button>
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="hover:bg-gray-700 p-2 rounded-lg transition-all duration-300 hover:scale-110"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <div className="flex items-center gap-2 bg-gray-700 rounded-lg px-3 py-2">
            <button 
              onClick={() => setZoom(Math.max(50, zoom - 10))} 
              className="hover:bg-gray-600 p-1 rounded transition-all duration-300"
            >
              <ZoomOut size={18} />
            </button>
            <span className="text-sm font-medium min-w-[50px] text-center">{zoom}%</span>
            <button 
              onClick={() => setZoom(Math.min(200, zoom + 10))} 
              className="hover:bg-gray-600 p-1 rounded transition-all duration-300"
            >
              <ZoomIn size={18} />
            </button>
          </div>
          <button className="hover:bg-gray-700 p-2 rounded-lg transition-all duration-300 hover:scale-110">
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* Reader Content */}
      <div className="flex-1 overflow-auto flex items-center justify-center p-8">
        <div 
          className={`${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-2xl rounded-lg transition-all duration-300`}
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'center' }}
        >
          <div className="w-[800px] min-h-[1000px] p-12">
            <div className="mb-6 pb-4 border-b border-gray-200">
              <h2 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Chapter {currentPage}</h2>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Page {currentPage} of {totalPages}</p>
            </div>
            <div className={`space-y-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
              <p>
                This is a sample page content. In a real implementation, this would display the actual PDF, EPUB, or video content using appropriate libraries like PDF.js, EPUB.js, or video players.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Reader Footer */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 py-4 flex items-center justify-between border-t border-gray-700 shadow-lg">
        <button 
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} 
          disabled={currentPage === 1} 
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 px-6 py-2.5 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-indigo-600 disabled:hover:to-purple-600 hover:scale-105"
        >
          <ChevronLeft size={20} />
          <span>Previous</span>
        </button>

        <div className="flex items-center gap-4 bg-gray-700 px-6 py-2.5 rounded-lg">
          <span className="text-sm">Page</span>
          <input 
            type="number" 
            value={currentPage} 
            onChange={(e) => setCurrentPage(Math.min(totalPages, Math.max(1, parseInt(e.target.value) || 1)))} 
            className="w-20 px-3 py-1 bg-gray-800 rounded-lg text-center font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500" 
          />
          <span className="text-sm">of {totalPages}</span>
        </div>

        <button 
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} 
          disabled={currentPage === totalPages} 
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 px-6 py-2.5 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-indigo-600 disabled:hover:to-purple-600 hover:scale-105"
        >
          <span>Next</span>
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Reader;
