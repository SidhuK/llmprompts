import { Prompt, AIPlatform, PromptCategory } from "../types";
import { parseCSV } from "../utils/csvParser";

// Cache for prompts
let cachedPrompts: Prompt[] | null = null;

// Function to load all prompts from CSV
export const getAllPrompts = async (): Promise<Prompt[]> => {
  if (cachedPrompts !== null) {
    return cachedPrompts;
  }

  console.log("Fetching prompts from CSV...");

  // Try multiple paths to find the CSV file
  const possiblePaths = [
    "./prompts.csv", // Relative path
    "/prompts.csv", // Root path
    `${import.meta.env.BASE_URL}prompts.csv`, // Vite base URL
    `${window.location.origin}/prompts.csv`, // Absolute URL
  ];

  let lastError = null;

  // Try each path until one works
  for (const path of possiblePaths) {
    try {
      console.log(`Trying to fetch CSV from path: ${path}`);
      const prompts = await parseCSV(path);

      if (prompts && prompts.length > 0) {
        console.log(
          `Successfully loaded ${prompts.length} prompts from ${path}`
        );
        console.log("First prompt:", prompts[0]);
        cachedPrompts = prompts;
        return prompts;
      } else {
        console.log(`No prompts found at ${path}`);
      }
    } catch (error) {
      console.error(`Error fetching prompts from ${path}:`, error);
      lastError = error;
    }
  }

  console.error("Failed to load prompts from all paths", lastError);
  return [];
};

// Function to search prompts
export const searchPrompts = async (query: string): Promise<Prompt[]> => {
  const prompts = await getAllPrompts();
  const lowerCaseQuery = query.toLowerCase();

  return prompts.filter(
    (prompt) =>
      prompt.title.toLowerCase().includes(lowerCaseQuery) ||
      prompt.content.toLowerCase().includes(lowerCaseQuery) ||
      prompt.tags?.some((tag) => tag.toLowerCase().includes(lowerCaseQuery))
  );
};

// Function to filter prompts by platform
export const filterPromptsByPlatform = async (
  platform: AIPlatform | "all"
): Promise<Prompt[]> => {
  if (platform === "all") return getAllPrompts();

  const prompts = await getAllPrompts();
  return prompts.filter((prompt) => prompt.platform === platform);
};

// Function to filter prompts by category
export const filterPromptsByCategory = async (
  category: PromptCategory | "all"
): Promise<Prompt[]> => {
  if (category === "all") return getAllPrompts();

  const prompts = await getAllPrompts();
  return prompts.filter((prompt) => prompt.category === category);
};

// Sample data
export const SAMPLE_PROMPTS: Prompt[] = [
  {
    id: "1",
    title: "Act as a code reviewer",
    content:
      "I want you to act as a code reviewer for a software development team. Review the code I provide and look for bugs, performance issues, security vulnerabilities, and suggest improvements. Focus on readability, maintainability, and best practices.",
    platform: "chatgpt",
    category: "coding",
    tags: ["code", "review", "software"],
  },
  {
    id: "2",
    title: "Travel itinerary planner",
    content:
      "I want you to act as a travel planner. I will tell you about my destination and preferences, and you will suggest a complete itinerary for my trip with detailed daily activities, recommended accommodations, transportation options, and estimated costs.",
    platform: "claude",
    category: "productivity",
    tags: ["travel", "planning", "itinerary"],
  },
  {
    id: "3",
    title: "Creative story writer",
    content:
      "I want you to act as a creative writer. I will provide you with a theme or setting, and you will craft an engaging short story with vivid descriptions, compelling characters, and an interesting plot. Make it approximately 500 words.",
    platform: "gemini",
    category: "creative",
    tags: ["writing", "story", "creative"],
  },
  {
    id: "4",
    title: "Nutrition meal planner",
    content:
      "I want you to act as a nutritionist. I will tell you my dietary preferences, restrictions, and health goals. Create a 7-day meal plan with breakfast, lunch, dinner, and snacks that helps me achieve my goals while accommodating my preferences.",
    platform: "grok",
    category: "personal",
    tags: ["health", "nutrition", "meal plan"],
  },
  {
    id: "5",
    title: "Business idea validator",
    content:
      "I want you to act as a business consultant. I will describe a business idea, and you will analyze its strengths, weaknesses, opportunities, and threats. Provide feedback on market potential, competition, and improvements I should consider.",
    platform: "llama",
    category: "business",
    tags: ["business", "strategy", "analysis"],
  },
  {
    id: "6",
    title: "Research paper assistant",
    content:
      "I want you to act as a research assistant. I will provide a topic, and you will help me structure a research paper by suggesting an outline with key sections, potential sources to reference, and methodologies appropriate for the topic.",
    platform: "other",
    category: "academic",
    tags: ["research", "academic", "paper"],
  },
  {
    id: "7",
    title: "Language teacher",
    content:
      "I want you to act as a language teacher. I am trying to learn [language] and would like you to help me practice. Start by introducing common phrases, their pronunciation, and their meanings. Then, engage me in a simple conversation using these phrases, correcting my mistakes and providing feedback.",
    platform: "chatgpt",
    category: "academic",
    tags: ["language", "learning", "teaching"],
  },
  {
    id: "8",
    title: "Website UX reviewer",
    content:
      "I want you to act as a UX/UI expert. I will provide you with details about my website or app, and I would like you to review the user experience. Analyze navigation flow, visual hierarchy, accessibility, and overall usability. Provide specific suggestions for improvements.",
    platform: "claude",
    category: "coding",
    tags: ["ux", "ui", "design", "web"],
  },
  {
    id: "9",
    title: "Interview coach",
    content:
      "I want you to act as an interview coach. I have an upcoming job interview for [position] at [company]. Help me prepare by suggesting common interview questions for this role, providing strategies for answering difficult questions, and giving tips for making a good impression.",
    platform: "gemini",
    category: "productivity",
    tags: ["interview", "career", "job"],
  },
];

// Function to get platform color classes
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

// Function to get category color classes
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
