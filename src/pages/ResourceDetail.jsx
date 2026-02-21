import { useParams, useNavigate } from 'react-router-dom';
import { useLibrary } from '../context/LibraryContext';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Calendar, Globe, Hash, Heart, Share2, Eye, Star, Download } from 'lucide-react';

const ResourceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { books, addToWishlist, wishlist } = useLibrary();
  const { isLoggedIn } = useAuth();

  const resource = books.find(book => book.id === parseInt(id)) || {
    id,
    title: 'The Art of Programming',
    author: 'John Doe',
    isbn: '978-3-16-148410-0',
    publishDate: 'January 15, 2022',
    language: 'English',
    pages: 450,
    type: 'Book',
    rating: 4.8,
    reviews: 1234,
    cover: 'https://via.placeholder.com/300x400/4F46E5/FFFFFF?text=Book+Cover',
    summary: 'A comprehensive guide to modern programming practices.',
    description: 'This book provides an in-depth exploration of programming fundamentals.',
    tags: ['Programming', 'Software Development', 'Computer Science', 'Technology']
  };

  const handleReadNow = () => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      navigate(`/reader/${id}`);
    }
  };

  const handleAddToWishlist = () => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      addToWishlist(parseInt(id));
    }
  };

  const relatedResources = books.filter(book => book.id !== parseInt(id)).slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Cover & Actions */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="relative mb-6 group">
                <img src={resource.cover} alt={resource.title} className="w-full rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full flex items-center gap-1 shadow-lg">
                  <Star size={16} className="text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold">{resource.rating}</span>
                  <span className="text-sm text-gray-600">({resource.reviews})</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <button 
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3.5 rounded-xl flex items-center justify-center gap-2 font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/50" 
                  onClick={handleReadNow}
                >
                  <Eye size={20} />
                  <span>Read Now</span>
                </button>
                <button className="w-full bg-white hover:bg-gray-50 border-2 border-indigo-600 text-indigo-600 py-3.5 rounded-xl flex items-center justify-center gap-2 font-medium transition-all duration-300 hover:scale-105">
                  <Download size={20} />
                  <span>Download</span>
                </button>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={handleAddToWishlist}
                    className="bg-white hover:bg-gray-50 border border-gray-300 py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105"
                  >
                    <Heart size={20} className={wishlist.includes(parseInt(id)) ? 'text-red-500 fill-red-500' : 'text-red-500'} />
                    <span className="text-sm font-medium">Wishlist</span>
                  </button>
                  <button className="bg-white hover:bg-gray-50 border border-gray-300 py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105">
                    <Share2 size={20} className="text-blue-500" />
                    <span className="text-sm font-medium">Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{resource.title}</h1>
              <p className="text-xl text-gray-600 mb-6">by <span className="font-semibold text-gray-800">{resource.author}</span></p>

              {/* Metadata */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 mb-6">
                <h2 className="font-semibold text-lg mb-4 text-gray-800">Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <Hash size={20} className="text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">ISBN</p>
                      <p className="font-medium text-gray-800">{resource.isbn}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <Calendar size={20} className="text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Published</p>
                      <p className="font-medium text-gray-800">{resource.publishDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <Globe size={20} className="text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Language</p>
                      <p className="font-medium text-gray-800">{resource.language}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <BookOpen size={20} className="text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Pages</p>
                      <p className="font-medium text-gray-800">{resource.pages}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="mb-6">
                <h2 className="font-semibold text-xl mb-3 text-gray-800">Summary</h2>
                <p className="text-gray-700 leading-relaxed">{resource.summary}</p>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h2 className="font-semibold text-xl mb-3 text-gray-800">Description</h2>
                <p className="text-gray-700 leading-relaxed">{resource.description}</p>
              </div>

              {/* Tags */}
              <div>
                <h2 className="font-semibold text-xl mb-3 text-gray-800">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {resource.tags.map(tag => (
                    <span key={tag} className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium hover:from-indigo-200 hover:to-purple-200 transition-all duration-300 cursor-pointer">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Related Resources */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="font-semibold text-xl mb-6 text-gray-800">Related Resources</h2>
              <div className="grid grid-cols-3 gap-4">
                {relatedResources.map(item => (
                  <div 
                    key={item.id} 
                    className="group cursor-pointer"
                    onClick={() => navigate(`/resource/${item.id}`)}
                  >
                    <div className="relative mb-3">
                      <img src={item.cover} alt={item.title} className="w-full rounded-xl shadow-md group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                        <Star size={12} className="text-yellow-500 fill-yellow-500" />
                        <span className="text-xs font-semibold">{item.rating}</span>
                      </div>
                    </div>
                    <h3 className="font-medium text-sm truncate text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">{item.title}</h3>
                    <p className="text-xs text-gray-600">{item.author}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceDetail;
