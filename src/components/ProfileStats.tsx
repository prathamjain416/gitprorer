
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { GithubProfile, GithubRepository } from "../types/github";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Star, GitFork, Code, Award } from "lucide-react";
import { Skeleton } from "../components/ui/skeleton";

interface ProfileStatsProps {
  user: GithubProfile;
  repos: GithubRepository[];
  isLoading: boolean;
}

const ProfileStats: React.FC<ProfileStatsProps> = ({ user, repos, isLoading }) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Profile Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-[200px] w-full rounded-md" />
          <div className="flex justify-between">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[60px]" />
          </div>
        </CardContent>
      </Card>
    );
  }

  // Prepare data for language distribution chart
  const languageCounts: Record<string, number> = {};
  repos.forEach((repo) => {
    if (repo.language) {
      languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
    }
  });

  const languageData = Object.entries(languageCounts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5); // Top 5 languages

  // Prepare data for repository stars chart
  const repoStarsData = repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 5)
    .map((repo) => ({
      name: repo.name,
      stars: repo.stargazers_count,
    }));

  // Colors for the charts
  const colors = ['#8B5CF6', '#EC4899', '#10B981', '#F59E0B', '#3B82F6'];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" />
          Profile Stats
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="languages">
          <TabsList className="mb-4">
            <TabsTrigger value="languages" className="flex items-center gap-1">
              <Code className="h-4 w-4" /> Languages
            </TabsTrigger>
            <TabsTrigger value="stars" className="flex items-center gap-1">
              <Star className="h-4 w-4" /> Top Repositories
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center gap-1">
              <GitFork className="h-4 w-4" /> Activity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="languages" className="space-y-4">
            <div className="h-[300px] w-full">
              {languageData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={languageData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {languageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} repositories`, 'Count']} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center text-center text-muted-foreground">
                  No language data available
                </div>
              )}
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Most used languages across repositories
            </p>
          </TabsContent>

          <TabsContent value="stars" className="space-y-4">
            <div className="h-[300px] w-full">
              {repoStarsData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={repoStarsData}
                    margin={{ top: 10, right: 30, left: 20, bottom: 70 }}
                  >
                    <XAxis 
                      dataKey="name" 
                      angle={-45} 
                      textAnchor="end"
                      height={70}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip formatter={(value) => [`${value} stars`, 'Stars']} />
                    <Bar dataKey="stars" fill="#8B5CF6">
                      {repoStarsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center text-center text-muted-foreground">
                  No repository data available
                </div>
              )}
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Most starred repositories
            </p>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <div className="flex justify-center items-center flex-col space-y-8 py-8">
              <div className="flex items-center justify-between w-full max-w-md p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Star className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Total Stars</p>
                    <p className="text-sm text-muted-foreground">Across all repositories</p>
                  </div>
                </div>
                <span className="text-2xl font-bold">
                  {repos.reduce((acc, repo) => acc + repo.stargazers_count, 0).toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between w-full max-w-md p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <GitFork className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Total Forks</p>
                    <p className="text-sm text-muted-foreground">Across all repositories</p>
                  </div>
                </div>
                <span className="text-2xl font-bold">
                  {repos.reduce((acc, repo) => acc + repo.forks_count, 0).toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between w-full max-w-md p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Code className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Public Repositories</p>
                    <p className="text-sm text-muted-foreground">Total count</p>
                  </div>
                </div>
                <span className="text-2xl font-bold">
                  {user.public_repos.toLocaleString()}
                </span>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ProfileStats;
