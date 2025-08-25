import { gql } from '@apollo/client';
import type { DocumentNode } from 'graphql';
import type { Result } from '@/core/result';
import { TransportError } from '@/infrastructure/errors';
import type { APIClient } from '../client';
import type {
  User,
  UserAuth,
  CreateUserData,
  UpdateUserData,
} from '@/core/domain/user';
import type {
  UserDTO,
  AuthResponseDTO,
  CreateUserRequestDTO,
  UpdateUserRequestDTO,
} from '@/infrastructure/dto/user.dto';
import {
  mapUserDTOToDomain,
  mapAuthResponseDTOToDomain,
  mapCreateUserDataToDTO,
  mapUpdateUserDataToDTO,
} from '@/infrastructure/mappers/user.mapper';

// GraphQL Operations
const CHECK_EMAIL = gql`
  mutation checkEmail($email: String!) {
    checkEmail(email: $email) {
      status {
        success
        message
      }
      data {
        newUser
      }
    }
  }
`;

const REGISTER_V2 = gql`
  mutation registerV2(
    $firstName: String!
    $lastName: String!
    $email: String!
    $type: String
    $spaceOrgName: String
    $code: Float
  ) {
    registerV2(
      firstName: $firstName
      lastName: $lastName
      email: $email
      type: $type
      spaceOrgName: $spaceOrgName
      code: $code
    ) {
      status {
        success
        message
      }
    }
  }
`;

const VERIFY_EMAIL = gql`
  mutation verifyEmail($email: String!, $verificationCode: Int) {
    verifyEmail(email: $email, verificationCode: $verificationCode) {
      status {
        success
        message
      }
      data {
        accessToken
        refreshToken
        id
        email
        firstName
        lastName
        university
      }
    }
  }
`;

const GET_USER_PROFILE = gql`
  query getUserProfile($userId: String!) {
    getUserProfile(userId: $userId) {
      _id
      email
      username
      displayName
      avatarUrl
      createdAt
      updatedAt
      profile {
        firstName
        lastName
        bio
        university
        major
        graduationYear
        location
      }
      preferences {
        theme
        notifications {
          email
          browser
          comments
          replies
          mentions
          newsletters
        }
        privacy {
          profileVisibility
          activityTracking
          dataSharing
        }
      }
    }
  }
`;

/**
 * User service for authentication and user management operations
 */
export class UserService {
  constructor(private readonly apiClient: APIClient) {}

  /**
   * Check if email exists in the system
   */
  async checkEmail(email: string): Promise<Result<{ isNewUser: boolean }, TransportError>> {
    const result = await this.apiClient.mutate<{
      checkEmail: {
        status: { success: boolean; message: string };
        data: { newUser: boolean };
      };
    }>(CHECK_EMAIL, { email });

    if (!result.success) {
      return result;
    }

    if (!result.data.checkEmail.status.success) {
      return {
        success: false,
        error: new TransportError(result.data.checkEmail.status.message, 400),
      };
    }

    return {
      success: true,
      data: { isNewUser: result.data.checkEmail.data.newUser },
    };
  }

  /**
   * Register a new user
   */
  async register(userData: {
    firstName: string;
    lastName: string;
    email: string;
    type?: string;
    spaceOrgName?: string;
    code?: number;
  }): Promise<Result<{ success: boolean; message: string }, TransportError>> {
    const result = await this.apiClient.mutate<{
      registerV2: {
        status: { success: boolean; message: string };
      };
    }>(REGISTER_V2, userData);

    if (!result.success) {
      return result;
    }

    return {
      success: true,
      data: result.data.registerV2.status,
    };
  }

  /**
   * Verify email with verification code
   */
  async verifyEmail(
    email: string,
    verificationCode: number
  ): Promise<Result<UserAuth, TransportError>> {
    const result = await this.apiClient.mutate<{
      verifyEmail: {
        status: { success: boolean; message: string };
        data: {
          accessToken: string;
          refreshToken: string;
          id: string;
          email: string;
          firstName: string;
          lastName: string;
          university?: string;
        };
      };
    }>(VERIFY_EMAIL, { email, verificationCode });

    if (!result.success) {
      return result;
    }

    if (!result.data.verifyEmail.status.success) {
      return {
        success: false,
        error: new TransportError(result.data.verifyEmail.status.message, 400),
      };
    }

    // Map to AuthResponseDTO format first
    const authResponse: AuthResponseDTO = {
      user: {
        _id: result.data.verifyEmail.data.id,
        email: result.data.verifyEmail.data.email,
        username: result.data.verifyEmail.data.email, // Fallback
        displayName: `${result.data.verifyEmail.data.firstName} ${result.data.verifyEmail.data.lastName}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        profile: {
          firstName: result.data.verifyEmail.data.firstName,
          lastName: result.data.verifyEmail.data.lastName,
          university: result.data.verifyEmail.data.university,
        },
      },
      accessToken: result.data.verifyEmail.data.accessToken,
      refreshToken: result.data.verifyEmail.data.refreshToken,
      expiresIn: 3600, // Default to 1 hour
      tokenType: 'Bearer',
    };

    const userAuth = mapAuthResponseDTOToDomain(authResponse);

    return {
      success: true,
      data: userAuth,
    };
  }

  /**
   * Get user profile by ID
   */
  async getUserProfile(userId: string): Promise<Result<User, TransportError>> {
    const result = await this.apiClient.query<{ getUserProfile: UserDTO }>(
      GET_USER_PROFILE,
      { userId }
    );

    if (!result.success) {
      return result;
    }

    const user = mapUserDTOToDomain(result.data.getUserProfile);

    return {
      success: true,
      data: user,
    };
  }

  /**
   * Update user profile
   */
  async updateProfile(
    userId: string,
    updateData: UpdateUserData
  ): Promise<Result<User, TransportError>> {
    // This would need the actual GraphQL mutation for updating user
    // For now, returning a placeholder
    return {
      success: false,
      error: new TransportError('Update profile not yet implemented', 501),
    };
  }
}

/**
 * Factory function to create UserService instance
 */
export function createUserService(apiClient: APIClient): UserService {
  return new UserService(apiClient);
}