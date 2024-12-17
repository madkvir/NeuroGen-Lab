// import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white">
      <Navbar />
      
      <main className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="max-w-2xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8 text-center">
          <AlertTriangle className="w-16 h-16 text-emerald-400 mx-auto mb-8" />
          
          <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
          
          <p className="text-gray-400 text-lg mb-8">
            Sorry, we couldn't find the page you're looking for. The page might have been removed, 
            had its name changed, or is temporarily unavailable.
          </p>
          
          <div className="relative group inline-block">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <Link
              to="/"
              className="relative flex items-center justify-center gap-2 px-6 py-3 bg-gray-900/90 rounded-lg text-white group-hover:text-emerald-400 transition-colors"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;