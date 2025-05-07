import React from "react";
import { Github, Search, Command, Menu, X, BookOpen } from "lucide-react";
import { useMediaQuery } from "../hooks/use-mobile";
import { motion } from "framer-motion";

const Header: React.FC = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="main-header">
      <div className="container mx-auto px-4 w-full max-w-full">
        <div className="flex items-center justify-between">
          {/* Logo and site title */}
          <div className="flex items-center">
            <div className="flex items-center gap-2 mr-8">
              <Command className="h-6 w-6 text-accent" strokeWidth={2} />
              <span className="text-xl font-semibold">Prompt Stash</span>
            </div>

            {/* Nav items - only show on desktop */}
            <nav className="hidden md:flex items-center space-x-6">
              <a
                href="#featured"
                className="text-sm text-foreground hover:text-accent transition-colors"
              >
                Featured
              </a>
              <a
                href="#new"
                className="text-sm text-foreground hover:text-accent transition-colors"
              >
                New
              </a>
              <a
                href="#categories"
                className="text-sm text-foreground hover:text-accent transition-colors"
              >
                Categories
              </a>
              <a
                href="#docs"
                className="text-sm text-foreground hover:text-accent transition-colors"
              >
                Docs
              </a>
            </nav>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/yourusername/prompt-stash"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 text-sm text-foreground hover:text-accent transition-colors"
            >
              <Github size={16} />
              <span>GitHub</span>
            </a>

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-1.5 rounded-md hover:bg-accent/10 transition-colors"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden py-4 mt-4 border-t"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-col space-y-4">
              <a
                href="#featured"
                className="text-foreground hover:text-accent transition-colors"
              >
                Featured
              </a>
              <a
                href="#new"
                className="text-foreground hover:text-accent transition-colors"
              >
                New
              </a>
              <a
                href="#categories"
                className="text-foreground hover:text-accent transition-colors"
              >
                Categories
              </a>
              <a
                href="#docs"
                className="text-foreground hover:text-accent transition-colors"
              >
                Docs
              </a>
              <a
                href="https://github.com/yourusername/prompt-stash"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-foreground hover:text-accent transition-colors"
              >
                <Github size={16} />
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
