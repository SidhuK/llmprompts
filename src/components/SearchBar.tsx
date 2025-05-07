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
      className="relative animate-slide-up"
      style={{ animationDelay: "0.1s" }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div
        className={`
        relative rounded-xl shadow-subtle backdrop-blur-sm 
        ${isFocused ? "ring-2 ring-prompt-purple/30 shadow-glow" : ""}
        transition-all duration-300 ease-in-out glass-effect
      `}
      >
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search
            className={`h-5 w-5 ${
              isFocused ? "text-prompt-purple" : "text-muted-foreground"
            } transition-colors duration-200`}
          />
        </div>

        <input
          type="text"
          className="w-full pl-12 py-3.5 pr-4 rounded-xl border-0 bg-transparent text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
          placeholder="Search for prompts by keyword, category or platform..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
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

      {/* Decorative elements */}
      <div className="absolute -z-10 inset-0 bg-gradient-radial from-prompt-purple/5 to-transparent blur-xl rounded-full"></div>
    </motion.div>
  );
};

export default SearchBar;
