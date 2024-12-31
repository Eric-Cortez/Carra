import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../app/hooks"
import { logoutUser } from "../../features/auth/authSlice"

interface LogoutEvent extends React.MouseEvent<HTMLButtonElement> {}

function Navbar() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  async function handleLogout(e: LogoutEvent): Promise<void> {
    e.preventDefault()

    try {
      dispatch(logoutUser())

      navigate("/")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }
  return (
    <nav>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  )
}

export default Navbar
