import React, { useState, useEffect } from "react";
import { Prompt } from "../types";
import { Copy, Check, Sparkles, ChevronDown } from "lucide-react";
import { getPlatformColor, getCategoryColor } from "../data/prompts";
import { motion } from "framer-motion";

interface PromptCardProps {
  prompt: Prompt;
  index: number;
}

const PromptCard: React.FC<PromptCardProps> = ({ prompt, index }) => {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(prompt.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Safely get platform and category
  const safePrompt = {
    id: prompt.id || `prompt-${index}`,
    title: prompt.title || "Untitled Prompt",
    content: prompt.content || "No content available",
    platform: prompt.platform || "other",
    category: prompt.category || "other",
    tags: prompt.tags || [],
  };

  // Format platform and category for display
  const displayPlatform = safePrompt.platform
    ? safePrompt.platform.charAt(0).toUpperCase() + safePrompt.platform.slice(1)
    : "Other";

  const displayCategory = safePrompt.category
    ? safePrompt.category.charAt(0).toUpperCase() + safePrompt.category.slice(1)
    : "Other";

  // Platform emoji mapping
  const platformEmoji =
    {
      chatgpt: "🤖",
      grok: "🧠",
      claude: "🧪",
      llama: "🦙",
      gemini: "♊",
      other: "✨",
    }[safePrompt.platform] || "✨";

  // Category emoji mapping
  const categoryEmoji =
    {
      creative: "🎨",
      productivity: "⚡",
      coding: "💻",
      business: "📊",
      academic: "📚",
      fun: "🎮",
      personal: "🧘",
      other: "🔍",
    }[safePrompt.category] || "🔍";

  return (
    <motion.div
      className="prompt-card group accent-border"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card content */}
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <span className="mr-2 text-lg" aria-hidden="true">
              {platformEmoji}
            </span>
            <h3 className="text-lg font-medium group-hover:text-accent transition-colors duration-200">
              {safePrompt.title}
            </h3>
          </div>
          <motion.button
            onClick={copyToClipboard}
            className={`text-white rounded-md p-1.5 focus-ring ${
              copied ? "bg-green-500" : "bg-accent hover:bg-accent/90"
            }`}
            aria-label={
              copied ? "Copied to clipboard" : "Copy prompt to clipboard"
            }
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {copied ? (
              <Check size={16} className="text-white" />
            ) : (
              <Copy size={16} className="text-white" />
            )}
          </motion.button>
        </div>

        <div className="relative mb-5">
          {!expanded && (
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white/90 to-transparent pointer-events-none"></div>
          )}
          <p
            className={`text-muted-foreground text-sm mb-4 leading-relaxed ${
              expanded ? "" : "line-clamp-3"
            }`}
          >
            {safePrompt.content}
          </p>
          {safePrompt.content.length > 150 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-xs text-accent hover:text-accent/80 hover:underline flex items-center"
              aria-label={expanded ? "Show less content" : "Show more content"}
            >
              {expanded ? "Show less" : "Show more"}
              <ChevronDown
                className={`ml-1 h-3 w-3 transition-transform duration-200 ${
                  expanded ? "rotate-180" : ""
                }`}
              />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mt-auto">
          <span
            className="prompt-tag bg-teal-lighter/30 text-teal-dark flex items-center"
            title={`Platform: ${displayPlatform}`}
          >
            <span className="mr-1" aria-hidden="true">
              {platformEmoji}
            </span>
            {displayPlatform}
          </span>
          <span
            className="prompt-tag bg-accent/15 text-accent-foreground flex items-center"
            title={`Category: ${displayCategory}`}
          >
            <span className="mr-1" aria-hidden="true">
              {categoryEmoji}
            </span>
            {displayCategory}
          </span>
          {safePrompt.tags?.map((tag, tagIndex) => (
            <span
              key={`${safePrompt.id}-tag-${tagIndex}`}
              className="prompt-tag bg-secondary/80 text-secondary-foreground flex items-center"
            >
              <span className="text-accent mr-0.5">#</span>
              {tag}
            </span>
          ))}
        </div>

        {/* Accent border highlight on hover */}
        {isHovered && (
          <div
            className="absolute inset-0 rounded-xl transition-opacity duration-300 pointer-events-none border-2 border-accent/20"
            aria-hidden="true"
          ></div>
        )}
      </div>
    </motion.div>
  );
};

export default PromptCard;
