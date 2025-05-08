import React from "react";
import { Github, Heart } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-t border-border z-10 py-3 shadow-md">
      <div className="container px-4 mx-auto flex flex-col md:flex-row justify-between items-center text-sm gap-2 w-full max-w-full">
        <div className="flex items-center space-x-2">
          <Heart className="h-4 w-4 text-accent" />
          <span className="text-foreground">
            LLMPrompts.xyz — A collection of powerful AI prompts
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/yourusername/prompt-stash"
            className="flex items-center gap-1.5 text-muted-foreground hover:text-accent transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={14} />
            <span>GitHub</span>
          </a>
          <span className="text-border">•</span>
          <a
            href="#privacy"
            className="text-muted-foreground hover:text-accent transition-colors"
          >
            Privacy
          </a>
          <span className="text-border">•</span>
          <a
            href="#terms"
            className="text-muted-foreground hover:text-accent transition-colors"
          >
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
