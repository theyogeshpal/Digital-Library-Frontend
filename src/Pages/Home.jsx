import React, { useState, useEffect } from 'react';
import { BookOpen, Search, Star, ArrowRight, Shield, Zap, Award, Sparkles, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {

  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mostLikedBook, setMostLikedBook] = useState(null);

  useEffect(() => {
    const getBooks = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://digital-library-backend-jesb.onrender.com/book/show');
        const allBooks = response.data.data;
        // console.log('cs')
        // console.log(response.data.data)
        setBooks(allBooks);

        // Extract unique categories with their first book image
        const uniqueCategories = [...new Set(allBooks.map(book => book.category))];
        const categoryData = uniqueCategories.map(category => {
          const categoryBooks = allBooks.filter(book => book.category === category);
          return {
            title: category,
            count: `${categoryBooks.length} Books`,
            image: categoryBooks[0]?.image || 'digital-library.png'
          };
        });
        setCategories(categoryData);

        // Find most liked book
        const sortedByLikes = allBooks.sort((a, b) => (b.likeCount || 0) - (a.likeCount || 0));
        setMostLikedBook(sortedByLikes[0]);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };
    getBooks();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[91vh] flex items-center justify-center pt-5 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="hero-banner.avif"
            alt="Core Archive Library Interior - A vast landscape of scholarly knowledge and research books"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/60 to-black/60"></div>

          {/* Scholar Mesh Gradient - Integrated with Image */}
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-200/30 rounded-full mix-blend-multiply filter blur-[120px] animate-blob"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-teal-200/30 rounded-full mix-blend-multiply filter blur-[120px] animate-blob animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-teal-50 border border-teal-100 text-teal-700 mb-10 animate-fade-in shadow-sm">
            <Sparkles size={18} className="animate-pulse" />
            <span className="text-sm font-bold tracking-widest uppercase">The Scholar's Sanctuary</span>
          </div>

          <h1 className="text-7xl md:text-9xl font-black mb-10 tracking-tighter text-white leading-[0.9]">
            Knowledge <br />
            <span className="bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent italic">Refined.</span>
          </h1>

          <p className="text-2xl md:text-3xl text-gray-200 max-w-3xl mx-auto mb-6 font-light leading-relaxed">
            Preserving the Digital Essential. Where Logic Meets Legacy. Your Data, Defined.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Link to="/Collection" className="px-10 py-5 bg-indigo-900 text-white rounded-[2rem] font-black text-xl shadow-2xl hover:bg-indigo-950 transition-all hover:scale-105 active:scale-95 flex items-center gap-3 group">
              Start Exploring
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
            <div className="flex items-center gap-4 bg-white/80 backdrop-blur-xl px-8 py-5 rounded-[2rem] border border-white shadow-xl">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden ring-2 ring-indigo-50">
                    <img src={`https://i.pravatar.cc/100?u=${i + 20}`} alt="Core Archive Member Scholar" />
                  </div>
                ))}
              </div>
              <div className="text-left leading-tight">
                <div className="font-bold text-indigo-950">12.5k Scholars</div>
                {/* <div className="text-xs text-teal-600 font-bold uppercase tracking-wider">Online Now</div> */}
              </div>
            </div>
          </div>
        </div>

        {/* Floating Book decoration */}
        <div className="absolute bottom-20 left-10 hidden lg:block animate-bounce animation-duration-3000 opacity-20 transform -rotate-12">
          <BookOpen size={120} className="text-indigo-200" />
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-12 pb-28  container mx-auto px-4 lg:px-20">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-5xl font-black text-indigo-950 mb-6 underline decoration-teal-500 decoration-8 underline-offset-[12px] text-center lg:text-start ">Archives.</h2>
            <p className="text-xl text-gray-500 text-center lg:text-start ">Curated collections spanning across centuries of human intelligence.</p>
          </div>
          <Link to="/Collection" className="text-indigo-900 font-black flex items-center gap-2 hover:gap-4 transition-all pb-2 border-b-4 border-teal-100 mx-auto lg:mx-0  ">
            View All Collections <ArrowRight />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            // Skeleton Loader
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] rounded-2xl overflow-hidden shadow-xl bg-gray-200 animate-pulse">
                <div className="h-full p-6 flex flex-col justify-between">
                  <div className="w-12 h-12 bg-gray-300 rounded-xl"></div>
                  <div>
                    <div className="w-20 h-3 bg-gray-300 rounded mb-2"></div>
                    <div className="w-32 h-6 bg-gray-300 rounded mb-3"></div>
                    <div className="w-8 h-1 bg-gray-300 rounded"></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            categories.map((cat, i) => {
            const colors = ['indigo', 'teal', 'emerald', 'purple', 'blue', 'cyan'];
            const color = colors[i % colors.length];

            return (
              <Link to="/Collection" key={i} className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl transition-all duration-700 hover:-translate-y-2 cursor-pointer">
                {/* Background Image */}
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-125"
                />

                {/* Overlay Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br transition-opacity duration-700 opacity-80 group-hover:opacity-90 ${
                  color === 'indigo' ? 'from-indigo-950/90 via-indigo-900/60 to-transparent' :
                  color === 'teal' ? 'from-teal-950/90 via-teal-900/60 to-transparent' :
                  color === 'emerald' ? 'from-emerald-950/90 via-emerald-900/60 to-transparent' :
                  color === 'purple' ? 'from-purple-950/90 via-purple-900/60 to-transparent' :
                  color === 'blue' ? 'from-blue-950/90 via-blue-900/60 to-transparent' :
                  'from-cyan-950/90 via-cyan-900/60 to-transparent'
                }`}></div>

                <div className="relative h-full p-6 flex flex-col justify-between text-white z-10">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12 group-hover:scale-110 border border-white/20">
                    <BookOpen size={24} className="text-white" />
                  </div>
                  <div>
                    <div className="text-teal-400 font-bold mb-1 uppercase tracking-widest text-xs">{cat.count}</div>
                    <h3 className="text-2xl font-black mb-3 leading-tight">{cat.title}</h3>
                    <div className="w-8 h-1 bg-teal-500 rounded-full group-hover:w-full transition-all duration-700"></div>
                  </div>
                </div>
              </Link>
            );
          })
          )}
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-10 bg-indigo-950 relative overflow-hidden">

        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <Quote size={80} className="mx-auto mb-10 text-teal-500 opacity-20" />
          <h2 className="text-5xl md:text-6xl font-black mb-12 max-w-4xl mx-auto leading-tight italic">
            "We are not just a repository of books; we are the guardians of human curiosity."
          </h2>
          <div className="w-20 h-1 bg-teal-500 mx-auto mb-8"></div>
          <div className="text-xl font-bold uppercase tracking-[0.3em] text-teal-400">The Core Archive Charter</div>
        </div>
      </section>

      {/* Featured Book Section */}
      <section className="py-20 container mx-auto px-4">
        {mostLikedBook ? (
          <div className="bg-white rounded-[4rem] p-10 md:p-15 border border-indigo-50 shadow-[0_64px_128px_-32px_rgba(0,0,0,0.1)] flex flex-col lg:flex-row items-center gap-20">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-50 text-indigo-700 font-bold text-sm mb-8 uppercase tracking-widest">
                Book of the Month
              </div>
              <h2 className="text-5xl font-black text-indigo-950 mb-8 leading-tight">
                {mostLikedBook.title}
              </h2>
              <p className="text-xl text-gray-600 mb-4">
                <span className="font-bold">By {mostLikedBook.author}</span>
              </p>
              <p className="text-xl text-gray-500 leading-relaxed mb-8">
                {mostLikedBook.description}
              </p>
              <Link to={`/book/${mostLikedBook._id}`} className="flex items-center gap-4 text-xl font-black text-indigo-900 group">
                Explore the Book
                <span className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center group-hover:bg-indigo-900 group-hover:text-white transition-all">
                  <ArrowRight />
                </span>
              </Link>
            </div>
            <div className="flex-1 w-full relative flex justify-center">
              <div className="w-1/2 aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700 hover:scale-105 border-8 border-white">
                <img
                  src={mostLikedBook.image}
                  alt={mostLikedBook.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-teal-500 p-5 rounded-3xl shadow-2xl animate-bounce animation-duration-5000">
                <Star size={30} className="text-white" />
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-[4rem] p-10 md:p-20 border border-indigo-50 shadow-[0_64px_128px_-32px_rgba(0,0,0,0.1)] flex flex-col lg:flex-row items-center gap-20">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-50 text-indigo-700 font-bold text-sm mb-8 uppercase tracking-widest">
                Book of the Month
              </div>
              <h2 className="text-5xl font-black text-indigo-950 mb-8 leading-tight">
                The Evolution of <br />
                <span className="text-teal-600">Digital Intelligence</span>
              </h2>
              <p className="text-xl text-gray-500 leading-relaxed mb-10">
                A deep dive into how large language models are reshaping the methodology of academic study in the 21st century.
              </p>
              <Link to="/Collection" className="flex items-center gap-4 text-xl font-black text-indigo-900 group">
                Explore the Collection
                <span className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center group-hover:bg-indigo-900 group-hover:text-white transition-all">
                  <ArrowRight />
                </span>
              </Link>
            </div>
            <div className="flex-1 w-full relative">
              <div className="aspect-[6/5] rounded-[3rem] overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700 hover:scale-105 border-8 border-white">
                <img
                  src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80"
                  alt="Scholarly Research and Digital Intelligence documentation at Core Archive"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-teal-500 p-5 rounded-3xl shadow-2xl animate-bounce animation-duration-5000">
                <Star size={30} className="text-white" />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* FAQ Section */}
      <FAQSection />
    </div>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "What exactly is Core Archive?",
      answer: "Core Archive is a premium digital sanctuary dedicated to preserving centuries of human knowledge. We provide a refined platform for scholars, researchers, and serious readers to access high-fidelity digital volumes across academic and literary disciplines."
    },
    {
      question: "How do I access the digital collection?",
      answer: "You can explore our featured archives as a guest, but full high-resolution access and search capabilities are available to registered scholars. Simply navigate to the 'Collection' page to start your research journey."
    },
    {
      question: "Is there a fellowship fee for Core Archive?",
      answer: "Standard archival access is provided free of charge to promote democratic wisdom. However, premium features such as advanced AI research tools, unlimited high-speed volume downloads, and exclusive early access to rare reprints require a Fellowship membership."
    },
    {
      question: "Can I contribute to the archive?",
      answer: "We are always looking to expand our horizons. If you have verified scholarly data or high-quality digital scans of rare academic works, you can apply to become a 'Contributing Scholar' via our contact page."
    },
    {
      question: "How does the AI search feature work?",
      answer: "Our archive is built on a custom AI infrastructure that understands the semantic context of your queries. Instead of just keyword matching, it identifies relevant concepts across thousands of volumes to give you the most precise results for your study."
    }
  ];

  return (
    <section className="py-24 bg-slate-50/50">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-bold text-xs uppercase tracking-widest mb-4">
            Common Inquiries
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-indigo-950 mb-6">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">Everything you need to know about navigating the world's most refined digital repository.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`group rounded-2xl border transition-all duration-300 overflow-hidden ${
                openIndex === index
                  ? 'bg-white border-indigo-200 shadow-xl'
                  : 'bg-white/40 border-slate-200 hover:border-indigo-100'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between gap-4"
              >
                <span className={`text-lg font-bold transition-colors ${
                  openIndex === index ? 'text-indigo-900' : 'text-slate-700 group-hover:text-indigo-700'
                }`}>
                  {faq.question}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  openIndex === index ? 'bg-indigo-900 text-white rotate-180' : 'bg-slate-100 text-slate-400'
                }`}>
                  <ArrowRight size={18} className="rotate-90" />
                </div>
              </button>

              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-8 pb-8 pt-0 text-gray-500 leading-relaxed text-lg border-t border-indigo-50 mt-2">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center p-12 rounded-[3rem] bg-indigo-900 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-teal-400/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
          <p className="opacity-80 mb-8 max-w-md mx-auto">Our archive curators are here to help you find the exact knowledge you're looking for.</p>
          <Link to="/Contact" className="inline-flex items-center gap-2 px-8 py-4 bg-teal-500 text-white rounded-2xl font-black hover:bg-teal-400 transition-all hover:scale-105 active:scale-95 shadow-lg">
            Connect With Curator
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
