import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLibrary } from '../context/LibraryContext';
import { Filter, X, Star } from 'lucide-react';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(true);
  const [filters, setFilters] = useState({
    type: [],
    year: [],
    language: []
  });
  const { books } = useLibrary();

  const query = searchParams.get('q') || '';

  const filterOptions = {
    type: ['Book', 'Video', 'Document', 'Research'],
    year: ['2023', '2022', '2021', '2020'],
    language: ['English', 'Spanish', 'French', 'German']
  };

  const toggleFilter = (category, value) => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(v => v !== value)
        : [...prev[category], value]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Search Results</h1>
          {query && <p className="text-gray-600">Showing results for "<span className="font-semibold text-gray-800">{query}</span>"</p>}
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className={`${showFilters ? 'block' : 'hidden'} md:block w-72 flex-shrink-0`}>
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-lg text-gray-800">Filters</h2>
                <button onClick={() => setShowFilters(false)} className="md:hidden hover:bg-gray-100 p-1 rounded-lg transition-colors duration-300">
                  <X size={20} />
                </button>
              </div>

              {Object.entries(filterOptions).map(([category, options]) => (
                <div key={category} className="mb-6 pb-6 border-b border-gray-100 last:border-0">
                  <h3 className="font-medium mb-3 capitalize text-gray-800">{category}</h3>
                  <div className="space-y-2">
                    {options.map(option => (
                      <label key={option} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={filters[category].includes(option)}
                          onChange={() => toggleFilter(category, option)}
                          className="w-4 h-4 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                        />
                        <span className="text-sm text-gray-700 group-hover:text-indigo-600 transition-colors duration-300">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              <button 
                className="w-full bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 py-2.5 rounded-xl text-sm font-medium text-gray-700 transition-all duration-300" 
                onClick={() => setFilters({ type: [], year: [], language: [] })}
              >
                Clear All Filters
              </button>
            </div>
          </aside>

          {/* Results List */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600"><span className="font-semibold text-gray-800">{books.length}</span> results found</p>
              <button 
                onClick={() => setShowFilters(!showFilters)} 
                className="md:hidden flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-300"
              >
                <Filter size={18} />
                <span>Filters</span>
              </button>
            </div>

            <div className="space-y-4">
              {books.map(item => (
                <div 
                  key={item.id} 
                  className="group bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100 hover:scale-[1.02]"
                  onClick={() => navigate(`/resource/${item.id}`)}
                >
                  <div className="flex gap-6">
                    <div className="relative flex-shrink-0">
                      <img src={item.cover} alt={item.title} className="w-28 h-40 object-cover rounded-xl shadow-md group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md">
                        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full px-2 py-1 flex items-center gap-1">
                          <Star size={12} className="text-white fill-white" />
                          <span className="text-xs font-semibold text-white">{item.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold mb-2 text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">{item.title}</h3>
                      <p className="text-gray-600 mb-4">by <span className="font-medium text-gray-800">{item.author}</span></p>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">{item.type}</span>
                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">{item.year}</span>
                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">{item.language}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
