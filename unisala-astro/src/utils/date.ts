import { parseISO, format, differenceInDays, formatDistanceToNow } from 'date-fns';

export const formatCommentDate = (dateString: string) => {
    const date = parseISO(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return formatDistanceToNow(date, { addSuffix: true });
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    }
  };

  
export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) {
    return 'No Date';
  }

  try {
    const date = parseISO(dateString);
    const now = new Date();
    const diffDays = differenceInDays(now, date);

    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return format(date, 'MMM d, yyyy');
    }
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Error Formatting Date';
  }
}
