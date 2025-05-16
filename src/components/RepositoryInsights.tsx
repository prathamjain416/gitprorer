
import React from "react";
import { GithubRepository } from "../types/github";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { formatDate } from "../utils/dateFormatter";
import { Code, GitFork, Calendar, Clock, FileCode } from "lucide-react";

interface RepositoryInsightsProps {
  repo: GithubRepository;
}

const RepositoryInsights: React.FC<RepositoryInsightsProps> = ({ repo }) => {
  // Calculate days since last update
  const lastUpdatedDays = Math.floor(
    (new Date().getTime() - new Date(repo.updated_at).getTime()) / (1000 * 3600 * 24)
  );
  
  // Calculate repository age in days
  const repoAgeDays = Math.floor(
    (new Date().getTime() - new Date(repo.created_at).getTime()) / (1000 * 3600 * 24)
  );
  
  // Calculate engagement score (simple algorithm)
  const engagementScore = Math.min(
    100,
    Math.floor(
      ((repo.stargazers_count * 2) + 
      repo.forks_count + 
      (100 - Math.min(100, lastUpdatedDays))) / 4
    )
  );
  
  // Create data for engagement metrics chart
  const engagementData = [
    { name: 'Stars', value: repo.stargazers_count },
    { name: 'Forks', value: repo.forks_count },
    { name: 'Age (days)', value: repoAgeDays },
    { name: 'Update Recency', value: Math.max(0, 100 - lastUpdatedDays) },
  ];
  
  // Chart colors
  const colors = ['#8B5CF6', '#EC4899', '#10B981', '#3B82F6'];
  
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileCode className="h-5 w-5 text-primary" />
          Repository Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="metrics">
          <TabsList className="mb-4">
            <TabsTrigger value="metrics" className="flex items-center gap-1">
              <Code className="h-4 w-4" /> Metrics
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center gap-1">
              <Calendar className="h-4 w-4" /> Timeline
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="metrics">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-4">
                {/* Engagement Score */}
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <span className="text-muted-foreground">Engagement Score</span>
                  <div className="flex items-center">
                    <span 
                      className={`text-2xl font-bold ${
                        engagementScore > 75 
                          ? 'text-green-500' 
                          : engagementScore > 40 
                          ? 'text-amber-500' 
                          : 'text-red-500'
                      }`}
                    >
                      {engagementScore}
                    </span>
                    <span className="text-sm text-muted-foreground">/100</span>
                  </div>
                </div>
                
                {/* Key stats */}
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Metric</TableHead>
                      <TableHead className="text-right">Value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Created</TableCell>
                      <TableCell className="text-right">{formatDate(repo.created_at)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Last Updated</TableCell>
                      <TableCell className="text-right">{formatDate(repo.updated_at)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Repository Age</TableCell>
                      <TableCell className="text-right">{repoAgeDays} days</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Days Since Update</TableCell>
                      <TableCell className="text-right">{lastUpdatedDays} days</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Stars to Forks Ratio</TableCell>
                      <TableCell className="text-right">
                        {repo.forks_count > 0 
                          ? (repo.stargazers_count / repo.forks_count).toFixed(2) 
                          : 'N/A'}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              
              {/* Engagement Chart */}
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={engagementData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                  >
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip formatter={(value) => [value, 'Value']} />
                    <Bar dataKey="value" fill="#8884d8">
                      {engagementData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="activity">
            <div className="space-y-4">
              <div className="flex flex-col gap-6">
                {/* Creation milestone */}
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20">
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium">Repository Created</h4>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(repo.created_at)} ({repoAgeDays} days ago)
                    </p>
                    <p className="text-sm mt-1">
                      Repository was created and initial code was committed.
                    </p>
                  </div>
                </div>
                
                {/* Last update milestone */}
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium">Last Updated</h4>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(repo.updated_at)} ({lastUpdatedDays} days ago)
                    </p>
                    <p className="text-sm mt-1">
                      {lastUpdatedDays < 30 
                        ? "Repository has been updated recently, indicating active development."
                        : lastUpdatedDays < 180
                        ? "Repository hasn't been updated in a while, might be stable or less active."
                        : "Repository hasn't been updated in a long time, might be abandoned."}
                    </p>
                  </div>
                </div>
                
                {/* Star milestone */}
                {repo.stargazers_count > 0 && (
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20">
                        <GitFork className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium">Community Interest</h4>
                      <p className="text-sm text-muted-foreground">
                        {repo.stargazers_count} stars and {repo.forks_count} forks
                      </p>
                      <p className="text-sm mt-1">
                        {repo.stargazers_count > 100
                          ? "This repository has significant community interest."
                          : repo.stargazers_count > 10
                          ? "This repository has moderate community interest."
                          : "This repository is still gaining community interest."}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RepositoryInsights;
