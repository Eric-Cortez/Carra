import type React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UNAUTHORIZED_CODE } from "../../constants/statusCodes";
import { BASE_URL } from "@/constants/baseUrl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Mail } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import QuestionCard from "@/components/QuestionsCard";

interface Question {
  id: number;
  title: string;
  topicId: number;
  content: string;
  createdAt: string;
}

interface User {
  id: number;
  username: string;
  email: string;
  createdAt: string;
  questions: Question[];
}

interface UserResponse {
  user: User;
}

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Get data for the last 7 days
  const getLastSevenDays = (questions: Question[]) => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toISOString().split("T")[0];
    }).reverse();

    const questionsByDate = questions.reduce(
      (acc: { [key: string]: number }, question) => {
        const date = new Date(question.createdAt).toISOString().split("T")[0];
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      },
      {},
    );

    return last7Days.map(date => ({
      name: date,
      total: questionsByDate[date] || 0,
    }));
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${BASE_URL}/users/1`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (response.ok) {
          const data: UserResponse = await response.json();
          setUser(data.user);
        } else {
          setError("Failed to fetch user");
          if (response.status === UNAUTHORIZED_CODE) {
            navigate("/login");
          }
        }
      } catch (err) {
        setError(
          "Error fetching user: " +
            (err instanceof Error ? err.message : "Unknown error"),
        );
      }
    };

    fetchUser();
  }, [navigate]);

  if (error) {
    return (
      <div className="p-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-destructive">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-4">
        <Card>
          <CardContent className="pt-6">
            <p>Loading...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const chartData = getLastSevenDays(user.questions);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback>
                {user.username
                  ? user.username[0].toUpperCase()
                  : user.email[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CalendarDays className="h-4 w-4" />
                <span>
                  Joined {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Questions Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <XAxis
                      dataKey="name"
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={value => `${value}`}
                    />
                    <Bar
                      dataKey="total"
                      fill="currentColor"
                      radius={[4, 4, 0, 0]}
                      className="fill-primary"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Separator />

          <div>
            <h2 className="text-xl font-semibold mb-4">Questions</h2>
            <div className="space-y-4 ">
              {user.questions.length > 0 ? (
                user.questions.map(quest => (
                  <QuestionCard
                    key={quest.id}
                    title={quest.title}
                    content={quest.content}
                    topicId={quest.topicId}
                    createdAt={quest.createdAt}
                  />
                ))
              ) : (
                <p className="text-muted-foreground">No questions posted yet</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
