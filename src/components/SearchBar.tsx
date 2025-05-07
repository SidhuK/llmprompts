import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { motion } from "framer-motion";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    setSearchQuery("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search
            className={`h-4 w-4 ${
              isFocused ? "text-accent" : "text-muted-foreground"
            } transition-colors duration-200`}
          />
        </div>

        <input
          type="text"
          className="search-input pl-10"
          placeholder="Search prompts by keyword, category or platform..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-label="Search prompts"
        />

        {searchQuery && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors duration-200"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Count of results */}
      <div className="text-xs text-muted-foreground mt-2 text-center">
        {searchQuery ? (
          <span>Showing results for "{searchQuery}"</span>
        ) : (
          <span>Search for prompts using keywords</span>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
