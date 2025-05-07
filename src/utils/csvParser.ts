import { Prompt, AIPlatform, PromptCategory } from "../types";

export const parseCSV = async (url: string): Promise<Prompt[]> => {
  try {
    console.log("Attempting to fetch CSV from URL:", url);
    const response = await fetch(url);

    if (!response.ok) {
      console.error(
        "CSV fetch failed with status:",
        response.status,
        response.statusText
      );
      throw new Error(
        `Failed to fetch CSV: ${response.status} ${response.statusText}`
      );
    }

    console.log("CSV fetch successful, parsing content...");
    const csvText = await response.text();

    if (!csvText || csvText.trim() === "") {
      console.error("CSV file is empty");
      return [];
    }

    console.log(
      "CSV content length:",
      csvText.length,
      "First 100 chars:",
      csvText.substring(0, 100)
    );

    // Split by rows
    const rows = csvText
      .split("\n")
      .map((row) => row.trim())
      .filter((row) => row !== "");

    if (rows.length === 0) {
      console.error("No rows found in CSV");
      return [];
    }

    // Extract headers from first row
    const headers = parseCSVRow(rows[0]);
    console.log("CSV headers:", headers);
    console.log("Total CSV rows:", rows.length);

    if (rows.length > 1) {
      console.log("CSV first data row:", rows[1]);
    }

    // Process data rows
    return rows
      .slice(1)
      .map((row, index) => {
        // Skip empty rows
        if (!row.trim()) return null;

        const values = parseCSVRow(row);
        console.log(`Row ${index + 1} parsed values:`, values);

        // Create object from headers and values
        const prompt: Partial<Prompt> = {};

        headers.forEach((header, i) => {
          const value = values[i] || "";

          if (header === "id") {
            prompt.id = value || `prompt-${index}`;
          } else if (header === "title") {
            prompt.title = value || "Untitled Prompt";
          } else if (header === "content") {
            prompt.content = value || "No content available";
          } else if (header === "platform") {
            prompt.platform = (value.toLowerCase() || "other") as AIPlatform;
          } else if (header === "category") {
            prompt.category = (value.toLowerCase() ||
              "other") as PromptCategory;
          } else if (header === "tags") {
            prompt.tags = value
              ? value.split(",").map((tag) => tag.trim())
              : [];
          }
        });

        return {
          id: prompt.id || `prompt-${index}`,
          title: prompt.title || "Untitled Prompt",
          content: prompt.content || "No content available",
          platform: prompt.platform || "other",
          category: prompt.category || "other",
          tags: prompt.tags || [],
        } as Prompt;
      })
      .filter((prompt): prompt is Prompt => prompt !== null);
  } catch (error) {
    console.error("Error parsing CSV file:", error);
    return [];
  }
};

// Helper function to properly parse CSV row with quoted fields
function parseCSVRow(row: string): string[] {
  const values: string[] = [];
  let currentValue = "";
  let insideQuotes = false;

  for (let i = 0; i < row.length; i++) {
    const char = row[i];
    const nextChar = row[i + 1];

    if (char === '"' && !insideQuotes && currentValue === "") {
      // Start of quoted field
      insideQuotes = true;
    } else if (
      char === '"' &&
      insideQuotes &&
      (nextChar === "," || nextChar === undefined)
    ) {
      // End of quoted field
      insideQuotes = false;
    } else if (char === '"' && insideQuotes && nextChar === '"') {
      // Escaped quote inside quoted field
      currentValue += '"';
      i++; // Skip the next quote
    } else if (char === "," && !insideQuotes) {
      // End of field
      values.push(currentValue);
      currentValue = "";
    } else {
      // Regular character
      currentValue += char;
    }
  }

  // Add the last value
  values.push(currentValue);

  return values;
}
