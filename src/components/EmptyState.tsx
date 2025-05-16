
import { Search, FileCode } from "lucide-react";

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
      
      <div className="border border-dashed border-muted-foreground/30 rounded-lg p-6 max-w-md">
        <div className="flex items-center justify-center mb-4">
          <FileCode className="h-8 w-8 text-primary" />
        </div>
        <h3 className="font-medium text-lg">Repository Insights</h3>
        <p className="text-sm text-muted-foreground mt-2">
          Analyze GitHub repositories with detailed metrics including engagement scores, activity timelines, and community interest indicators. Get valuable insights to understand repository health and activity at a glance.
        </p>
      </div>
    </div>
  );
};

export default EmptyState;
