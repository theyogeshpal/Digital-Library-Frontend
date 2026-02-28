import { BookOpen, Users, Target, Award, Heart, Zap, Shield, Sparkles, ArrowRight, Library, BookText, Globe } from 'lucide-react';
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
    { number: '15K+', label: 'Digital Books', icon: Library },
    { number: '8K+', label: 'Active Scholars', icon: Users },
    { number: '60+', label: 'Research Genres', icon: BookText },
    { number: '4.9', label: 'Global Rating', icon: Sparkles }
  ];

  const values = [
    { title: "Integrity", text: "We believe in the sanctity of original thought and scholarly rigor." },
    { title: "Accessibility", text: "Knowledge should have no borders or barriers for those who seek it." },
    { title: "Innovation", text: "Using cutting-edge tech to preserve ancient wisdom for the digital era." }
  ];

  return (
    <div className="min-h-screen bg-[#FDFCFB] overflow-x-hidden selection:bg-teal-200 selection:text-teal-900">
      {/* Premium Hero Section */}
      <div className="relative min-h-[85vh] flex items-center justify-center pt-10 pb-20 overflow-hidden">
        {/* Background Layer */}
        <div className="absolute inset-0">
          <img
            src="hero-banner.avif"
            alt="Majestic Library"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/95 via-indigo-900/80 to-teal-950/90"></div>

          {/* Animated Glows */}
          <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-teal-400/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-indigo-400/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-teal-300 mb-10 animate-fade-in shadow-xl hover:scale-105 transition-transform cursor-default">
              <Sparkles size={18} className="animate-pulse" />
              <span className="text-xs font-black tracking-[0.3em] uppercase">The Pursuit of Wisdom</span>
            </div>

            <h1 className="text-6xl md:text-[9rem] font-black mb-10 tracking-tighter text-white leading-[0.8] drop-shadow-2xl">
              Legacy <br />
              <span className="bg-gradient-to-r from-teal-300 via-emerald-300 to-indigo-300 bg-clip-text text-transparent italic">Redefined.</span>
            </h1>

            <p className="text-xl md:text-3xl text-gray-200/90 mb-16 leading-relaxed font-light max-w-3xl mx-auto">
              We are architects of knowledge, curating the world's finest digital sanctuary for the serious scholar and the curious mind.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-8">
              <Link to="/Collection" className="group relative px-10 py-5 bg-white text-indigo-950 rounded-2xl font-black text-lg overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                <span className="relative z-10 flex items-center gap-3">
                  Enter The Archive
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-teal-50 to-indigo-50 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </Link>

              <div className="flex items-center gap-4 bg-black/20 backdrop-blur-xl px-4 py-3 rounded-2xl border border-white/10">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white ring-2 ring-indigo-950 overflow-hidden shadow-lg transform hover:-translate-y-1 transition-transform">
                      <img src={`https://i.pravatar.cc/100?u=${i + 50}`} alt="Scholars" />
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <div className="text-white font-black text-sm">8.2k Fellow Scholars</div>
                  <div className="text-teal-400 text-[10px] font-bold uppercase tracking-widest">Active Research</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </div>

      {/* Stats Section with Ultra Glassmorphism */}
      <div className="container mx-auto px-4 -mt-12 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 bg-white/70 backdrop-blur-[40px] p-8 md:p-14 rounded-[3rem] border border-white/60 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)]">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group p-6 rounded-3xl hover:bg-white/50 transition-colors">
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-indigo-900 group-hover:text-white transition-all duration-500">
                <stat.icon size={24} />
              </div>
              <div className="text-4xl md:text-5xl font-black text-indigo-950 mb-1">{stat.number}</div>
              <div className="text-[10px] font-black text-teal-600 uppercase tracking-[0.2em]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Philosophy Section */}
      <section className="pt-32 pb-5 container mx-auto px-4 md:px-10">
        <div className="flex flex-col lg:flex-row items-center gap-24">
          <div className="flex-1 space-y-10">
            <div className="space-y-4">
              <h2 className="text-teal-600 font-black tracking-[.2em] uppercase text-sm">The Core Vision</h2>
              <h3 className="text-5xl md:text-[4rem] font-black text-indigo-950 leading-[0.9] tracking-tighter">
                We believe knowledge is a <span className="text-teal-600 underline decoration-teal-500/30 decoration-8 underline-offset-8">living legacy.</span>
              </h3>
            </div>

            <p className="text-xl text-gray-600 leading-relaxed font-light">
              In an age of ephemeral data, we focus on the eternal. Core Archive is more than a platform; it's a commitment to the preservation of human thought, curated for those who demand excellence in their pursuit of wisdom.
            </p>

            <div className="space-y-6">
              {values.map((v, i) => (
                <div key={i} className="group flex items-start gap-6 p-6 rounded-3xl bg-white border border-gray-100 hover:border-teal-200 hover:shadow-2xl hover:shadow-teal-100/50 transition-all duration-500">
                  <div className="w-12 h-12 shrink-0 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600 font-black group-hover:rotate-12 transition-transform">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-black text-indigo-950 text-xl mb-1">{v.title}</h4>
                    <p className="text-gray-500 font-medium">{v.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 relative lg:pe-10">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-br from-indigo-200 to-teal-200 rounded-[4rem] blur-2xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative aspect-[4/5] rounded-[3.5rem] overflow-hidden shadow-2xl border-8 border-white group-hover:scale-[1.02] transition-transform duration-700">
                <img
                  src="Ancient-books.avif"
                  alt="Ancient Books"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-10 left-10 right-10 p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20">
                  <p className="text-white text-lg font-bold italic mb-4">"The only true wisdom is in knowing you know nothing."</p>
                  <cite className="text-teal-300 font-black tracking-widest text-xs uppercase">— Socrates</cite>
                </div>
              </div>
            </div>

            {/* Decoration Elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-teal-100 rounded-full mix-blend-multiply filter blur-2xl animate-pulse"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-100 rounded-full mix-blend-multiply filter blur-2xl animate-pulse delay-700"></div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-4 md:px-10 bg-indigo-950 relative overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-500 via-transparent to-transparent opacity-20 transform scale-150"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <h2 className="text-teal-400 font-black tracking-[.3em] uppercase text-xs">Unrivaled Infrastructure</h2>
            <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter">The Archival Standard.</h3>
            <p className="text-indigo-200 text-lg opacity-80">Every tool is precision-engineered for the modern researcher.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-3 shadow-2xl">
                <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center text-white mb-8 group-hover:rotate-[15deg] transition-transform duration-500 shadow-xl shadow-teal-500/20">
                  <feature.icon size={30} />
                </div>
                <h4 className="text-2xl font-black text-white mb-4 tracking-tight">{feature.title}</h4>
                <p className="text-indigo-200 leading-relaxed text-sm opacity-70 group-hover:opacity-100 transition-opacity">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 container mx-auto px-4 md:px-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 relative order-2 lg:order-1">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-br from-teal-500/20 to-indigo-500/20 rounded-[4rem] blur-3xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative aspect-square max-w-md mx-auto rounded-[3.5rem] overflow-hidden border-8 border-white shadow-2xl">
                <img
                  src="founder.jpeg"
                  alt="Founder Portrait"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              {/* Floating Quote Badge */}
              <div className="absolute -bottom-6 -right-2 lg:-right-12 bg-white p-6 rounded-3xl shadow-2xl max-w-[240px] border border-teal-50">
                <Sparkles size={24} className="text-teal-500 mb-2" />
                <p className="text-indigo-950 font-bold italic text-sm leading-relaxed">
                  "Knowledge is the bridge between our heritage and our future."
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-8 order-1 lg:order-2">
            <div className="space-y-4">
              <h2 className="text-teal-600 font-black tracking-[.2em] uppercase text-sm">The Visionary</h2>
              <h3 className="text-5xl md:text-6xl font-black text-indigo-950 tracking-tighter leading-tight">
                Meet our <br /><span className="text-teal-600 italic">Founder.</span>
              </h3>
            </div>

            <p className="text-xl text-gray-600 leading-relaxed font-light">
              Founded by Er. Yogesh Pal, a pioneer in digital archival preservation, Core Archive began as a passion project to ensure that the world's most critical academic volumes are never lost to the sands of time.
            </p>

            <div className="space-y-4 pt-4">
              <p className="text-gray-500 leading-relaxed font-medium">
                Under his leadership, the archive has grown from a handful of rare manuscripts to a global fellowship of thousands of researchers dedicated to the pursuit of truth.
              </p>

              <div className="flex items-center gap-6 pt-6">
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-indigo-950">Er. Yogesh Pal</span>
                  {/* <span className="text-teal-600 font-bold tracking-widest text-xs uppercase">Curator-in-Chief</span> */}
                </div>
                <div className="flex gap-4">
                  {/* <a href="#" className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-900 hover:bg-indigo-900 hover:text-white transition-all transform hover:-translate-y-1">
                    <Users size={20} />
                  </a> */}
                  <a href="https://yogesh-pal.netlify.app/" target="_blank" className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600 hover:bg-teal-600 hover:text-white transition-all transform hover:-translate-y-1">
                    <Globe size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Presence Section */}
      <section className="py-20 container mx-auto px-4 md:px-10">
        <div className="rounded-[4rem] bg-white border border-gray-100 shadow-[0_100px_100px_-50px_rgba(0,0,0,0.05)] p-8 md:p-24 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none grayscale contrast-150">
            <Globe size={600} className="text-indigo-950 translate-x-1/3 -translate-y-1/4" />
          </div>

          <div className="relative z-10 max-w-2xl space-y-8">
            <div className="w-20 h-2 bg-teal-500 rounded-full"></div>
            <h2 className="text-5xl md:text-7xl font-black text-indigo-950 tracking-tighter leading-[0.9]">
              Knowledge <br /> without <br /> <span className="text-teal-600 italic">Borders.</span>
            </h2>
            <p className="text-xl text-gray-500 font-light leading-relaxed">
              From the libraries of London to the archives of Tokyo, Core Archive connects scholars across 120+ countries, preserving the cultural heritage of humanity in a single, high-fidelity digital repository.
            </p>
            <div className="flex gap-4 pt-4">
              <div className="px-6 py-3 bg-teal-50 rounded-2xl text-teal-700 font-black text-xs uppercase tracking-widest border border-teal-100">120+ Countries</div>
              <div className="px-6 py-3 bg-indigo-50 rounded-2xl text-indigo-700 font-black text-xs uppercase tracking-widest border border-indigo-100">Global Fellowship</div>
            </div>
          </div>
        </div>
      </section>

      {/* Dramatic Call to Action */}
      <div className="container mx-auto px-4 md:px-10 pb-32">
        <div className="relative group overflow-hidden rounded-[4rem]">
          <div className="absolute inset-0 bg-indigo-900 group-hover:scale-110 transition-transform duration-[2s]">
            <img
              src="global-search.avif"
              className="w-full h-full object-cover opacity-30"
              alt="Library"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-indigo-900/40 to-teal-900/60 transition-opacity"></div>

          <div className="relative z-10 p-10 md:p-32 text-center text-white space-y-10">
            <Sparkles size={60} className="mx-auto text-teal-400 animate-pulse" />
            <div className="space-y-4">
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none italic">
                Ready to Join the <br /> <span className="bg-gradient-to-r from-teal-300 to-emerald-300 bg-clip-text text-transparent">Inner Circle?</span>
              </h2>
              <p className="text-xl md:text-2xl text-teal-100/70 max-w-2xl mx-auto font-light">
                Become a Fellow today and gain priority access to our most restricted digital collections.
              </p>
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center gap-6 pt-6">
              <Link to="/Signup" className="px-12 py-6 bg-teal-500 text-white rounded-[2rem] font-black text-xl shadow-2xl shadow-teal-500/30 hover:bg-teal-400 hover:scale-105 active:scale-95 transition-all">
                Start Free Fellowship
              </Link>
              <Link to="/Contact" className="px-12 py-6 bg-white/10 backdrop-blur-xl text-white border border-white/20 rounded-[2rem] font-black text-xl hover:bg-white/20 transition-all">
                Speak to a Curator
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
