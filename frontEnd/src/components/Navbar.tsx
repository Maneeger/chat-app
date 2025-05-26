import React from 'react'
import logo from '../assets/logo.png'; 

const Navbar = () => {
  return (
    <div>

         <nav className="border-b border-gold-500/20 bg-teal-950/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
         <div className='flex items-center'>
     <h1 className="text-2xl font-bold text-cream-100">Nexus Naija</h1>
            <div className="w-14 "><img src={logo} alt="logo" className='w-full h-full' /></div>
         </div>
         
            <button
            //   onClick={() => setShowAuth(true)}
              className="px-4 py-2 text-sm font-medium text-cream-100 hover:text-cream-50 
                       border border-gold-500 rounded-lg hover:border-gold-400 
                       transition-colors duration-200"
            >
              Sign In
            </button>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar