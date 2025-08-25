/**
 * User DTO from API responses
 */
export interface UserDTO {
  readonly _id: string;
  readonly email: string;
  readonly username: string;
  readonly displayName: string;
  readonly avatarUrl?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly profile?: UserProfileDTO;
  readonly preferences?: UserPreferencesDTO;
}

/**
 * User profile DTO from API
 */
export interface UserProfileDTO {
  readonly firstName?: string;
  readonly lastName?: string;
  readonly bio?: string;
  readonly university?: string;
  readonly major?: string;
  readonly graduationYear?: number;
  readonly location?: string;
}

/**
 * User preferences DTO from API
 */
export interface UserPreferencesDTO {
  readonly theme?: string;
  readonly notifications?: NotificationPreferencesDTO;
  readonly privacy?: PrivacySettingsDTO;
}

/**
 * Notification preferences DTO
 */
export interface NotificationPreferencesDTO {
  readonly email?: boolean;
  readonly browser?: boolean;
  readonly comments?: boolean;
  readonly replies?: boolean;
  readonly mentions?: boolean;
  readonly newsletters?: boolean;
}

/**
 * Privacy settings DTO
 */
export interface PrivacySettingsDTO {
  readonly profileVisibility?: string;
  readonly activityTracking?: boolean;
  readonly dataSharing?: boolean;
}

/**
 * Authentication response DTO
 */
export interface AuthResponseDTO {
  readonly user: UserDTO;
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly expiresIn: number;
  readonly tokenType: string;
}

/**
 * User creation request DTO
 */
export interface CreateUserRequestDTO {
  readonly email: string;
  readonly username: string;
  readonly password: string;
  readonly displayName: string;
  readonly profile?: Partial<UserProfileDTO>;
}

/**
 * User update request DTO
 */
export interface UpdateUserRequestDTO {
  readonly displayName?: string;
  readonly avatarUrl?: string;
  readonly profile?: Partial<UserProfileDTO>;
  readonly preferences?: Partial<UserPreferencesDTO>;
}