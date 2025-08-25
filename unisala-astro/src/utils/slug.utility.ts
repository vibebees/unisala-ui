export function createSlug(title: string, id: string): string {
    if (!title) return id;
  
    const sluggedTitle = title
      .toLowerCase()
      // Replace special characters with spaces
      .replace(/[^\w\s-]/g, ' ')
      // Replace spaces with hyphens
      .replace(/\s+/g, '-')
      // Remove consecutive hyphens
      .replace(/-+/g, '-')
      // Remove leading/trailing hyphens
      .trim()
      .replace(/^-+|-+$/g, '')
      // Limit length (optional, adjust as needed)
      .substring(0, 60);
  
    return `${sluggedTitle}-${id}`;
  }
  
  export function extractIdFromSlug(slug: string): string {
    const parts = slug.split('-');
    return parts[parts.length - 1] || '';
  }