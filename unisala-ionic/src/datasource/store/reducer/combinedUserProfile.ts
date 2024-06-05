import auth, { AUTH_INITIAL_STATE } from "./auth"
import UserProfile, { USER_PROFILE_INITIAL_STATE } from "./userProfile"

// Combine both initial states into one
const initialCombinedState = {
  ...AUTH_INITIAL_STATE,
  ...USER_PROFILE_INITIAL_STATE
}

// The combinedUserProfile function is a higher-order reducer that combines two other reducers
const combinedUserProfile = (state = initialCombinedState, action) => {
  const authState = auth(state, action)
  const userProfileState = UserProfile(state, action)

  return {
    ...authState,
    ...userProfileState
  }
}

export default combinedUserProfile
