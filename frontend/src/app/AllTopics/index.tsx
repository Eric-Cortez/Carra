import type React from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { loadTopicsAsync } from "@/features/topics/topicSlice";
import type { RootState } from "@/app/store";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const AllTopics: React.FC = () => {
  const dispatch = useAppDispatch();
  const { topics, status, error } = useAppSelector(
    (state: RootState) => state.topics,
  );
  const { questions } = useAppSelector((state: RootState) => state.questions);

  useEffect(() => {
    dispatch(loadTopicsAsync());
  }, [dispatch]);

  const getTopicsWithQuestionCount = (topics: Topic[], questions: Question[]) => {
    if (!topics || !questions) return [];

    const topicCounts = topics.map(topic => ({
      ...topic,
      questionCount: questions.filter(q => q.topicId === topic.id).length,
    }));

    return topicCounts.sort((a, b) => b.questionCount - a.questionCount);
  };

  const topicWithCount = getTopicsWithQuestionCount(topics, questions);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Topics</h1>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {topicWithCount.length > 0 ? (
          topicWithCount.map(topic => (
            <Link
              to={`/topics/${topic.id}`}
              key={topic.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/80 transition-colors"
            >
              <span className="font-medium">{topic.name}</span>
              {topic.questionCount > 0 && (
                <Badge className="bg-gray-200 text-gray-800">
                  {topic.questionCount}
                </Badge>
              )}
            </Link>
          ))
        ) : (
          <p>No topics available.</p>
        )}
      </div>
    </div>
  );
};

export default AllTopics;
