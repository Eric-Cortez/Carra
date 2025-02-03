import { clearAuthState } from "@/utils/authHelpers";
import type { LoginCredentials } from "../../components/Forms/login-form";
import { BASE_URL } from "../../constants/baseUrl";
import { UNAUTHORIZED, UNAUTHORIZED_CODE } from "@/constants/statusCodes";

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
  } else if (response.status === UNAUTHORIZED_CODE) {
    clearAuthState();
    throw new Error(UNAUTHORIZED);
  }

  return data.user;
};

export const fetchLogout = async () => {
  const response = await fetch(`${BASE_URL}/logout`, {
    method: "POST",
  });
  if (response.ok) {
    clearAuthState();
  } else if (!response.ok) {
    throw new Error(`Logout failed. Status code: ${response.status}`);
  }
};
