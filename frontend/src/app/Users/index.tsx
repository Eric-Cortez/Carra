import type React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { loadUsersAsync } from "@/features/users/usersSlice";
import type { RootState } from "@/app/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

const Users: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users, status, error } = useAppSelector(
    (state: RootState) => state.users,
  );
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(loadUsersAsync());
  }, [dispatch]);

  const filteredUsers = users.filter(
    user =>
      (user.username || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Explore Users</h1>
        <Input
          type="search"
          placeholder="Search users..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-1/3"
        />
      </div>
      {status === "loading" && <p>Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredUsers.length > 0 ? (
          filteredUsers.map(user => (
            <Link to={`/users/${user.id}`} key={user.id}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Avatar>
                    <AvatarImage
                      src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.username || user.email}`}
                    />
                    <AvatarFallback>
                      {user.username
                        ? user.username.charAt(0)
                        : user.email.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                </CardHeader>
                <CardContent>
                  <CardTitle>{user.username || user.email}</CardTitle>
                  <p className="text-gray-600">{user.email}</p>
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <p className="text-center col-span-full">No users found</p>
        )}
      </div>
    </div>
  );
};

export default Users;
