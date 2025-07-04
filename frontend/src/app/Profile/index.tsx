import type React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UNAUTHORIZED_CODE } from "../../constants/statusCodes";
import { BASE_URL } from "@/constants/baseUrl";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAppSelector } from "../hooks";
import { useTheme } from "@/components/theme-provider";

interface UserData {
  id: number;
  username: string;
  email: string;
  bio: string;
  createdAt: string;
}

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const currentUser = useAppSelector(state => state.auth.user);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [editableUsername, setEditableUsername] = useState("");
  const [editableEmail, setEditableEmail] = useState("");
  const [editableBio, setEditableBio] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const { theme, setTheme } = useTheme();
  const [feedbackMessage, setFeedbackMessage] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!currentUser?.id) {
        navigate("/login");
        return;
      }
      try {
        const response = await fetch(`${BASE_URL}/users/${currentUser.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (response.ok) {
          const data: { user: UserData } = await response.json();
          setUserData(data.user);
          setEditableUsername(data.user.username || "");
          setEditableEmail(data.user.email || "");
          setEditableBio(data.user.bio || "");
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
  }, [navigate, currentUser]);

  const handleProfileSave = () => {
    // Simulate API call
    return new Promise<void>(resolve => {
      setTimeout(() => {
        
        setFeedbackMessage({ message: "Profile updated successfully!", type: "success" });
        resolve();
      }, 1000);
    }).then(() => {
      setTimeout(() => {
        setFeedbackMessage(null);
      }, 3000);
    });
  };

  const handlePasswordChange = () => {
    // Simulate API call
    return new Promise<void>(resolve => {
      setTimeout(() => {
        
        setFeedbackMessage({ message: "Password change initiated!", type: "success" });
        resolve();
      }, 1000);
    }).then(() => {
      setTimeout(() => {
        setFeedbackMessage(null);
      }, 3000);
    });
  };

  if (error) {
    return (
      <div className="p-4 text-center text-destructive">{error}</div>
    );
  }

  if (!userData) {
    return (
      <div className="p-4 text-center text-muted-foreground">Loading profile...</div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-4rem)] p-4">
      <Card className="w-full max-w-3xl shadow-lg rounded-2xl p-4">
        <CardHeader className="flex flex-col items-center text-center">
          <Avatar className="w-24 h-24 mb-4 border-4 border-primary-foreground shadow-md">
            <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${userData.username || userData.email}`} />
            <AvatarFallback className="text-4xl font-semibold">
              {userData.username
                ? userData.username[0].toUpperCase()
                : userData.email.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-3xl font-bold">{userData.username || userData.email}</CardTitle>
          <CardDescription className="text-md text-muted-foreground">
            {editableBio || "No bio provided."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {feedbackMessage && (
            <div
              className={`p-3 mb-4 rounded-md text-center ${feedbackMessage.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
            >
              {feedbackMessage.message}
            </div>
          )}
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            <TabsContent value="profile" className="p-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={editableUsername}
                  onChange={e => setEditableUsername(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={editableEmail}
                  onChange={e => setEditableEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Input
                  id="bio"
                  value={editableBio}
                  onChange={e => setEditableBio(e.target.value)}
                />
              </div>
              <Button onClick={handleProfileSave}>Save Profile</Button>
            </TabsContent>
            <TabsContent value="settings" className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <Switch
                  id="email-notifications"
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <Switch
                  id="dark-mode"
                  checked={theme === "dark"}
                  onCheckedChange={(checked: boolean) => setTheme(checked ? "dark" : "light")}
                />
              </div>
            </TabsContent>
            <TabsContent value="security" className="p-4 space-y-4">
              <Button onClick={handlePasswordChange}>Change Password</Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
