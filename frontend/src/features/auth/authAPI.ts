import type { LoginCredentials } from "../../components/login-form";
import { BASE_URL } from "../../constants/baseUrl";

export const fetchLogin = async (credentials: LoginCredentials) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
    credentials: "include",
  });
  const data = await response.json();

  if (!response.ok) {
    const errorMessage = data?.error
      ? data.error
      : "An error occurred. Please try again.";
    throw new Error(errorMessage);
  }

  return data.user;
};

export const fetchLogout = async () => {
  const response = await fetch(`${BASE_URL}/logout`, {
    method: "POST",
  });
  if (!response.ok) {
    throw new Error(`Logout failed. Status code: ${response.status}`);
  }
};
