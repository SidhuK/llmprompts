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
    <motion.div
      className="relative w-full"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div
        className={`
        relative rounded-lg shadow-subtle backdrop-blur-sm border
        ${
          isFocused
            ? "border-accent/30 shadow-[0_0_0_1px_rgba(20,184,177,0.2)] bg-white/95"
            : "border-border bg-white/90"
        }
        transition-shadow transition-colors duration-200 ease-out
      `}
      >
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search
            className={`h-5 w-5 ${
              isFocused ? "text-accent" : "text-muted-foreground"
            } transition-colors duration-200`}
          />
        </div>

        <input
          type="text"
          className="w-full pl-12 py-3.5 pr-4 rounded-lg border-0 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-base"
          placeholder="Search for prompts by keyword, category or platform..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-label="Search prompts"
        />

        {searchQuery && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted-foreground hover:text-foreground transition-colors duration-200"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Accent color highlight effect */}
      <div className="absolute -z-10 inset-0 bg-accent/5 blur-xl rounded-full"></div>
    </motion.div>
  );
};

export default SearchBar;
