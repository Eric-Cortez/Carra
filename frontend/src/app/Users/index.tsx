import type React from "react";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
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
          setFilteredUsers(data.users); // Initialize filtered users
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

  useEffect(() => {
    // Filter users based on the search term (by username or email)
    const filtered = users.filter(
      user =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Explore Users</h1>
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-1/3 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredUsers.length > 0 ? (
          filteredUsers.map(user => (
            <Link
              to={`/users/${user.id}`} // Link to the user profile page
              key={user.id}
              className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold">{user.username}</h2>
              <p className="text-gray-600">{user.email}</p>
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
