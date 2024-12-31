import { useState } from "react"
import type React from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../app/hooks"
import { useAppSelector } from "../../app/hooks"
import type { RootState } from "../../app/store"

import Cookies from "js-cookie"
import { loginAsync } from "../../features/auth/authSlice"

export type LoginCredentials = {
  email: string
  password: string
}

function Login() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
  })

  const status = useAppSelector((state: RootState) => state.auth.status)
  const error = useAppSelector((state: RootState) => state.auth.error)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCredentials({
      ...credentials,
      [name]: value,
    })
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await dispatch(loginAsync(credentials)).unwrap()
      navigate("/home")
    } catch (err) {
      //   console.error("Login failed:", error)
      console.error("Login failed:", err)
    }
  }

  return (
    <div>
      <h2>Login</h2>
      {status === "failed" && error && <div>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
