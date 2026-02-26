import { BookOpen, Users, Target, Award, Heart, Zap, Shield, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Vast Collection',
      desc: 'Access thousands of curated books across all genres and academic levels.',
      color: 'blue'
    },
    {
      icon: Users,
      title: 'Global Community',
      desc: 'Connect with a thriving network of readers and learners worldwide.',
      color: 'purple'
    },
    {
      icon: Target,
      title: 'Seamless Access',
      desc: 'Your library in your pocket. Read anytime, anywhere, on any device.',
      color: 'pink'
    },
    {
      icon: Award,
      title: 'Quality First',
      desc: 'Verified, high-quality content processed for the best digital experience.',
      color: 'indigo'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Digital Books' },
    { number: '5K+', label: 'Happy Readers' },
    { number: '50+', label: 'Genres' },
    { number: '4.8', label: 'Global Rating' }
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Dynamic Hero Section */}
      <div className="relative min-h-[80vh] flex items-center justify-center pt-20 pb-16 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80" 
            alt="Library Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/90 via-purple-900/85 to-teal-900/90"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 border border-teal-100 text-teal-600 mb-8 animate-bounce">
              <Sparkles size={18} />
              <span className="text-sm font-semibold tracking-wide uppercase">Elite Learning</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tight text-white">
              Behind the <span className="bg-gradient-to-r from-teal-300 to-emerald-300 bg-clip-text text-transparent">Pages</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-12 leading-relaxed font-light">
              We're building the infrastructure for tomorrow's knowledge. A digital sanctuary for serious readers and life-long learners.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <Link to="/Collection" className="px-8 py-4 bg-indigo-900 text-white rounded-2xl font-bold shadow-2xl hover:bg-indigo-950 transition-all transform hover:-translate-y-1">
                Explore The Archive
              </Link>
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-gray-200 overflow-hidden">
                    <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="Core Archive Contributing Scholar" />
                  </div>
                ))}
                <div className="w-12 h-12 rounded-full border-4 border-white bg-teal-600 flex items-center justify-center text-white text-xs font-bold">
                  +10k
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats with Glassmorphism */}
      <div className="container mx-auto px-4 mt-20 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 bg-white/80 backdrop-blur-2xl p-8 md:p-12 rounded-[2.5rem] border border-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)]">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="text-4xl md:text-5xl font-black text-indigo-950 mb-2 transition-transform group-hover:scale-110">{stat.number}</div>
              <div className="text-sm font-bold text-teal-600/60 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="container mx-auto px-4 py-24">
        {/* Mission Section */}
        <div className="flex flex-col lg:flex-row items-center gap-20 mb-32">
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight text-indigo-950">
              Our Mission is to <br />
              <span className="text-teal-600">Democratize Wisdom</span>
            </h2>
            <p className="text-xl text-gray-500 leading-relaxed mb-10">
              In a world of noise, we offer clarity. Core Archive is dedicated to preserving the world's most valuable knowledge and making it accessible to every corner of the globe.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: Shield, title: 'Secure Vault', desc: 'Encrypted and private reading environment.' },
                { icon: Zap, title: 'Hyper Speed', desc: 'Blazing fast access to heavy volumes.' }
              ].map((item, i) => (
                <div key={i} className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100/50">
                  <item.icon className="text-teal-600 mb-4" />
                  <h4 className="font-bold text-indigo-950 mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="aspect-[6/5] rounded-[3rem] overflow-hidden shadow-2xl relative group">
              <img
                src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80"
                alt="Historical Library Archive at Core Archive - Preserving Centuries of Human Knowledge"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/80 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 text-white text-center md:text-left">
                <p className="text-2xl font-bold italic">"Information is the currency of democracy."</p>
                <cite className="text-sm mt-2 block opacity-80 font-medium">— Thomas Jefferson</cite>
              </div>
            </div>
            {/* Soft Glow decoration */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-200/30 rounded-full blur-3xl animate-pulse"></div>
          </div>
        </div>

        {/* The Academic Standard */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4 text-indigo-950">The Academic Standard</h2>
          <p className="text-gray-500 text-lg">Tools designed specifically for deep study and archival preservation.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group p-8 rounded-[2rem] bg-white border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className={`w-14 h-14 rounded-2xl mb-6 flex items-center justify-center transition-transform group-hover:rotate-12 ${feature.color === 'blue' ? 'bg-indigo-50 text-indigo-600' :
                feature.color === 'purple' ? 'bg-teal-50 text-teal-600' :
                  feature.color === 'pink' ? 'bg-emerald-50 text-emerald-600' :
                    'bg-indigo-50 text-indigo-600'
                }`}>
                <feature.icon size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-indigo-950">{feature.title}</h3>
              <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Values/Call to Action */}
      <div className="container mx-auto px-4 pb-24">
        <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-teal-900 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-[0_32px_64px_-16px_rgba(30,41,59,0.3)]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-400/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="relative z-10">
            <img src="logo/horizontal-logo.png" alt="Core Archive - Official Scholarly Repository Logo" className="w-100 invert mx-auto mb-8 text-teal-400" />
            <h2 className="text-4xl md:text-5xl font-black mb-8 italic">Ready to Begin Your Fellowship?</h2>
            <p className="text-xl opacity-80 mb-10 max-w-2xl mx-auto font-light">
              Join thousands of scholars and access the world's finest digital collection.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/Signup" className="px-10 py-5 bg-teal-500 text-white rounded-2xl font-black shadow-xl hover:bg-teal-400 transition-all hover:scale-105 active:scale-95 cursor-pointer">
                Create Free Account
              </Link >
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
