import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, Facebook, Twitter, Instagram, MessageCircle } from 'lucide-react';
import { useChatContext } from '../../context/ChatContext';

const AuthForms: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { dispatch } = useChatContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Temporary authentication logic
    dispatch({ type: 'SET_AUTHENTICATED', payload: true });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, name: 'Facebook', color: 'bg-[#1877F2]' },
    { icon: <Twitter className="h-5 w-5" />, name: 'Twitter', color: 'bg-[#1DA1F2]' },
    { icon: <Instagram className="h-5 w-5" />, name: 'Instagram', color: 'bg-[#E4405F]' },
    { icon: <MessageCircle className="h-5 w-5" />, name: 'WhatsApp', color: 'bg-[#25D366]' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-950 via-teal-900 to-teal-800">
      <div className="bg-teal-900/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl shadow-gold-500/10 
                    border border-gold-500/20 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-cream-50">
            Nexus Naija
          </h1>
          <p className="text-cream-200 mt-2">
            {isLogin ? 'Welcome back!' : 'Create your account'}
          </p>
        </div>

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
                  value={formData.name}
                  onChange={handleChange}
                  className="pl-10 w-full px-4 py-3 rounded-lg border border-gold-500/20 
                           focus:ring-2 focus:ring-gold-500/50 focus:border-transparent
                           bg-teal-800/50 text-cream-50 placeholder-cream-200/50"
                  placeholder="Enter your name"
                  required
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
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-cream-100 hover:bg-cream-50 text-teal-950 font-semibold 
                     py-3 px-4 rounded-lg flex items-center justify-center space-x-2 
                     transition-colors duration-200 shadow-lg shadow-gold-500/10"
          >
            <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
            <ArrowRight className="h-5 w-5" />
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

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-cream-200 hover:text-cream-100 font-medium transition-colors duration-200"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForms;