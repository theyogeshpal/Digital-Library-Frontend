import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    "404first.avif",
    "404second.avif",
    "404third.avif"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] bg-white px-5 py-10 font-sans overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 max-w-7xl w-full">
        {/* Image Section */}
        <div className="flex-1 flex justify-center items-center relative">
          <img
            key={currentImage}
            src={images[currentImage]}
            alt="404 Illustration"
            className="w-full max-w-md lg:max-w-lg h-auto transition-all duration-500 ease-in-out  animate-in fade-in zoom-in"
          />
        </div>

        {/* Info Section */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
          <h1 className="text-7xl lg:text-9xl font-black text-[#1a1a2e] m-0 leading-none">Oops!</h1>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#ff6b6b] mt-4 mb-6">Something went wrong</h2>
          <p className="text-lg lg:text-xl text-gray-500 mb-10 max-w-md leading-relaxed">
            Lost in the clouds. This page has drifted away.
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-12">
            <button
              onClick={() => navigate('/')}
              className="px-8 py-4 rounded-2xl font-bold bg-[#f1c40f] text-[#1a1a2e] shadow-xl shadow-yellow-400/20 hover:bg-[#d4ac0d] hover:-translate-y-1 active:scale-95 transition-all duration-300"
            >
              Back to Home
            </button>
            <button
              onClick={() => navigate('/Contact')}
              className="px-8 py-4 rounded-2xl font-bold border-2 border-[#1a1a2e] text-[#1a1a2e] hover:bg-[#1a1a2e] hover:text-white active:scale-95 transition-all duration-300"
            >
              Live Support
            </button>
          </div>


        </div>
      </div>

      <footer className="mt-2 text-gray-400 text-sm flex gap-6">
        <a href="#" className="hover:text-gray-600">Privacy</a>
        <a href="#" className="hover:text-gray-600">Terms</a>
        <a href="#" className="hover:text-gray-600">Help Center</a>
      </footer>
    </div>
  );
};

export default NotFound;
