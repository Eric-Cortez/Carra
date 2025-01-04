import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../app/hooks"
import { logoutUser } from "../../features/auth/authSlice"
import logo from "../../assets/logo.svg"
import { Button } from "@/components/ui/button"

interface LogoutEvent extends React.MouseEvent<HTMLButtonElement> {}

function Navbar() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  async function handleLogout(e: LogoutEvent): Promise<void> {
    e.preventDefault()

    try {
      dispatch(logoutUser())

      navigate("/logout")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }
  return (
    <nav>
      <img src={logo} alt="Icon" width="100" height="100" />
      <Button onClick={handleLogout}>Logout</Button>
    </nav>
  )
}

export default Navbar
