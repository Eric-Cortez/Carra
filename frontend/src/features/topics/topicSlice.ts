import { createAppSlice } from "../../app/createAppSlice";
import { fetchLoadTopics } from "./topicAPI";

export interface Topic {
  id: number;
  name: string;
  userId: number;
  createdAt: string;
}

interface TopicState {
  topics: Topic[] | [];
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const initialState: TopicState = {
  topics: [],
  status: "idle",
  error: null,
};

export const topicSlice = createAppSlice({
  name: "topics",
  initialState,
  reducers: create => ({
    loadTopicsAsync: create.asyncThunk(async () => await fetchLoadTopics(), {
      pending: state => {
        state.status = "loading";
        state.error = null;
      },
      fulfilled: (state, action) => {
        state.status = "idle";
        state.topics = action.payload;
      },
      rejected: (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message?.toString() || "Unable to load topics";
      },
    }),
  }),
});

export const { loadTopicsAsync } = topicSlice.actions;
