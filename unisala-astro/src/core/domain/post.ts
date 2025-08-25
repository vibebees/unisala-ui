import type { User } from './user';

/**
 * Core Post domain model
 */
export interface Post {
  readonly id: string;
  readonly title: string;
  readonly content: string;
  readonly excerpt: string;
  readonly author: User;
  readonly tags: Tag[];
  readonly status: PostStatus;
  readonly visibility: PostVisibility;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly publishedAt?: Date;
  readonly metrics: PostMetrics;
  readonly imageUrl?: string;
}

/**
 * Post status enumeration
 */
export enum PostStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
  DELETED = 'deleted',
}

/**
 * Post visibility levels
 */
export enum PostVisibility {
  PUBLIC = 'public',
  PRIVATE = 'private',
  UNLISTED = 'unlisted',
}

/**
 * Post tag model
 */
export interface Tag {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly description?: string;
  readonly color?: string;
  readonly postCount: number;
}

/**
 * Post engagement metrics
 */
export interface PostMetrics {
  readonly views: number;
  readonly likes: number;
  readonly comments: number;
  readonly shares: number;
  readonly readTimeMinutes: number;
}

/**
 * Draft post model for editing
 */
export interface PostDraft {
  readonly id: string;
  readonly title: string;
  readonly content: string;
  readonly authorId: string;
  readonly tags: Tag[];
  readonly imageUrl?: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly autoSaveEnabled: boolean;
}

/**
 * Post creation data
 */
export interface CreatePostData {
  readonly title: string;
  readonly content: string;
  readonly tags: string[];
  readonly visibility: PostVisibility;
  readonly imageUrl?: string;
  readonly publishImmediately?: boolean;
}

/**
 * Post update data
 */
export interface UpdatePostData {
  readonly title?: string;
  readonly content?: string;
  readonly tags?: string[];
  readonly visibility?: PostVisibility;
  readonly imageUrl?: string;
  readonly status?: PostStatus;
}

/**
 * Post comment model
 */
export interface Comment {
  readonly id: string;
  readonly content: string;
  readonly author: User;
  readonly postId: string;
  readonly parentId?: string;
  readonly replies: Comment[];
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly isEdited: boolean;
  readonly likes: number;
}

/**
 * Comment creation data
 */
export interface CreateCommentData {
  readonly content: string;
  readonly postId: string;
  readonly parentId?: string;
}

/**
 * Post search criteria
 */
export interface PostSearchCriteria {
  readonly query?: string;
  readonly tags?: string[];
  readonly authorId?: string;
  readonly status?: PostStatus;
  readonly visibility?: PostVisibility;
  readonly dateFrom?: Date;
  readonly dateTo?: Date;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'views' | 'likes';
  readonly sortOrder?: 'asc' | 'desc';
  readonly limit?: number;
  readonly offset?: number;
}

/**
 * Post search results
 */
export interface PostSearchResult {
  readonly posts: Post[];
  readonly totalCount: number;
  readonly hasMore: boolean;
}