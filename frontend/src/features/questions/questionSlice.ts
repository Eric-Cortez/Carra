import { createAppSlice } from "../../app/createAppSlice";
import { fetchLoadQuestion } from "./questionAPI";
export interface Question {
  content: string;
  createdAt: string;
  id: number;
  title: string;
  topicId: number;
  userId: number;
}

interface QuestionState {
  questions: Question[] | [];
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const initialState: QuestionState = {
  questions: [],
  status: "idle",
  error: null,
};

export const questionSlice = createAppSlice({
  name: "questions",
  initialState,
  reducers: create => ({
    loadQuestionsAsync: create.asyncThunk(
      async () => await fetchLoadQuestion(),
      {
        pending: state => {
          state.status = "loading";
          state.error = null;
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          state.questions = action.payload;
        },
        rejected: (state, action) => {
          state.status = "failed";
          state.error =
            action.error.message?.toString() || "Unable to load questions";
        },
      },
    ),
  }),
});

export const { loadQuestionsAsync } = questionSlice.actions;
