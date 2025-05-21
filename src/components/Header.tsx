
import { Github } from "lucide-react";
import BookmarksDrawer from "./BookmarksDrawer";
import { useContext } from "react";
import { BookmarkContext } from "../contexts/BookmarkContext";

const Header = () => {
  const { bookmarks, bookmarkedRepos, removeBookmark, removeRepoBookmark, handleSearch } = useContext(BookmarkContext);
  
  return (
    <div className="border-b">
      <div className="container py-4 px-4 md:px-6 flex items-center justify-between max-w-5xl">
        <div className="flex items-center gap-2">
          <Github className="h-6 w-6" />
          <h1 className="text-lg font-semibold">GitHub Profile Explorer</h1>
        </div>
        <div className="flex items-center gap-4">
          <BookmarksDrawer 
            bookmarks={bookmarks}
            repositories={bookmarkedRepos}
            onSelectProfile={handleSearch}
            onRemoveProfile={removeBookmark}
            onRemoveRepo={removeRepoBookmark}
          />
          <a 
            href="https://github.com" 
            target="_blank"
            rel="noopener noreferrer" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Visit GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
