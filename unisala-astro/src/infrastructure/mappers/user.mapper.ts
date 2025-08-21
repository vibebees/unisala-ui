import {
  User,
  UserProfile,
  UserPreferences,
  NotificationPreferences,
  PrivacySettings,
  UserAuth,
  CreateUserData,
  UpdateUserData,
} from '@/core/domain/user';

import {
  UserDTO,
  UserProfileDTO,
  UserPreferencesDTO,
  NotificationPreferencesDTO,
  PrivacySettingsDTO,
  AuthResponseDTO,
  CreateUserRequestDTO,
  UpdateUserRequestDTO,
} from '@/infrastructure/dto/user.dto';

/**
 * Maps UserDTO to User domain model
 */
export function mapUserDTOToDomain(dto: UserDTO): User {
  return {
    id: dto._id,
    email: dto.email,
    username: dto.username,
    displayName: dto.displayName,
    avatarUrl: dto.avatarUrl,
    createdAt: new Date(dto.createdAt),
    updatedAt: new Date(dto.updatedAt),
    profile: mapUserProfileDTOToDomain(dto.profile || {}),
    preferences: mapUserPreferencesDTOToDomain(dto.preferences || {}),
  };
}

/**
 * Maps UserProfileDTO to UserProfile domain model
 */
function mapUserProfileDTOToDomain(dto: UserProfileDTO): UserProfile {
  return {
    firstName: dto.firstName,
    lastName: dto.lastName,
    bio: dto.bio,
    university: dto.university,
    major: dto.major,
    graduationYear: dto.graduationYear,
    location: dto.location,
  };
}

/**
 * Maps UserPreferencesDTO to UserPreferences domain model
 */
function mapUserPreferencesDTOToDomain(dto: UserPreferencesDTO): UserPreferences {
  return {
    theme: (dto.theme as 'light' | 'dark' | 'system') || 'system',
    notifications: mapNotificationPreferencesDTOToDomain(dto.notifications || {}),
    privacy: mapPrivacySettingsDTOToDomain(dto.privacy || {}),
  };
}

/**
 * Maps NotificationPreferencesDTO to NotificationPreferences domain model
 */
function mapNotificationPreferencesDTOToDomain(dto: NotificationPreferencesDTO): NotificationPreferences {
  return {
    email: dto.email ?? true,
    browser: dto.browser ?? true,
    comments: dto.comments ?? true,
    replies: dto.replies ?? true,
    mentions: dto.mentions ?? true,
    newsletters: dto.newsletters ?? false,
  };
}

/**
 * Maps PrivacySettingsDTO to PrivacySettings domain model
 */
function mapPrivacySettingsDTOToDomain(dto: PrivacySettingsDTO): PrivacySettings {
  return {
    profileVisibility: (dto.profileVisibility as 'public' | 'private' | 'friends') || 'public',
    activityTracking: dto.activityTracking ?? true,
    dataSharing: dto.dataSharing ?? false,
  };
}

/**
 * Maps AuthResponseDTO to UserAuth domain model
 */
export function mapAuthResponseDTOToDomain(dto: AuthResponseDTO): UserAuth {
  return {
    userId: dto.user._id,
    accessToken: dto.accessToken,
    refreshToken: dto.refreshToken,
    expiresAt: new Date(Date.now() + (dto.expiresIn * 1000)),
    tokenType: dto.tokenType,
  };
}

/**
 * Maps CreateUserData to CreateUserRequestDTO
 */
export function mapCreateUserDataToDTO(data: CreateUserData): CreateUserRequestDTO {
  return {
    email: data.email,
    username: data.username,
    password: data.password,
    displayName: data.displayName,
    profile: data.profile ? mapUserProfileDomainToDTO(data.profile) : undefined,
  };
}

/**
 * Maps UpdateUserData to UpdateUserRequestDTO
 */
export function mapUpdateUserDataToDTO(data: UpdateUserData): UpdateUserRequestDTO {
  return {
    displayName: data.displayName,
    avatarUrl: data.avatarUrl,
    profile: data.profile ? mapUserProfileDomainToDTO(data.profile) : undefined,
    preferences: data.preferences ? mapUserPreferencesDomainToDTO(data.preferences) : undefined,
  };
}

/**
 * Maps UserProfile to UserProfileDTO
 */
function mapUserProfileDomainToDTO(profile: Partial<UserProfile>): Partial<UserProfileDTO> {
  return {
    firstName: profile.firstName,
    lastName: profile.lastName,
    bio: profile.bio,
    university: profile.university,
    major: profile.major,
    graduationYear: profile.graduationYear,
    location: profile.location,
  };
}

/**
 * Maps UserPreferences to UserPreferencesDTO
 */
function mapUserPreferencesDomainToDTO(preferences: Partial<UserPreferences>): Partial<UserPreferencesDTO> {
  return {
    theme: preferences.theme,
    notifications: preferences.notifications ? mapNotificationPreferencesDomainToDTO(preferences.notifications) : undefined,
    privacy: preferences.privacy ? mapPrivacySettingsDomainToDTO(preferences.privacy) : undefined,
  };
}

/**
 * Maps NotificationPreferences to NotificationPreferencesDTO
 */
function mapNotificationPreferencesDomainToDTO(notifications: Partial<NotificationPreferences>): NotificationPreferencesDTO {
  return {
    email: notifications.email,
    browser: notifications.browser,
    comments: notifications.comments,
    replies: notifications.replies,
    mentions: notifications.mentions,
    newsletters: notifications.newsletters,
  };
}

/**
 * Maps PrivacySettings to PrivacySettingsDTO
 */
function mapPrivacySettingsDomainToDTO(privacy: Partial<PrivacySettings>): PrivacySettingsDTO {
  return {
    profileVisibility: privacy.profileVisibility,
    activityTracking: privacy.activityTracking,
    dataSharing: privacy.dataSharing,
  };
}