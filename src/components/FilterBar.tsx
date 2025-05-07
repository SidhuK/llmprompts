import React from "react";
import { AIPlatform, PromptCategory } from "../types";
import { Check, ChevronDown, Filter } from "lucide-react";
import { motion } from "framer-motion";

interface FilterBarProps {
  selectedPlatform: AIPlatform | "all";
  setSelectedPlatform: (platform: AIPlatform | "all") => void;
  selectedCategory: PromptCategory | "all";
  setSelectedCategory: (category: PromptCategory | "all") => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  selectedPlatform,
  setSelectedPlatform,
  selectedCategory,
  setSelectedCategory,
}) => {
  const platforms: Array<{
    value: AIPlatform | "all";
    label: string;
    icon?: string;
  }> = [
    { value: "all", label: "All Platforms" },
    { value: "chatgpt", label: "ChatGPT", icon: "🤖" },
    { value: "grok", label: "Grok", icon: "🧠" },
    { value: "claude", label: "Claude", icon: "🧪" },
    { value: "llama", label: "Llama", icon: "🦙" },
    { value: "gemini", label: "Gemini", icon: "♊" },
    { value: "other", label: "Other", icon: "✨" },
  ];

  const categories: Array<{
    value: PromptCategory | "all";
    label: string;
    icon?: string;
  }> = [
    { value: "all", label: "All Categories" },
    { value: "creative", label: "Creative", icon: "🎨" },
    { value: "productivity", label: "Productivity", icon: "⚡" },
    { value: "coding", label: "Coding", icon: "💻" },
    { value: "business", label: "Business", icon: "📊" },
    { value: "academic", label: "Academic", icon: "📚" },
    { value: "fun", label: "Fun", icon: "🎮" },
    { value: "personal", label: "Personal", icon: "🧘" },
    { value: "other", label: "Other", icon: "🔍" },
  ];

  const getPlatformOption = (value: AIPlatform | "all") => {
    return platforms.find((p) => p.value === value) || platforms[0];
  };

  const getCategoryOption = (value: PromptCategory | "all") => {
    return categories.find((c) => c.value === value) || categories[0];
  };

  return (
    <motion.div
      className="flex flex-col md:flex-row gap-4 animate-slide-up"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      {/* Filter indicator */}
      <div className="hidden md:flex items-center text-sm text-muted-foreground font-medium">
        <Filter className="h-4 w-4 mr-2" />
        <span>Filters:</span>
      </div>

      <div className="w-full md:w-1/2">
        <div className="relative">
          <label
            htmlFor="platform-filter"
            className="block text-sm font-medium mb-1.5 text-muted-foreground"
          >
            Platform
          </label>
          <div className="relative">
            <select
              id="platform-filter"
              className="w-full appearance-none rounded-lg border bg-white/50 shadow-subtle backdrop-blur-sm py-2.5 pl-4 pr-10 text-sm transition-all hover:border-prompt-purple/30 focus:outline-none focus:ring-2 focus:ring-prompt-purple/20 focus:border-prompt-purple/30"
              value={selectedPlatform}
              onChange={(e) =>
                setSelectedPlatform(e.target.value as AIPlatform | "all")
              }
            >
              {platforms.map((platform) => (
                <option key={platform.value} value={platform.value}>
                  {platform.icon && `${platform.icon} `}
                  {platform.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-muted-foreground">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>

          {/* Selected Badge Indicator - Only display for non-All selections */}
          {selectedPlatform !== "all" && (
            <div className="mt-2 flex">
              <span className="inline-flex items-center gap-1 rounded-full bg-prompt-purple/15 px-2 py-1 text-xs font-semibold text-prompt-purple">
                {getPlatformOption(selectedPlatform).icon && (
                  <span>{getPlatformOption(selectedPlatform).icon}</span>
                )}
                {getPlatformOption(selectedPlatform).label}
                <button
                  onClick={() => setSelectedPlatform("all")}
                  className="ml-1 text-prompt-purple/70 hover:text-prompt-purple"
                  aria-label="Clear platform filter"
                >
                  <svg
                    className="h-3 w-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="w-full md:w-1/2">
        <div className="relative">
          <label
            htmlFor="category-filter"
            className="block text-sm font-medium mb-1.5 text-muted-foreground"
          >
            Category
          </label>
          <div className="relative">
            <select
              id="category-filter"
              className="w-full appearance-none rounded-lg border bg-white/50 shadow-subtle backdrop-blur-sm py-2.5 pl-4 pr-10 text-sm transition-all hover:border-prompt-purple/30 focus:outline-none focus:ring-2 focus:ring-prompt-purple/20 focus:border-prompt-purple/30"
              value={selectedCategory}
              onChange={(e) =>
                setSelectedCategory(e.target.value as PromptCategory | "all")
              }
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.icon && `${category.icon} `}
                  {category.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-muted-foreground">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>

          {/* Selected Badge Indicator - Only display for non-All selections */}
          {selectedCategory !== "all" && (
            <div className="mt-2 flex">
              <span className="inline-flex items-center gap-1 rounded-full bg-accent-mint/15 px-2 py-1 text-xs font-semibold text-accent-mint-dark">
                {getCategoryOption(selectedCategory).icon && (
                  <span>{getCategoryOption(selectedCategory).icon}</span>
                )}
                {getCategoryOption(selectedCategory).label}
                <button
                  onClick={() => setSelectedCategory("all")}
                  className="ml-1 text-accent-mint-dark/70 hover:text-accent-mint-dark"
                  aria-label="Clear category filter"
                >
                  <svg
                    className="h-3 w-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default FilterBar;
