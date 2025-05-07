
import React from 'react';
import { AIPlatform, PromptCategory } from '../types';

interface FilterBarProps {
  selectedPlatform: AIPlatform | 'all';
  setSelectedPlatform: (platform: AIPlatform | 'all') => void;
  selectedCategory: PromptCategory | 'all';
  setSelectedCategory: (category: PromptCategory | 'all') => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  selectedPlatform,
  setSelectedPlatform,
  selectedCategory,
  setSelectedCategory
}) => {
  const platforms: Array<{ value: AIPlatform | 'all'; label: string }> = [
    { value: 'all', label: 'All Platforms' },
    { value: 'chatgpt', label: 'ChatGPT' },
    { value: 'grok', label: 'Grok' },
    { value: 'claude', label: 'Claude' },
    { value: 'llama', label: 'Llama' },
    { value: 'gemini', label: 'Gemini' },
    { value: 'other', label: 'Other' }
  ];

  const categories: Array<{ value: PromptCategory | 'all'; label: string }> = [
    { value: 'all', label: 'All Categories' },
    { value: 'creative', label: 'Creative' },
    { value: 'productivity', label: 'Productivity' },
    { value: 'coding', label: 'Coding' },
    { value: 'business', label: 'Business' },
    { value: 'academic', label: 'Academic' },
    { value: 'fun', label: 'Fun' },
    { value: 'personal', label: 'Personal' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <div className="flex flex-col md:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <div className="w-full md:w-1/2">
        <label htmlFor="platform-filter" className="block text-sm font-medium text-muted-foreground mb-1">
          Platform
        </label>
        <select
          id="platform-filter"
          className="w-full rounded-md border focus:outline-none focus:ring-2 focus:ring-prompt-purple/30 focus:border-prompt-purple py-2 px-3 transition-all"
          value={selectedPlatform}
          onChange={(e) => setSelectedPlatform(e.target.value as AIPlatform | 'all')}
        >
          {platforms.map((platform) => (
            <option key={platform.value} value={platform.value}>
              {platform.label}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full md:w-1/2">
        <label htmlFor="category-filter" className="block text-sm font-medium text-muted-foreground mb-1">
          Category
        </label>
        <select
          id="category-filter"
          className="w-full rounded-md border focus:outline-none focus:ring-2 focus:ring-prompt-purple/30 focus:border-prompt-purple py-2 px-3 transition-all"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value as PromptCategory | 'all')}
        >
          {categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
