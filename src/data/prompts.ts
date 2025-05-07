
import { Prompt, AIPlatform, PromptCategory } from "../types";
import { parseCSV } from "../utils/csvParser";

// Cache for prompts
let cachedPrompts: Prompt[] | null = null;

// Function to load all prompts from CSV
export const getAllPrompts = async (): Promise<Prompt[]> => {
  if (cachedPrompts !== null) {
    return cachedPrompts;
  }
  
  console.log('Fetching prompts from CSV...');
  try {
    cachedPrompts = await parseCSV('/prompts.csv');
    console.log('Fetched prompts:', cachedPrompts.length, 'items');
    console.log('First prompt:', cachedPrompts[0]);
    return cachedPrompts;
  } catch (error) {
    console.error('Error fetching prompts:', error);
    return [];
  }
};

// Function to search prompts
export const searchPrompts = async (query: string): Promise<Prompt[]> => {
  const prompts = await getAllPrompts();
  const lowerCaseQuery = query.toLowerCase();
  
  return prompts.filter(prompt => 
    prompt.title.toLowerCase().includes(lowerCaseQuery) || 
    prompt.content.toLowerCase().includes(lowerCaseQuery) ||
    prompt.tags?.some(tag => tag.toLowerCase().includes(lowerCaseQuery))
  );
};

// Function to filter prompts by platform
export const filterPromptsByPlatform = async (platform: AIPlatform | "all"): Promise<Prompt[]> => {
  if (platform === "all") return getAllPrompts();
  
  const prompts = await getAllPrompts();
  return prompts.filter(prompt => prompt.platform === platform);
};

// Function to filter prompts by category
export const filterPromptsByCategory = async (category: PromptCategory | "all"): Promise<Prompt[]> => {
  if (category === "all") return getAllPrompts();
  
  const prompts = await getAllPrompts();
  return prompts.filter(prompt => prompt.category === category);
};

export const getPlatformColor = (platform: AIPlatform): string => {
  switch (platform) {
    case "chatgpt":
      return "bg-green-100 text-green-800";
    case "claude":
      return "bg-purple-100 text-purple-800";
    case "grok":
      return "bg-blue-100 text-blue-800";
    case "llama":
      return "bg-yellow-100 text-yellow-800";
    case "gemini":
      return "bg-pink-100 text-pink-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const getCategoryColor = (category: PromptCategory): string => {
  switch (category) {
    case "creative":
      return "bg-orange-100 text-orange-800";
    case "productivity":
      return "bg-blue-100 text-blue-800";
    case "coding":
      return "bg-indigo-100 text-indigo-800";
    case "business":
      return "bg-amber-100 text-amber-800";
    case "academic":
      return "bg-teal-100 text-teal-800";
    case "fun":
      return "bg-pink-100 text-pink-800";
    case "personal":
      return "bg-violet-100 text-violet-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
