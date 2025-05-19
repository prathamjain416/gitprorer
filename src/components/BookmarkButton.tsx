
import React from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface BookmarkButtonProps {
  isBookmarked: boolean;
  onClick: () => void;
  tooltipText?: string;
  size?: "sm" | "default";
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ 
  isBookmarked, 
  onClick, 
  tooltipText,
  size = "default"
}) => {
  const sizeClasses = size === "sm" ? "h-8 w-8" : "h-10 w-10";
  
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={sizeClasses}
          onClick={onClick}
          aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
        >
          {isBookmarked ? (
            <BookmarkCheck className="h-5 w-5 text-primary" />
          ) : (
            <Bookmark className="h-5 w-5" />
          )}
        </Button>
      </TooltipTrigger>
      {tooltipText && (
        <TooltipContent>
          <p>{tooltipText}</p>
        </TooltipContent>
      )}
    </Tooltip>
  );
};

export default BookmarkButton;
