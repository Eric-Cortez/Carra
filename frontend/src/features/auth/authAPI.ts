import type { LoginCredentials } from "../../pages/Login"

export const BASEURL = "http://localhost:8080"
export const fetchLogin = async (credentials: LoginCredentials) => {
  const response = await fetch(`${BASEURL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
    credentials: "include",
  })
  const data = await response.json()

  if (!response.ok) {
    const errorMessage = data?.error
      ? data.error
      : "An error occurred. Please try again."
    throw new Error(errorMessage)
  }

  return data.user
}

export const fetchLogout = async () => {
  const response = await fetch(`${BASEURL}/logout`, {
    method: "POST",
  })
  if (!response.ok) {
    throw new Error(`Logout failed. Status code: ${response.status}`)
  }
}
