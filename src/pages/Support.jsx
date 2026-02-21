import { useState } from 'react';
import { Search, ChevronDown, ChevronUp, Mail, MessageSquare, Send, Phone, Clock } from 'lucide-react';

const Support = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const faqs = [
    {
      question: 'How do I create an account?',
      answer: 'Click on the "Sign Up" button in the top right corner and fill in your details. You\'ll receive a confirmation email to activate your account.'
    },
    {
      question: 'Can I download books for offline reading?',
      answer: 'Yes, Premium and Institution members can download books for offline reading. Free members can only read online.'
    },
    {
      question: 'How do I use the reader?',
      answer: 'Click on any book to view its details, then click "Read Now" to open the interactive reader. Use the navigation controls at the bottom to move between pages.'
    },
    {
      question: 'What file formats are supported?',
      answer: 'We support PDF, EPUB, and various video formats. All content can be viewed directly in your browser without additional software.'
    },
    {
      question: 'How do I cancel my subscription?',
      answer: 'Go to My Library > Settings > Subscription and click "Cancel Subscription". Your access will continue until the end of your billing period.'
    },
    {
      question: 'Can I share my account with others?',
      answer: 'Free and Premium accounts are for individual use only. Institution accounts support multiple users. Please see our Terms of Service for details.'
    }
  ];

  const tutorials = [
    { title: 'Getting Started with DigiLibrary', duration: '5 min', type: 'Video', color: 'from-blue-500 to-cyan-500' },
    { title: 'Using the Advanced Search', duration: '3 min', type: 'Article', color: 'from-purple-500 to-pink-500' },
    { title: 'Navigating the Reader Interface', duration: '4 min', type: 'Video', color: 'from-orange-500 to-red-500' },
    { title: 'Managing Your Library', duration: '6 min', type: 'Article', color: 'from-green-500 to-emerald-500' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Support ticket submitted! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Help & Support Center</h1>
          <p className="text-gray-600 text-lg">We're here to help you</p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search for help..."
              className="w-full pl-14 pr-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-lg transition-all duration-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - FAQs & Tutorials */}
          <div className="lg:col-span-2 space-y-8">
            {/* FAQs */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors duration-300"
                    >
                      <span className="font-semibold text-left text-gray-800">{faq.question}</span>
                      <div className={`p-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}>
                        <ChevronDown size={20} className="text-white" />
                      </div>
                    </button>
                    {openFaq === index && (
                      <div className="px-6 py-5 bg-gradient-to-br from-gray-50 to-gray-100 border-t border-gray-200">
                        <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Tutorials */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Tutorials</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tutorials.map((tutorial, index) => (
                  <div key={index} className="group bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100 hover:scale-105">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">{tutorial.title}</h3>
                      <span className={`text-xs bg-gradient-to-r ${tutorial.color} text-white px-3 py-1 rounded-full font-semibold`}>
                        {tutorial.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock size={16} />
                      <span>{tutorial.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Contact Form */}
          <div>
            <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-24 border border-gray-100">
              <h2 className="text-2xl font-bold mb-2 text-gray-800">Contact Support</h2>
              <p className="text-gray-600 mb-6 text-sm">Can't find what you're looking for? Send us a message.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Subject</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Message</label>
                  <textarea
                    required
                    rows="4"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>

                <button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3.5 rounded-xl flex items-center justify-center gap-2 font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/50">
                  <Send size={18} />
                  <span>Submit Ticket</span>
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-gray-200 space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-700 hover:text-indigo-600 transition-colors duration-300 cursor-pointer">
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
                    <Mail size={18} className="text-indigo-600" />
                  </div>
                  <span>support@digilibrary.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700 hover:text-indigo-600 transition-colors duration-300 cursor-pointer">
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
                    <Phone size={18} className="text-indigo-600" />
                  </div>
                  <span>+1 234 567 890</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700 hover:text-indigo-600 transition-colors duration-300 cursor-pointer">
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
                    <MessageSquare size={18} className="text-indigo-600" />
                  </div>
                  <span>Live Chat (9 AM - 5 PM EST)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
