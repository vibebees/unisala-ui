/**
 * Core User domain model
 */
export interface User {
  readonly id: string;
  readonly email: string;
  readonly username: string;
  readonly displayName: string;
  readonly avatarUrl?: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly profile: UserProfile;
  readonly preferences: UserPreferences;
}

/**
 * User profile information
 */
export interface UserProfile {
  readonly firstName?: string;
  readonly lastName?: string;
  readonly bio?: string;
  readonly university?: string;
  readonly major?: string;
  readonly graduationYear?: number;
  readonly location?: string;
}

/**
 * User preferences and settings
 */
export interface UserPreferences {
  readonly theme: 'light' | 'dark' | 'system';
  readonly notifications: NotificationPreferences;
  readonly privacy: PrivacySettings;
}

/**
 * Notification preferences
 */
export interface NotificationPreferences {
  readonly email: boolean;
  readonly browser: boolean;
  readonly comments: boolean;
  readonly replies: boolean;
  readonly mentions: boolean;
  readonly newsletters: boolean;
}

/**
 * Privacy settings
 */
export interface PrivacySettings {
  readonly profileVisibility: 'public' | 'private' | 'friends';
  readonly activityTracking: boolean;
  readonly dataSharing: boolean;
}

/**
 * User authentication information
 */
export interface UserAuth {
  readonly userId: string;
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly expiresAt: Date;
  readonly tokenType: string;
}

/**
 * User creation data
 */
export interface CreateUserData {
  readonly email: string;
  readonly username: string;
  readonly password: string;
  readonly displayName: string;
  readonly profile?: Partial<UserProfile>;
}

/**
 * User update data
 */
export interface UpdateUserData {
  readonly displayName?: string;
  readonly avatarUrl?: string;
  readonly profile?: Partial<UserProfile>;
  readonly preferences?: Partial<UserPreferences>;
}