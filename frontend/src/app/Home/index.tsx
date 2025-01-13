import { Badge } from "@/components/ui/badge";
import { BASE_URL } from "@/constants/baseUrl";
import type React from "react";
import { useEffect, useState } from "react";
import moment from "moment";
import QuestionForm from "@/components/Forms/question-form";

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
  const [questions, setQuestions] = useState<Question[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);

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

    async function getAllQuestions() {
      try {
        const response = await fetch(`${BASE_URL}/questions`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (response.ok) {
          const data: { questions: Question[] } = await response.json();
          setQuestions(data.questions);
        }
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
        }
      }
    }
    getAllTopics();
    getAllQuestions();
  }, []);

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
        <div className="flex items-center justify-center p-6">
          <QuestionForm />
        </div>
        <div className="flex items-center justify-center p-6">
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
