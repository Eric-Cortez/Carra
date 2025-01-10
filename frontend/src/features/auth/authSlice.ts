import { createAppSlice } from "../../app/createAppSlice";
import { fetchLogin, fetchLogout } from "./authAPI";

type LoginCredentials = {
  email: string;
  password: string;
};
export interface User {
  username?: string;
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  status: "idle",
  error: null,
};

export const authSlice = createAppSlice({
  name: "auth",
  initialState,
  reducers: create => ({
    loginAsync: create.asyncThunk(
      async (credentials: LoginCredentials) => await fetchLogin(credentials),
      {
        pending: state => {
          state.status = "loading";
          state.error = null;
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          state.user = action.payload;
          state.isAuthenticated = true;
        },
        rejected: (state, action) => {
          state.status = "failed";
          state.error =
            action.error.message?.toString() ||
            "An unexpected error occurred. Please try again.";
          state.isAuthenticated = false;
        },
      },
    ),

    logoutUser: create.reducer(state => {
      state.isAuthenticated = false;
      state.user = null;
    }),
    logoutAsync: create.asyncThunk(async () => await fetchLogout(), {
      pending: state => {
        state.status = "loading";
        state.error = null;
      },
      fulfilled: state => {
        state.status = "idle";
        state.user = null;
        state.isAuthenticated = false;
      },
      rejected: (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      },
    }),
  }),
});

export const { loginAsync, logoutUser } = authSlice.actions;
