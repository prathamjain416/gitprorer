
export const formatDate = (dateString: string, short = false): string => {
  const date = new Date(dateString);
  
  if (short) {
    // Calculate time difference
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    const diffMonth = Math.floor(diffDay / 30);
    const diffYear = Math.floor(diffDay / 365);
    
    if (diffYear > 0) {
      return `${diffYear} ${diffYear === 1 ? 'year' : 'years'} ago`;
    } else if (diffMonth > 0) {
      return `${diffMonth} ${diffMonth === 1 ? 'month' : 'months'} ago`;
    } else if (diffDay > 0) {
      return `${diffDay} ${diffDay === 1 ? 'day' : 'days'} ago`;
    } else if (diffHour > 0) {
      return `${diffHour} ${diffHour === 1 ? 'hour' : 'hours'} ago`;
    } else if (diffMin > 0) {
      return `${diffMin} ${diffMin === 1 ? 'minute' : 'minutes'} ago`;
    } else {
      return 'just now';
    }
  }
  
  // Full date format
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  
  return date.toLocaleDateString('en-US', options);
};
