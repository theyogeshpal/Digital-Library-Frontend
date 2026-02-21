import { BookOpen, Users, Award, Target, Check, Sparkles } from 'lucide-react';

const About = () => {
  const stats = [
    { label: 'Books Available', value: '50,000+', icon: BookOpen, gradient: 'from-blue-500 to-cyan-500' },
    { label: 'Active Members', value: '10,000+', icon: Users, gradient: 'from-purple-500 to-pink-500' },
    { label: 'Years of Service', value: '15+', icon: Award, gradient: 'from-orange-500 to-red-500' },
    { label: 'Daily Readers', value: '5,000+', icon: Target, gradient: 'from-green-500 to-emerald-500' }
  ];

  const tiers = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      features: ['Access to 1,000+ free books', 'Basic search', 'Read online', 'Community forums'],
      gradient: 'from-gray-400 to-gray-600',
      popular: false
    },
    {
      name: 'Premium',
      price: '$9.99',
      period: 'per month',
      features: ['Access to all 50,000+ books', 'Advanced search & filters', 'Offline downloads', 'No ads', 'Priority support'],
      gradient: 'from-indigo-600 to-purple-600',
      popular: true
    },
    {
      name: 'Institution',
      price: 'Custom',
      period: 'contact us',
      features: ['Everything in Premium', 'Multi-user accounts', 'Admin dashboard', 'Usage analytics', 'Dedicated support', 'Custom branding'],
      gradient: 'from-purple-600 to-pink-600',
      popular: false
    }
  ];

  const values = [
    {
      title: 'Accessibility',
      description: 'Making knowledge available to everyone, regardless of location or background.',
      icon: BookOpen,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Community',
      description: 'Building a global network of learners and knowledge seekers.',
      icon: Users,
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Quality',
      description: 'Curating high-quality, verified resources from trusted sources.',
      icon: Award,
      gradient: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="text-yellow-300" size={24} />
            <span className="text-sm font-semibold uppercase tracking-wider">About Us</span>
            <Sparkles className="text-yellow-300" size={24} />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About DigiLibrary</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white/90">
            Empowering minds through accessible digital knowledge since 2009
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 text-center hover:scale-105 hover:-translate-y-2">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${stat.gradient} rounded-2xl mb-4 shadow-lg`}>
                  <stat.icon size={32} className="text-white" />
                </div>
                <h3 className="text-4xl font-bold mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{stat.value}</h3>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Our Mission</h2>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 shadow-lg border border-gray-200">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                At DigiLibrary, we believe that knowledge should be accessible to everyone, everywhere. Our mission is to democratize access to quality educational resources and foster a global community of lifelong learners.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We partner with publishers, authors, and educational institutions to bring you a comprehensive collection of books, research papers, videos, and documents across all disciplines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Membership Tiers</h2>
            <p className="text-gray-600">Choose the plan that fits your needs</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {tiers.map((tier, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-2xl shadow-lg overflow-hidden border-2 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                  tier.popular ? 'border-indigo-600 relative' : 'border-gray-200'
                }`}
              >
                {tier.popular && (
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center py-2 text-sm font-semibold flex items-center justify-center gap-2">
                    <Sparkles size={16} />
                    MOST POPULAR
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2 text-gray-800">{tier.name}</h3>
                  <div className="mb-6">
                    <span className={`text-4xl font-bold bg-gradient-to-r ${tier.gradient} bg-clip-text text-transparent`}>{tier.price}</span>
                    <span className="text-gray-600 ml-2">{tier.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${tier.gradient} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                          <Check size={14} className="text-white" />
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-3.5 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                    tier.popular 
                      ? `bg-gradient-to-r ${tier.gradient} text-white hover:shadow-indigo-500/50` 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}>
                    {tier.name === 'Institution' ? 'Contact Sales' : 'Get Started'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Our Values</h2>
            <p className="text-gray-600">What drives us every day</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 text-center hover:scale-105 hover:-translate-y-2">
                <div className={`w-16 h-16 bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <value.icon size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
