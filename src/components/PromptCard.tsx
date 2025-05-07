
import React, { useState } from 'react';
import { Prompt } from '../types';
import { Copy, Check } from 'lucide-react';
import { getPlatformColor, getCategoryColor } from '../data/prompts';

interface PromptCardProps {
  prompt: Prompt;
  index: number;
}

const PromptCard: React.FC<PromptCardProps> = ({ prompt, index }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(prompt.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const platformClass = getPlatformColor(prompt.platform || 'other');
  const categoryClass = getCategoryColor(prompt.category || 'other');
  
  // Calculate animation delay based on index
  const animationDelay = `${0.3 + index * 0.05}s`;

  // Format platform and category for display
  const displayPlatform = prompt.platform 
    ? prompt.platform.charAt(0).toUpperCase() + prompt.platform.slice(1)
    : 'Other';
  
  const displayCategory = prompt.category
    ? prompt.category.charAt(0).toUpperCase() + prompt.category.slice(1)
    : 'Other';

  return (
    <div 
      className="prompt-card animate-fade-in" 
      style={{ animationDelay }}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-medium">{prompt.title || 'Untitled'}</h3>
        <button
          onClick={copyToClipboard}
          className="text-muted-foreground hover:text-prompt-purple transition-colors"
          aria-label="Copy prompt"
        >
          {copied ? <Check size={18} /> : <Copy size={18} />}
        </button>
      </div>

      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
        {prompt.content || 'No content available'}
      </p>

      <div className="flex flex-wrap gap-2">
        <span className={`prompt-tag ${platformClass}`}>
          {displayPlatform}
        </span>
        <span className={`prompt-tag ${categoryClass}`}>
          {displayCategory}
        </span>
        {prompt.tags?.map((tag) => (
          <span key={tag} className="prompt-tag bg-secondary text-secondary-foreground">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PromptCard;
