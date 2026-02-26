import { Link } from 'react-router-dom';
import { BookOpen, Facebook, Twitter, Github, Linkedin, Mail, Phone, Send } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-gray-300 lg:px-20 px-5">
            <div className="container mx-auto px-4 py-16 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="w-100 invert my-[-15px] overflow-hidden rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                                <img src="/logo/horizontal-logo.png" alt="Core Archive Logo" className="w-full h-full object-cover" />
                            </div>

                        </Link>
                        <p className="text-gray-400 leading-relaxed text-sm">
                            The Foundation of Your Knowledge. Preserving the Digital Essential. Dedicated to empowering minds through the largest digital archive.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Twitter, Github, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-teal-600 transition-all duration-300 hover:-translate-y-1">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                            <span className="w-8 h-1 bg-teal-600 rounded-full"></span>
                            Quick Navigation
                        </h3>
                        <ul className="space-y-4">
                            {[
                                { id:1, name: 'Home', path: '/' },
                                { id:2, name: 'About Us', path: '/About' },
                                { id:3, name: 'Collection', path: '/Collection' },
                                { id:4, name: 'Contact Us', path: '/Contact' }
                            ].map((link) => (
                                <li key={link.id}>
                                    <Link to={link.path} className="hover:text-teal-400 transition-colors duration-300 flex items-center gap-2 group text-sm">
                                        <span className="w-1.5 h-1.5 bg-gray-700 rounded-full group-hover:bg-teal-400 transition-all"></span>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Section */}
                    <div>
                        <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                            <span className="w-8 h-1 bg-indigo-600 rounded-full"></span>
                            Help & Support
                        </h3>
                        <ul className="space-y-4">
                            {[
                                { name: 'Terms of Services', path: '/Terms' },
                                { name: 'Privacy Policy', path: '/About' }

                            ].map((link) => (
                                <li key={link.name}>
                                    <Link to={link.path} className="hover:text-indigo-400 transition-colors duration-300 flex items-center gap-2 group text-sm">
                                        <span className="w-1.5 h-1.5 bg-gray-700 rounded-full group-hover:bg-indigo-400 transition-all"></span>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                            <span className="w-8 h-1 bg-gradient-to-r from-indigo-600 to-teal-600 rounded-full"></span>
                            Collection Updates
                        </h3>
                        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                            Stay updated with the latest scholarly volumes and archival additions.
                        </p>
                        <form className="relative">
                            <input
                                type="email"
                                placeholder="Institutional Email"
                                className="w-full bg-gray-800 border border-gray-700 rounded-2xl py-4 pl-6 pr-16 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-sm"
                            />
                            <button className="absolute right-2 top-2 bottom-2 bg-gradient-to-r from-indigo-700 to-teal-600 p-3 rounded-xl hover:shadow-lg transition-all hover:scale-105 active:scale-95 group">
                                <Send size={18} className="text-white group-hover:translate-x-0.5" />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-gray-400 text-sm">
                        © {currentYear} <span className="text-indigo-400 font-bold">Core Archive</span>. All rights reserved.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-8">
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <Phone size={16} className="text-teal-400" />
                            <span>+91 78170 95043</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <Mail size={16} className="text-indigo-400" />
                            <span>corearchive1@gmail.com</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
