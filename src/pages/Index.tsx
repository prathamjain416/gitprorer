
import { useState } from "react";
import Search from "../components/Search";
import Profile from "../components/Profile";
import Repositories from "../components/Repositories";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import EmptyState from "../components/EmptyState";
import { GithubProfile, GithubRepository } from "../types/github";
import Header from "../components/Header";
import ProfileStats from "../components/ProfileStats";
import { BookmarkProvider } from "../contexts/BookmarkContext";
import SingleRepository from "../components/SingleRepository";

const Index = () => {
  const [username, setUsername] = useState<string>("");
  const [repoName, setRepoName] = useState<string>("");
  const [searchInitiated, setSearchInitiated] = useState(false);

  const fetchUser = async (username: string): Promise<GithubProfile> => {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      throw new Error("User not found");
    }
    return response.json();
  };

  const fetchRepositories = async (username: string): Promise<GithubRepository[]> => {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`);
    if (!response.ok) {
      throw new Error("Failed to fetch repositories");
    }
    return response.json();
  };

  const fetchSingleRepository = async (username: string, repoName: string): Promise<GithubRepository> => {
    const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    if (!response.ok) {
      throw new Error("Repository not found");
    }
    return response.json();
  };

  const {
    data: userData,
    isLoading: isUserLoading,
    error: userError,
  } = useQuery({
    queryKey: ["user", username],
    queryFn: () => fetchUser(username),
    enabled: !!username && searchInitiated && !repoName,
    retry: false,
  });

  const {
    data: reposData,
    isLoading: isReposLoading,
    error: reposError,
  } = useQuery({
    queryKey: ["repos", username],
    queryFn: () => fetchRepositories(username),
    enabled: !!userData && !repoName,
    retry: false,
  });

  const {
    data: singleRepoData,
    isLoading: isSingleRepoLoading,
    error: singleRepoError,
  } = useQuery({
    queryKey: ["repo", username, repoName],
    queryFn: () => fetchSingleRepository(username, repoName),
    enabled: !!username && !!repoName && searchInitiated,
    retry: false,
  });

  const handleSearch = (searchUsername: string, searchRepoName?: string) => {
    if (!searchUsername.trim()) {
      toast.error("Please enter a GitHub username");
      return;
    }

    setUsername(searchUsername);
    setRepoName(searchRepoName || "");
    setSearchInitiated(true);
  };

  const handleBackToProfile = () => {
    setRepoName("");
  };

  const isLoading = isUserLoading || isReposLoading || isSingleRepoLoading;
  const hasError = userError || reposError || singleRepoError;

  if (hasError && searchInitiated) {
    const errorMessage = singleRepoError 
      ? "Repository not found" 
      : (userError ? "User not found" : "Failed to fetch repositories");
    toast.error(errorMessage);
  }

  return (
    <BookmarkProvider onSearch={handleSearch}>
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-6 px-4 md:px-6 space-y-8 max-w-5xl">
          <Search onSearch={handleSearch} isLoading={isLoading} />
          
          {!searchInitiated && <EmptyState />}
          
          {searchInitiated && !isLoading && !hasError && (
            <>
              {repoName && singleRepoData ? (
                <SingleRepository 
                  repo={singleRepoData} 
                  isLoading={isSingleRepoLoading}
                  onBackToProfile={handleBackToProfile}
                  username={username}
                />
              ) : (
                userData && (
                  <>
                    <Profile user={userData} />
                    
                    <ProfileStats 
                      user={userData} 
                      repos={reposData || []} 
                      isLoading={isReposLoading} 
                    />
                    
                    <Repositories 
                      repos={reposData || []} 
                      isLoading={isReposLoading} 
                      username={username} 
                    />
                  </>
                )
              )}
            </>
          )}
        </div>
      </div>
    </BookmarkProvider>
  );
};

export default Index;
