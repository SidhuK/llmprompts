import React from "react";
import { Github, BookOpen, Command, Menu, X } from "lucide-react";
import { useMediaQuery } from "../hooks/use-mobile";
import { motion } from "framer-motion";

const Header: React.FC = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="py-6 bg-gradient-diagonal from-gradient-start via-gradient-mid to-gradient-end relative">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10 bg-noise-pattern mix-blend-overlay pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <motion.h1
              className="text-3xl md:text-4xl font-bold text-white flex items-center gap-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Command className="h-8 w-8 text-accent-gold" strokeWidth={2} />
              <span>Prompt Stash</span>
            </motion.h1>
            <motion.p
              className="text-white/80 mt-1 max-w-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Your curated collection of powerful AI prompts
            </motion.p>
          </div>

          {/* Desktop Navigation */}
          <motion.div
            className="hidden md:flex items-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <a
              href="#features"
              className="text-white/80 hover:text-white flex items-center gap-1 text-sm font-medium transition-colors"
            >
              <BookOpen className="h-4 w-4" />
              <span>Documentation</span>
            </a>
            <a
              href="https://github.com/yourusername/prompt-stash"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </a>
          </motion.div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex justify-end">
            <button
              onClick={toggleMobileMenu}
              className="text-white p-1.5 rounded-md hover:bg-white/10 transition-colors"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            className="mt-4 py-4 px-2 bg-white/10 backdrop-blur-lg rounded-lg md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-col space-y-3">
              <a
                href="#features"
                className="text-white/80 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2"
              >
                <BookOpen className="h-4 w-4" />
                <span>Documentation</span>
              </a>
              <a
                href="https://github.com/yourusername/prompt-stash"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2"
              >
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </a>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;
