import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Calendar, BookOpen, Heart, Clock, Edit2, LogOut, Award, TrendingUp, Settings, Bell, Shield, Upload, X } from 'lucide-react';
import axios from 'axios'
import Swal from 'sweetalert2';

const Profile = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [userdata, setuserdata] = useState({
    email: '',
    fullname: '',
    dob : '',
    joiningdate : '',
    profilepic : ''
  })

  useEffect(() => {
    const storedUsername = localStorage.getItem('Username');
    // console.log('Stored Username:', storedUsername);
    if (!storedUsername) {
      navigate('/Login');
    } else {
      setUsername(storedUsername);
    }
  }, [navigate]);



useEffect(() => {

  if(!username) return; // agar username nahi hai toh API mat call karo

  const getdetails = async () => {
    try {
      const res = await axios.get(
        `https://digital-library-backend-jesb.onrender.com/api/user/${username}`
      );
      // console.log(res.data.data[0]);
      setuserdata({
        email: res.data.data[0].email,
        fullname: res.data.data[0].fullname,
        dob : res.data.data[0].dob,
        joiningdate : res.data.data[0].joiningdate,
        profilepic : res.data.data[0].photo
      });
    } catch (e) {
      console.log(e);
    }
  };

  getdetails();

}, [username]);   // 👈 IMPORTANT

  const handleLogout = () => {
    localStorage.removeItem('Username');
    navigate('/Login');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageUpdate = async () => {
    if (!imageFile) {
      Swal.fire({
        icon: 'warning',
        title: 'No Image Selected',
        text: 'Please select an image first',
        confirmButtonColor: '#4F46E5'
      });
      return;
    }

    Swal.fire({
      title: 'Updating Profile Picture...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      const formData = new FormData();
      formData.append('photo', imageFile);
      formData.append('username', username);

      await axios.put(
        'https://digital-library-backend-jesb.onrender.com/api/update/photo',
        formData
      );

      Swal.fire({
        icon: 'success',
        title: 'Profile Picture Updated!',
        text: 'Your profile picture has been updated successfully',
        timer: 1500,
        showConfirmButton: false
      });

      setShowModal(false);
      setImageFile(null);
      setImagePreview('');
      
      // Refresh user data
      const res = await axios.get(
        `https://digital-library-backend-jesb.onrender.com/api/user/${username}`
      );
      setuserdata({
        email: res.data.data[0].email,
        fullname: res.data.data[0].fullname,
        dob: res.data.data[0].dob,
        joiningdate: res.data.data[0].joiningdate,
        profilepic: res.data.data[0].photo
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: error.response?.data?.message || 'Failed to update profile picture',
        confirmButtonColor: '#4F46E5'
      });
    }
  };

  const stats = [
    { label: 'Books Read', value: '12', icon: BookOpen, gradient: 'from-blue-500 to-cyan-500' },
    { label: 'Wishlist', value: '8', icon: Heart, gradient: 'from-pink-500 to-rose-500' },
    { label: 'Reading Time', value: '24h', icon: Clock, gradient: 'from-purple-500 to-indigo-500' },
    { label: 'Achievements', value: '5', icon: Award, gradient: 'from-amber-500 to-orange-500' }
  ];

  const activities = [
    { title: 'Started reading "Clean Code"', time: '2 hours ago', icon: BookOpen },
    { title: 'Added 3 books to wishlist', time: '5 hours ago', icon: Heart },
    { title: 'Completed "Atomic Habits"', time: '1 day ago', icon: Award }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        
        {/* Premium Header with Cover */}
        <div className="relative mb-8 rounded-3xl overflow-hidden shadow-2xl">
          {/* Cover Image */}
          <div className="h-48 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 relative">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
          </div>

          {/* Profile Info */}
          <div className="bg-white/95 backdrop-blur-xl p-8">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-25">
              <div className="relative group">
                <div className="w-52 h-52 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center text-white text-5xl font-black shadow-2xl ring-4 ring-white">
                  {userdata.profilepic ? (
                    <img src={userdata.profilepic} alt="Profile" className="w-full h-full rounded-3xl object-cover" />
                  ) : (
                    username.charAt(0).toUpperCase()
                  )}
                </div>
                <button 
                  onClick={() => setShowModal(true)}
                  className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-xl flex items-center justify-center hover:scale-110 transition-transform duration-300 group"
                >
                  <Edit2 size={18} className="text-white" />
                </button>
              </div>

              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl font-black text-gray-900 mb-2">{userdata.fullname}</h1>
                <p className="text-gray-600 mb-4 flex items-center gap-2 justify-center md:justify-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Book Enthusiast • Active Reader
                </p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
                    <Mail size={16} className="text-indigo-600" />
                    <span className="text-sm font-medium text-gray-700">{userdata.email}</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
                    <Calendar size={16} className="text-indigo-600" />
                    <span className="text-sm font-medium text-gray-700">Borned {userdata.dob}</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-2xl hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300 hover:scale-105 font-semibold"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Stats & Activity */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="group bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                  <div className={`w-14 h-14 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                    <stat.icon size={26} className="text-white" />
                  </div>
                  <div className="text-3xl font-black text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-gray-900">Recent Activity</h2>
                <TrendingUp className="text-indigo-600" size={24} />
              </div>
              
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-gradient-to-r from-gray-50 to-transparent rounded-2xl hover:from-indigo-50 transition-all duration-300 cursor-pointer group">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <activity.icon size={20} className="text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{activity.title}</h3>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column - Settings */}
          <div className="space-y-8">
            
            {/* Quick Actions */}
            <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
              <h2 className="text-xl font-black text-gray-900 mb-6">Quick Actions</h2>
              
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl hover:from-indigo-100 hover:to-purple-100 transition-all duration-300 group">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Edit2 size={18} className="text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-gray-900">Edit Profile</div>
                    <div className="text-xs text-gray-600">Update information</div>
                  </div>
                </button>

                <button className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl hover:from-blue-100 hover:to-cyan-100 transition-all duration-300 group">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Settings size={18} className="text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-gray-900">Settings</div>
                    <div className="text-xs text-gray-600">Manage preferences</div>
                  </div>
                </button>

                <button className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl hover:from-amber-100 hover:to-orange-100 transition-all duration-300 group">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Bell size={18} className="text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-gray-900">Notifications</div>
                    <div className="text-xs text-gray-600">3 new alerts</div>
                  </div>
                </button>

                <button className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl hover:from-green-100 hover:to-emerald-100 transition-all duration-300 group">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Shield size={18} className="text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-gray-900">Privacy</div>
                    <div className="text-xs text-gray-600">Security settings</div>
                  </div>
                </button>
              </div>
            </div>

          
          </div>
        </div>

      </div>

      {/* Image Update Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative">
            <button
              onClick={() => {
                setShowModal(false);
                setImageFile(null);
                setImagePreview('');
              }}
              className="absolute top-4 right-4 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            >
              <X size={20} className="text-gray-600" />
            </button>

            <h2 className="text-2xl font-black text-gray-900 mb-6">Update Profile Picture</h2>

            <div className="mb-6">
              <div className="w-full h-64 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center overflow-hidden mb-4">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : userdata.profilepic ? (
                  <img src={userdata.profilepic} alt="Current" className="w-full h-full object-cover" />
                ) : (
                  <Upload size={48} className="text-indigo-400" />
                )}
              </div>

              <label className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all cursor-pointer font-semibold">
                <Upload size={20} />
                Choose Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  setImageFile(null);
                  setImagePreview('');
                }}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleImageUpdate}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
