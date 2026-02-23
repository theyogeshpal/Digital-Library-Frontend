import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Calendar, BookOpen, Heart, Clock, Edit2, LogOut } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('Username');
    if (!storedUsername) {
      navigate('/Login');
    } else {
      setUsername(storedUsername);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('Username');
    navigate('/Login');
  };

  const stats = [
    { label: 'Books Read', value: '12', icon: BookOpen, color: 'indigo' },
    { label: 'Wishlist', value: '8', icon: Heart, color: 'pink' },
    { label: 'Reading Time', value: '24h', icon: Clock, color: 'purple' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                {username.charAt(0).toUpperCase()}
              </div>
              <button className="absolute bottom-0 right-0 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-200">
                <Edit2 size={16} className="text-indigo-600" />
              </button>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{username}</h1>
              <p className="text-gray-600 mb-4">Book Enthusiast • Reader</p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail size={18} />
                  <span className="text-sm">{username}@example.com</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={18} />
                  <span className="text-sm">Joined 2024</span>
                </div>
              </div>
            </div>

            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors font-medium"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className={`w-12 h-12 bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-600 rounded-xl flex items-center justify-center mb-4`}>
                <stat.icon size={24} className="text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Account Settings */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Settings</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
              <div>
                <h3 className="font-semibold text-gray-800">Edit Profile</h3>
                <p className="text-sm text-gray-600">Update your personal information</p>
              </div>
              <Edit2 size={20} className="text-gray-400" />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
              <div>
                <h3 className="font-semibold text-gray-800">Change Password</h3>
                <p className="text-sm text-gray-600">Update your password</p>
              </div>
              <Edit2 size={20} className="text-gray-400" />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
              <div>
                <h3 className="font-semibold text-gray-800">Notification Settings</h3>
                <p className="text-sm text-gray-600">Manage your notifications</p>
              </div>
              <Edit2 size={20} className="text-gray-400" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
