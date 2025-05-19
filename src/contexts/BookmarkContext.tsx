
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { GithubProfile } from '../types/github';
import { toast } from 'sonner';

interface BookmarkContextType {
  bookmarks: GithubProfile[];
  isBookmarked: (id: number) => boolean;
  toggleBookmark: (profile: GithubProfile) => void;
  removeBookmark: (id: number) => void;
  handleSearch: (username: string) => void;
}

export const BookmarkContext = createContext<BookmarkContextType>({
  bookmarks: [],
  isBookmarked: () => false,
  toggleBookmark: () => {},
  removeBookmark: () => {},
  handleSearch: () => {},
});

interface BookmarkProviderProps {
  children: ReactNode;
  onSearch: (username: string) => void;
}

export const BookmarkProvider: React.FC<BookmarkProviderProps> = ({ children, onSearch }) => {
  const [bookmarks, setBookmarks] = useState<GithubProfile[]>([]);

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
  }, []);

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('github-bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const isBookmarked = (id: number) => {
    return bookmarks.some((bookmark) => bookmark.id === id);
  };

  const toggleBookmark = (profile: GithubProfile) => {
    if (isBookmarked(profile.id)) {
      removeBookmark(profile.id);
    } else {
      addBookmark(profile);
    }
  };

  const addBookmark = (profile: GithubProfile) => {
    setBookmarks((prev) => [...prev, profile]);
    toast.success(`Added ${profile.name || profile.login} to bookmarks`);
  };

  const removeBookmark = (id: number) => {
    const profileToRemove = bookmarks.find((bookmark) => bookmark.id === id);
    setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== id));
    
    if (profileToRemove) {
      toast.info(`Removed ${profileToRemove.name || profileToRemove.login} from bookmarks`);
    }
  };

  const handleSearch = (username: string) => {
    onSearch(username);
  };

  return (
    <BookmarkContext.Provider 
      value={{ 
        bookmarks, 
        isBookmarked, 
        toggleBookmark, 
        removeBookmark,
        handleSearch
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};
