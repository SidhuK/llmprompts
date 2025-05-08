import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import PromptCard from "./components/PromptCard";
import { AIPlatform, PromptCategory, Prompt } from "./types";
import {
  getAllPrompts,
  searchPrompts,
  filterPromptsByPlatform,
  filterPromptsByCategory,
} from "./data/prompts";
import { Helmet } from "react-helmet-async";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState<AIPlatform | "all">(
    "all"
  );
  const [selectedCategory, setSelectedCategory] = useState<
    PromptCategory | "all"
  >("all");
  const [filteredPrompts, setFilteredPrompts] = useState<Prompt[]>([]);
  const [allPrompts, setAllPrompts] = useState<Prompt[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Load prompts from CSV
  useEffect(() => {
    const loadPrompts = async () => {
      try {
        setIsLoading(true);
        const prompts = await getAllPrompts();
        setAllPrompts(prompts);
        setFilteredPrompts(prompts);
        console.log(`Loaded ${prompts.length} prompts from CSV`);
      } catch (err) {
        console.error("Failed to load prompts:", err);
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    loadPrompts();
  }, []);

  // Filter prompts based on search query and selections
  useEffect(() => {
    if (allPrompts.length === 0) return;

    const applyFilters = async () => {
      let result = [...allPrompts];

      // Apply search filter
      if (searchQuery.trim()) {
        result = await searchPrompts(searchQuery);
      }

      // Apply platform filter
      if (selectedPlatform !== "all") {
        result = result.filter(
          (prompt) => prompt.platform === selectedPlatform
        );
      }

      // Apply category filter
      if (selectedCategory !== "all") {
        result = result.filter(
          (prompt) => prompt.category === selectedCategory
        );
      }

      setFilteredPrompts(result);
    };

    applyFilters();
  }, [searchQuery, selectedPlatform, selectedCategory, allPrompts]);

  // Generate dynamic title for SEO
  const getPageTitle = () => {
    let title = "LLMPrompts.xyz - Best AI Prompts";

    if (selectedPlatform !== "all") {
      title += ` for ${selectedPlatform}`;
    }

    if (selectedCategory !== "all") {
      title += ` in ${selectedCategory}`;
    }

    if (searchQuery) {
      title += ` | "${searchQuery}"`;
    }

    return title;
  };

  // Generate dynamic description for SEO
  const getPageDescription = () => {
    let desc = "Discover high-quality AI prompts";

    if (selectedPlatform !== "all") {
      desc += ` for ${selectedPlatform}`;
    }

    if (selectedCategory !== "all") {
      desc += ` in the ${selectedCategory} category`;
    }

    if (searchQuery) {
      desc += ` matching "${searchQuery}"`;
    }

    desc +=
      ". Enhance your AI interactions with our curated collection of powerful prompts.";

    return desc;
  };

  // Update document title for SEO
  useEffect(() => {
    document.title = getPageTitle();
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", getPageDescription());
    }
  }, [selectedPlatform, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{getPageTitle()}</title>
        <meta name="description" content={getPageDescription()} />
        <meta name="robots" content="index, follow" />
        {selectedPlatform !== "all" && (
          <link
            rel="canonical"
            href={`https://llmprompts.xyz/platform/${selectedPlatform.toLowerCase()}`}
          />
        )}
        {selectedCategory !== "all" && (
          <link
            rel="canonical"
            href={`https://llmprompts.xyz/category/${selectedCategory.toLowerCase()}`}
          />
        )}
      </Helmet>

      <Header />

      <main className="container px-4 py-4 mx-auto w-full max-w-full pb-16">
        {/* Hero section and filters in two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Left column with title and description */}
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-bold mb-2 text-foreground">
              {selectedPlatform !== "all"
                ? `${selectedPlatform} Prompts`
                : selectedCategory !== "all"
                ? `${selectedCategory} AI Prompts`
                : "Best AI Prompts Collection"}
            </h1>
            <p className="hero-description text-muted-foreground">
              Discover and use powerful prompts for
              {selectedPlatform !== "all"
                ? ` ${selectedPlatform}`
                : " ChatGPT, Claude, Gemini, Grok, and other AI assistants"}
              . Find the perfect prompt to get better results from your AI
              interactions
              {selectedCategory !== "all"
                ? ` for ${selectedCategory.toLowerCase()} tasks`
                : ""}
              .
            </p>
          </div>

          {/* Right column with filters */}
          <div className="filter-bar-container md:mt-0 mt-4">
            <FilterBar
              selectedPlatform={selectedPlatform}
              setSelectedPlatform={setSelectedPlatform}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
        </div>

        {/* Search bar - full width */}
        <div className="mb-6">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>

        {/* Prompt count */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-foreground">
            {selectedPlatform !== "all"
              ? `${selectedPlatform} Prompts`
              : selectedCategory !== "all"
              ? `${selectedCategory} Prompts`
              : "All AI Prompts"}
            <span className="text-muted-foreground ml-2 text-sm">
              {filteredPrompts.length}{" "}
              {filteredPrompts.length === 1 ? "prompt" : "prompts"}
            </span>
          </h2>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="text-center py-12" aria-live="polite" role="status">
            <p className="text-muted-foreground">Loading prompts...</p>
          </div>
        )}

        {/* Error state */}
        {error && !isLoading && (
          <div className="text-center py-12" aria-live="assertive" role="alert">
            <p className="text-red-500">
              Error loading prompts: {error.message}
            </p>
            <button
              className="mt-4 px-4 py-2 bg-accent text-white rounded hover:bg-accent/80"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        )}

        {/* Prompts grid - changed to 4 columns */}
        {!isLoading && !error && filteredPrompts.length > 0 && (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            role="list"
          >
            {filteredPrompts.map((prompt, index) => (
              <PromptCard key={prompt.id} prompt={prompt} index={index} />
            ))}
          </div>
        )}

        {/* No results */}
        {!isLoading && !error && filteredPrompts.length === 0 && (
          <div className="text-center py-12" aria-live="polite">
            <p className="text-muted-foreground">
              No prompts found. Try adjusting your filters.
            </p>
          </div>
        )}
      </main>

      {/* Using the new Footer component */}
      <Footer />
    </div>
  );
}

export default App;
