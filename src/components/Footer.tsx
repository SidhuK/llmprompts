import React from "react";
import { Github, Heart, Coffee } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-t border-border z-10 py-3 shadow-md">
      <div className="container px-4 mx-auto w-full max-w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          {/* Column 1: Project info and description */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Heart className="h-4 w-4 text-accent" />
              <span className="text-foreground font-medium">
                LLMPrompts.xyz — A collection of powerful AI prompts
              </span>
            </div>

            <div className="text-xs text-muted-foreground pr-4">
              <p className="mb-1">
                Developed by{" "}
                <a
                  href="https://x.com/karat_sidhu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  Karat Sidhu
                </a>
                , these prompts are adaptable for use with ChatGPT, Claude,
                Gemini, Llama, and other AI assistants. I work on this project
                during my free time.
              </p>
            </div>
          </div>

          {/* Column 2: Contributing info and links */}
          <div className="space-y-2">
            <div className="text-xs text-muted-foreground">
              <p className="mb-3">
                <strong>Contributing:</strong> Want to share your own great
                prompts? You're invited to contribute! Simply{" "}
                <a
                  href="https://github.com/SidhuK/llmprompts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  fork the repository
                </a>
                , make your additions, and submit a pull request. Please review
                the contribution guidelines first.
              </p>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4 text-sm">
              <a
                href="https://github.com/SidhuK/llmprompts"
                className="flex items-center gap-1.5 text-muted-foreground hover:text-accent transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={14} />
                <span>GitHub</span>
              </a>

              <a
                href="https://x.com/karat_sidhu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-muted-foreground hover:text-accent transition-colors"
                aria-label="Twitter/X"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-current"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span>Twitter</span>
              </a>

              <a
                href="https://buymeacoffee.com/karatsidhu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-muted-foreground hover:text-accent transition-colors"
                aria-label="Buy Me a Coffee"
              >
                <Coffee size={14} />
                <span>Coffee</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
