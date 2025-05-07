
import { Prompt, AIPlatform, PromptCategory } from "../types";

// This simulates loading data from a CSV file
// In a real implementation, you would use a CSV parser library
export const samplePrompts: Prompt[] = [
  {
    id: "1",
    title: "Creative Story Writing",
    content: "Write a short story about [protagonist] who discovers [unusual object] in their backyard. The story should include elements of [genre] and end with an unexpected twist.",
    platform: "chatgpt",
    category: "creative",
    tags: ["writing", "storytelling"]
  },
  {
    id: "2",
    title: "Code Refactoring",
    content: "Refactor this [language] code to be more efficient and follow best practices: [code block]",
    platform: "chatgpt",
    category: "coding",
    tags: ["programming", "optimization"]
  },
  {
    id: "3",
    title: "Business Email Template",
    content: "Create a professional email template for [purpose] to send to [recipient type]. The tone should be [tone] and include a call to action about [action].",
    platform: "claude",
    category: "business",
    tags: ["email", "communication"]
  },
  {
    id: "4",
    title: "Research Paper Summary",
    content: "Summarize the key findings, methodology, and implications of this research paper: [paper title/abstract]",
    platform: "grok",
    category: "academic",
    tags: ["research", "summary"]
  },
  {
    id: "5",
    title: "Product Description",
    content: "Write a compelling product description for [product] targeting [audience]. Highlight its [features] and explain the benefits in an engaging way.",
    platform: "gemini",
    category: "business",
    tags: ["marketing", "copywriting"]
  },
  {
    id: "6",
    title: "Debugging Help",
    content: "I'm getting this error in my [language] application: [error message]. Here's the relevant code: [code block]. What might be causing this and how can I fix it?",
    platform: "llama",
    category: "coding",
    tags: ["debugging", "troubleshooting"]
  },
  {
    id: "7",
    title: "Recipe Creation",
    content: "Create a recipe for a [dietary restriction] [meal type] using these ingredients: [ingredient list]. Include cooking instructions and approximate preparation time.",
    platform: "chatgpt",
    category: "personal",
    tags: ["cooking", "food"]
  },
  {
    id: "8",
    title: "Fantasy Character Creation",
    content: "Create a detailed character profile for a [character type] in a [setting] fantasy world. Include physical appearance, personality traits, special abilities, and backstory.",
    platform: "claude",
    category: "creative",
    tags: ["characters", "fantasy"]
  },
  {
    id: "9",
    title: "Data Analysis Plan",
    content: "I have a dataset about [topic] with these columns: [column names]. Suggest a comprehensive analysis plan to extract meaningful insights, including visualization recommendations.",
    platform: "grok",
    category: "academic",
    tags: ["data", "analysis"]
  },
  {
    id: "10",
    title: "Workout Routine",
    content: "Create a [intensity level] [duration] workout routine targeting [muscle groups] that can be done [location]. Include sets, reps, and rest periods.",
    platform: "gemini",
    category: "personal",
    tags: ["fitness", "health"]
  }
];

// Function to load all prompts
export const getAllPrompts = (): Prompt[] => {
  return samplePrompts;
};

// Function to search prompts
export const searchPrompts = (query: string): Prompt[] => {
  const lowerCaseQuery = query.toLowerCase();
  return samplePrompts.filter(prompt => 
    prompt.title.toLowerCase().includes(lowerCaseQuery) || 
    prompt.content.toLowerCase().includes(lowerCaseQuery) ||
    prompt.tags?.some(tag => tag.toLowerCase().includes(lowerCaseQuery))
  );
};

// Function to filter prompts by platform
export const filterPromptsByPlatform = (platform: AIPlatform | "all"): Prompt[] => {
  if (platform === "all") return samplePrompts;
  return samplePrompts.filter(prompt => prompt.platform === platform);
};

// Function to filter prompts by category
export const filterPromptsByCategory = (category: PromptCategory | "all"): Prompt[] => {
  if (category === "all") return samplePrompts;
  return samplePrompts.filter(prompt => prompt.category === category);
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
