import type {
  Post,
  Tag,
  PostMetrics,
  PostDraft,
  Comment,
  CreatePostData,
  UpdatePostData,
  CreateCommentData,
  PostSearchResult,
} from '@/core/domain/post';
import { PostStatus, PostVisibility } from '@/core/domain/post';

import type {
  PostDTO,
  TagDTO,
  PostMetricsDTO,
  PostDraftDTO,
  CommentDTO,
  CreatePostRequestDTO,
  UpdatePostRequestDTO,
  CreateCommentRequestDTO,
  PostSearchResponseDTO,
  PostsFeedResponseDTO,
} from '@/infrastructure/dto/post.dto';

import { mapUserDTOToDomain } from './user.mapper';

/**
 * Maps PostDTO to Post domain model
 */
export function mapPostDTOToDomain(dto: PostDTO): Post {
  return {
    id: dto._id,
    title: dto.title,
    content: dto.postText,
    excerpt: dto.excerpt || generateExcerpt(dto.postText),
    author: mapUserDTOToDomain(dto.author),
    tags: dto.tags.map(mapTagDTOToDomain),
    status: mapPostStatusFromDTO(dto.status),
    visibility: mapPostVisibilityFromDTO(dto.visibility || 'public'),
    createdAt: new Date(dto.createdAt),
    updatedAt: new Date(dto.updatedAt),
    publishedAt: dto.publishedAt ? new Date(dto.publishedAt) : undefined,
    metrics: mapPostMetricsDTOToDomain(dto.metrics || {}),
    imageUrl: dto.imageUrl,
  };
}

/**
 * Maps TagDTO to Tag domain model
 */
function mapTagDTOToDomain(dto: TagDTO): Tag {
  return {
    id: dto._id,
    name: dto.name,
    slug: dto.slug || generateSlug(dto.name),
    description: dto.description,
    color: dto.color,
    postCount: dto.postCount || 0,
  };
}

/**
 * Maps PostMetricsDTO to PostMetrics domain model
 */
function mapPostMetricsDTOToDomain(dto: PostMetricsDTO): PostMetrics {
  return {
    views: dto.views || 0,
    likes: dto.likes || 0,
    comments: dto.comments || 0,
    shares: dto.shares || 0,
    readTimeMinutes: dto.readTimeMinutes || estimateReadTime(dto.views?.toString() || ''),
  };
}

/**
 * Maps PostDraftDTO to PostDraft domain model
 */
export function mapPostDraftDTOToDomain(dto: PostDraftDTO): PostDraft {
  return {
    id: dto._id,
    title: dto.postTitle,
    content: dto.postText,
    authorId: dto.authorId,
    tags: dto.tags?.map(mapTagDTOToDomain) || [],
    imageUrl: dto.imageUrl,
    createdAt: new Date(dto.createdAt),
    updatedAt: new Date(dto.updatedAt),
    autoSaveEnabled: dto.autoSaveEnabled ?? true,
  };
}

/**
 * Maps CommentDTO to Comment domain model
 */
export function mapCommentDTOToDomain(dto: CommentDTO): Comment {
  return {
    id: dto._id,
    content: dto.content,
    author: mapUserDTOToDomain(dto.author),
    postId: dto.postId,
    parentId: dto.parentId,
    replies: dto.replies?.map(mapCommentDTOToDomain) || [],
    createdAt: new Date(dto.createdAt),
    updatedAt: new Date(dto.updatedAt),
    isEdited: dto.isEdited || false,
    likes: dto.likes || 0,
  };
}

/**
 * Maps CreatePostData to CreatePostRequestDTO
 */
export function mapCreatePostDataToDTO(data: CreatePostData): CreatePostRequestDTO {
  return {
    title: data.title,
    postText: data.content,
    tags: data.tags.map(tagName => ({ name: tagName })),
    visibility: data.visibility,
    imageUrl: data.imageUrl,
    id: 'others', // API requirement - seems to be a legacy field
  };
}

/**
 * Maps UpdatePostData to UpdatePostRequestDTO
 */
export function mapUpdatePostDataToDTO(data: UpdatePostData): UpdatePostRequestDTO {
  return {
    ...(data.title !== undefined && { title: data.title }),
    ...(data.content !== undefined && { postText: data.content }),
    ...(data.tags !== undefined && { tags: data.tags.map(tagName => ({ name: tagName, _id: '' })) }),
    ...(data.visibility !== undefined && { visibility: data.visibility }),
    ...(data.imageUrl !== undefined && { imageUrl: data.imageUrl }),
    ...(data.status !== undefined && { status: data.status }),
  } as UpdatePostRequestDTO;
}

/**
 * Maps CreateCommentData to CreateCommentRequestDTO
 */
export function mapCreateCommentDataToDTO(data: CreateCommentData): CreateCommentRequestDTO {
  if (data.parentId !== undefined) {
    return {
      content: data.content,
      postId: data.postId,
      parentId: data.parentId,
    };
  }
  
  return {
    content: data.content,
    postId: data.postId,
  };
}

/**
 * Maps PostSearchResponseDTO to PostSearchResult
 */
export function mapPostSearchResponseDTOToDomain(dto: PostSearchResponseDTO): PostSearchResult {
  return {
    posts: dto.posts.map(mapPostDTOToDomain),
    totalCount: dto.totalCount,
    hasMore: dto.hasMore,
  };
}

/**
 * Maps PostsFeedResponseDTO to Post array
 */
export function mapPostsFeedResponseDTOToDomain(dto: PostsFeedResponseDTO): Post[] {
  return dto.fetchFeedV2.map(mapPostDTOToDomain);
}

/**
 * Helper functions
 */

function mapPostStatusFromDTO(status: string): PostStatus {
  switch (status.toLowerCase()) {
    case 'draft':
      return PostStatus.DRAFT;
    case 'published':
      return PostStatus.PUBLISHED;
    case 'archived':
      return PostStatus.ARCHIVED;
    case 'deleted':
      return PostStatus.DELETED;
    default:
      return PostStatus.DRAFT;
  }
}

function mapPostVisibilityFromDTO(visibility: string): PostVisibility {
  switch (visibility.toLowerCase()) {
    case 'public':
      return PostVisibility.PUBLIC;
    case 'private':
      return PostVisibility.PRIVATE;
    case 'unlisted':
      return PostVisibility.UNLISTED;
    default:
      return PostVisibility.PUBLIC;
  }
}

function generateExcerpt(content: string, maxLength: number = 200): string {
  // Remove HTML tags and get plain text
  const plainText = content.replace(/<[^>]*>/g, '');
  
  if (plainText.length <= maxLength) {
    return plainText;
  }
  
  return plainText.substring(0, maxLength).trim() + '...';
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function estimateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}