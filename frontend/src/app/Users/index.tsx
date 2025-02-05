import type React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UNAUTHORIZED_CODE } from "../../constants/statusCodes";
import { BASE_URL } from "@/constants/baseUrl";

interface User {
  id: number;
  username: string;
  email: string;
}

const Users: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${BASE_URL}/users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setUsers(data.users);
        } else {
          setError("Failed to fetch users");
          if (response.status === UNAUTHORIZED_CODE) {
            navigate("/login");
          }
        }
      } catch (err) {
        setError(
          "Error fetching users: " +
            (err instanceof Error ? err.message : "Unknown error"),
        );
      }
    };

    fetchUsers();
  }, [navigate]);

  return (
    <div>
      <h1>Explore Users</h1>
      {error && <p>{error}</p>}
      <ul>
        {users.length > 0 ? (
          users.map(user => (
            <li key={user.id}>
              {user.username} ({user.email})
            </li>
          ))
        ) : (
          <p>No users found</p>
        )}
      </ul>
    </div>
  );
};
export default Users;
