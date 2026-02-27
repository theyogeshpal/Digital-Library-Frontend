import { useState, useEffect } from 'react';
import { Heart, BookOpen, Star, ArrowRight, Trash2, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Wishlist = () => {
  const navigate = useNavigate();
  const [wishlistBooks, setWishlistBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const username = localStorage.getItem('Username');
    if (!username) {
      navigate('/Login');
      return;
    }
    fetchWishlist();
  }, [navigate]);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const username = localStorage.getItem('Username');
      
      const response = await axios.get(`https://digital-library-backend-jesb.onrender.com/api/likedbooks/${username}`);
      
      if (response.data.data && response.data.data.length > 0) {
        const booksData = response.data.data.map(item => item.bookid);
        setWishlistBooks(booksData);
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (bookId) => {
    Swal.fire({
      title: 'Remove from Favourites?',
      text: 'This book will be removed from your favourites',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DC2626',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, remove it',
      cancelButtonText: 'Cancel'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const username = localStorage.getItem('Username');
          await axios.post('https://digital-library-backend-jesb.onrender.com/api/like', {
            uname: username,
            bid: bookId
          });
          
          setWishlistBooks(wishlistBooks.filter(book => book._id !== bookId));
          
          Swal.fire({
            icon: 'success',
            title: 'Removed!',
            text: 'Book removed from favourites',
            timer: 1500,
            showConfirmButton: false
          });
        } catch (error) {
          console.error('Error removing book:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Failed to remove book',
            timer: 1500,
            showConfirmButton: false
          });
        }
      }
    });
  };

  const filteredBooks = wishlistBooks.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center shadow-xl">
              <Heart size={32} className="text-white fill-white" />
            </div>
            <div>
              <h1 className="text-5xl font-black text-gray-900">My Favourite List</h1>
              <p className="text-gray-600 text-lg">Your curated collection of beloved books</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl mt-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search in your favourites..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent shadow-sm"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                <Heart size={24} className="text-pink-600" />
              </div>
              <div>
                <div className="text-3xl font-black text-gray-900">{wishlistBooks.length}</div>
                <div className="text-sm text-gray-600 font-medium">Total Books</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                <BookOpen size={24} className="text-indigo-600" />
              </div>
              <div>
                <div className="text-3xl font-black text-gray-900">{new Set(wishlistBooks.map(b => b.category)).size}</div>
                <div className="text-sm text-gray-600 font-medium">Categories</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <Star size={24} className="text-amber-600" />
              </div>
              <div>
                <div className="text-3xl font-black text-gray-900">
                  {wishlistBooks.length > 0 ? (wishlistBooks.reduce((acc, book) => acc + parseFloat(book.rating || 0), 0) / wishlistBooks.length).toFixed(1) : '0.0'}
                </div>
                <div className="text-sm text-gray-600 font-medium">Avg Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Books Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600 font-medium">Loading your favourites...</p>
          </div>
        ) : filteredBooks.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart size={64} className="text-gray-300" />
            </div>
            <h3 className="text-3xl font-black text-gray-900 mb-4">
              {searchQuery ? 'No books found' : 'Your favourite list is empty'}
            </h3>
            <p className="text-gray-600 text-lg mb-8">
              {searchQuery ? 'Try adjusting your search' : 'Start adding books you love to your favourites'}
            </p>
            <button
              onClick={() => navigate('/Collection')}
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-2xl font-bold hover:shadow-xl transition-all hover:scale-105"
            >
              Explore Books
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredBooks.map((book) => (
              <div
                key={book._id}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                {/* Book Cover */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromWishlist(book._id)}
                    className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-pink-600 hover:bg-pink-600 hover:text-white transition-all shadow-lg"
                  >
                    <Trash2 size={18} />
                  </button>

                  {/* View Details Button */}
                  <button
                    onClick={() => navigate(`/book/${book._id}`)}
                    className="absolute bottom-3 left-3 right-3 py-2 bg-white/90 backdrop-blur-md text-gray-900 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0"
                  >
                    View Details
                  </button>
                </div>

                {/* Book Info */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-pink-600 bg-pink-50 px-2 py-1 rounded">
                      {book.category}
                    </span>
                    <div className="flex items-center gap-1 text-xs font-bold text-gray-600">
                      <Heart className="text-red-400 fill-red-400" size={12} />
                      {book.likeCount? book.likeCount : 0}
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-pink-600 transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-sm text-gray-600 font-medium">By {book.author}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
