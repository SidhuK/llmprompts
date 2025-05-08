import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import PromptCard from "../components/PromptCard";
import {
  getAllPrompts,
  searchPrompts,
  filterPromptsByPlatform,
  filterPromptsByCategory,
} from "../data/prompts";
import { AIPlatform, PromptCategory, Prompt } from "../types";
import {
  Loader2,
  LucideSparkles,
  BookOpen,
  Github,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState<AIPlatform | "all">(
    "all"
  );
  const [selectedCategory, setSelectedCategory] = useState<
    PromptCategory | "all"
  >("all");
  const [filteredPrompts, setFilteredPrompts] = useState<Prompt[]>([]);

  // Get all prompts
  const {
    data: allPrompts = [],
    isLoading: isLoadingPrompts,
    error: promptsError,
  } = useQuery({
    queryKey: ["prompts"],
    queryFn: getAllPrompts,
    retry: 3,
    staleTime: 60000, // Cache for 1 minute
  });

  // Log errors and success
  useEffect(() => {
    if (promptsError) {
      console.error("Failed to fetch prompts:", promptsError);
    }
  }, [promptsError]);

  useEffect(() => {
    if (allPrompts?.length) {
      console.log("Successfully loaded prompts:", allPrompts.length);
    }
  }, [allPrompts]);

  // Apply filters whenever search or filters change
  useEffect(() => {
    const applyFilters = async () => {
      let result = [...allPrompts];

      // Apply search filter
      if (searchQuery.trim()) {
        result = await searchPrompts(searchQuery);
      }

      // Apply platform filter
      if (selectedPlatform !== "all") {
        result = result.filter((p) => p.platform === selectedPlatform);
      }

      // Apply category filter
      if (selectedCategory !== "all") {
        result = result.filter((p) => p.category === selectedCategory);
      }

      setFilteredPrompts(result);
    };

    applyFilters();
  }, [searchQuery, selectedPlatform, selectedCategory, allPrompts]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero section */}
      <section className="bg-gradient-diagonal from-gradient-start via-gradient-mid to-gradient-end py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-noise-pattern mix-blend-overlay pointer-events-none"></div>
        <motion.div
          className="container max-w-6xl mx-auto px-4 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <div className="mb-6 inline-flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm px-3 py-1">
              <LucideSparkles className="h-4 w-4 text-accent-gold mr-1" />
              <span className="text-xs font-medium">
                Supercharge your AI interactions
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 font-display">
              Discover & Organize Your
              <span className="relative">
                <span className="relative z-10"> AI Prompts</span>
                <span className="absolute left-0 bottom-1 w-full h-3 bg-accent-gold/30 -z-0 rounded"></span>
              </span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl">
              Discover and use powerful prompts for ChatGPT, Claude, Grok, and
              other AI assistants. Find the perfect prompt to get better results
              from your AI interactions.
            </p>

            <div className="mt-2 flex items-center text-white/60 text-sm">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-1.5"
              >
                <path
                  d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.00002 11.5C9.00002 9.01 11.01 7 13.5 7C15.99 7 18 9.01 18 11.5C18 13.99 15.99 16 13.5 16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 15H13.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>
                Vibecoded using{" "}
                <a
                  href="https://cursor.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-gold hover:underline"
                >
                  Cursor
                </a>
              </span>
            </div>

            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <a
                href="#prompts"
                className="inline-flex items-center justify-center rounded-full bg-white text-gradient-start px-6 py-2.5 font-medium shadow-md hover:shadow-lg transition-all"
              >
                Browse Prompts
              </a>
              <a
                href="https://github.com/yourusername/prompt-stash"
                target="_blank"
                className="inline-flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-6 py-2.5 font-medium transition-all"
              >
                <Github size={18} className="mr-2" />
                View on GitHub
                <ArrowUpRight size={14} className="ml-1" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute -bottom-12 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-background z-10"></div>
      </section>

      <main className="flex-1 py-8 pt-16" id="prompts">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-8">
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-2 font-display">
                Prompt Collection
              </h2>
              <p className="text-muted-foreground">
                Find the perfect prompt for your AI assistant
              </p>
            </motion.div>
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </motion.div>
          </div>

          <div className="mb-8">
            <FilterBar
              selectedPlatform={selectedPlatform}
              setSelectedPlatform={setSelectedPlatform}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>

          {isLoadingPrompts ? (
            <motion.div
              className="flex flex-col justify-center items-center py-16 bg-white/50 backdrop-blur-sm rounded-xl shadow-subtle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Loader2 className="h-10 w-10 text-prompt-purple animate-spin mb-4" />
              <span className="text-prompt-purple font-medium text-lg">
                Loading prompts...
              </span>
              <p className="text-sm text-muted-foreground mt-2">
                Preparing your collection of AI prompts
              </p>
            </motion.div>
          ) : promptsError ? (
            <div className="text-center py-12 bg-white/50 backdrop-blur-sm rounded-xl shadow-subtle">
              <div className="bg-red-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="h-8 w-8 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <p className="font-medium mb-2 text-lg">Error loading prompts</p>
              <p className="text-sm text-muted-foreground mb-4">
                Please refresh the page to try again
              </p>
              <code className="mt-4 block text-xs bg-gray-50 p-3 rounded-lg max-w-md mx-auto overflow-auto">
                {String(promptsError)}
              </code>
            </div>
          ) : filteredPrompts.length === 0 ? (
            <div className="text-center py-16 bg-white/50 backdrop-blur-sm rounded-xl shadow-subtle">
              <div className="bg-slate-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="h-8 w-8 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="font-medium mb-1 text-lg">No prompts found</p>
              <p className="text-muted-foreground">
                Try adjusting your search or filters to find prompts.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPrompts.map((prompt, index) => (
                <PromptCard key={prompt.id} prompt={prompt} index={index} />
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="mt-24 border-t bg-gray-50/80 backdrop-blur-sm">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <div className="flex items-center mb-4">
                  <span className="bg-gradient-diagonal from-gradient-start to-gradient-end rounded-xl p-2.5 mr-2 text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6Z" />
                      <path d="M12 13v8" />
                      <path d="M12 3v3" />
                    </svg>
                  </span>
                  <h3 className="text-xl font-bold font-display">
                    LLM Prompts
                  </h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Your personal collection of powerful AI prompts, organized and
                  easily accessible.
                </p>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-prompt-purple transition-colors"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-prompt-purple transition-colors"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>
              </div>
              <div className="md:col-span-2">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                  <div>
                    <h3 className="font-medium text-sm text-foreground/80 mb-3">
                      Resources
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <a
                          href="#"
                          className="text-muted-foreground hover:text-prompt-purple transition-colors"
                        >
                          Documentation
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-muted-foreground hover:text-prompt-purple transition-colors"
                        >
                          API Reference
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-muted-foreground hover:text-prompt-purple transition-colors"
                        >
                          Prompt Examples
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-foreground/80 mb-3">
                      Community
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <a
                          href="#"
                          className="text-muted-foreground hover:text-prompt-purple transition-colors"
                        >
                          GitHub
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-muted-foreground hover:text-prompt-purple transition-colors"
                        >
                          Discord
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-muted-foreground hover:text-prompt-purple transition-colors"
                        >
                          Twitter
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-foreground/80 mb-3">
                      Legal
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <a
                          href="#"
                          className="text-muted-foreground hover:text-prompt-purple transition-colors"
                        >
                          Privacy
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-muted-foreground hover:text-prompt-purple transition-colors"
                        >
                          Terms
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-muted-foreground hover:text-prompt-purple transition-colors"
                        >
                          License
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-slate-200 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} LLM Prompts. All rights reserved.
              </p>
              <p className="text-sm text-muted-foreground mt-2 md:mt-0">
                Built with ❤️ using React + Tailwind
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
