import type React from "react";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { UNAUTHORIZED } from "../../constants/statusCodes";

// Define types for the user data
interface User {
  id: number;
  username: string;
  email: string;
}

const Users: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]); // Users state is an array of User objects
  const [error, setError] = useState<string | null>(null); // Error state can be a string or null

  // Fetch users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8080/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // No need to manually add Authorization header; HttpOnly cookie will be sent automatically
          },
          credentials: "include", // Ensure cookies are included in the request (for cross-origin requests)
        });

        if (response.ok) {
          const data = await response.json(); // Type the response as an array of User objects
          setUsers(data.users);
        } else {
          setError("Failed to fetch users");
          if (response.status === UNAUTHORIZED) {
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
      <Navbar />
      <h1>Home Page</h1>
      <h2>User List</h2>
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
