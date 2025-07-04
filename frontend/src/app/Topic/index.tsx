import type React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { loadQuestionsAsync } from "@/features/questions/questionSlice";
import type { RootState } from "@/app/store";
import QuestionCard from "@/components/QuestionsCard";
import { loadTopicsAsync } from "@/features/topics/topicSlice";

const Topic: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const dispatch = useAppDispatch();

  const { questions } = useAppSelector((state: RootState) => state.questions);
  const { topics } = useAppSelector((state: RootState) => state.topics);

  const topic = topics.find(t => t.id === Number(topicId));

  useEffect(() => {
    dispatch(loadQuestionsAsync());
    dispatch(loadTopicsAsync());
  }, [dispatch]);

  const filteredQuestions = questions.filter(
    q => q.topicId === Number(topicId),
  );

  return (
    <div className="p-6">
      {topic ? (
        <>
          <h1 className="text-2xl font-bold mb-4">{topic.name}</h1>
          <div className="space-y-4">
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map(quest => (
                <QuestionCard
                  key={quest.id}
                  id={quest.id}
                  title={quest.title}
                  content={quest.content}
                  topicId={quest.topicId}
                  createdAt={quest.createdAt}
                />
              ))
            ) : (
              <p>No questions available for this topic.</p>
            )}
          </div>
        </>
      ) : (
        <p>Topic not found.</p>
      )}
    </div>
  );
};

export default Topic;
