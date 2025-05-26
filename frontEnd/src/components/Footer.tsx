import React from 'react';
import { MessageSquare, Github, Twitter, Facebook, Instagram, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-teal-950/50 backdrop-blur-lg border-t border-gold-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center">
              <MessageSquare className="h-8 w-8 text-cream-100" />
              <span className="ml-2 text-xl font-bold text-cream-100">Nexus Naija</span>
            </div>
            <p className="text-cream-200">
              Connecting Nigeria through meaningful conversations.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-cream-200 hover:text-cream-50 transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-cream-200 hover:text-cream-50 transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-cream-200 hover:text-cream-50 transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-cream-200 hover:text-cream-50 transition-colors duration-200">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Product Section */}
          <div>
            <h3 className="text-cream-100 font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-cream-200 hover:text-cream-50 transition-colors duration-200">Features</a>
              </li>
              <li>
                <a href="#" className="text-cream-200 hover:text-cream-50 transition-colors duration-200">Security</a>
              </li>
              <li>
                <a href="#" className="text-cream-200 hover:text-cream-50 transition-colors duration-200">Enterprise</a>
              </li>
              <li>
                <a href="#" className="text-cream-200 hover:text-cream-50 transition-colors duration-200">Pricing</a>
              </li>
            </ul>
          </div>

          {/* Resources Section */}
          <div>
            <h3 className="text-cream-100 font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-cream-200 hover:text-cream-50 transition-colors duration-200">Documentation</a>
              </li>
              <li>
                <a href="#" className="text-cream-200 hover:text-cream-50 transition-colors duration-200">API Reference</a>
              </li>
              <li>
                <a href="#" className="text-cream-200 hover:text-cream-50 transition-colors duration-200">Guides</a>
              </li>
              <li>
                <a href="#" className="text-cream-200 hover:text-cream-50 transition-colors duration-200">Blog</a>
              </li>
            </ul>
          </div>

          {/* Company Section */}
          <div>
            <h3 className="text-cream-100 font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-cream-200 hover:text-cream-50 transition-colors duration-200">About</a>
              </li>
              <li>
                <a href="#" className="text-cream-200 hover:text-cream-50 transition-colors duration-200">Careers</a>
              </li>
              <li>
                <a href="#" className="text-cream-200 hover:text-cream-50 transition-colors duration-200">Contact</a>
              </li>
              <li>
                <a href="#" className="text-cream-200 hover:text-cream-50 transition-colors duration-200">Partners</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gold-500/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 text-cream-200 mb-4 md:mb-0">
              <span>&copy; {currentYear} Nexus Naija.</span>
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>in Nigeria</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-cream-200 hover:text-cream-50 text-sm transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-cream-200 hover:text-cream-50 text-sm transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-cream-200 hover:text-cream-50 text-sm transition-colors duration-200">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;