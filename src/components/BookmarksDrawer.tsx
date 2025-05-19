
import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Button } from "./ui/button";
import { Bookmark, X } from "lucide-react";
import { GithubProfile } from "../types/github";
import { ScrollArea } from "./ui/scroll-area";

interface BookmarksDrawerProps {
  bookmarks: GithubProfile[];
  onSelect: (username: string) => void;
  onRemove: (userId: number) => void;
}

const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  bookmarks,
  onSelect,
  onRemove,
}) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bookmark className="h-5 w-5" />
          {bookmarks.length > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-primary text-[10px] font-medium flex items-center justify-center text-primary-foreground">
              {bookmarks.length}
            </span>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="flex items-center gap-2 justify-center">
              <Bookmark className="h-5 w-5" />
              Bookmarked Profiles
            </DrawerTitle>
          </DrawerHeader>
          <div className="p-4">
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
                          onClick={() => onSelect(profile.login)}
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
                        onClick={() => onRemove(profile.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default BookmarksDrawer;
