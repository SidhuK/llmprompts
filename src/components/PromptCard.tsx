import React, { useState, useEffect } from "react";
import { Prompt } from "../types";
import { Copy, Check, ChevronDown, ExternalLink } from "lucide-react";
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

  // Add a chat URL function that would open the prompt in a chat
  const getChatUrl = () => {
    switch (safePrompt.platform) {
      case "chatgpt":
        return `https://chat.openai.com/g/g-8g8MWgJkf-prompt-assistant?prompt=${encodeURIComponent(
          safePrompt.content
        )}`;
      case "claude":
        return `https://claude.ai/chat/new?prompt=${encodeURIComponent(
          safePrompt.content
        )}`;
      default:
        return null;
    }
  };

  const chatUrl = getChatUrl();

  return (
    <motion.div
      className="prompt-card bg-card rounded-lg border shadow-sm hover:shadow-md transition-shadow p-4 h-full flex flex-col"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      {/* Title */}
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-base font-medium text-foreground group-hover:text-accent transition-colors duration-200 truncate">
          {safePrompt.title}
        </h3>

        {/* Copy button */}
        <button
          onClick={copyToClipboard}
          className={`copy-button ml-2 flex-shrink-0 p-1.5 rounded-full ${
            copied ? "bg-green-500" : "bg-accent hover:bg-accent/80"
          } transition-colors`}
          aria-label={
            copied ? "Copied to clipboard" : "Copy prompt to clipboard"
          }
        >
          {copied ? (
            <Check size={12} className="text-white" />
          ) : (
            <Copy size={12} className="text-white" />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="relative mb-3 flex-grow">
        {!expanded && (
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>
        )}
        <p
          className={`text-muted-foreground text-xs mb-2 leading-relaxed ${
            expanded ? "" : "max-h-16 overflow-hidden"
          }`}
        >
          {safePrompt.content}
        </p>
        {safePrompt.content.length > 100 && (
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

      {/* Footer with tags and actions */}
      <div className="flex flex-wrap gap-1.5 mt-auto">
        <span
          className="platform-filter bg-teal-lighter/30 text-teal-dark flex items-center text-xs px-1.5 py-0.5 rounded"
          title={`Platform: ${displayPlatform}`}
        >
          <span className="mr-1" aria-hidden="true">
            {platformEmoji}
          </span>
          {displayPlatform}
        </span>
        <span
          className="platform-filter bg-accent/10 text-accent flex items-center text-xs px-1.5 py-0.5 rounded"
          title={`Category: ${displayCategory}`}
        >
          <span className="mr-1" aria-hidden="true">
            {categoryEmoji}
          </span>
          {displayCategory}
        </span>

        {/* Action button if platform has chat URL */}
        {chatUrl && (
          <a
            href={chatUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto text-xs text-accent hover:text-accent/80 hover:underline flex items-center"
          >
            Try
            <ExternalLink size={10} className="ml-1" />
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default PromptCard;
