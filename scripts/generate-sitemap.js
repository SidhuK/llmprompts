import fs from "fs";
import path from "path";

// Define your base URL
const BASE_URL = "https://llmprompts.xyz";

// Define the AI platforms and categories you support
const platforms = [
  "chatgpt",
  "claude",
  "gemini",
  "perplexity",
  "grok",
  "llama",
  "mistral",
];

const categories = [
  "coding",
  "writing",
  "data-analysis",
  "creative",
  "business",
  "academic",
  "personal",
];

// Create a list of URLs
const urls = [
  // Main pages
  { url: "/", changefreq: "daily", priority: "1.0" },
  { url: "/about", changefreq: "monthly", priority: "0.7" },
  { url: "/contribute", changefreq: "monthly", priority: "0.7" },

  // Dynamic platform pages
  ...platforms.map((platform) => ({
    url: `/platforms/${platform}`,
    changefreq: "weekly",
    priority: "0.8",
  })),

  // Dynamic category pages
  ...categories.map((category) => ({
    url: `/categories/${category}`,
    changefreq: "weekly",
    priority: "0.8",
  })),
];

// Generate the XML content
const generateSitemap = () => {
  const currentDate = new Date().toISOString();

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  urls.forEach((page) => {
    xml += "  <url>\n";
    xml += `    <loc>${BASE_URL}${page.url}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += "  </url>\n";
  });

  xml += "</urlset>";

  return xml;
};

// Write the sitemap to the public directory
const writeSitemap = () => {
  const sitemap = generateSitemap();
  const publicDir = path.resolve("public");

  // Create public directory if it doesn't exist
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Write the sitemap file
  fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemap);
  console.log("✅ Sitemap generated successfully!");
};

// Generate robots.txt
const generateRobotsTxt = () => {
  const robotsTxt = `# robots.txt for llmprompts.xyz
User-agent: *
Allow: /

# Sitemaps
Sitemap: ${BASE_URL}/sitemap.xml
`;

  const publicDir = path.resolve("public");
  fs.writeFileSync(path.join(publicDir, "robots.txt"), robotsTxt);
  console.log("✅ robots.txt generated successfully!");
};

// Execute the functions
writeSitemap();
generateRobotsTxt();
