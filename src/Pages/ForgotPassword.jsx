import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, BookOpen, ArrowLeft } from 'lucide-react';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Reset link sent to:', email);
    alert('Password reset link sent to your email!');
    navigate('/login');
  };

  return (
    <div className="min-h-[91vh] bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center py-12 px-4 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
      </div>

      <div className="max-w-md w-full bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full mb-4">
            <BookOpen className="text-white" size={32} />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Forgot Password</h2>
          <p className="text-gray-600 mt-2">Enter your email to reset password</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg outline-0 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg">
            Send Reset Link
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/login" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium">
            <ArrowLeft size={18} />
            <span>Back to Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
