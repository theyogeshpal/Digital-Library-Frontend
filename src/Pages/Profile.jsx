import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Calendar, BookOpen, Heart, Clock, Edit2, LogOut, Award, TrendingUp, Settings, Bell, Shield, Upload, X, AtSign } from 'lucide-react';
import axios from 'axios'
import Swal from 'sweetalert2';
import { useDarkMode } from '../context/DarkModeContext';

const Profile = () => {
  const navigate = useNavigate();
  const { isDarkMode, setIsDarkMode } = useDarkMode();
  const [username, setUsername] = useState('');
  const [wishlistCount, setWishlistCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showBannerModal, setShowBannerModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldpassword: '',
    newpassword: '',
    confirmnewpassword: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [bannerFile, setBannerFile] = useState(null);
  const [bannerPreview, setBannerPreview] = useState('');
  const [editFormData, setEditFormData] = useState({
    username: '',
    fullname: '',
    email: '',
    bio: ''
  });
  const [userdata, setuserdata] = useState({
    _id: '',
    email: '',
    fullname: '',
    dob : '',
    joiningdate : '',
    profilepic : '',
    banner: '',
    bio: ''
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
        _id: res.data.data[0]._id,
        email: res.data.data[0].email,
        fullname: res.data.data[0].fullname,
        dob : res.data.data[0].dob,
        joiningdate : res.data.data[0].joiningdate,
        profilepic : res.data.data[0].photo,
        banner: res.data.data[0].banner,
        bio: res.data.data[0].bio
      });
    } catch (e) {
      console.log(e);
    }
  };

  const getWishlistCount = async () => {
    try {
      const response = await axios.get(`https://digital-library-backend-jesb.onrender.com/api/likedbooks/${username}`);
      if (response.data.data) {
        setWishlistCount(response.data.data.length);
      }
    } catch (error) {
      console.error('Error fetching wishlist count:', error);
    }
  };

  getdetails();
  getWishlistCount();

}, [username]);   // 👈 IMPORTANT

  const handleChangePassword = async () => {
    if (passwordData.newpassword !== passwordData.confirmnewpassword) {
      Swal.fire({
        icon: 'error',
        title: 'Passwords do not match',
        text: 'New password and confirm password must be the same',
        confirmButtonColor: '#4F46E5'
      });
      return;
    }

    Swal.fire({
      title: 'Changing Password...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {

      await axios.put(
        'https://digital-library-backend-jesb.onrender.com/api/user/changepassword',
        {
          username: username,
          oldpassword: passwordData.oldpassword,
          newpassword: passwordData.newpassword
        }
      );

      Swal.fire({
        icon: 'success',
        title: 'Password Changed!',
        text: 'Your password has been updated successfully',
        timer: 1500,
        showConfirmButton: false
      });

      setShowChangePasswordModal(false);
      setPasswordData({ oldpassword: '', newpassword: '', confirmnewpassword: '' });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Change Failed',
        text: error.response?.data?.message || 'Failed to change password',
        confirmButtonColor: '#4F46E5'
      });
    }
  };

  const handleDeleteAccount = async () => {
    let timerInterval;
    const result = await Swal.fire({
      title: 'Delete Account?',
      html: 'This action cannot be undone. All your data will be permanently deleted.<br><br>Please wait <b></b> seconds before confirming.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DC2626',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, delete my account',
      cancelButtonText: 'Cancel',
      allowOutsideClick: false,
      didOpen: () => {
        const confirmButton = Swal.getConfirmButton();
        confirmButton.disabled = true;
        confirmButton.style.opacity = '0.5';
        confirmButton.style.cursor = 'not-allowed';
        
        let timeLeft = 60;
        const b = Swal.getHtmlContainer().querySelector('b');
        b.textContent = timeLeft;
        
        timerInterval = setInterval(() => {
          timeLeft--;
          b.textContent = timeLeft;
          
          if (timeLeft <= 0) {
            clearInterval(timerInterval);
            confirmButton.disabled = false;
            confirmButton.style.opacity = '1';
            confirmButton.style.cursor = 'pointer';
            b.textContent = '0';
          }
        }, 1000);
      },
      willClose: () => {
        clearInterval(timerInterval);
      }
    });

    if (result.isConfirmed) {
      Swal.fire({
        title: 'Deleting Account...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      try {
        await axios.delete(
          `https://digital-library-backend-jesb.onrender.com/api/user/delete/${userdata._id}`
        );

        Swal.fire({
          icon: 'success',
          title: 'Account Deleted',
          text: 'Your account has been permanently deleted',
          timer: 2000,
          showConfirmButton: false
        });

        localStorage.removeItem('Username');
        navigate('/Signup');
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Delete Failed',
          text: error.response?.data?.message || 'Failed to delete account',
          confirmButtonColor: '#4F46E5'
        });
      }
    }
  };

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

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerFile(file);
      setBannerPreview(URL.createObjectURL(file));
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

      await axios.post(
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
        profilepic: res.data.data[0].photo,
        bio: res.data.data[0].bio
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

  const handleBannerUpdate = async () => {
    if (!bannerFile) {
      Swal.fire({
        icon: 'warning',
        title: 'No Image Selected',
        text: 'Please select a banner image first',
        confirmButtonColor: '#4F46E5'
      });
      return;
    }

    Swal.fire({
      title: 'Updating Banner...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      const formData = new FormData();
      formData.append('banner', bannerFile);
      formData.append('username', username);

      await axios.put(
        'https://digital-library-backend-jesb.onrender.com/api/update/banner',
        formData
      );

      Swal.fire({
        icon: 'success',
        title: 'Banner Updated!',
        text: 'Your banner has been updated successfully',
        timer: 1500,
        showConfirmButton: false
      });

      setShowBannerModal(false);
      setBannerFile(null);
      setBannerPreview('');
      
      const res = await axios.get(
        `https://digital-library-backend-jesb.onrender.com/api/user/${username}`
      );
      setuserdata({
        _id: res.data.data[0]._id,
        email: res.data.data[0].email,
        fullname: res.data.data[0].fullname,
        dob: res.data.data[0].dob,
        joiningdate: res.data.data[0].joiningdate,
        profilepic: res.data.data[0].photo,
        banner: res.data.data[0].banner,
        bio: res.data.data[0].bio
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: error.response?.data?.message || 'Failed to update banner',
        confirmButtonColor: '#4F46E5'
      });
    }
  };

  const handleEditProfile = () => {
    setEditFormData({
      username: username,
      fullname: userdata.fullname,
      email: userdata.email,
      bio: userdata.bio || ''
    });
    setShowEditModal(true);
  };

  const handleProfileUpdate = async () => {
    Swal.fire({
      title: 'Updating Profile...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      await axios.put(
        "https://digital-library-backend-jesb.onrender.com/api/user/update",
        editFormData
      );

      Swal.fire({
        icon: 'success',
        title: 'Profile Updated!',
        text: 'Your profile has been updated successfully',
        timer: 1500,
        showConfirmButton: false
      });

      setShowEditModal(false);
      
      // Refresh user data
      const res = await axios.get(
        `https://digital-library-backend-jesb.onrender.com/api/user/${username}`
      );
      setuserdata({
        email: res.data.data[0].email,
        fullname: res.data.data[0].fullname,
        dob: res.data.data[0].dob,
        joiningdate: res.data.data[0].joiningdate,
        profilepic: res.data.data[0].photo,
        bio: res.data.data[0].bio
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: error.response?.data?.message || 'Failed to update profile',
        confirmButtonColor: '#4F46E5'
      });
    }
  };

  const stats = [
    { label: 'Books Read', value: '12', icon: BookOpen, gradient: 'from-blue-500 to-cyan-500', onClick: null },
    { label: 'Wishlist', value: wishlistCount, icon: Heart, gradient: 'from-pink-500 to-rose-500', onClick: () => navigate('/Wishlist') }
  ];

  const activities = [
    { title: 'Started reading "Clean Code"', time: '2 hours ago', icon: BookOpen },
    { title: 'Added 3 books to wishlist', time: '5 hours ago', icon: Heart },
    { title: 'Completed "Atomic Habits"', time: '1 day ago', icon: Award }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4 transition-colors duration-300">
      <div className="container mx-auto max-w-6xl">
        
        {/* Premium Header with Cover */}
        <div className="relative mb-8 rounded-3xl overflow-hidden shadow-2xl">
          {/* Cover Image */}
          <div className="h-48 relative group">
            {userdata.banner ? (
              <img src={userdata.banner} alt="Banner" className="w-full h-full object-cover" />
            ) : (
              <div className="h-full bg-black/50">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
              </div>
            )}
            <button 
              onClick={() => setShowBannerModal(true)}
              className="absolute top-3 right-3 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <Edit2 size={16} className="text-gray-700" />
            </button>
          </div>

          {/* Profile Info */}
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl p-8 transition-colors duration-300">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-25">
              <div className="relative group">
                <div 
                  onClick={() => userdata.profilepic && setShowImageModal(true)}
                  className="w-52 h-52 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center text-white text-5xl font-black shadow-2xl ring-4 ring-white cursor-pointer hover:scale-105 transition-transform"
                >
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
                <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2">{userdata.fullname}</h1>
                <p className="text-gray-600 dark:text-gray-300 mb-4 flex items-center gap-2 justify-center md:justify-start">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span> {userdata.bio}</span>
                </p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                    <AtSign size={16} className="text-indigo-600 dark:text-indigo-400" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{username}</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                    <Calendar size={16} className="text-indigo-600 dark:text-indigo-400" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Borned {userdata.dob}</span>
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
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => ( 
                <div 
                  key={index} 
                  onClick={stat.onClick}
                  className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                    <stat.icon size={26} className="text-white" />
                  </div>
                  <div className="text-3xl font-black text-gray-900 dark:text-white mb-1">{stat.value}</div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column - Settings */}
          <div className="space-y-8">
            
            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
              <h2 className="text-xl font-black text-gray-900 dark:text-white mb-6">Quick Actions</h2>
              
              <div className="space-y-3">
                <button 
                  onClick={handleEditProfile}
                  className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl hover:from-indigo-100 hover:to-purple-100 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Edit2 size={18} className="text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-gray-900 dark:text-white">Edit Profile</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Update information</div>
                  </div>
                </button>

                <button 
                  onClick={() => setShowSettingsModal(true)}
                  className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl hover:from-blue-100 hover:to-cyan-100 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Settings size={18} className="text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-gray-900 dark:text-white">Settings</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Manage preferences</div>
                  </div>
                </button>

                <button 
                  onClick={() => setShowNotificationPanel(true)}
                  className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl hover:from-amber-100 hover:to-orange-100 transition-all duration-300 group">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Bell size={18} className="text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-gray-900 dark:text-white">Notifications</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">3 new alerts</div>
                  </div>
                </button>

                <button 
                  onClick={() => setShowPrivacyModal(true)}
                  className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl hover:from-green-100 hover:to-emerald-100 transition-all duration-300 group">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Shield size={18} className="text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-gray-900 dark:text-white">Privacy</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Security settings</div>
                  </div>
                </button>
              </div>
            </div>

          
          </div>
        </div>

      </div>

      {/* Notification Offcanvas */}
      {showNotificationPanel && (
        <>
          <div 
            onClick={() => setShowNotificationPanel(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          <div className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white dark:bg-gray-800 shadow-2xl z-50 transform transition-transform duration-300 ${
            showNotificationPanel ? 'translate-x-0' : 'translate-x-full'
          }`}>
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white">Notifications</h2>
                <button
                  onClick={() => setShowNotificationPanel(false)}
                  className="w-10 h-10 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors"
                >
                  <X size={20} className="text-gray-600 dark:text-gray-300" />
                </button>
              </div>

              {/* Notifications List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <BookOpen size={18} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">New Book Added</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">"Clean Architecture" has been added to the collection</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">2 hours ago</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-xl border border-pink-100 dark:border-pink-800">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Heart size={18} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Wishlist Update</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">3 books from your wishlist are now available</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">5 hours ago</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-100 dark:border-amber-800">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Award size={18} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Achievement Unlocked</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">You've read 10 books this month!</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">1 day ago</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <button className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors">
                  Mark All as Read
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Change Password Modal */}
      {showChangePasswordModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-md w-full p-8 relative transition-colors duration-300">
            <button
              onClick={() => {
                setShowChangePasswordModal(false);
                setPasswordData({ oldpassword: '', newpassword: '', confirmnewpassword: '' });
              }}
              className="absolute top-4 right-4 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            >
              <X size={20} className="text-gray-600" />
            </button>

            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6">Change Password</h2>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Old Password</label>
                <input
                  type="password"
                  value={passwordData.oldpassword}
                  onChange={(e) => setPasswordData({...passwordData, oldpassword: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Enter your old password"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">New Password</label>
                <input
                  type="password"
                  value={passwordData.newpassword}
                  onChange={(e) => setPasswordData({...passwordData, newpassword: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Enter new password"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Confirm New Password</label>
                <input
                  type="password"
                  value={passwordData.confirmnewpassword}
                  onChange={(e) => setPasswordData({...passwordData, confirmnewpassword: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Confirm new password"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowChangePasswordModal(false);
                  setPasswordData({ oldpassword: '', newpassword: '', confirmnewpassword: '' });
                }}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleChangePassword}
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-md w-full p-8 relative transition-colors duration-300">
            <button
              onClick={() => setShowSettingsModal(false)}
              className="absolute top-4 right-4 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            >
              <X size={20} className="text-gray-600" />
            </button>

            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6">Settings</h2>

            <div className="space-y-4">
              <div 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Dark Mode</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Toggle dark theme</div>
                  </div>
                  <div className={`relative w-12 h-6 rounded-full transition-colors ${isDarkMode ? 'bg-indigo-600' : 'bg-gray-300'}`}>
                    <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${isDarkMode ? 'translate-x-6' : ''}`}></div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Language</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">English (US)</div>
                  </div>
                  <div className="text-gray-400 dark:text-gray-500">›</div>
                </div>
              </div>

              <div className="border-t border-gray-200 my-4"></div>
            </div>

            <button
              onClick={() => setShowSettingsModal(false)}
              className="w-full mt-6 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-semibold"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Privacy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-md w-full p-8 relative transition-colors duration-300">
            <button
              onClick={() => setShowPrivacyModal(false)}
              className="absolute top-4 right-4 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            >
              <X size={20} className="text-gray-600" />
            </button>

            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6">Privacy & Security</h2>

            <div className="space-y-4">
              <div 
                onClick={() => {
                  setShowChangePasswordModal(true)
                  setShowPrivacyModal(false);
                }}
                className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Change Password</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Update your password</div>
                  </div>
                  <div className="text-gray-400 dark:text-gray-500">›</div>
                </div>
              </div>

              <div className="border-t border-gray-200 my-4"></div>

              <div 
                onClick={handleDeleteAccount}
                className="p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-colors cursor-pointer border border-red-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-red-900">Delete Account</div>
                    <div className="text-xs text-red-700">Permanently delete your account</div>
                  </div>
                  <div className="text-red-600">›</div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowPrivacyModal(false)}
              className="w-full mt-6 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-semibold"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Image View Modal */}
      {showImageModal && userdata.profilepic && (
        <div 
          onClick={() => setShowImageModal(false)}
          className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4 cursor-pointer"
        >
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute -top-12 right-0 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            >
              <X size={24} className="text-white" />
            </button>
            <img 
              src={userdata.profilepic} 
              alt="Profile Full View" 
              className="w-full h-auto max-h-[85vh] object-contain rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      {/* Image Update Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-md w-full p-8 relative transition-colors duration-300">
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

            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6">Update Profile Picture</h2>

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

      {/* Banner Update Modal */}
      {showBannerModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-md w-full p-8 relative transition-colors duration-300">
            <button
              onClick={() => {
                setShowBannerModal(false);
                setBannerFile(null);
                setBannerPreview('');
              }}
              className="absolute top-4 right-4 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            >
              <X size={20} className="text-gray-600" />
            </button>

            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6">Update Banner</h2>

            <div className="mb-6">
              <div className="w-full h-64 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center overflow-hidden mb-4">
                {bannerPreview ? (
                  <img src={bannerPreview} alt="Preview" className="w-full h-full object-cover" />
                ) : userdata.banner ? (
                  <img src={userdata.banner} alt="Current" className="w-full h-full object-cover" />
                ) : (
                  <Upload size={48} className="text-indigo-400" />
                )}
              </div>

              <label className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all cursor-pointer font-semibold">
                <Upload size={20} />
                Choose Banner
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBannerChange}
                  className="hidden"
                />
              </label>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowBannerModal(false);
                  setBannerFile(null);
                  setBannerPreview('');
                }}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleBannerUpdate}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-md w-full p-8 relative transition-colors duration-300">
            <button
              onClick={() => setShowEditModal(false)}
              className="absolute top-4 right-4 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            >
              <X size={20} className="text-gray-600" />
            </button>

            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6">Edit Profile</h2>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Username</label>
                <input
                  type="text"
                  value={editFormData.username}
                  onChange={(e) => setEditFormData({...editFormData, username: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  value={editFormData.fullname}
                  onChange={(e) => setEditFormData({...editFormData, fullname: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  value={editFormData.email}
                  onChange={(e) => setEditFormData({...editFormData, email: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Bio</label>
                <textarea
                  value={editFormData.bio}
                  onChange={(e) => setEditFormData({...editFormData, bio: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  placeholder="Tell us about yourself"
                  rows="3"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleProfileUpdate}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
