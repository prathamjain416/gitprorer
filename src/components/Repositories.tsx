
import React, { useState, useContext } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { GithubRepository } from "../types/github";
import { languageColors } from "../types/github";
import { formatDate } from "../utils/dateFormatter";
import { Star, GitFork, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Skeleton } from "../components/ui/skeleton";
import RepositoryInsights from "./RepositoryInsights";
import BookmarkButton from "./BookmarkButton";
import { BookmarkContext } from "../contexts/BookmarkContext";

interface RepositoriesProps {
  repos: GithubRepository[];
  isLoading: boolean;
  username: string;
}

const RepositoryCard: React.FC<{ repo: GithubRepository }> = ({ repo }) => {
  const [expanded, setExpanded] = useState(false);
  const { isRepoBookmarked, toggleRepoBookmark } = useContext(BookmarkContext);
  const languageColor = repo.language && languageColors[repo.language] ? 
    languageColors[repo.language] : "#8b949e";

  return (
    <Card className="hover:border-primary/20 transition-colors">
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-2">
          <a 
            href={repo.html_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-lg font-medium text-primary hover:underline"
          >
            {repo.name}
          </a>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {repo.stargazers_count}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <GitFork className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {repo.forks_count}
                </span>
              </div>
            </div>
            
            <BookmarkButton 
              isBookmarked={isRepoBookmarked(repo.id)}
              onClick={() => toggleRepoBookmark(repo)}
              tooltipText={isRepoBookmarked(repo.id) ? "Remove from bookmarks" : "Save repository"}
              size="sm"
              className="mr-[-8px]"
            />
          </div>
        </div>

        {repo.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {repo.description}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-between gap-y-2 mt-auto text-xs">
          <div className="flex items-center gap-x-6">
            {repo.language && (
              <div className="flex items-center">
                <span 
                  className="repo-language-color" 
                  style={{ 
                    backgroundColor: languageColor,
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    display: 'inline-block',
                    marginRight: '4px' 
                  }}
                />
                <span>{repo.language}</span>
              </div>
            )}
            
            <div className="text-muted-foreground">
              Updated {formatDate(repo.updated_at, true)}
            </div>
          </div>
          
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-primary text-xs hover:underline"
          >
            {expanded ? (
              <>
                <ChevronUp className="h-3 w-3" />
                Hide details
              </>
            ) : (
              <>
                <ChevronDown className="h-3 w-3" />
                View insights
              </>
            )}
          </button>
        </div>
        
        {expanded && <RepositoryInsights repo={repo} />}
      </CardContent>
    </Card>
  );
};

const RepositorySkeleton = () => {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-3">
          <Skeleton className="h-5 w-40" />
          <div className="flex items-center gap-3">
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-8" />
          </div>
        </div>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-3" />
        <div className="flex items-center gap-4">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-28" />
        </div>
      </CardContent>
    </Card>
  );
};

const Repositories: React.FC<RepositoriesProps> = ({ repos, isLoading, username }) => {
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <CardTitle>Repositories</CardTitle>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {Array(3).fill(0).map((_, i) => (
            <RepositorySkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (!repos.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Repositories</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8 text-center">
          <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No repositories found</h3>
          <p className="text-muted-foreground mt-2">
            This user doesn't have any public repositories yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <CardTitle>Repositories</CardTitle>
        <a
          href={`https://github.com/${username}?tab=repositories`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-primary hover:underline"
        >
          View all
        </a>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {repos.map((repo) => (
          <RepositoryCard key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
};

export default Repositories;
