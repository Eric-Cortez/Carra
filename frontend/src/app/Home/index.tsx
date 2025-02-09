import { Badge } from "@/components/ui/badge";
import type React from "react";
import { useEffect } from "react";
import moment from "moment";
import { loadQuestionsAsync } from "@/features/questions/questionSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import type { RootState } from "@/app/store";
import AskQuestionModalBtn from "@/components/AskQuestionModal";
import { useUnauthorizedRedirect } from "../authHooks";
import { loadTopicsAsync } from "@/features/topics/topicSlice";

const Home: React.FC = () => {
  const { questions, status, error } = useAppSelector(
    (state: RootState) => state.questions,
  );
  const { topics } = useAppSelector((state: RootState) => state.topics);
  useUnauthorizedRedirect(error);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadQuestionsAsync());
    dispatch(loadTopicsAsync());
  }, [dispatch]);

  return (
    <div className="flex">
      <div className="flex flex-col h-fit items-center justify-center m-4 border rounded-lg">
        <span className="font-semibold bottom-1 p-4">Topics</span>
        <div className="inline-block">
          {topics &&
            topics.map(topic => (
              <div
                key={`${topic.id}`}
                className="py-2 px-4 hover:bg-secondary/80"
              >
                {topic.name}
                {/* TODO Link to topics page */}
              </div>
            ))}
        </div>
      </div>
      <div>
        <div className="flex items-center justify-end p-6">
          <AskQuestionModalBtn />
        </div>
        <div className="flex items-center justify-center p-6">
          {status === "loading" && <p>Loading...</p>}
          {status === "failed" && <p>Error: {error}</p>}
          <div className="flex flex-col  items-center justify-start space-y-6">
            {questions
              ? questions.map(quest => (
                  <div key={quest.id} className="border p-4 rounded-lg w-full">
                    <div>{quest.title}</div>
                    <div> {quest.content}</div>
                    {topics && (
                      <div>
                        <Badge>
                          {
                            topics.find(topic => topic.id === quest.topicId)
                              ?.name
                          }
                        </Badge>
                        <div>
                          {moment(quest.createdAt, "YYYYMMDD")
                            .startOf("hour")
                            .fromNow()}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              : "Be the first to ask a question!"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
