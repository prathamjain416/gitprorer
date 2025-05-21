
import { Search, FileCode, Bookmark } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4 space-y-6">
      <div className="bg-muted rounded-full p-4">
        <Search className="h-10 w-10 text-muted-foreground" />
      </div>
      <div>
        <h2 className="text-xl font-semibold">Search for GitHub Profiles or Repositories</h2>
        <p className="text-muted-foreground max-w-md mt-2">
          Enter a GitHub username to view their profile, or use the format <span className="font-medium">username/repository</span> to search for a specific repository.
        </p>
      </div>
      
      <div className="bg-muted/30 rounded-lg p-4 max-w-md">
        <h3 className="font-medium text-base mb-2">Search Tips:</h3>
        <ul className="text-sm text-muted-foreground text-left space-y-2">
          <li><span className="font-medium">Profile search:</span> Enter a username (e.g., <code className="bg-muted px-1 rounded">octocat</code>)</li>
          <li><span className="font-medium">Repository search:</span> Enter username/repository (e.g., <code className="bg-muted px-1 rounded">facebook/react</code>)</li>
          <li><span className="font-medium">Keyboard shortcuts:</span> Press Enter to search or Escape to clear</li>
        </ul>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
        <div className="border border-dashed border-muted-foreground/30 rounded-lg p-6">
          <div className="flex items-center justify-center mb-4">
            <FileCode className="h-8 w-8 text-primary" />
          </div>
          <h3 className="font-medium text-lg">Repository Insights</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Analyze GitHub repositories with detailed metrics including engagement scores, activity timelines, and community interest indicators.
          </p>
        </div>

        <div className="border border-dashed border-muted-foreground/30 rounded-lg p-6">
          <div className="flex items-center justify-center mb-4">
            <Bookmark className="h-8 w-8 text-primary" />
          </div>
          <h3 className="font-medium text-lg">Bookmark Profiles & Repositories</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Save interesting GitHub profiles and repositories for future reference. Easily access your bookmarked content anytime with a single click.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
