
export type AIPlatform = "chatgpt" | "grok" | "claude" | "llama" | "gemini" | "other";

export type PromptCategory = 
  | "creative" 
  | "productivity" 
  | "coding" 
  | "business" 
  | "academic" 
  | "fun" 
  | "personal" 
  | "other";

export interface Prompt {
  id: string;
  title: string;
  content: string;
  platform: AIPlatform;
  category: PromptCategory;
  tags?: string[];
}
