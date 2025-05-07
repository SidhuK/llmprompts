import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background to-white">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-noise-pattern opacity-5 pointer-events-none"></div>
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-radial from-gradient-start/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      
      <main className="flex-grow flex items-center justify-center p-6 relative z-10">
        <div className="max-w-md w-full">
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block mb-6 relative">
              <div className="text-[120px] md:text-[180px] font-bold font-display leading-none text-gradient-start/10">
                404
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-4xl md:text-5xl font-bold font-display bg-gradient-diagonal from-gradient-start via-gradient-mid to-gradient-end bg-clip-text text-transparent">
                  404
                </h1>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2 font-display">Page not found</h2>
            <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
              The page you're looking for doesn't exist or has been moved.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-full bg-gradient-diagonal from-gradient-start to-gradient-end text-white px-5 py-2.5 font-medium shadow-md hover:shadow-lg transition-all"
              >
                <Home className="mr-2 h-4 w-4" />
                Return home
              </Link>
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm text-slate-700 px-5 py-2.5 font-medium hover:bg-slate-50 transition-all"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go back
              </button>
            </div>
          </motion.div>

          {/* Decorative card */}
          <motion.div 
            className="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-xl p-6 shadow-subtle mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-prompt-purple/10 flex items-center justify-center text-prompt-purple mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
                  <path d="M12 9v4"/>
                  <path d="M12 17h.01"/>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-medium mb-1">Looking for prompts?</h3>
                <p className="text-sm text-muted-foreground">
                  Head back to our home page to browse our AI prompt collection.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <footer className="py-4 text-center text-sm text-muted-foreground bg-white/50 backdrop-blur-sm border-t border-slate-200/50">
        <div className="container max-w-6xl mx-auto px-4">
          © {new Date().getFullYear()} Prompt Stash. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default NotFound;
