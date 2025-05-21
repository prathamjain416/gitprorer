
import React, { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Button } from "./ui/button";
import { Bookmark, X, User, FileCode } from "lucide-react";
import { GithubProfile, GithubRepository } from "../types/github";
import { ScrollArea } from "./ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface BookmarksDrawerProps {
  bookmarks: GithubProfile[];
  repositories: GithubRepository[];
  onSelectProfile: (username: string) => void;
  onRemoveProfile: (userId: number) => void;
  onRemoveRepo: (repoId: number) => void;
}

const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  bookmarks,
  repositories,
  onSelectProfile,
  onRemoveProfile,
  onRemoveRepo,
}) => {
  const totalBookmarks = bookmarks.length + repositories.length;
  const [activeTab, setActiveTab] = useState<string>("profiles");

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bookmark className="h-5 w-5" />
          {totalBookmarks > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-primary text-[10px] font-medium flex items-center justify-center text-primary-foreground">
              {totalBookmarks}
            </span>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="flex items-center gap-2 justify-center">
              <Bookmark className="h-5 w-5" />
              Bookmarks
            </DrawerTitle>
          </DrawerHeader>
          <div className="p-4">
            <Tabs defaultValue="profiles" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full mb-4">
                <TabsTrigger value="profiles" className="flex items-center gap-1 flex-1">
                  <User className="h-4 w-4" /> 
                  Profiles ({bookmarks.length})
                </TabsTrigger>
                <TabsTrigger value="repositories" className="flex items-center gap-1 flex-1">
                  <FileCode className="h-4 w-4" /> 
                  Repositories ({repositories.length})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="profiles">
                <ScrollArea className="h-[300px] pr-4">
                  {bookmarks.length === 0 ? (
                    <div className="text-center p-4 text-muted-foreground">
                      No bookmarked profiles yet
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {bookmarks.map((profile) => (
                        <div
                          key={profile.id}
                          className="flex items-center justify-between p-2 border rounded-md hover:bg-accent transition-colors"
                        >
                          <DrawerClose asChild>
                            <div 
                              className="flex items-center gap-3 cursor-pointer flex-1"
                              onClick={() => onSelectProfile(profile.login)}
                            >
                              <img
                                src={profile.avatar_url}
                                alt={`${profile.login}'s avatar`}
                                className="w-8 h-8 rounded-full"
                              />
                              <div className="flex flex-col">
                                <span className="font-medium">{profile.name || profile.login}</span>
                                {profile.name && (
                                  <span className="text-sm text-muted-foreground">@{profile.login}</span>
                                )}
                              </div>
                            </div>
                          </DrawerClose>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => onRemoveProfile(profile.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="repositories">
                <ScrollArea className="h-[300px] pr-4">
                  {repositories.length === 0 ? (
                    <div className="text-center p-4 text-muted-foreground">
                      No bookmarked repositories yet
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {repositories.map((repo) => (
                        <div
                          key={repo.id}
                          className="flex items-center justify-between p-2 border rounded-md hover:bg-accent transition-colors"
                        >
                          <DrawerClose asChild>
                            <a 
                              href={repo.html_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-3 cursor-pointer flex-1"
                            >
                              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
                                <FileCode className="h-4 w-4 text-primary" />
                              </div>
                              <div className="flex flex-col">
                                <span className="font-medium">{repo.name}</span>
                                <span className="text-sm text-muted-foreground">{repo.full_name.split('/')[0]}</span>
                              </div>
                            </a>
                          </DrawerClose>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => onRemoveRepo(repo.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default BookmarksDrawer;
