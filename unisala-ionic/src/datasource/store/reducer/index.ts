import {combineReducers} from "redux"
import introductionReducer from "./intro"
import storage from "redux-persist/lib/storage"
import {persistReducer} from "redux-persist"
import University from "./university"
import userActivity from "./userActivity"
import userProfile from "./userProfile"
import auth from "./auth"

const rootReducer = combineReducers({
    introductionQuestionAnswered: introductionReducer,
    university: University,
    userProfile,
    auth,
    userActivity
})
const persistConfig = {
    key: "developmentF5",
    storage
}

export default persistReducer(persistConfig, rootReducer)
