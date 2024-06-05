import { applyMiddleware, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import { persistStore } from "redux-persist"
import promise from "redux-promise-middleware"
import rootReducer from "./reducer"

import thunk from "redux-thunk"

const store = createStore(
    rootReducer,
    applyMiddleware(thunk, promise)
)
const persistor = persistStore(store)

export { store, persistor }
