
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { GithubRepository } from "../types/github";
import { languageColors } from "../types/github";
import { formatDate } from "../utils/dateFormatter";
import { Star, GitFork, ArrowLeft } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import RepositoryInsights from "./RepositoryInsights";
import BookmarkButton from "./BookmarkButton";
import { useContext } from "react";
import { BookmarkContext } from "../contexts/BookmarkContext";
import { Button } from "./ui/button";

interface SingleRepositoryProps {
  repo: GithubRepository;
  isLoading: boolean;
  onBackToProfile: () => void;
  username: string;
}

const SingleRepository: React.FC<SingleRepositoryProps> = ({ 
  repo, 
  isLoading, 
  onBackToProfile,
  username 
}) => {
  const { isRepoBookmarked, toggleRepoBookmark } = useContext(BookmarkContext);
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-8 w-3/4" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  const languageColor = repo.language && languageColors[repo.language] ? 
    languageColors[repo.language] : "#8b949e";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button 
          variant="outline" 
          onClick={onBackToProfile} 
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to {username}'s profile
        </Button>
        <BookmarkButton 
          isBookmarked={isRepoBookmarked(repo.id)} 
          onClick={() => toggleRepoBookmark(repo)}
          tooltipText={isRepoBookmarked(repo.id) ? "Remove from bookmarks" : "Save repository"}
        />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <a 
              href={repo.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xl hover:underline text-primary"
            >
              {repo.name}
            </a>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 text-yellow-500" />
                <span className="font-medium">{repo.stargazers_count}</span>
              </div>
              <div className="flex items-center gap-1">
                <GitFork className="h-5 w-5 text-blue-500" />
                <span className="font-medium">{repo.forks_count}</span>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {repo.description && (
            <p className="text-muted-foreground">{repo.description}</p>
          )}
          
          <div className="flex flex-wrap gap-4">
            {repo.language && (
              <div className="flex items-center">
                <span 
                  className="repo-language-color" 
                  style={{ 
                    backgroundColor: languageColor,
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    display: 'inline-block',
                    marginRight: '6px' 
                  }}
                />
                <span>{repo.language}</span>
              </div>
            )}
            
            <div className="text-muted-foreground">
              Updated {formatDate(repo.updated_at)}
            </div>
            
            <div className="text-muted-foreground">
              Created {formatDate(repo.created_at)}
            </div>
          </div>
          
          <RepositoryInsights repo={repo} />
        </CardContent>
      </Card>
    </div>
  );
};

export default SingleRepository;
