import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, BookOpen, Lock, Eye, EyeOff, Calendar, AtSign } from 'lucide-react';

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    dob: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log(formData);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-indigo-950 flex items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-900/40 rounded-full mix-blend-screen filter blur-[100px] animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-teal-900/30 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-2xl w-full space-y-8 bg-white p-10 rounded-2xl shadow-2xl relative z-10 border border-indigo-100/50 transition-all duration-300">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 overflow-hidden rounded-xl">
            <img src="/logo/favicon.png" alt="Core Archive Logo" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-700 to-teal-600 bg-clip-text text-transparent">Join the Fellowship</h2>
          <p className="mt-2 text-sm text-gray-500">Create your Core Archive account</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative group">
              <User className="absolute left-3 top-3 text-gray-400 group-focus-within:text-teal-600 transition-colors" size={20} />
              <input
                name="fullName"
                type="text"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg outline-0 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>
            <div className="relative group">
              <AtSign className="absolute left-3 top-3 text-gray-400 group-focus-within:text-teal-600 transition-colors" size={20} />
              <input
                name="username"
                type="text"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg outline-0 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                placeholder="Username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>
            <div className="relative group">
              <Mail className="absolute left-3 top-3 text-gray-400 group-focus-within:text-teal-600 transition-colors" size={20} />
              <input
                name="email"
                type="email"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg outline-0 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="relative group">
              <Calendar className="absolute left-3 top-3 text-gray-400 group-focus-within:text-teal-600 transition-colors" size={20} />
              <input
                name="dob"
                type="date"
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg outline-0 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                placeholder="Date of Birth"
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
              />
            </div>
            <div className="relative group">
              <Lock className="absolute left-3 top-3 text-gray-400 group-focus-within:text-teal-600 transition-colors" size={20} />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg outline-0 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-400 hover:text-teal-600 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className="relative group">
              <Lock className="absolute left-3 top-3 text-gray-400 group-focus-within:text-teal-600 transition-colors" size={20} />
              <input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                required
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg outline-0 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-400 hover:text-teal-600 transition-colors"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded cursor-pointer"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              I agree to the <Link to="/Terms" className="text-teal-600 hover:text-teal-500 font-medium transition-colors">Terms of Service</Link>
            </label>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-700 to-teal-600 hover:from-indigo-800 hover:to-teal-700 text-white py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5 shadow-teal-100"
            >
              Join Core Archive
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/Login" className="font-medium text-teal-600 hover:text-teal-500">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;


