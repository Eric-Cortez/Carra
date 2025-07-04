import type React from "react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import type { RootState } from "@/app/store";
import type { Topic } from "@/features/topics/topicSlice";
import type { Question } from "@/features/questions/questionSlice";
import { loadTopicsAsync } from "@/features/topics/topicSlice";
import { loadQuestionsAsync } from "@/features/questions/questionSlice";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { topics } = useAppSelector((state: RootState) => state.topics);
  const { questions } = useAppSelector((state: RootState) => state.questions);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadTopicsAsync());
    dispatch(loadQuestionsAsync());
  }, [dispatch]);

  const getTopicsWithQuestionCount = (
    topics: Topic[],
    questions: Question[],
  ) => {
    if (!topics || !questions) return [];

    const topicCounts = topics.map(topic => ({
      ...topic,
      questionCount: questions.filter(q => q.topicId === topic.id).length,
    }));

    return topicCounts.sort((a, b) => b.questionCount - a.questionCount);
  };

  const topicWithCount = getTopicsWithQuestionCount(topics, questions);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-16 h-[calc(100%-4rem)] flex flex-col border-r bg-background transition-all duration-300 ease-in-out z-40",
          isSidebarOpen ? "w-64" : "w-16 group",
        )}
      >
        <div className="flex justify-end w-full p-2 mt-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
          </Button>
        </div>

        <div className="flex flex-col flex-grow overflow-hidden">
          <Link
            to="/topics"
            className={cn(
              "text-2xl font-bold p-4 text-center transition-transform duration-300 ease-in-out",
              !isSidebarOpen && "rotate-90 whitespace-nowrap",
            )}
          >
            Topics
          </Link>
          {isSidebarOpen && (
            <div className="flex flex-col space-y-4">
              {topicWithCount.slice(0, 5).map(topic => (
                <Link
                  to={`/topics/${topic.id}`}
                  key={`${topic.id}`}
                  className="flex items-center py-2 px-4 hover:bg-secondary/80"
                >
                  {topic.questionCount > 0 && (
                    <Badge className="bg-gray-200 text-gray-800 mr-2">
                      {topic.questionCount}
                    </Badge>
                  )}
                  <span>{topic.name}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div
        className={cn(
          "flex flex-col flex-grow transition-all duration-300 ease-in-out",
          isSidebarOpen ? "ml-64" : "ml-16",
        )}
      >
        {/* Page Content */}
        <div className="p-6"> {/* Removed pt-20 */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;