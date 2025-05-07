import React from "react";
import { AIPlatform, PromptCategory } from "../types";

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

  return (
    <div className="w-full h-full flex flex-col justify-center">
      {/* Platform filter */}
      <div className="mb-3">
        <h3 className="text-sm font-bold text-foreground mb-2 flex items-center font-serif"></h3>
        <div className="flex flex-wrap gap-1.5">
          {platforms.map((platform) => (
            <button
              key={platform.value}
              className={`platform-filter ${
                selectedPlatform === platform.value ? "active" : ""
              }`}
              onClick={() => setSelectedPlatform(platform.value)}
            >
              {platform.icon && <span className="mr-1">{platform.icon}</span>}
              {platform.label}
            </button>
          ))}
        </div>
      </div>

      {/* Category filter */}
      <div>
        <h3 className="text-sm font-bold text-foreground mb-2 flex items-center font-serif"></h3>
        <div className="flex flex-wrap gap-1.5">
          {categories.map((category) => (
            <button
              key={category.value}
              className={`platform-filter ${
                selectedCategory === category.value ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(category.value)}
            >
              {category.icon && <span className="mr-1">{category.icon}</span>}
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
