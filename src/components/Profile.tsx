
import React, { useContext } from "react";
import { Card, CardContent } from "../components/ui/card";
import { GithubProfile } from "../types/github";
import { MapPin, Link, Building, Calendar, Users, GitFork } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { formatDate } from "../utils/dateFormatter";
import BookmarkButton from "./BookmarkButton";
import { BookmarkContext } from "../contexts/BookmarkContext";

interface ProfileProps {
  user: GithubProfile;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const { isBookmarked, toggleBookmark } = useContext(BookmarkContext);
  const bookmarked = isBookmarked(user.id);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <img
              src={user.avatar_url}
              alt={`${user.login}'s avatar`}
              className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-background shadow-sm"
            />
          </div>
          <div className="flex-1 space-y-4">
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-bold">
                {user.name || user.login}
                {user.name && (
                  <span className="ml-2 font-normal text-muted-foreground">
                    @{user.login}
                  </span>
                )}
              </h2>
              <BookmarkButton 
                isBookmarked={bookmarked}
                onClick={() => toggleBookmark(user)}
                tooltipText={bookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
              />
            </div>
            {user.bio && <p className="text-muted-foreground mt-2">{user.bio}</p>}

            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1.5">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>
                  <strong>{user.followers.toLocaleString()}</strong> followers
                </span>
                <span>·</span>
                <span>
                  <strong>{user.following.toLocaleString()}</strong> following
                </span>
              </div>
              
              <div className="flex items-center gap-1.5">
                <GitFork className="h-4 w-4 text-muted-foreground" />
                <span>
                  <strong>{user.public_repos.toLocaleString()}</strong> repositories
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              {user.company && (
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span>{user.company}</span>
                </div>
              )}

              {user.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{user.location}</span>
                </div>
              )}

              {user.blog && (
                <div className="flex items-center gap-2">
                  <Link className="h-4 w-4 text-muted-foreground" />
                  <a
                    href={user.blog.startsWith("http") ? user.blog : `https://${user.blog}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline truncate max-w-[250px]"
                  >
                    {user.blog}
                  </a>
                </div>
              )}

              {user.created_at && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Joined {formatDate(user.created_at)}</span>
                </div>
              )}
            </div>

            <div className="pt-2">
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center"
              >
                <Badge variant="secondary" className="hover:bg-secondary/80">
                  View on GitHub
                </Badge>
              </a>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Profile;
