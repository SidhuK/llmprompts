import React, { useState, useEffect } from "react";
import { Prompt } from "../types";
import { Copy, Check, Sparkles } from "lucide-react";
import { getPlatformColor, getCategoryColor } from "../data/prompts";
import { motion } from "framer-motion";

interface PromptCardProps {
  prompt: Prompt;
  index: number;
}

const PromptCard: React.FC<PromptCardProps> = ({ prompt, index }) => {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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

  const platformClass = getPlatformColor(safePrompt.platform);
  const categoryClass = getCategoryColor(safePrompt.category);

  // Calculate animation delay based on index
  const animationDelay = `${0.1 + index * 0.05}s`;

  // Format platform and category for display
  const displayPlatform = safePrompt.platform
    ? safePrompt.platform.charAt(0).toUpperCase() + safePrompt.platform.slice(1)
    : "Other";

  const displayCategory = safePrompt.category
    ? safePrompt.category.charAt(0).toUpperCase() + safePrompt.category.slice(1)
    : "Other";
    
  // Platform emoji mapping
  const platformEmoji = {
    chatgpt: "🤖",
    grok: "🧠",
    claude: "🧪",
    llama: "🦙",
    gemini: "♊",
    other: "✨",
  }[safePrompt.platform] || "✨";
  
  // Category emoji mapping
  const categoryEmoji = {
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
      className="prompt-card group"
      style={{ animationDelay }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-radial from-white via-white to-transparent opacity-40 rounded-xl"></div>
      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-br from-gradient-start/5 to-transparent rounded-xl transition-all duration-300"></div>
      )}
      
      {/* Card content */}
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <span className="mr-2 text-lg">{platformEmoji}</span>
            <h3 className="text-lg font-display font-semibold group-hover:text-prompt-purple transition-colors">
              {safePrompt.title}
            </h3>
          </div>
          <motion.button
            onClick={copyToClipboard}
            className={`text-white bg-prompt-purple p-1.5 rounded-md transition-all ${
              copied ? "bg-green-500" : "hover:bg-prompt-purple-dark"
            }`}
            aria-label="Copy prompt"
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
          <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-white/90 pointer-events-none"></div>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-3 pr-6 leading-relaxed">
            {safePrompt.content}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mt-auto">
          <span
            className={`prompt-tag ${platformClass} px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1`}
          >
            {platformEmoji && <span>{platformEmoji}</span>}
            {displayPlatform}
          </span>
          <span
            className={`prompt-tag ${categoryClass} px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1`}
          >
            {categoryEmoji && <span>{categoryEmoji}</span>}
            {displayCategory}
          </span>
          {safePrompt.tags?.map((tag, tagIndex) => (
            <span
              key={`${safePrompt.id}-tag-${tagIndex}`}
              className="prompt-tag bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1"
            >
              <span className="text-prompt-purple">#</span>
              {tag}
            </span>
          ))}
        </div>
        
        {/* Subtle interactive highlight effect */}
        <div className={`absolute inset-0 border border-prompt-purple/20 rounded-xl opacity-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : ''}`}></div>
      </div>
    </motion.div>
  );
};

export default PromptCard;
