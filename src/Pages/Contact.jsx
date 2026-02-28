import axios from 'axios';
import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, User, Clock, CheckCircle2, Sparkles } from 'lucide-react';
import Swal from 'sweetalert2';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: 'Sending Message...',
      text: 'Please wait while we process your inquiry',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      await axios.post('https://digital-library-backend-jesb.onrender.com/api/contact', formData);

      Swal.fire({
        icon: 'success',
        title: 'Message Sent Successfully!',
        text: 'Thank you for contacting us. We will respond within one business day.',
        confirmButtonColor: '#4F46E5'
      });

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed to Send Message',
        text: error.response?.data?.message || 'Something went wrong. Please try again.',
        confirmButtonColor: '#4F46E5'
      });
    }
  };

  const contactInfo = [
    { icon: Mail, title: 'Email Us', info: 'corearchive1@gmail.com', link: 'mailto:corearchive1@gmail.com', color: 'indigo' },
    { icon: Phone, title: 'Call Us', info: '+91 78170 95043', link: 'tel:+917817095043', color: 'purple' },
    { icon: MapPin, title: 'Visit Us', info: '123 Library St, Book City', link: '#', color: 'pink' },
    { icon: Clock, title: 'Working Hours', info: 'Mon-Fri: 9AM - 6PM', link: '#', color: 'blue' }
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] relative overflow-hidden">
      {/* Hero Section with Background */}
      <div className="relative pt-24 pb-16">
        {/* Background Image */}
        <div className="absolute inset-0 left-0 right-0">
          <img 
            src="contact.avif" 
            alt="Contact Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/90 via-purple-900/85 to-teal-900/90"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 border border-teal-100 text-teal-600 mb-8 animate-bounce">
            <Sparkles size={18} />
            <span className="text-sm font-semibold tracking-wide uppercase">Elite Support</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tight text-white">
            Let's <span className="bg-gradient-to-r from-teal-300 to-emerald-300 bg-clip-text text-transparent">Connect</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto leading-relaxed font-light">
            Need assistance with your study or library access? We're here to help you navigate the collection.
          </p>
        </div>
      </div>

      {/* Contact Info Cards with Glassmorphism */}
      <div className="container mx-auto px-4 mt-12 mb-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactInfo.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="group bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-white/50 relative overflow-hidden"
            >
              <div className="relative z-10">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 ${item.color === 'indigo' ? 'bg-gradient-to-br from-indigo-700 to-indigo-800' :
                  item.color === 'purple' ? 'bg-gradient-to-br from-teal-500 to-teal-600' :
                    item.color === 'pink' ? 'bg-gradient-to-br from-emerald-500 to-emerald-600' :
                      'bg-gradient-to-br from-blue-600 to-blue-700'
                  }`}>
                  <item.icon className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-bold text-indigo-950 mb-2">{item.title}</h3>
                <p className="text-gray-500 font-medium">{item.info}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-32 relative z-10 bg-[#fafafa]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Left Side - Info */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] p-10 shadow-xl border border-white/50">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-teal-50 text-teal-600 rounded-2xl mb-6">
                  <MessageSquare size={28} />
                </div>
                <h2 className="text-3xl font-black mb-6 text-indigo-950">Scholarly Support</h2>
                <p className="text-lg text-gray-500 leading-relaxed mb-8">
                  Whether you're a student, researcher, or faculty member - our team is ready to assist your scholarly journey through our vast collection.
                </p>
                <div className="space-y-5">
                  {[
                    'Academic guidance',
                    'Technical library support',
                    'Resource procurement requests',
                    'Verified secure communication'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 group">
                      <div className="flex-shrink-0 w-8 h-8 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-all">
                        <CheckCircle2 size={18} />
                      </div>
                      <span className="text-gray-700 font-bold">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-900 to-teal-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-black mb-4 underline decoration-teal-400 decoration-4 underline-offset-8">Collection Help?</h3>
                  <p className="opacity-80 mb-8 text-lg">Our librarians are standing by to help you find the volumes you need for your dissertation or thesis.</p>
                  <button className="bg-white text-indigo-950 px-8 py-4 rounded-2xl font-black hover:shadow-2xl transition-all hover:scale-105 active:scale-95">
                    Ask a Librarian
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="lg:col-span-3">
              <div className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] p-10 md:p-12 shadow-2xl border border-white/50">
                <h3 className="text-3xl font-black mb-2 text-indigo-950 px-2 border-l-8 border-teal-500">Inquiry Form</h3>
                <p className="text-lg text-gray-500 mb-10 mt-4">Please specify your academic requirements and we will respond within one business day.</p>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-sm font-black text-indigo-900/40 uppercase tracking-widest ml-1">Full Name <span className='text-red-500'>*</span></label>
                      <div className="relative group">
                        <User className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${focusedField === 'name' ? 'text-indigo-700' : 'text-gray-400 group-hover:text-indigo-400'}`} size={20} />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField(null)}
                          required
                          className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-100 focus:bg-white focus:border-indigo-700 transition-all text-gray-900 font-medium"
                          placeholder="Academic Scholar"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-black text-indigo-900/40 uppercase tracking-widest ml-1"> Email <span className='text-red-500'>*</span></label>
                      <div className="relative group">
                        <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${focusedField === 'email' ? 'text-teal-600' : 'text-gray-400 group-hover:text-teal-400'}`} size={20} />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                          required
                          className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-teal-100 focus:bg-white focus:border-teal-600 transition-all text-gray-900 font-medium"
                          placeholder="scholar@university.edu"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-black text-indigo-900/40 uppercase tracking-widest ml-1">Inquiry Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('subject')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full px-6 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-100 focus:bg-white focus:border-indigo-700 transition-all text-gray-900 font-medium"
                      placeholder="e.g. Access to Digital Archives"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-black text-indigo-900/40 uppercase tracking-widest ml-1">Detailed Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      required
                      rows="6"
                      className="w-full px-6 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-teal-100 focus:bg-white focus:border-teal-600 transition-all text-gray-900 font-medium resize-none shadow-inner"
                      placeholder="Provide details about your academic inquiry..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-indigo-700 to-teal-600 text-white py-5 rounded-[1.5rem] font-black text-xl transition-all duration-300 shadow-xl shadow-teal-100 hover:shadow-2xl hover:shadow-teal-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-4 group"
                  >
                    <span>Submit Inquiry</span>
                    <Send size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
