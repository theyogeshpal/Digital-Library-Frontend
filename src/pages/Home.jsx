import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLibrary } from '../context/LibraryContext';
import { motion } from 'framer-motion';
import { Search, Star, ArrowRight, Play, Bookmark } from 'lucide-react';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { books } = useLibrary();

  const handleQuickView = (id) => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      navigate(`/resource/${id}`);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const featuredBooks = books.slice(0, 8);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-20 px-4 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-200/50 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-0 right-[-5%] w-[400px] h-[400px] bg-purple-200/50 rounded-full blur-[100px]"></div>
        </div>

        <div className="container mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 rounded-full border border-indigo-100">
              Digital Book Library
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-8 tracking-tight leading-[1.1]">
              Your Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Book Library.</span>
            </h1>
            <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Access a curated collection of books. Read PDFs online anytime, anywhere.
            </p>

            <motion.form 
              onSubmit={handleSearch}
              animate={isFocused ? { scale: 1.02 } : { scale: 1 }}
              className={`relative max-w-2xl mx-auto group transition-all duration-500 ${isFocused ? 'drop-shadow-2xl' : 'drop-shadow-xl'}`}
            >
              <div className="relative flex items-center bg-white rounded-3xl p-2 border border-slate-200 overflow-hidden">
                <div className="pl-6 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                  <Search size={24} />
                </div>
                <input
                  type="text"
                  placeholder="Search for books..."
                  className="w-full px-4 py-5 text-lg text-slate-800 outline-none placeholder:text-slate-400"
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="bg-slate-900 hover:bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 active:scale-95">
                  Search
                </button>
              </div>
            </motion.form>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 container mx-auto px-4">
        <div className="bg-white rounded-[2.5rem] shadow-xl p-12 border border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-black text-indigo-600 mb-2">{books.length}+</div>
              <p className="text-slate-600 font-medium">Books Available</p>
            </div>
            <div>
              <div className="text-5xl font-black text-purple-600 mb-2">10k+</div>
              <p className="text-slate-600 font-medium">Active Readers</p>
            </div>
            <div>
              <div className="text-5xl font-black text-pink-600 mb-2">4.8★</div>
              <p className="text-slate-600 font-medium">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Featured Books</h2>
              <div className="flex items-center gap-3">
                <span className="h-1 w-12 bg-indigo-600 rounded-full"></span>
                <p className="text-slate-500 font-medium">Handpicked collection for you</p>
              </div>
            </div>
            <button onClick={() => navigate('/search')} className="group flex items-center gap-2 bg-white px-6 py-3 rounded-full border border-slate-200 font-bold hover:bg-slate-900 hover:text-white transition-all">
              View All Books <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {featuredBooks.map((book) => (
              <motion.div 
                key={book.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: book.id * 0.05 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="relative mb-6 rounded-[2rem] overflow-hidden shadow-xl aspect-[3/4]">
                  <img 
                    src={book.cover} 
                    alt={book.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 p-8 flex flex-col justify-end">
                    <div className="flex gap-2">
                       <button 
                         onClick={() => handleQuickView(book.id)}
                         className="flex-1 bg-white text-slate-900 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-500 hover:text-white transition-colors"
                       >
                         <Play size={16} /> Read Now
                       </button>
                       <button className="bg-white/20 backdrop-blur-md text-white p-3 rounded-xl hover:bg-white hover:text-slate-900 transition-all">
                         <Bookmark size={18} />
                       </button>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur shadow-sm px-3 py-1.5 rounded-full flex items-center gap-1.5">
                    <Star size={14} className="text-amber-500 fill-amber-500" />
                    <span className="text-sm font-black text-slate-800">{book.rating}</span>
                  </div>
                </div>
                <div className="px-2">
                  <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors line-clamp-1">{book.title}</h3>
                  <p className="text-slate-500 font-medium text-sm">{book.author}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="relative rounded-[3rem] bg-indigo-600 overflow-hidden shadow-2xl shadow-indigo-200">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl -ml-20 -mb-20"></div>

            <div className="relative z-10 py-20 px-8 text-center">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
                Start Reading <br />Your Favorite Books Today
              </h2>
              <p className="text-indigo-100 text-lg mb-12 max-w-xl mx-auto">
                Join thousands of readers. Access our entire collection of books instantly.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                {isLoggedIn ? (
                  <>
                    <button onClick={() => navigate('/search')} className="px-10 py-5 bg-white text-indigo-600 rounded-2xl font-bold text-lg hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95">
                      Browse Books
                    </button>
                    <button onClick={() => navigate('/my-library')} className="px-10 py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all">
                      My Library
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => navigate('/register')} className="px-10 py-5 bg-white text-indigo-600 rounded-2xl font-bold text-lg hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95">
                      Sign Up Free
                    </button>
                    <button onClick={() => navigate('/login')} className="px-10 py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all">
                      Login
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
