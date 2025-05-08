import React from "react";
import { Github, Command, Menu, X, Coffee, Sparkles } from "lucide-react";
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
              <span className="text-xl font-semibold">LLM Prompts</span>
            </div>

            {/* Vibecoded text */}
            <div className="hidden md:flex items-center text-xs text-muted-foreground opacity-75">
              <span className="flex items-center gap-1">
                <Sparkles size={12} className="text-accent" />
                Vibecoded using Cursor
              </span>
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/SidhuK/llmprompts"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 text-sm text-foreground hover:text-accent transition-colors"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>

            <a
              href="https://x.com/karat_sidhu"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 text-sm text-foreground hover:text-accent transition-colors"
              aria-label="Twitter/X"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-current"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            <a
              href="https://buymeacoffee.com/karatsidhu"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 text-sm text-foreground hover:text-accent transition-colors"
              aria-label="Buy Me a Coffee"
            >
              <Coffee size={16} />
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
                href="https://github.com/SidhuK/llmprompts"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-foreground hover:text-accent transition-colors"
              >
                <Github size={16} />
                <span>GitHub</span>
              </a>
              <a
                href="https://x.com/karat_sidhu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-foreground hover:text-accent transition-colors"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-current"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span>Twitter/X</span>
              </a>
              <a
                href="https://buymeacoffee.com/karatsidhu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-foreground hover:text-accent transition-colors"
              >
                <Coffee size={16} />
                <span>Buy Me a Coffee</span>
              </a>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Sparkles size={14} className="text-accent" />
                <span>Vibecoded using Cursor</span>
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;
