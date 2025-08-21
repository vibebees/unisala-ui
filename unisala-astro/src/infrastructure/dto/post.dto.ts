import { UserDTO } from './user.dto';

/**
 * Post DTO from API responses
 */
export interface PostDTO {
  readonly _id: string;
  readonly title: string;
  readonly postText: string; // API uses different field name
  readonly excerpt?: string;
  readonly author: UserDTO;
  readonly tags: TagDTO[];
  readonly status: string;
  readonly visibility?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly publishedAt?: string;
  readonly metrics?: PostMetricsDTO;
  readonly imageUrl?: string;
}

/**
 * Tag DTO from API
 */
export interface TagDTO {
  readonly _id: string;
  readonly name: string;
  readonly slug?: string;
  readonly description?: string;
  readonly color?: string;
  readonly postCount?: number;
  readonly unitId?: string; // Legacy field
  readonly universityCount?: number; // Legacy field
  readonly entityType?: string; // Legacy field
}

/**
 * Post metrics DTO from API
 */
export interface PostMetricsDTO {
  readonly views?: number;
  readonly likes?: number;
  readonly comments?: number;
  readonly shares?: number;
  readonly readTimeMinutes?: number;
}

/**
 * Post draft DTO from API
 */
export interface PostDraftDTO {
  readonly _id: string;
  readonly postTitle: string;
  readonly postText: string;
  readonly authorId: string;
  readonly tags?: TagDTO[];
  readonly imageUrl?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly autoSaveEnabled?: boolean;
}

/**
 * Comment DTO from API
 */
export interface CommentDTO {
  readonly _id: string;
  readonly content: string;
  readonly author: UserDTO;
  readonly postId: string;
  readonly parentId?: string;
  readonly replies?: CommentDTO[];
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly isEdited?: boolean;
  readonly likes?: number;
}

/**
 * Create post request DTO
 */
export interface CreatePostRequestDTO {
  readonly title: string;
  readonly postText: string;
  readonly tags: Array<{
    readonly name: string;
    readonly _id?: string;
    readonly unitId?: string;
    readonly universityCount?: number;
    readonly entityType?: string;
  }>;
  readonly visibility?: string;
  readonly imageUrl?: string;
  readonly id: string; // API requires this field
}

/**
 * Update post request DTO
 */
export interface UpdatePostRequestDTO {
  readonly title?: string;
  readonly postText?: string;
  readonly tags?: TagDTO[];
  readonly visibility?: string;
  readonly imageUrl?: string;
  readonly status?: string;
}

/**
 * Create comment request DTO
 */
export interface CreateCommentRequestDTO {
  readonly content: string;
  readonly postId: string;
  readonly parentId?: string;
}

/**
 * Post search response DTO
 */
export interface PostSearchResponseDTO {
  readonly posts: PostDTO[];
  readonly totalCount: number;
  readonly hasMore: boolean;
  readonly nextCursor?: string;
}

/**
 * Posts feed response DTO
 */
export interface PostsFeedResponseDTO {
  readonly fetchFeedV2: PostDTO[];
  readonly hasMore?: boolean;
  readonly cursor?: string;
}