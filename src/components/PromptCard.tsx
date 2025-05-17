import React, { useState, useEffect } from "react";
import { Prompt } from "../types";
import {
  Copy,
  Check,
  ChevronDown,
  ExternalLink,
  Share2,
  Twitter,
  Facebook,
  Linkedin,
  Instagram,
  Link,
} from "lucide-react";
import { getPlatformColor, getCategoryColor } from "../data/prompts";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface PromptCardProps {
  prompt: Prompt;
  index: number;
}

const PromptCard: React.FC<PromptCardProps> = ({ prompt, index }) => {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const copyToClipboard = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
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
        return `https://chatgpt.com/?prompt=${encodeURIComponent(
          safePrompt.content
        )}`;
      case "claude":
        return `https://claude.ai/chat/new?prompt=${encodeURIComponent(
          safePrompt.content
        )}`;
      case "gemini":
        return `https://gemini.google.com/app?prompt=${encodeURIComponent(
          safePrompt.content
        )}`;
      case "grok":
        return `https://grok.x.ai/?prompt=${encodeURIComponent(
          safePrompt.content
        )}`;
      default:
        return null;
    }
  };

  const chatUrl = getChatUrl();

  // Function to generate share URLs for different platforms
  const getShareUrl = (platform: string) => {
    // Create a URL that points to this prompt (you may need to adjust based on actual URL structure)
    const promptUrl = `${window.location.origin}?prompt=${encodeURIComponent(
      safePrompt.id
    )}`;

    const shareText = `Check out this ${safePrompt.platform} prompt: ${safePrompt.title}`;

    switch (platform) {
      case "twitter":
        return `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          shareText
        )}&url=${encodeURIComponent(promptUrl)}`;
      case "facebook":
        return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          promptUrl
        )}`;
      case "linkedin":
        return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          promptUrl
        )}&title=${encodeURIComponent(shareText)}`;
      case "reddit":
        return `https://www.reddit.com/submit?url=${encodeURIComponent(
          promptUrl
        )}&title=${encodeURIComponent(shareText)}`;
      default:
        return promptUrl;
    }
  };

  const handleTryIt = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (chatUrl) {
      window.open(chatUrl, "_blank");
    }
  };

  const handleShare = (platform: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const shareUrl = getShareUrl(platform);
    if (platform === "copy") {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      window.open(shareUrl, "_blank");
    }
  };

  const handleCardClick = () => {
    setShowDialog(true);
  };

  return (
    <>
      <motion.div
        className="prompt-card bg-card rounded-lg border shadow-sm hover:shadow-md transition-shadow p-4 h-full flex flex-col cursor-pointer"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        onClick={handleCardClick}
      >
        {/* Title */}
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-base font-medium text-foreground group-hover:text-accent transition-colors duration-200 truncate">
            {safePrompt.title}
          </h3>

          {/* Copy button */}
          <button
            onClick={(e) => copyToClipboard(e)}
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
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>
          <p className="text-muted-foreground text-xs mb-2 leading-relaxed max-h-16 overflow-hidden">
            {safePrompt.content}
          </p>
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

          <div className="ml-auto flex items-center gap-2">
            {/* Share dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="text-xs text-accent hover:text-accent/80 hover:underline flex items-center"
                >
                  Share
                  <Share2 size={10} className="ml-1" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={(e) => handleShare("twitter", e)}>
                  <Twitter size={14} className="mr-2" /> Twitter/X
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => handleShare("facebook", e)}>
                  <Facebook size={14} className="mr-2" /> Facebook
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => handleShare("linkedin", e)}>
                  <Linkedin size={14} className="mr-2" /> LinkedIn
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => handleShare("reddit", e)}>
                  <ExternalLink size={14} className="mr-2" /> Reddit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => handleShare("copy", e)}>
                  <Link size={14} className="mr-2" /> Copy Link
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Action button if platform has chat URL */}
            {chatUrl && (
              <button
                onClick={(e) => handleTryIt(e)}
                className="text-xs text-accent hover:text-accent/80 hover:underline flex items-center"
              >
                Try it
                <ExternalLink size={10} className="ml-1" />
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Full prompt dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{safePrompt.title}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Platform and category tags */}
            <div className="flex flex-wrap gap-2">
              <span
                className="platform-filter bg-teal-lighter/30 text-teal-dark flex items-center text-xs px-2 py-1 rounded"
                title={`Platform: ${displayPlatform}`}
              >
                <span className="mr-1" aria-hidden="true">
                  {platformEmoji}
                </span>
                {displayPlatform}
              </span>
              <span
                className="platform-filter bg-accent/10 text-accent flex items-center text-xs px-2 py-1 rounded"
                title={`Category: ${displayCategory}`}
              >
                <span className="mr-1" aria-hidden="true">
                  {categoryEmoji}
                </span>
                {displayCategory}
              </span>
            </div>

            {/* Full prompt content */}
            <div className="bg-muted p-4 rounded-md overflow-auto max-h-[50vh]">
              <pre className="whitespace-pre-wrap text-sm">
                {safePrompt.content}
              </pre>
            </div>

            {/* Action buttons */}
            <div className="flex justify-end gap-3 mt-4">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={copyToClipboard}
              >
                {copied ? (
                  <>
                    <Check size={14} /> Copied
                  </>
                ) : (
                  <>
                    <Copy size={14} /> Copy
                  </>
                )}
              </Button>

              {/* Share Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <Share2 size={14} /> Share
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={(e) => handleShare("twitter", e)}>
                    <Twitter size={14} className="mr-2" /> Twitter/X
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={(e) => handleShare("facebook", e)}>
                    <Facebook size={14} className="mr-2" /> Facebook
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={(e) => handleShare("linkedin", e)}>
                    <Linkedin size={14} className="mr-2" /> LinkedIn
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={(e) => handleShare("reddit", e)}>
                    <ExternalLink size={14} className="mr-2" /> Reddit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={(e) => handleShare("copy", e)}>
                    <Link size={14} className="mr-2" /> Copy Link
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {chatUrl && (
                <Button
                  variant="default"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={handleTryIt}
                >
                  Try it <ExternalLink size={14} />
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PromptCard;
