import type React from "react";
import { Badge } from "@/components/ui/badge";
import moment from "moment";
import { useAppSelector } from "@/app/hooks";
import type { RootState } from "@/app/store";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

interface QuestionCardProps {
  id: number;
  title: string;
  content: string;
  topicId: number;
  createdAt: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  _id, // Renamed to match the interface
  title,
  content,
  topicId,
  createdAt,
}) => {
  const { topics } = useAppSelector((state: RootState) => state.topics);

  const topicName = topics.find(topic => topic.id === topicId)?.name;

  return (
    <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-base text-gray-700 dark:text-gray-300">{content}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Badge variant="secondary">{topicName}</Badge>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {moment(createdAt).fromNow()}
        </div>
      </CardFooter>
    </Card>
  );
};

export default QuestionCard;
