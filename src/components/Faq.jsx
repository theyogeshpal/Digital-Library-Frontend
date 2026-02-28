import { Link } from 'react-router-dom';
import { ArrowRight } from "lucide-react";
import { useState } from "react";

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

export default FAQSection;