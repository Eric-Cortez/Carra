import { Badge } from "@/components/ui/badge";
import { BASE_URL } from "@/constants/baseUrl";
import type React from "react";
import { useEffect, useState } from "react";
import moment from "moment";
import QuestionForm from "@/components/Forms/question-form";
import { loadQuestionsAsync } from "@/features/questions/questionSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import type { RootState } from "@/app/store";
import AskQuestionModalBtn from "@/components/AskQuestionModal";

export interface Question {
  content: string;
  createdAt: string;
  id: number;
  title: string;
  topicId: number;
  userId: number;
}

export interface Topic {
  name: string;
  id: number;
  createdAt: string;
  userId: number;
}

const Home: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const { questions, status, error } = useAppSelector(
    (state: RootState) => state.questions,
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    async function getAllTopics() {
      try {
        const response = await fetch(`${BASE_URL}/topics`, {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setTopics(data.topics);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getAllTopics();

    dispatch(loadQuestionsAsync());
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
                    {/* TODO add topic, and user info */}
                    <div>
                      <Badge>Topic</Badge>
                      <div>
                        {moment(quest.createdAt, "YYYYMMDD")
                          .startOf("hour")
                          .fromNow()}
                      </div>
                    </div>
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
