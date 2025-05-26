import React, { useState } from 'react';
import axios from "axios";

import { Mail, Lock, User, ArrowRight, Facebook, Twitter, Instagram, MessageCircle, Loader2 } from 'lucide-react';
import Modal from '../modals/authModal'; // <--- Import the Modal component


import logo from '../../assets/logo.png'; 

const AuthForms: React.FC = () => {
  const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  // New state for the modal
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState<'success' | 'error'>('success'); // 'success' or 'error'
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
     setLoading(true);
    
  const endpoint = isLogin
    ? "http://localhost:3000/login"
    : "http://localhost:3000/signup"; //paths

     // Define your headers
    const headers = {
      'Content-Type': 'application/json', // Most common header for sending JSON data
      // 'Authorization': 'Bearer YOUR_AUTH_TOKEN_HERE', // Example for sending an auth token
      // 'X-Custom-Header': 'some_value', // Example of a custom header
    }
    //signup logic
  try {
    const response = await axios.post(endpoint, formData,{headers});
    console.log("Success:", response.data);

      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        console.log("Authentication token saved:", response.data.token);
        // Set modal for success
        setModalTitle('Success!');
        setModalMessage(response.data.message || 'Operation completed successfully.'); // Use API message or default
        setModalType('success');
        setShowModal(true);
      } else {
        // Handle cases where API might return success but no token (e.g., confirmation email needed)
        setModalTitle('Info');
        setModalMessage(response.data.message || 'Operation completed.');
        setModalType('success');
        setShowModal(true);
      }

    } 
 
    // Optionally: redirect or save token
    // e.g., localStorage.setItem("token", response.data.token);

  catch (error: any) {
      console.error("Auth error:", error.response?.data || error.message);
      // Set modal for error
      setModalTitle('Error!');
      setModalMessage(error.response?.data?.message || error.response?.data?.error || "An unexpected error occurred.");
      setModalType('error');
      setShowModal(true);
    }
     finally {
      setLoading(false);
    }

    // Temporary authentication logic
    
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const closeModal = () => { // <--- Function to close the modal
    setShowModal(false);
    // Optionally clear form data or redirect after closing modal, depending on flow
    if (modalType === 'success' && !isLogin) { // If signup was successful, maybe switch to login form
        setIsLogin(true);
        setFormData({ username: '', email: '', password: '' });
    }
  };

  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, name: 'Facebook', color: 'bg-[#1877F2]' },
    { icon: <Twitter className="h-5 w-5" />, name: 'Twitter', color: 'bg-[#1DA1F2]' },
    { icon: <Instagram className="h-5 w-5" />, name: 'Instagram', color: 'bg-[#E4405F]' },
    { icon: <MessageCircle className="h-5 w-5" />, name: 'WhatsApp', color: 'bg-[#25D366]' },
  ];
// sign up form below
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-950 via-teal-900 to-teal-800">
      <div className="bg-teal-900/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl shadow-gold-500/10 
                    border border-gold-500/20 w-full max-w-md">
        <div className="text-center mb-8">
          <div className='flex items-center'>
            <div className="w-14">
               <img src={logo} alt="logo" />
            </div>
            
          <h1 className="text-3xl font-bold text-cream-50">
            Nexus Naija
          </h1>
          </div>
         
          <p className="text-cream-200 mt-2">
            {isLogin ? 'Welcome back!' : 'Create your account'}
          </p>
        </div>

{/* login form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-cream-100 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cream-200 h-5 w-5" />
                <input
                  type="text"
                  name="name"
                  value={formData.username}
                  onChange={handleChange}
                  className="pl-10 w-full px-4 py-3 rounded-lg border border-gold-500/20 
                           focus:ring-2 focus:ring-gold-500/50 focus:border-transparent
                           bg-teal-800/50 text-cream-50 placeholder-cream-200/50"
                  placeholder="Enter your name"
                  required
                   disabled={loading} 
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-cream-100 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cream-200 h-5 w-5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="pl-10 w-full px-4 py-3 rounded-lg border border-gold-500/20 
                         focus:ring-2 focus:ring-gold-500/50 focus:border-transparent
                         bg-teal-800/50 text-cream-50 placeholder-cream-200/50"
                placeholder="Enter your email"
                required
                 disabled={loading}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-cream-100 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cream-200 h-5 w-5" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="pl-10 w-full px-4 py-3 rounded-lg border border-gold-500/20 
                         focus:ring-2 focus:ring-gold-500/50 focus:border-transparent
                         bg-teal-800/50 text-cream-50 placeholder-cream-200/50"
                placeholder="Enter your password"
                required
                 disabled={loading}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-cream-100 hover:bg-cream-50 text-teal-950 font-semibold 
                     py-3 px-4 rounded-lg flex items-center justify-center space-x-2 
                     transition-colors duration-200 shadow-lg shadow-gold-500/10"
                      disabled={loading}
          >
           {loading ? (
    // WHEN LOADING: Show the spinner
    <Loader2 className="h-5 w-5 animate-spin text-teal-950" />
    // I added 'text-teal-950' to ensure the spinner has the same color as the button text
  ) : (
    // WHEN NOT LOADING: Show the regular text and arrow
    <>
      <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
      <ArrowRight className="ml-2 h-5 w-5" />
    </>
  )}
          </button>
        </form>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gold-500/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-teal-900/50 text-cream-200">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {socialLinks.map((social) => (
              <button
                key={social.name}
                className={`${social.color} hover:opacity-90 text-white py-2 px-4 rounded-lg
                          flex items-center justify-center space-x-2 transition-opacity duration-200
                          shadow-lg shadow-gold-500/10`}
              >
                {social.icon}
                <span>{social.name}</span>
              </button>
            ))}
          </div>
        </div>
        {/*  */}

        <div className="mt-6 text-center">
         <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError(null); // Clear errors when switching forms
              setFormData({ username: '', email: '', password: '' }); // Clear form data
            }}
            className="text-cream-200 hover:text-cream-100 font-medium transition-colors duration-200"
            disabled={loading} // <--- Disable toggle button when loading
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
      {/* modall */}
       <Modal
        isOpen={showModal}
        onClose={closeModal}
        title={modalTitle}
        message={modalMessage}
        type={modalType}
      />
    </div>
  );
};

export default AuthForms;