import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, BookOpen, Heart, Share2, Download, User, Calendar, Tag, X, Facebook, Twitter, Linkedin, Link, Check } from 'lucide-react';
import axios from 'axios';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://digital-library-backend-jesb.onrender.com/book/show/${id}`);
        setBook(response.data.data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBookDetails();
    }
  }, [id]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnSocial = (platform) => {
    const url = window.location.href;
    const text = `Check out "${book.title}" by ${book.author}`;
    
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
    };
    
    window.open(urls[platform], '_blank', 'width=600,height=400');
  };

  if (loading || !book) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading book details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <button
            onClick={() => navigate('/Collection')}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Collection
          </button>
        </div>
      </div>

      {/* Book Details Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column - Book Image */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full aspect-[3/4] object-cover"
                />
              </div>
              
              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                <button 
                  onClick={() => setShowPdfModal(true)}
                  className="w-full flex items-center justify-center gap-3 bg-blue-500 text-white py-4 rounded-2xl font-bold hover:shadow-xl transition-all"
                >
                  <BookOpen size={20} />
                  Read Now
                </button>
                <div className="grid grid-cols-3 gap-3">
                  <button className="flex items-center justify-center gap-2 bg-white border-2 border-gray-200 py-3 rounded-xl hover:border-indigo-600 hover:text-indigo-600 transition-all">
                    <Heart size={18} />
                  </button>
                  <button 
                    onClick={() => setShowShareModal(true)}
                    className="flex items-center justify-center gap-2 bg-white border-2 border-gray-200 py-3 rounded-xl hover:border-indigo-600 hover:text-indigo-600 transition-all"
                  >
                    <Share2 size={18} />
                  </button>
                  <a target='_blank' download={`${book.title}.pdf`} href={book.bookPdf} className="flex items-center justify-center gap-2 bg-white border-2 border-gray-200 py-3 rounded-xl hover:border-indigo-600 hover:text-indigo-600 transition-all">
                    <Download size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Book Info */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              
              {/* Category Badge */}
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 text-teal-600 rounded-full text-sm font-bold">
                  <Tag size={16} />
                  {book.category}
                </span>
                <div className="flex items-center gap-1">
                  <Star className="text-yellow-400 fill-yellow-400" size={20} />
                  <span className="font-bold text-gray-900">{book.rating}</span>
                  <span className="text-gray-500 text-sm">({book.reviews} reviews)</span>
                </div>
              </div>

              {/* Title & Author */}
              <h1 className="text-4xl font-black text-gray-900 mb-3">{book.title}</h1>
              <p className="flex items-center gap-2 text-xl text-gray-600 mb-6">
                <User size={20} />
                By {book.author}
              </p>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About this Book</h2>
                <p className="text-gray-600 leading-relaxed mb-4">{book.description}</p>
                <p className="text-gray-600 leading-relaxed">{book.fullDescription}</p>
              </div>

              {/* Book Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Pages</p>
                  <p className="font-bold text-gray-900">{book.pages}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Language</p>
                  <p className="font-bold text-gray-900">{book.language}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Writer</p>
                  <p className="font-bold text-gray-900">{book.author}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Published</p>
                  <p className="font-bold text-gray-900">{book.publishDate}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-600 mb-1">ISBN</p>
                  <p className="font-bold text-gray-900">{book.isbn}</p>
                </div>
              </div>

              {/* Table of Contents */}
              {book.tableOfContents && book.tableOfContents.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Table of Contents</h2>
                  <div className="space-y-3">
                    {book.tableOfContents.map((chapter, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-indigo-50 transition-colors cursor-pointer"
                      >
                        <div className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </div>
                        <span className="font-medium text-gray-700">{chapter}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* PDF Modal */}
      {showPdfModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">{book.title}</h3>
              <button
                onClick={() => setShowPdfModal(false)}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <iframe
                src={book.bookPdf}
                className="w-full h-full"
                title={book.title}
              />
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Share Book</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-6">
              <button
                onClick={() => shareOnSocial('facebook')}
                className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors"
              >
                <Facebook size={20} className="text-white sm:w-6 sm:h-6" />
              </button>

              <button
                onClick={() => shareOnSocial('twitter')}
                className="w-12 h-12 sm:w-14 sm:h-14 bg-sky-500 hover:bg-sky-600 rounded-full flex items-center justify-center transition-colors"
              >
                <Twitter size={20} className="text-white sm:w-6 sm:h-6" />
              </button>

              <button
                onClick={() => shareOnSocial('linkedin')}
                className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-700 hover:bg-blue-800 rounded-full flex items-center justify-center transition-colors"
              >
                <Linkedin size={20} className="text-white sm:w-6 sm:h-6" />
              </button>

              <button
                onClick={() => shareOnSocial('whatsapp')}
                className="w-12 h-12 sm:w-14 sm:h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </button>

              <button
                onClick={() => shareOnSocial('telegram')}
                className="w-12 h-12 sm:w-14 sm:h-14 bg-sky-400 hover:bg-sky-500 rounded-full flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </button>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm font-semibold text-gray-700 mb-3">Or copy link</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={window.location.href}
                  readOnly
                  className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-600"
                />
                <button
                  onClick={handleCopyLink}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  {copied ? <Check size={18} /> : <Link size={18} />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetails;
