import { BASE_URL } from "@/constants/baseUrl";

export async function fetchLoadQuestion() {
  try {
    const res = await fetch(`${BASE_URL}/questions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (res.ok) {
      const data = await res.json();
      return data.questions;
    }
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}
