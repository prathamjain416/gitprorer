
import { Search, FileCode, Bookmark } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4 space-y-6">
      <div className="bg-muted rounded-full p-4">
        <Search className="h-10 w-10 text-muted-foreground" />
      </div>
      <div>
        <h2 className="text-xl font-semibold">Search for GitHub Profiles</h2>
        <p className="text-muted-foreground max-w-md mt-2">
          Enter a GitHub username in the search box above to view their profile information, repositories, and detailed repository insights.
        </p>
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
          <h3 className="font-medium text-lg">Bookmark Profiles</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Save interesting GitHub profiles for future reference. Easily access your bookmarked profiles anytime with a single click.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
