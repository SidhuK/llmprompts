
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import PromptCard from '../components/PromptCard';
import { getAllPrompts, searchPrompts, filterPromptsByPlatform, filterPromptsByCategory } from '../data/prompts';
import { AIPlatform, PromptCategory, Prompt } from '../types';
import { Loader2 } from 'lucide-react';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<AIPlatform | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<PromptCategory | 'all'>('all');
  const [filteredPrompts, setFilteredPrompts] = useState<Prompt[]>([]);
  
  // Get all prompts
  const { data: allPrompts = [], isLoading: isLoadingPrompts } = useQuery({
    queryKey: ['prompts'],
    queryFn: getAllPrompts
  });
  
  // Apply filters whenever search or filters change
  useEffect(() => {
    const applyFilters = async () => {
      let result = [...allPrompts];
      
      // Apply search filter
      if (searchQuery.trim()) {
        result = await searchPrompts(searchQuery);
      }
      
      // Apply platform filter
      if (selectedPlatform !== 'all') {
        result = result.filter(p => p.platform === selectedPlatform);
      }
      
      // Apply category filter
      if (selectedCategory !== 'all') {
        result = result.filter(p => p.category === selectedCategory);
      }
      
      setFilteredPrompts(result);
    };
    
    applyFilters();
  }, [searchQuery, selectedPlatform, selectedCategory, allPrompts]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="mb-8 space-y-4">
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <FilterBar 
              selectedPlatform={selectedPlatform}
              setSelectedPlatform={setSelectedPlatform}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
          
          {isLoadingPrompts ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 text-prompt-purple animate-spin" />
              <span className="ml-2 text-prompt-purple">Loading prompts...</span>
            </div>
          ) : filteredPrompts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No prompts found. Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPrompts.map((prompt, index) => (
                <PromptCard key={prompt.id} prompt={prompt} index={index} />
              ))}
            </div>
          )}
        </div>
      </main>
      
      <footer className="py-6 border-t">
        <div className="container max-w-6xl mx-auto px-4">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Prompt Stash. All prompts are for personal use.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
