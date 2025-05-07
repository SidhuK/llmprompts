
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-6 border-b animate-fade-in">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-prompt-purple">
              Prompt Stash
            </h1>
            <p className="text-muted-foreground mt-1">
              Your personal collection of AI prompts
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden md:inline-block">
              Built with ❤️ using React + Tailwind
            </span>
            <a
              href="https://github.com/yourusername/prompt-stash"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium hover:text-prompt-purple transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
