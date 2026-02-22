import React from 'react';
import { BookOpen, Search, Star, ArrowRight, Shield, Zap, Award, Sparkles, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {

  const categories = [
    { title: 'Digital Archives', count: '4,200+ Volumes', color: 'indigo', icon: Shield },
    { title: 'Research Papers', count: '12,500+ Papers', color: 'teal', icon: Zap },
    { title: 'Classic Literature', count: '1,800+ Classics', color: 'emerald', icon: Award }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[91vh] flex items-center justify-center pt-5 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="hero-banner.avif"
            alt="Library"
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

          <h1 className="text-7xl md:text-9xl font-black mb-10 tracking-tighter text-indigo-500 leading-[0.9]">
            Knowledge <br />
            <span className="bg-gradient-to-r from-indigo-600 via-teal-600 to-emerald-500 bg-clip-text text-transparent italic">Refined.</span>
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
                    <img src={`https://i.pravatar.cc/100?u=${i + 20}`} alt="scholar" />
                  </div>
                ))}
              </div>
              <div className="text-left leading-tight">
                <div className="font-bold text-indigo-950">12.5k Scholars</div>
                <div className="text-xs text-teal-600 font-bold uppercase tracking-wider">Online Now</div>
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
      <section className="py-12 pb-28  container mx-auto px-20">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-5xl font-black text-indigo-950 mb-6 underline decoration-teal-500 decoration-8 underline-offset-[12px]">Archives.</h2>
            <p className="text-xl text-gray-500">Curated collections spanning across centuries of human intelligence.</p>
          </div>
          <Link to="/Catalogue" className="text-indigo-900 font-black flex items-center gap-2 hover:gap-4 transition-all pb-2 border-b-4 border-teal-100">
            View All Collections <ArrowRight />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {categories.map((cat, i) => (
            <div key={i} className="group relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-700 hover:-translate-y-4">
              <div className={`absolute inset-0 bg-gradient-to-br transition-opacity duration-700 opacity-90 group-hover:opacity-100 ${cat.color === 'indigo' ? 'from-indigo-900 to-indigo-950' :
                cat.color === 'teal' ? 'from-teal-800 to-teal-950' :
                  'from-emerald-800 to-emerald-950'
                }`}></div>
              {/* Pattern Overlay */}
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

              <div className="relative h-full p-10 flex flex-col justify-between text-white">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-12 group-hover:scale-110">
                  <cat.icon size={32} className="text-white" />
                </div>
                <div>
                  <div className="text-teal-400 font-bold mb-2 uppercase tracking-widest text-sm">{cat.count}</div>
                  <h3 className="text-4xl font-black mb-6 leading-tight">{cat.title}</h3>
                  <div className="w-12 h-1.5 bg-teal-500 rounded-full group-hover:w-full transition-all duration-700"></div>
                </div>
              </div>
            </div>
          ))}
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

      {/* Featured Paper Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="bg-white rounded-[4rem] p-10 md:p-20 border border-indigo-50 shadow-[0_64px_128px_-32px_rgba(0,0,0,0.1)] flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-50 text-indigo-700 font-bold text-sm mb-8 uppercase tracking-widest">
              Paper of the Month
            </div>
            <h2 className="text-5xl font-black text-indigo-950 mb-8 leading-tight">
              The Evolution of <br />
              <span className="text-teal-600">Digital Intelligence</span>
            </h2>
            <p className="text-xl text-gray-500 leading-relaxed mb-10">
              A deep dive into how large language models are reshaping the methodology of academic research in the 21st century.
            </p>
            <button className="flex items-center gap-4 text-xl font-black text-indigo-900 group">
              Read Original Paper
              <span className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center group-hover:bg-indigo-900 group-hover:text-white transition-all">
                <ArrowRight />
              </span>
            </button>
          </div>
          <div className="flex-1 w-full relative">
            <div className="aspect-[6/5] rounded-[3rem] overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700 hover:scale-105 border-8 border-white">
              <img
                src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80"
                alt="Research"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-teal-500 p-10 rounded-[2.5rem] shadow-2xl animate-bounce animation-duration-5000">
              <Star size={40} className="text-white" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
