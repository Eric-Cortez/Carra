import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineSlices, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { authSlice } from "../features/auth/authSlice"
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"
import expireTransform from "redux-persist-expire"

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["isAuthenticated", "user"],
  transform: [
    expireTransform("auth", {
      expireSeconds: 8 * 60 * 60, // Expire after 8 hours (8 hours * 60 minutes * 60 seconds)
      expiredState: {
        isAuthenticated: false,
        user: null,
      },
    }),
  ],
}

const persistedAuthReducer = persistReducer(persistConfig, authSlice.reducer)

// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.
const rootReducer = combineSlices({
  auth: persistedAuthReducer,
  // Other slices can go here
})

// Infer the `RootState` type from the root reducer
export type RootState = ReturnType<typeof rootReducer>

// The store setup is wrapped in `makeStore` to allow reuse
// when setting up tests that need the same store config
export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ["persist/PERSIST"],
        },
      }),
  })
  // configure listeners using the provided defaults
  // optional, but required for `refetchOnFocus`/`refetchOnReconnect` behaviors
  setupListeners(store.dispatch)
  return store
}

export const store = makeStore()

// Infer the type of `store`
export type AppStore = typeof store
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>

export const persistor = persistStore(store)
