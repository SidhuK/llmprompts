
import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative animate-fade-in" style={{ animationDelay: '0.1s' }}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-muted-foreground" />
      </div>
      <input
        type="text"
        className="w-full pl-10 py-2 pr-4 rounded-md border focus:outline-none focus:ring-2 focus:ring-prompt-purple/30 focus:border-prompt-purple transition-all"
        placeholder="Search prompts..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
