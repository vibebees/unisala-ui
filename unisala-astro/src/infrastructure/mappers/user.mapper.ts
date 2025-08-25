import type {
  User,
  UserProfile,
  UserPreferences,
  NotificationPreferences,
  PrivacySettings,
  UserAuth,
  CreateUserData,
  UpdateUserData,
} from '@/core/domain/user';

import type {
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
    avatarUrl: dto.avatarUrl ?? '',
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
    firstName: dto.firstName ?? '',
    lastName: dto.lastName ?? '',
    bio: dto.bio ?? '',
    university: dto.university ?? '',
    major: dto.major ?? '',
    graduationYear: dto.graduationYear ?? 0,
    location: dto.location ?? '',
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
  if (data.profile) {
    return {
      email: data.email,
      username: data.username,
      password: data.password,
      displayName: data.displayName,
      profile: mapUserProfileDomainToDTO(data.profile),
    };
  }
  
  return {
    email: data.email,
    username: data.username,
    password: data.password,
    displayName: data.displayName,
  };
}

/**
 * Maps UpdateUserData to UpdateUserRequestDTO
 */
export function mapUpdateUserDataToDTO(data: UpdateUserData): UpdateUserRequestDTO {
  return {
    ...(data.displayName !== undefined && { displayName: data.displayName }),
    ...(data.avatarUrl !== undefined && { avatarUrl: data.avatarUrl }),
    ...(data.profile && { profile: mapUserProfileDomainToDTO(data.profile) }),
    ...(data.preferences && { preferences: mapUserPreferencesDomainToDTO(data.preferences) }),
  } as UpdateUserRequestDTO;
}

/**
 * Maps UserProfile to UserProfileDTO
 */
function mapUserProfileDomainToDTO(profile: Partial<UserProfile>): Partial<UserProfileDTO> {
  return {
    ...(profile.firstName !== undefined && { firstName: profile.firstName }),
    ...(profile.lastName !== undefined && { lastName: profile.lastName }),
    ...(profile.bio !== undefined && { bio: profile.bio }),
    ...(profile.university !== undefined && { university: profile.university }),
    ...(profile.major !== undefined && { major: profile.major }),
    ...(profile.graduationYear !== undefined && { graduationYear: profile.graduationYear }),
    ...(profile.location !== undefined && { location: profile.location }),
  } as Partial<UserProfileDTO>;
}

/**
 * Maps UserPreferences to UserPreferencesDTO
 */
function mapUserPreferencesDomainToDTO(preferences: Partial<UserPreferences>): Partial<UserPreferencesDTO> {
  return {
    ...(preferences.theme !== undefined && { theme: preferences.theme }),
    ...(preferences.notifications && { notifications: mapNotificationPreferencesDomainToDTO(preferences.notifications) }),
    ...(preferences.privacy && { privacy: mapPrivacySettingsDomainToDTO(preferences.privacy) }),
  } as Partial<UserPreferencesDTO>;
}

/**
 * Maps NotificationPreferences to NotificationPreferencesDTO
 */
function mapNotificationPreferencesDomainToDTO(notifications: Partial<NotificationPreferences>): NotificationPreferencesDTO {
  return {
    ...(notifications.email !== undefined && { email: notifications.email }),
    ...(notifications.browser !== undefined && { browser: notifications.browser }),
    ...(notifications.comments !== undefined && { comments: notifications.comments }),
    ...(notifications.replies !== undefined && { replies: notifications.replies }),
    ...(notifications.mentions !== undefined && { mentions: notifications.mentions }),
    ...(notifications.newsletters !== undefined && { newsletters: notifications.newsletters }),
  } as NotificationPreferencesDTO;
}

/**
 * Maps PrivacySettings to PrivacySettingsDTO
 */
function mapPrivacySettingsDomainToDTO(privacy: Partial<PrivacySettings>): PrivacySettingsDTO {
  return {
    ...(privacy.profileVisibility !== undefined && { profileVisibility: privacy.profileVisibility }),
    ...(privacy.activityTracking !== undefined && { activityTracking: privacy.activityTracking }),
    ...(privacy.dataSharing !== undefined && { dataSharing: privacy.dataSharing }),
  } as PrivacySettingsDTO;
}