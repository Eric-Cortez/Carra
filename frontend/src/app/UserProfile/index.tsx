import type React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "@/constants/baseUrl";
import moment from "moment";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import QuestionCard from "@/components/QuestionsCard";
import { getUserLevel } from "@/utils/levelUtils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Mail, CalendarDays, BarChart2, Hash } from "lucide-react";

interface User {
  id: number;
  username: string;
  email: string;
  createdAt: string;
}

interface Question {
  id: number;
  title: string;
  content: string;
  topicId: number;
  createdAt: string;
}

const UserProfile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${BASE_URL}/users/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          setQuestions(data.user.questions || []);
        } else {
          setError("Failed to fetch user details");
        }
      } catch (err) {
        setError(
          "Error fetching user details: " +
            (err instanceof Error ? err.message : "Unknown error"),
        );
      }
    };

    fetchUser();
  }, [userId]);

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!user) {
    return <p className="text-center">Loading...</p>;
  }

  const engagementScore = questions.length * 10;
  const { currentLevel, nextLevel, pointsToNextLevel } =
    getUserLevel(engagementScore);

  return (
    <div className="flex flex-col md:flex-row max-w-6xl mx-auto p-6 gap-6">
      <div className="md:w-1/3 space-y-6">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-col items-center text-center p-6">
            <Avatar className="w-32 h-32 mb-4 border-4 border-primary-foreground shadow-md">
              <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.username || user.email}`} />
              <AvatarFallback className="text-5xl font-semibold">
                {user.username
                  ? user.username[0].toUpperCase()
                  : user.email.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-4xl font-extrabold tracking-tight">
              {user.username || user.email}
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground flex items-center gap-2 mt-2">
              <Mail className="w-5 h-5" /> {user.email}
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-4">
            <div className="flex items-center justify-center text-sm text-muted-foreground">
              <CalendarDays className="w-4 h-4 mr-2" /> Member Since:{" "}
              {moment(user.createdAt).format("MMMM D, YYYY")}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-center pt-4 border-t">
            <p className="text-sm text-muted-foreground">"The journey of a thousand miles begins with a single step."</p>
          </CardFooter>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">User Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-center justify-between">
              <p className="text-base font-medium text-muted-foreground flex items-center gap-2"><BarChart2 className="w-5 h-5" /> Total Questions:</p>
              <p className="text-xl font-semibold text-primary">{questions.length}</p>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <p className="text-base font-medium text-muted-foreground flex items-center gap-2"><Hash className="w-5 h-5" /> Active Topics:</p>
              <p className="text-xl font-semibold text-primary">{new Set(questions.map(question => question.topicId)).size}</p>
            </div>
            <Separator />
            <div>
              <p className="text-base font-medium text-muted-foreground mb-2">Current Level: <span className="font-semibold text-blue-600">{currentLevel.name}</span></p>
              <Progress
                value={Math.min(
                  (engagementScore / (nextLevel?.threshold || 1)) * 100,
                  100,
                )}
                className="w-full h-3 bg-muted-foreground/20"
              />
              {nextLevel && (
                <p className="text-sm text-muted-foreground mt-2">
                  <span className="font-semibold">{pointsToNextLevel}</span> points to reach <span className="font-semibold">{nextLevel.name}</span>
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="md:w-2/3 space-y-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Questions by {user.username || user.email}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {questions.length > 0 ? (
              questions.map(question => (
                <QuestionCard
                  key={question.id}
                  id={question.id}
                  title={question.title}
                  content={question.content}
                  topicId={question.topicId}
                  createdAt={question.createdAt}
                  
                />
              ))
            ) : (
              <p className="text-center text-muted-foreground">No questions found.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;

