import { Badge } from "@/components/ui/badge";
import { BASE_URL } from "@/constants/baseUrl";
import type React from "react";
import { useEffect, useState } from "react";
import moment from "moment";

interface Question {
  content: string;
  createdAt: string;
  id: number;
  title: string;
  topicId: number;
  userId: number;
}

const Home: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
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
    getAllQuestions();
  }, []);

  return (
    <div className="flex">
      <div className="flex h-fit items-center justify-center m-4 p-8 border rounded-lg">
        <span className="font-semibold">Topics</span>
      </div>
      <div>
        <div className="flex items-center justify-center p-6">
          <span className="font-semibold">Ask a question?</span>
        </div>
        <div className="flex h-full items-center justify-center p-6">
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
