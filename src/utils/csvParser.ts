
import { Prompt, AIPlatform, PromptCategory } from '../types';

export const parseCSV = async (url: string): Promise<Prompt[]> => {
  try {
    const response = await fetch(url);
    const csvText = await response.text();
    
    // Split by rows and get headers
    const rows = csvText.split('\n');
    const headers = rows[0].split(',').map(header => header.trim());
    
    console.log('CSV headers:', headers);
    console.log('CSV first row:', rows[1]);
    
    // Process data rows
    return rows.slice(1)
      .filter(row => row.trim() !== '') // Skip empty rows
      .map((row, index) => {
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
        
        console.log(`Row ${index + 1} parsed values:`, values);
        
        // Create object from headers and values
        const prompt: Partial<Prompt> = {};
        
        headers.forEach((header, index) => {
          const value = values[index]?.replace(/^"|"$/g, '') || ''; // Remove quotes if present
          
          if (header === 'id') {
            prompt.id = value || `prompt-${index}`;
          } else if (header === 'title') {
            prompt.title = value || 'Untitled Prompt';
          } else if (header === 'content') {
            prompt.content = value || 'No content available';
          } else if (header === 'platform') {
            prompt.platform = (value.toLowerCase() || 'other') as AIPlatform;
          } else if (header === 'category') {
            prompt.category = (value.toLowerCase() || 'other') as PromptCategory;
          } else if (header === 'tags') {
            prompt.tags = value ? value.split(',').map(tag => tag.trim()) : [];
          }
        });
        
        // Ensure we have valid values for all required fields
        return {
          id: prompt.id || `prompt-${index}`,
          title: prompt.title || 'Untitled Prompt',
          content: prompt.content || 'No content available',
          platform: prompt.platform || 'other',
          category: prompt.category || 'other',
          tags: prompt.tags || []
        } as Prompt;
      });
  } catch (error) {
    console.error('Error parsing CSV file:', error);
    return [];
  }
};
