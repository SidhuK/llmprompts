import React, { useState, useEffect } from "react";
import { Prompt } from "../types";
import { Copy, Check } from "lucide-react";
import { getPlatformColor, getCategoryColor } from "../data/prompts";

interface PromptCardProps {
  prompt: Prompt;
  index: number;
}

const PromptCard: React.FC<PromptCardProps> = ({ prompt, index }) => {
  const [copied, setCopied] = useState(false);

  // Debug logging to see what data we're getting
  useEffect(() => {
    console.log(
      `PromptCard ${index} received data:`,
      JSON.stringify(prompt, null, 2)
    );
  }, [prompt, index]);

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
  const animationDelay = `${0.3 + index * 0.05}s`;

  // Format platform and category for display
  const displayPlatform = safePrompt.platform
    ? safePrompt.platform.charAt(0).toUpperCase() + safePrompt.platform.slice(1)
    : "Other";

  const displayCategory = safePrompt.category
    ? safePrompt.category.charAt(0).toUpperCase() + safePrompt.category.slice(1)
    : "Other";

  return (
    <div
      className="prompt-card bg-card border rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow animate-fade-in"
      style={{ animationDelay }}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-medium">{safePrompt.title}</h3>
        <button
          onClick={copyToClipboard}
          className="text-muted-foreground hover:text-prompt-purple transition-colors"
          aria-label="Copy prompt"
        >
          {copied ? <Check size={18} /> : <Copy size={18} />}
        </button>
      </div>

      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
        {safePrompt.content}
      </p>

      <div className="flex flex-wrap gap-2">
        <span
          className={`prompt-tag ${platformClass} px-2 py-1 rounded-full text-xs font-medium`}
        >
          {displayPlatform}
        </span>
        <span
          className={`prompt-tag ${categoryClass} px-2 py-1 rounded-full text-xs font-medium`}
        >
          {displayCategory}
        </span>
        {safePrompt.tags?.map((tag, tagIndex) => (
          <span
            key={`${safePrompt.id}-tag-${tagIndex}`}
            className="prompt-tag bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs font-medium"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PromptCard;
