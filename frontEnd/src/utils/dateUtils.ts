export function formatTime(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatTimeAgo(timestamp: string): string {
  const now = new Date();
  const date = new Date(timestamp);
  const secondsAgo = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  // Less than a minute
  if (secondsAgo < 60) {
    return 'Just now';
  }
  
  // Less than an hour
  const minutesAgo = Math.floor(secondsAgo / 60);
  if (minutesAgo < 60) {
    return `${minutesAgo}m ago`;
  }
  
  // Less than a day
  const hoursAgo = Math.floor(minutesAgo / 60);
  if (hoursAgo < 24) {
    return `${hoursAgo}h ago`;
  }
  
  // Less than a week
  const daysAgo = Math.floor(hoursAgo / 24);
  if (daysAgo < 7) {
    return `${daysAgo}d ago`;
  }
  
  // Format as date
  return date.toLocaleDateString([], {
    month: 'short',
    day: 'numeric',
  });
}