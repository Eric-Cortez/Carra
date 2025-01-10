import { Badge } from "@/components/ui/badge";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
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
          console.log(data.questions);
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
    <ResizablePanelGroup
      direction="vertical"
      className="min-h-[200px] max-w-full rounded-lg border md:min-w-[450px]"
    >
      <ResizablePanel defaultSize={25}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Ask a question?</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={75}>
        <div className="flex flex-col h-full items-center justify-start p-6 space-y-6 overflow-y-auto">
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
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default Home;
