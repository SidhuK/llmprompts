
import { Prompt, AIPlatform, PromptCategory } from '../types';

export const parseCSV = async (url: string): Promise<Prompt[]> => {
  try {
    const response = await fetch(url);
    const csvText = await response.text();
    
    // Split by rows and get headers
    const rows = csvText.split('\n');
    const headers = rows[0].split(',');
    
    // Process data rows
    return rows.slice(1)
      .filter(row => row.trim() !== '') // Skip empty rows
      .map(row => {
        // This parsing handles quoted fields with commas inside
        const values: string[] = [];
        let currentValue = '';
        let insideQuotes = false;
        
        for (let i = 0; i < row.length; i++) {
          const char = row[i];
          
          if (char === '"') {
            insideQuotes = !insideQuotes;
          } else if (char === ',' && !insideQuotes) {
            values.push(currentValue);
            currentValue = '';
          } else {
            currentValue += char;
          }
        }
        
        // Add the last value
        values.push(currentValue);
        
        // Create object from headers and values
        const prompt: Partial<Prompt> = {};
        headers.forEach((header, index) => {
          const value = values[index]?.replace(/^"|"$/g, '') || ''; // Remove quotes if present
          
          if (header === 'id') {
            prompt.id = value;
          } else if (header === 'title') {
            prompt.title = value;
          } else if (header === 'content') {
            prompt.content = value;
          } else if (header === 'platform') {
            prompt.platform = value as AIPlatform;
          } else if (header === 'category') {
            prompt.category = value as PromptCategory;
          } else if (header === 'tags') {
            prompt.tags = value ? value.split(',').map(tag => tag.trim()) : undefined;
          }
        });
        
        return prompt as Prompt;
      });
  } catch (error) {
    console.error('Error parsing CSV file:', error);
    return [];
  }
};
