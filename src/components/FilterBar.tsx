import React, { useState } from "react";
import { AIPlatform, PromptCategory } from "../types";
import { Check, ChevronDown, Filter, X } from "lucide-react";
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
  // Add state to handle dropdown animation
  const [platformHovered, setPlatformHovered] = useState(false);
  const [categoryHovered, setCategoryHovered] = useState(false);

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
      className="flex flex-col md:flex-row gap-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      {/* Filter indicator with updated styling */}
      <div className="hidden md:flex items-center text-sm font-medium text-muted-foreground">
        <Filter className="h-4 w-4 mr-2" />
        <span>Filters</span>
      </div>

      <div className="w-full md:w-1/2">
        <div className="relative">
          <label
            htmlFor="platform-filter"
            className="block text-sm font-medium mb-2 text-muted-foreground"
          >
            Platform
          </label>
          <div
            className="relative"
            onMouseEnter={() => setPlatformHovered(true)}
            onMouseLeave={() => setPlatformHovered(false)}
          >
            <select
              id="platform-filter"
              className="select-custom w-full appearance-none rounded-md border border-input
                bg-background/70 py-2.5 pl-4 pr-10 text-sm transition-colors
                hover:border-accent/30 focus:border-accent/30"
              value={selectedPlatform}
              onChange={(e) =>
                setSelectedPlatform(e.target.value as AIPlatform | "all")
              }
              aria-label="Filter by platform"
            >
              {platforms.map((platform) => (
                <option key={platform.value} value={platform.value}>
                  {platform.icon && `${platform.icon} `}
                  {platform.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-muted-foreground">
              <motion.div
                animate={{ rotate: platformHovered ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="h-4 w-4" />
              </motion.div>
            </div>
          </div>

          {/* Selected Badge Indicator - with teal styling */}
          {selectedPlatform !== "all" && (
            <div className="mt-2 flex">
              <span
                className="inline-flex items-center gap-1 rounded-full bg-teal-lighter/20 
                px-2.5 py-1 text-xs font-medium text-teal-dark border border-teal-lighter/30"
              >
                {getPlatformOption(selectedPlatform).icon && (
                  <span className="mr-0.5">
                    {getPlatformOption(selectedPlatform).icon}
                  </span>
                )}
                {getPlatformOption(selectedPlatform).label}
                <button
                  onClick={() => setSelectedPlatform("all")}
                  className="ml-1.5 rounded-full hover:bg-teal-lighter/20 p-0.5"
                  aria-label="Clear platform filter"
                >
                  <X className="h-3 w-3" />
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
            className="block text-sm font-medium mb-2 text-muted-foreground"
          >
            Category
          </label>
          <div
            className="relative"
            onMouseEnter={() => setCategoryHovered(true)}
            onMouseLeave={() => setCategoryHovered(false)}
          >
            <select
              id="category-filter"
              className="select-custom w-full appearance-none rounded-md border border-input
                bg-background/70 py-2.5 pl-4 pr-10 text-sm transition-colors
                hover:border-accent/30 focus:border-accent/30"
              value={selectedCategory}
              onChange={(e) =>
                setSelectedCategory(e.target.value as PromptCategory | "all")
              }
              aria-label="Filter by category"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.icon && `${category.icon} `}
                  {category.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-muted-foreground">
              <motion.div
                animate={{ rotate: categoryHovered ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="h-4 w-4" />
              </motion.div>
            </div>
          </div>

          {/* Selected Badge Indicator - with teal styling */}
          {selectedCategory !== "all" && (
            <div className="mt-2 flex">
              <span
                className="inline-flex items-center gap-1 rounded-full bg-accent/10
                px-2.5 py-1 text-xs font-medium text-accent-foreground border border-accent/10"
              >
                {getCategoryOption(selectedCategory).icon && (
                  <span className="mr-0.5">
                    {getCategoryOption(selectedCategory).icon}
                  </span>
                )}
                {getCategoryOption(selectedCategory).label}
                <button
                  onClick={() => setSelectedCategory("all")}
                  className="ml-1.5 rounded-full hover:bg-accent/10 p-0.5"
                  aria-label="Clear category filter"
                >
                  <X className="h-3 w-3" />
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
