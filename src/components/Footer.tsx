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
                Gemini, Llama, and other AI assistants. This is a
                community-driven that I work on in my spare time.
              </p>
            </div>

            {/* Tech stack */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground opacity-75 mt-1">
              <span>Built with:</span>
              <a
                href="https://vitejs.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:text-accent transition-colors"
                aria-label="Vite"
                title="Vite"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M29.8836 6.146L16.7418 29.6457C16.394 30.2451 15.5097 30.2374 15.1809 29.6328L2.09541 6.14231C1.73259 5.47802 2.31512 4.69657 3.05533 4.91293L16.0523 8.99851C16.1767 9.0372 16.3067 9.03718 16.4311 8.99844L28.9241 4.91465C29.6609 4.6983 30.2441 5.48001 29.8836 6.146Z"
                    fill="#41D1FF"
                  />
                  <path
                    d="M24.6024 0.280932L13.1741 2.8183C12.9539 2.86548 12.7844 3.05458 12.7522 3.27962L10.6072 17.9699C10.5548 18.3407 10.8617 18.6731 11.2325 18.6318L13.6598 18.3309C14.0524 18.2868 14.3748 18.6512 14.2847 19.0359L12.9239 24.7734C12.8228 25.2118 13.3354 25.5434 13.6854 25.2505L15.949 23.4009C16.2437 23.1621 16.6627 23.3544 16.6988 23.7493L17.3137 30.0823C17.3605 30.6029 18.0591 30.7644 18.3925 30.3203L19.0919 29.3963L25.9774 15.2144C26.2029 14.7776 25.8854 14.2742 25.3947 14.305L22.8523 14.4306C22.4299 14.4561 22.1349 14.0065 22.3141 13.6234L27.6302 1.36329C27.8185 0.9654 27.4943 0.498884 27.0511 0.561171L24.6024 0.280932Z"
                    fill="#FFD62E"
                  />
                </svg>
              </a>
              <span className="mx-0.5">+</span>
              <a
                href="https://react.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:text-accent transition-colors"
                aria-label="React"
                title="React"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 9.861C13.161 9.861 14.1 10.8 14.1 11.961C14.1 13.122 13.161 14.061 12 14.061C10.839 14.061 9.9 13.122 9.9 11.961C9.9 10.8 10.839 9.861 12 9.861Z"
                    fill="#61DAFB"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11.9999 7.128C14.8169 7.128 17.4509 7.619 19.3389 8.431C21.6239 9.407 22.9999 10.862 22.9999 11.961C22.9999 13.113 21.5429 14.641 19.0919 15.643C17.1849 16.383 14.6159 16.794 11.9999 16.794C9.3299 16.794 6.7179 16.415 4.8009 15.665C2.3829 14.665 0.9999 13.106 0.9999 11.961C0.9999 10.852 2.3329 9.398 4.6049 8.424C6.5029 7.616 9.1629 7.128 11.9989 7.128H11.9999Z"
                    stroke="#61DAFB"
                    stroke-width="0.5"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.2949 9.044C9.7029 6.607 11.3149 4.634 12.7639 3.443C14.5339 1.999 16.1799 1.577 16.9579 2.016C17.7799 2.477 18.1419 4.193 17.6189 6.47C17.2169 8.242 16.2699 10.38 15.0039 12.513C13.7139 14.684 12.2059 16.612 10.7669 17.788C8.9669 19.272 7.2599 19.674 6.4689 19.224C5.7019 18.787 5.3349 17.243 5.7769 15.132C6.1589 13.262 7.0789 11.021 8.2939 9.044H8.2949Z"
                    stroke="#61DAFB"
                    stroke-width="0.5"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.2999 12.513C6.7909 9.971 5.8559 7.702 5.7709 5.872C5.6669 3.676 6.2649 2.16 7.0429 1.714C7.8659 1.245 9.4889 1.76 11.2369 3.225C12.6369 4.394 14.0479 6.214 15.1789 8.319C16.3349 10.469 17.2119 12.673 17.6219 14.497C18.1119 16.708 17.5319 18.262 16.7219 18.719C15.8889 19.189 14.3739 18.736 12.7069 17.371C11.3249 16.212 9.7829 14.456 8.2999 12.513Z"
                    stroke="#61DAFB"
                    stroke-width="0.5"
                  />
                </svg>
              </a>
              <span className="mx-0.5">+</span>
              <a
                href="https://tailwindcss.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:text-accent transition-colors"
                aria-label="Tailwind CSS"
                title="Tailwind CSS"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 6.036C9.936 6.036 8.568 7.086 7.896 9.186C8.736 8.136 9.744 7.776 10.92 8.106C11.496 8.274 11.91 8.694 12.366 9.156C13.092 9.894 13.926 10.746 15.54 10.746C17.604 10.746 18.972 9.696 19.644 7.596C18.804 8.646 17.796 9.006 16.62 8.676C16.044 8.508 15.63 8.088 15.174 7.626C14.448 6.888 13.614 6.036 12 6.036ZM7.92 10.746C5.856 10.746 4.488 11.796 3.816 13.896C4.656 12.846 5.664 12.486 6.84 12.816C7.416 12.984 7.83 13.404 8.286 13.866C9.012 14.604 9.846 15.456 11.46 15.456C13.524 15.456 14.892 14.406 15.564 12.306C14.724 13.356 13.716 13.716 12.54 13.386C11.964 13.218 11.55 12.798 11.094 12.336C10.368 11.598 9.534 10.746 7.92 10.746Z"
                    fill="#38BDF8"
                  />
                </svg>
              </a>
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
