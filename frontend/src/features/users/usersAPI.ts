import { BASE_URL } from "@/constants/baseUrl";
import { UNAUTHORIZED, UNAUTHORIZED_CODE } from "@/constants/statusCodes";
import { clearAuthState } from "@/utils/authHelpers";

export async function fetchLoadUsers() {
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
      return data.users;
    } else if (response.status === UNAUTHORIZED_CODE) {
      clearAuthState();
      throw new Error(UNAUTHORIZED);
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}
