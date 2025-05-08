import React from "react";
import { Github, Command, Menu, X, Coffee } from "lucide-react";
import { useMediaQuery } from "../hooks/use-mobile";
import { motion } from "framer-motion";

const Header: React.FC = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="main-header sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 w-full max-w-full py-3">
        <div className="flex items-center justify-between">
          {/* Logo and site title */}
          <div className="flex items-center">
            <a
              href="/"
              className="flex items-center gap-2 mr-8"
              aria-label="LLMPrompts.xyz Home"
            >
              <Command className="h-6 w-6 text-accent" strokeWidth={2} />
              <span className="text-xl font-semibold">LLMPrompts.xyz</span>
            </a>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/SidhuK/llmprompts"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 text-sm text-foreground hover:text-accent transition-colors"
              aria-label="GitHub Repository"
            >
              <Github size={16} />
              <span className="sr-only md:not-sr-only">GitHub</span>
            </a>

            <a
              href="https://x.com/karat_sidhu"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 text-sm text-foreground hover:text-accent transition-colors"
              aria-label="Follow on Twitter/X"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-current"
                aria-hidden="true"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span className="sr-only md:not-sr-only">Twitter</span>
            </a>

            <a
              href="https://buymeacoffee.com/karatsidhu"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 text-sm text-foreground hover:text-accent transition-colors"
              aria-label="Buy Me a Coffee"
            >
              <Coffee size={16} />
              <span className="sr-only md:not-sr-only">Support</span>
            </a>

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-1.5 rounded-md hover:bg-accent/10 transition-colors"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
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
          <motion.nav
            id="mobile-menu"
            className="md:hidden py-4 mt-4 border-t"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            aria-label="Mobile Navigation"
          >
            <div className="flex flex-col space-y-4">
              <h2 className="text-xs uppercase text-muted-foreground font-semibold mb-1">
                Platforms
              </h2>
              <a
                href="/platforms/chatgpt"
                className="flex items-center gap-1.5 text-foreground hover:text-accent transition-colors"
              >
                ChatGPT
              </a>
              <a
                href="/platforms/claude"
                className="flex items-center gap-1.5 text-foreground hover:text-accent transition-colors"
              >
                Claude
              </a>
              <a
                href="/platforms/gemini"
                className="flex items-center gap-1.5 text-foreground hover:text-accent transition-colors"
              >
                Gemini
              </a>

              <h2 className="text-xs uppercase text-muted-foreground font-semibold mb-1 mt-4">
                Categories
              </h2>
              <a
                href="/categories/coding"
                className="flex items-center gap-1.5 text-foreground hover:text-accent transition-colors"
              >
                Coding
              </a>
              <a
                href="/categories/writing"
                className="flex items-center gap-1.5 text-foreground hover:text-accent transition-colors"
              >
                Writing
              </a>

              <h2 className="text-xs uppercase text-muted-foreground font-semibold mb-1 mt-4">
                Links
              </h2>
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
            </div>
          </motion.nav>
        )}
      </div>
    </header>
  );
};

export default Header;
