import { DocumentNode, gql } from '@apollo/client';
import { Result } from '@/core/result';
import { TransportError } from '@/infrastructure/errors';
import { APIClient } from '../client';
import {
  Post,
  PostDraft,
  Comment,
  CreatePostData,
  UpdatePostData,
  CreateCommentData,
  PostSearchCriteria,
  PostSearchResult,
} from '@/core/domain/post';
import {
  PostDTO,
  PostDraftDTO,
  CommentDTO,
  CreatePostRequestDTO,
  PostsFeedResponseDTO,
} from '@/infrastructure/dto/post.dto';
import {
  mapPostDTOToDomain,
  mapPostDraftDTOToDomain,
  mapCommentDTOToDomain,
  mapCreatePostDataToDTO,
  mapPostsFeedResponseDTOToDomain,
} from '@/infrastructure/mappers/post.mapper';

// GraphQL Operations
const ADD_POST = gql`
  mutation addPost(
    $title: String!
    $postText: String!
    $unitId: Float
    $tags: [TagsInput]
    $postTag: String
    $id: String!
  ) {
    addPost(
      title: $title
      postText: $postText
      unitId: $unitId
      tags: $tags
      postTag: $postTag
      id: $id
    ) {
      status {
        success
        message
      }
      post {
        _id
        title
        postText
        tags {
          _id
          name
        }
        createdAt
        updatedAt
      }
    }
  }
`;

const GET_FEED = gql`
  query fetchFeedV2($feedQuery: FeedQueryInput) {
    fetchFeedV2(feedQuery: $feedQuery) {
      validToken
      data {
        section
        postText
        admissionAndApplicationRating
        overallRating
        academicRating
        campusRating
        socialRating
        tags {
          _id
          name
          unitId
          universityCount
          entityType
        }
        title
        _id
        userId
        postedBy {
          _id
          firstName
          lastName
          email
          avatar
          university
          accountType
        }
        universityDetails {
          id
          unitId
          name
          imageURL
          universityType
          location
        }
        comments
        createdAt
        isLiked
        likes
        views
      }
    }
  }
`;

const GET_POST_BY_ID = gql`
  query getPost($postId: String!) {
    getPost(postId: $postId) {
      _id
      title
      postText
      author {
        _id
        username
        displayName
        avatarUrl
        email
      }
      tags {
        _id
        name
        slug
      }
      createdAt
      updatedAt
      publishedAt
      metrics {
        views
        likes
        comments
        shares
      }
    }
  }
`;

const GET_COMMENTS = gql`
  query getComments($postId: String!) {
    getComments(postId: $postId) {
      _id
      content
      author {
        _id
        username
        displayName
        avatarUrl
        email
      }
      postId
      parentId
      createdAt
      updatedAt
      isEdited
      likes
      replies {
        _id
        content
        author {
          _id
          username
          displayName
          avatarUrl
          email
        }
        createdAt
        likes
      }
    }
  }
`;

const ADD_COMMENT = gql`
  mutation addComment($content: String!, $postId: String!, $parentId: String) {
    addComment(content: $content, postId: $postId, parentId: $parentId) {
      status {
        success
        message
      }
      comment {
        _id
        content
        author {
          _id
          username
          displayName
          avatarUrl
        }
        createdAt
        likes
      }
    }
  }
`;

/**
 * Post service for content management operations
 */
export class PostService {
  constructor(private readonly apiClient: APIClient) {}

  /**
   * Create a new post
   */
  async createPost(postData: CreatePostData): Promise<Result<Post, TransportError>> {
    const requestDto = mapCreatePostDataToDTO(postData);
    
    const result = await this.apiClient.mutate<{
      addPost: {
        status: { success: boolean; message: string };
        post: PostDTO;
      };
    }>(ADD_POST, {
      title: requestDto.title,
      postText: requestDto.postText,
      tags: requestDto.tags,
      id: requestDto.id,
    });

    if (!result.success) {
      return result;
    }

    if (!result.data.addPost.status.success) {
      return {
        success: false,
        error: new TransportError(result.data.addPost.status.message, 400),
      };
    }

    const post = mapPostDTOToDomain(result.data.addPost.post);

    return {
      success: true,
      data: post,
    };
  }

  /**
   * Get posts feed
   */
  async getFeed(feedQuery?: {
    limit?: number;
    offset?: number;
    tags?: string[];
  }): Promise<Result<Post[], TransportError>> {
    const result = await this.apiClient.query<PostsFeedResponseDTO>(
      GET_FEED,
      { feedQuery }
    );

    if (!result.success) {
      return result;
    }

    const posts = mapPostsFeedResponseDTOToDomain(result.data);

    return {
      success: true,
      data: posts,
    };
  }

  /**
   * Get post by ID
   */
  async getPostById(postId: string): Promise<Result<Post, TransportError>> {
    const result = await this.apiClient.query<{ getPost: PostDTO }>(
      GET_POST_BY_ID,
      { postId }
    );

    if (!result.success) {
      return result;
    }

    const post = mapPostDTOToDomain(result.data.getPost);

    return {
      success: true,
      data: post,
    };
  }

  /**
   * Get comments for a post
   */
  async getComments(postId: string): Promise<Result<Comment[], TransportError>> {
    const result = await this.apiClient.query<{ getComments: CommentDTO[] }>(
      GET_COMMENTS,
      { postId }
    );

    if (!result.success) {
      return result;
    }

    const comments = result.data.getComments.map(mapCommentDTOToDomain);

    return {
      success: true,
      data: comments,
    };
  }

  /**
   * Add a comment to a post
   */
  async addComment(commentData: CreateCommentData): Promise<Result<Comment, TransportError>> {
    const result = await this.apiClient.mutate<{
      addComment: {
        status: { success: boolean; message: string };
        comment: CommentDTO;
      };
    }>(ADD_COMMENT, commentData);

    if (!result.success) {
      return result;
    }

    if (!result.data.addComment.status.success) {
      return {
        success: false,
        error: new TransportError(result.data.addComment.status.message, 400),
      };
    }

    const comment = mapCommentDTOToDomain(result.data.addComment.comment);

    return {
      success: true,
      data: comment,
    };
  }

  /**
   * Search posts
   */
  async searchPosts(criteria: PostSearchCriteria): Promise<Result<PostSearchResult, TransportError>> {
    // This would need the actual search GraphQL query
    // For now, returning a placeholder
    return {
      success: false,
      error: new TransportError('Search posts not yet implemented', 501),
    };
  }

  /**
   * Update post
   */
  async updatePost(postId: string, updateData: UpdatePostData): Promise<Result<Post, TransportError>> {
    // This would need the actual update GraphQL mutation
    // For now, returning a placeholder
    return {
      success: false,
      error: new TransportError('Update post not yet implemented', 501),
    };
  }

  /**
   * Delete post
   */
  async deletePost(postId: string): Promise<Result<void, TransportError>> {
    // This would need the actual delete GraphQL mutation
    // For now, returning a placeholder
    return {
      success: false,
      error: new TransportError('Delete post not yet implemented', 501),
    };
  }
}

/**
 * Factory function to create PostService instance
 */
export function createPostService(apiClient: APIClient): PostService {
  return new PostService(apiClient);
}