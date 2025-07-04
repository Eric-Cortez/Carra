import type React from "react";
import { useEffect, useState } from "react";

import { loadQuestionsAsync } from "@/features/questions/questionSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import type { RootState } from "@/app/store";
import AskQuestionModalBtn from "@/components/AskQuestionModal";
import { useUnauthorizedRedirect } from "../authHooks";
import QuestionCard from "@/components/QuestionsCard";
import SearchBar from "@/components/SearchBar";

const Home: React.FC = () => {
  const { questions, status, error } = useAppSelector(
    (state: RootState) => state.questions,
  );
  useUnauthorizedRedirect(error);
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(loadQuestionsAsync());
  }, [dispatch]);

  const filteredQuestions = questions.filter(question =>
    question.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <>
      <div className="flex items-center justify-end p-6">
        <div className="w-1/2 mr-4">
          <SearchBar onSearch={setSearchQuery} />
        </div>
        <AskQuestionModalBtn />
      </div>
      <div className="flex items-center justify-center p-6">
        {status === "loading" && <p>Loading...</p>}
        {status === "failed" && <p>Error: {error}</p>}
        <div className="flex flex-col  items-center justify-start space-y-6">
          {filteredQuestions.length > 0
            ? filteredQuestions.map(quest => (
                <QuestionCard
                  key={quest.id}
                  id={quest.id}
                  title={quest.title}
                  content={quest.content}
                  topicId={quest.topicId}
                  createdAt={quest.createdAt}
                />
              ))
            : "No questions found."}
        </div>
      </div>
    </>
  );
};

export default Home;
