
import React, { useState, useEffect, KeyboardEvent } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Search as SearchIcon, Loader2, X } from "lucide-react";
import { toast } from "sonner";

interface SearchProps {
  onSearch: (username: string, repoName?: string) => void;
  isLoading: boolean;
}

const Search: React.FC<SearchProps> = ({ onSearch, isLoading }) => {
  const [inputValue, setInputValue] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    validateInput(inputValue);
  }, [inputValue]);

  const validateInput = (value: string) => {
    // Reset validation state
    setIsValid(true);
    setErrorMessage("");

    if (!value.trim()) return;

    // GitHub username validation (alphanumeric with hyphens)
    const usernameRegex = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
    
    if (value.includes("/")) {
      // If searching for a repository
      const [username, repoName] = value.split("/", 2);
      
      if (!usernameRegex.test(username.trim())) {
        setIsValid(false);
        setErrorMessage("Invalid GitHub username format");
        return;
      }
      
      if (!repoName.trim()) {
        setIsValid(false);
        setErrorMessage("Repository name cannot be empty");
        return;
      }
    } else {
      // Just username validation
      if (!usernameRegex.test(value.trim())) {
        setIsValid(false);
        setErrorMessage("Invalid GitHub username format");
        return;
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) {
      toast.error("Please enter a search term");
      return;
    }

    if (!isValid) {
      toast.error(errorMessage);
      return;
    }
    
    // Check if input contains a slash to separate username and repo
    if (inputValue.includes("/")) {
      const [username, repoName] = inputValue.split("/", 2);
      onSearch(username.trim(), repoName.trim());
    } else {
      onSearch(inputValue.trim());
    }
  };

  const handleClear = () => {
    setInputValue("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Submit on Enter
    if (e.key === 'Enter' && inputValue.trim() && isValid) {
      handleSubmit(e as any);
    }
    
    // Clear on Escape
    if (e.key === 'Escape') {
      handleClear();
    }
  };

  return (
    <div className="w-full space-y-2">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search: username or username/repository"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className={`pl-10 pr-10 ${!isValid ? 'border-destructive' : ''}`}
              disabled={isLoading}
              aria-invalid={!isValid}
            />
            {inputValue && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                onClick={handleClear}
                disabled={isLoading}
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <Button type="submit" disabled={isLoading || !inputValue.trim() || !isValid}>
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Searching...
              </>
            ) : (
              "Search"
            )}
          </Button>
        </div>
      </form>
      {!isValid && inputValue && (
        <p className="text-destructive text-sm">{errorMessage}</p>
      )}
      <div className="text-sm text-muted-foreground">
        <span className="font-medium">Examples:</span> octocat, facebook/react
      </div>
    </div>
  );
};

export default Search;
