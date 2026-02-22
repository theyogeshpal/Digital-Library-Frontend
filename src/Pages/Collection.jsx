import React, { useState, useMemo } from 'react';
import { Search, Filter, BookOpen, Heart, ArrowRight, Star, SlidersHorizontal, Grid, List as ListIcon, Loader2, Bookmark } from 'lucide-react';

const Collection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Latest');
  const [viewMode, setViewMode] = useState('grid');

  const categories = ['All', 'Academic', 'Fiction', 'Science', 'History', 'Philosophy', 'Engineering'];

  const books = useMemo(() => [
    {
      id: 1,
      title: "The Architecture of Logic",
      author: "Dr. Elena Vance",
      category: "Philosophy",
      rating: 4.9,
      reviews: 128,
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80",
      description: "Exploring the fundamentals of structured thinking and logical reasoning in a digital age."
    },
    {
      id: 2,
      title: "Quantum Mechanics: Redefined",
      author: "Markus Thorne",
      category: "Science",
      rating: 4.8,
      reviews: 245,
      image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80",
      description: "A comprehensive guide to the subatomic world, updated with the latest research findings."
    },
    {
      id: 3,
      title: "The Digital Essential",
      author: "Sarah J. Core",
      category: "Philosophy",
      rating: 5.0,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80",
      description: "Preserving human knowledge in the age of rapid technological evolution and AI."
    },
    {
      id: 4,
      title: "Ancient Civilizations",
      author: "Prof. Arthur West",
      category: "History",
      rating: 4.7,
      reviews: 312,
      image: "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&q=80",
      description: "Uncovering the secrets of the past through archival research and modern archaeology."
    },
    {
      id: 5,
      title: "Engineering the Future",
      author: "James Miller",
      category: "Engineering",
      rating: 4.9,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1531235000281-10c97a6c760d?auto=format&fit=crop&q=80",
      description: "The principles of sustainable engineering and their application in urban development."
    },
    {
      id: 6,
      title: "The Scholar's Path",
      author: "Katherine Bloom",
      category: "Academic",
      rating: 4.6,
      reviews: 92,
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80",
      description: "Navigating the complexities of higher education and professional research."
    },
    {
      id: 7,
      title: "Beyond the Event Horizon",
      author: "Starlight Archive",
      category: "Science",
      rating: 4.8,
      reviews: 178,
      image: "https://images.unsplash.com/photo-1543004218-ee1417070da4?auto=format&fit=crop&q=80",
      description: "A journey through the mysteries of black holes and the fabric of spacetime."
    },
    {
      id: 8,
      title: "Midnight Echoes",
      author: "Julian Reed",
      category: "Fiction",
      rating: 4.5,
      reviews: 420,
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80",
      description: "A gripping tale of mystery set in a world where shadows hold the key to the truth."
    }
  ], []);

  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, books]);

  return (
    <div className="min-h-screen bg-white">
      {/* Search Hero Section */}
      <section className="relative pt-32 pb-20 bg-indigo-950 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[120%] bg-indigo-500/15 rounded-full blur-[80px] will-change-[filter]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[120%] bg-teal-500/10 rounded-full blur-[80px] will-change-[filter]"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight">
              Explore the <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">Archive</span>
            </h1>

            {/* Search Bar */}
            <div className="relative group max-w-2xl mx-auto">
              <div className="absolute inset-0 bg-teal-500/10 rounded-2xl blur-lg group-hover:bg-teal-500/20 transition-all duration-500"></div>
              <div className="relative bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-2 flex items-center">
                <Search className="text-teal-400 ml-4" size={24} />
                <input
                  type="text"
                  placeholder="Search by title, author, or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-white px-4 py-3 placeholder:text-gray-400 font-medium"
                />
                <button className="bg-teal-500 hover:bg-teal-400 text-indigo-950 px-8 py-3 rounded-xl font-black transition-all transform active:scale-95 shadow-lg shadow-teal-500/20">
                  Search
                </button>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm font-bold text-gray-300">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-teal-400 rounded-full"></span>
                {filteredBooks.length} Books Found
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
                7 Main Categories
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Grid Section */}
      <section className="py-12 bg-gray-50/50">
        <div className="container mx-auto px-4 lg:px-20">
          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            {/* Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar w-full md:w-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2.5 rounded-full font-bold text-sm whitespace-nowrap transition-all duration-300 ${selectedCategory === category
                    ? 'bg-indigo-900 text-white shadow-xl shadow-indigo-200'
                    : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-100'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* View & Sort Controls */}
            <div className="flex items-center gap-4 self-end">
              <div className="flex bg-white rounded-xl p-1 border border-gray-100">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <ListIcon size={20} />
                </button>
              </div>
              <div className="relative group">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-100 rounded-xl px-10 py-3 font-bold text-sm text-gray-700 outline-none focus:ring-2 focus:ring-indigo-100 cursor-pointer shadow-sm"
                >
                  <option>Latest</option>
                  <option>Popularity</option>
                  <option>Rating</option>
                  <option>Title (A-Z)</option>
                </select>
                <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 text-teal-600" size={18} />
              </div>
            </div>
          </div>

          {/* Books Grid */}
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8' : 'space-y-6'}>
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                className={`group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 will-change-transform ${viewMode === 'list' ? 'flex flex-col md:flex-row h-auto md:h-64' : ''
                  }`}
              >
                {/* Book Image Cover */}
                <div className={`relative overflow-hidden shrink-0 ${viewMode === 'list' ? 'w-full md:w-48' : 'aspect-[3/4]'}`}>
                  <img
                    src={book.image}
                    alt={book.title}
                    loading="lazy"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 will-change-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <button className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-gray-400 hover:text-indigo-600 transition-colors shadow-lg shadow-black/10 transform translate-y-[-10px] group-hover:translate-y-0 opacity-0 group-hover:opacity-100 duration-300">
                    <Heart size={20} />
                  </button>
                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-[20px] group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button className="w-full py-2 bg-teal-500 text-indigo-950 rounded-lg text-sm font-black shadow-xl">
                      View Details
                    </button>
                  </div>
                </div>

                {/* Book Info */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-black uppercase tracking-widest text-teal-600 bg-teal-50 px-2 py-1 rounded">
                        {book.category}
                      </span>
                      <div className="flex items-center gap-1 text-sm font-bold text-gray-600">
                        <Star className="text-yellow-400 fill-yellow-400" size={14} />
                        {book.rating}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-indigo-950 mb-1 group-hover:text-indigo-700 transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3 font-medium">By {book.author}</p>
                    {viewMode === 'list' && (
                      <p className="text-gray-500 text-sm leading-relaxed mb-4 max-w-2xl line-clamp-2">
                        {book.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-4 md:mt-0 pt-4 border-t border-gray-50">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                      <BookOpen size={14} />
                      {book.reviews} Reviews
                    </div>
                    <button className="flex items-center gap-2 text-indigo-600 font-bold text-sm hover:gap-3 transition-all">
                      Read Now
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredBooks.length === 0 && (
            <div className="py-20 text-center">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="text-gray-300" size={48} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No matching archives found</h3>
              <p className="text-gray-500">Try adjusting your search or category filters to find what you're looking for.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="mt-8 px-8 py-3 bg-indigo-900 text-white rounded-2xl font-bold hover:bg-indigo-950 transition-all"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Pagination Mockup */}
          <div className="mt-16 flex items-center justify-center gap-2">
            {[1, 2, 3, '...', 12].map((page, i) => (
              <button
                key={i}
                className={`w-12 h-12 rounded-xl font-bold text-sm transition-all ${page === 1
                  ? 'bg-indigo-900 text-white shadow-xl shadow-indigo-100'
                  : 'bg-white text-gray-400 border border-gray-100 hover:border-indigo-100 hover:text-indigo-600'
                  }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Section (Call to action) */}
      <section className="py-24 bg-indigo-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-teal-500/5 rotate-12 translate-x-1/2"></div>
        <div className="container mx-auto px-4 lg:px-20 relative z-10 text-center">
          <Bookmark className="w-16 h-16 text-teal-400 mx-auto mb-8 opacity-20" />
          <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tight">
            Can't find a specific resource?
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 font-light">
            Our curators are constantly expanding the archive. Request a special volume or access to restricted scholarly papers.
          </p>
          <button className="px-12 py-5 bg-teal-500 hover:bg-teal-400 text-indigo-950 rounded-2xl font-black shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95">
            Request Addition
          </button>
        </div>
      </section>
    </div>
  );
};

export default Collection;
