import type React from "react";
import { Badge } from "@/components/ui/badge";
import moment from "moment";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import type { RootState } from "@/app/store";
import { useEffect } from "react";
import { loadTopicsAsync } from "@/features/topics/topicSlice";

interface QuestionCardProps {
  title: string;
  content: string;
  topicId: number;
  createdAt: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  title,
  content,
  topicId,
  createdAt,
}) => {
  const dispatch = useAppDispatch();
  const { topics } = useAppSelector((state: RootState) => state.topics);

  const topicName = topics.find(topic => topic.id === topicId)?.name;
  useEffect(() => {
    dispatch(loadTopicsAsync());
  }, [dispatch]);

  return (
    <div className="border p-4 rounded-lg w-full">
      <div className="text-lg font-semibold">{title}</div>
      <div className="mt-2">{content}</div>
      <div className="mt-4 flex items-center justify-between">
        <Badge className="bg-gray-200 text-gray-800">{topicName}</Badge>
        <div className="text-sm text-gray-500">
          {moment(createdAt, "YYYYMMDD").startOf("hour").fromNow()}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
