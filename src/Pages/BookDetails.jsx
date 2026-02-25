import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, BookOpen, Heart, Share2, Download, User, Calendar, Tag } from 'lucide-react';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(() => {
    // Random data for now - API call will be added later
    const bookData = {
      id: id,
      title: "The Architecture of Logic",
      author: "Dr. Elena Vance",
      category: "Philosophy",
      rating: 4.9,
      reviews: 128,
      pages: 456,
      language: "English",
      publishDate: "2023",
      isbn: "978-3-16-148410-0",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80",
      description: "Exploring the fundamentals of structured thinking and logical reasoning in a digital age. This comprehensive volume delves deep into the principles that govern rational thought and decision-making processes.",
      fullDescription: "In this groundbreaking work, Dr. Elena Vance presents a revolutionary approach to understanding logic in the modern era. The book seamlessly blends classical philosophical traditions with contemporary digital paradigms, offering readers a unique perspective on how we process information and make decisions. Through carefully crafted examples and thought-provoking exercises, readers will develop a deeper appreciation for the architecture that underlies all rational discourse. The text is divided into three main sections: Foundations of Logic, Digital Age Reasoning, and Practical Applications. Each section builds upon the previous, creating a comprehensive framework for understanding how logic shapes our world.",
      tableOfContents: [
        "Chapter 1: Introduction to Logical Thinking",
        "Chapter 2: Classical Logic Foundations",
        "Chapter 3: Digital Age Paradigms",
        "Chapter 4: Reasoning in Complex Systems",
        "Chapter 5: Practical Applications"
      ]
    };
    setBook(bookData);
  }, [id]);

  if (!book) {
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
                <button className="w-full flex items-center justify-center gap-3 bg-blue-500 text-white py-4 rounded-2xl font-bold hover:shadow-xl transition-all">
                  <BookOpen size={20} />
                  Read Now
                </button>
                <div className="grid grid-cols-3 gap-3">
                  <button className="flex items-center justify-center gap-2 bg-white border-2 border-gray-200 py-3 rounded-xl hover:border-indigo-600 hover:text-indigo-600 transition-all">
                    <Heart size={18} />
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-white border-2 border-gray-200 py-3 rounded-xl hover:border-indigo-600 hover:text-indigo-600 transition-all">
                    <Share2 size={18} />
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-white border-2 border-gray-200 py-3 rounded-xl hover:border-indigo-600 hover:text-indigo-600 transition-all">
                    <Download size={18} />
                  </button>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
