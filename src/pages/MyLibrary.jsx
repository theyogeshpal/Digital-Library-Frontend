import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLibrary } from '../context/LibraryContext';
import { useAuth } from '../context/AuthContext';
import { Clock, Heart, BookOpen, Trash2, Star } from 'lucide-react';

const MyLibrary = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('current');
  const { books, wishlist, currentReads, removeFromWishlist } = useLibrary();
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    navigate('/login');
    return null;
  }

  const wishlistBooks = books.filter(book => wishlist.includes(book.id));
  const currentReadsBooks = currentReads.map(cr => ({
    ...books.find(book => book.id === cr.id),
    progress: cr.progress
  }));

  const tabs = [
    { id: 'current', label: 'Current Reads', icon: BookOpen, count: currentReadsBooks.length },
    { id: 'wishlist', label: 'Wishlist', icon: Heart, count: wishlistBooks.length },
    { id: 'history', label: 'History', icon: Clock, count: 0 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">My Library</h1>
          <p className="text-gray-600">Manage your reading journey</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto">
          {tabs.map(tab => (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id)} 
              className={`flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/50 scale-105' 
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <tab.icon size={20} />
              <span>{tab.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                activeTab === tab.id ? 'bg-white/20' : 'bg-gray-100'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Current Reads */}
        {activeTab === 'current' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentReadsBooks.map(item => (
              <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                <div className="flex gap-6 p-6">
                  <div className="relative flex-shrink-0">
                    <img 
                      src={item.cover} 
                      alt={item.title} 
                      className="w-32 h-44 object-cover rounded-xl shadow-md cursor-pointer hover:scale-105 transition-transform duration-300" 
                      onClick={() => navigate(`/resource/${item.id}`)} 
                    />
                    <div className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full px-2 py-1 flex items-center gap-1">
                        <Star size={12} className="text-white fill-white" />
                        <span className="text-xs font-semibold text-white">{item.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col">
                    <h3 
                      className="font-semibold text-xl mb-1 cursor-pointer hover:text-indigo-600 transition-colors duration-300" 
                      onClick={() => navigate(`/resource/${item.id}`)}
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">by {item.author}</p>
                    <div className="mt-auto">
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-medium text-gray-700">Reading Progress</span>
                          <span className="font-semibold text-indigo-600">{item.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2.5 rounded-full transition-all duration-500" 
                            style={{ width: `${item.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <button 
                        onClick={() => navigate(`/reader/${item.id}`)} 
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                      >
                        Continue Reading
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Wishlist */}
        {activeTab === 'wishlist' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistBooks.map(item => (
              <div key={item.id} className="group bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="relative">
                  <img 
                    src={item.cover} 
                    alt={item.title} 
                    className="w-full h-72 object-cover cursor-pointer group-hover:scale-110 transition-transform duration-300" 
                    onClick={() => navigate(`/resource/${item.id}`)} 
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 shadow-md">
                    <Star size={14} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-semibold">{item.rating}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 
                    className="font-semibold mb-1 cursor-pointer hover:text-indigo-600 transition-colors duration-300 truncate" 
                    onClick={() => navigate(`/resource/${item.id}`)}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">{item.author}</p>
                  <button className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105" onClick={() => removeFromWishlist(item.id)}>
                    <Trash2 size={16} />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* History */}
        {activeTab === 'history' && (
          <div className="text-center py-12">
            <p className="text-gray-500">No reading history yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLibrary;
