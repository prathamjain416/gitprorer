
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { GithubProfile, GithubRepository } from '../types/github';
import { toast } from 'sonner';

interface BookmarkContextType {
  bookmarks: GithubProfile[];
  bookmarkedRepos: GithubRepository[];
  isBookmarked: (id: number) => boolean;
  isRepoBookmarked: (id: number) => boolean;
  toggleBookmark: (profile: GithubProfile) => void;
  toggleRepoBookmark: (repo: GithubRepository) => void;
  removeBookmark: (id: number) => void;
  removeRepoBookmark: (id: number) => void;
  handleSearch: (username: string) => void;
}

export const BookmarkContext = createContext<BookmarkContextType>({
  bookmarks: [],
  bookmarkedRepos: [],
  isBookmarked: () => false,
  isRepoBookmarked: () => false,
  toggleBookmark: () => {},
  toggleRepoBookmark: () => {},
  removeBookmark: () => {},
  removeRepoBookmark: () => {},
  handleSearch: () => {},
});

interface BookmarkProviderProps {
  children: ReactNode;
  onSearch: (username: string) => void;
}

export const BookmarkProvider: React.FC<BookmarkProviderProps> = ({ children, onSearch }) => {
  const [bookmarks, setBookmarks] = useState<GithubProfile[]>([]);
  const [bookmarkedRepos, setBookmarkedRepos] = useState<GithubRepository[]>([]);

  // Load bookmarks from localStorage on initial render
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('github-bookmarks');
    if (savedBookmarks) {
      try {
        setBookmarks(JSON.parse(savedBookmarks));
      } catch (error) {
        console.error('Failed to parse bookmarks from localStorage', error);
      }
    }
    
    const savedRepoBookmarks = localStorage.getItem('github-repo-bookmarks');
    if (savedRepoBookmarks) {
      try {
        setBookmarkedRepos(JSON.parse(savedRepoBookmarks));
      } catch (error) {
        console.error('Failed to parse repo bookmarks from localStorage', error);
      }
    }
  }, []);

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('github-bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);
  
  // Save repo bookmarks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('github-repo-bookmarks', JSON.stringify(bookmarkedRepos));
  }, [bookmarkedRepos]);

  const isBookmarked = (id: number) => {
    return bookmarks.some((bookmark) => bookmark.id === id);
  };
  
  const isRepoBookmarked = (id: number) => {
    return bookmarkedRepos.some((repo) => repo.id === id);
  };

  const toggleBookmark = (profile: GithubProfile) => {
    if (isBookmarked(profile.id)) {
      removeBookmark(profile.id);
    } else {
      addBookmark(profile);
    }
  };
  
  const toggleRepoBookmark = (repo: GithubRepository) => {
    if (isRepoBookmarked(repo.id)) {
      removeRepoBookmark(repo.id);
    } else {
      addRepoBookmark(repo);
    }
  };

  const addBookmark = (profile: GithubProfile) => {
    setBookmarks((prev) => [...prev, profile]);
    toast.success(`Added ${profile.name || profile.login} to bookmarks`);
  };
  
  const addRepoBookmark = (repo: GithubRepository) => {
    setBookmarkedRepos((prev) => [...prev, repo]);
    toast.success(`Added ${repo.name} to repository bookmarks`);
  };

  const removeBookmark = (id: number) => {
    const profileToRemove = bookmarks.find((bookmark) => bookmark.id === id);
    setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== id));
    
    if (profileToRemove) {
      toast.info(`Removed ${profileToRemove.name || profileToRemove.login} from bookmarks`);
    }
  };
  
  const removeRepoBookmark = (id: number) => {
    const repoToRemove = bookmarkedRepos.find((repo) => repo.id === id);
    setBookmarkedRepos((prev) => prev.filter((repo) => repo.id !== id));
    
    if (repoToRemove) {
      toast.info(`Removed ${repoToRemove.name} from repository bookmarks`);
    }
  };

  const handleSearch = (username: string) => {
    onSearch(username);
  };

  return (
    <BookmarkContext.Provider 
      value={{ 
        bookmarks, 
        bookmarkedRepos,
        isBookmarked, 
        isRepoBookmarked,
        toggleBookmark,
        toggleRepoBookmark, 
        removeBookmark,
        removeRepoBookmark,
        handleSearch
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};
