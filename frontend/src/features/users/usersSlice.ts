import { createAppSlice } from "../../app/createAppSlice";
import { fetchLoadUsers } from "./usersAPI";

export interface User {
  id: number;
  username: string;
  email: string;
}

interface UsersState {
  users: User[] | [];
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  status: "idle",
  error: null,
};

export const usersSlice = createAppSlice({
  name: "users",
  initialState,
  reducers: create => ({
    loadUsersAsync: create.asyncThunk(async () => await fetchLoadUsers(), {
      pending: state => {
        state.status = "loading";
        state.error = null;
      },
      fulfilled: (state, action) => {
        state.status = "idle";
        state.users = action.payload;
      },
      rejected: (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message?.toString() || "Unable to load users";
      },
    }),
  }),
});

export const { loadUsersAsync } = usersSlice.actions;
