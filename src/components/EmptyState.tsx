
import { Search } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4 space-y-4">
      <div className="bg-muted rounded-full p-4">
        <Search className="h-10 w-10 text-muted-foreground" />
      </div>
      <h2 className="text-xl font-semibold">Search for GitHub Profiles</h2>
      <p className="text-muted-foreground max-w-md">
        Enter a GitHub username in the search box above to view their profile information and repositories.
      </p>
    </div>
  );
};

export default EmptyState;
