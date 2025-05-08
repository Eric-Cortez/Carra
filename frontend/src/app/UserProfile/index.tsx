import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "@/constants/baseUrl";
import moment from "moment";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import QuestionCard from "@/components/QuestionsCard";
import { LEVELS, getUserLevel } from "@/utils/levelUtils"; // Import level utilities

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
    <div className="flex max-w-6xl mx-auto p-4 space-x-6">
      <div className="w-1/3 bg-white shadow-md rounded-lg p-6 sticky top-[80px] h-fit mt-6">
        <div className="flex items-center space-x-4">
          <Avatar className="w-24 h-24 rounded-full flex items-center justify-center text-4xl">
            <AvatarFallback>
              {user.username
                ? user.username[0].toUpperCase()
                : user.email[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold mb-2">{user.username}</h1>
            <p className="text-lg text-gray-600 mb-2">
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Member Since:</span>{" "}
              {moment(user.createdAt).format("MMMM YYYY")}
            </p>
          </div>
        </div>
        <div className="mt-6 bg-gray-50 shadow-sm rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">User Metrics</h2>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Total Questions:</span>{" "}
              {questions.length}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Active Topics:</span>{" "}
              {new Set(questions.map(question => question.topicId)).size}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Current Level:</span>{" "}
              {currentLevel.name}
            </p>
          </div>

          <div className="mt-4">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">
              Activity Overview
            </h3>
            <div className="relative group w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{
                  width: `${Math.min(
                    (engagementScore / (nextLevel?.threshold || 1000)) * 100,
                    100,
                  )}%`,
                }}
              ></div>
              {nextLevel && (
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded-md p-2 shadow-lg">
                  {pointsToNextLevel} points to reach {nextLevel.name}
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Progress to {nextLevel ? nextLevel.name : "Max Level"} (
              {Math.min(
                (engagementScore / (nextLevel?.threshold || 1000)) * 100,
                100,
              ).toFixed(1)}
              %)
            </p>
          </div>
        </div>
      </div>

      <div className="w-2/3 overflow-y-auto space-y-4">
        <h2 className="text-xl font-semibold mb-4">
          Questions by {user.username}
        </h2>
        {questions.length > 0 ? (
          questions.map(question => (
            <QuestionCard
              key={question.id}
              title={question.title}
              content={question.content}
              topicId={question.topicId}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No questions found.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
