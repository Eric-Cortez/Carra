import { BASE_URL } from "@/constants/baseUrl";
import { UNAUTHORIZED, UNAUTHORIZED_CODE } from "@/constants/statusCodes";
import { clearAuthState } from "@/utils/authHelpers";

export async function fetchLoadTopics() {
  try {
    const response = await fetch(`${BASE_URL}/topics`, {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      return data.topics;
    } else if (response.status === UNAUTHORIZED_CODE) {
      clearAuthState();
      throw new Error(UNAUTHORIZED);
    }
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}
