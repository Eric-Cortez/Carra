import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../app/hooks"
import { logoutUser } from "../../features/auth/authSlice"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"
import { ModeToggle } from "@/components/mode-toggle"
import { Separator } from "@/components/ui/separator"

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
    <>
      <nav className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">Carra</div>
        <div className="flex flex-row space-x-4">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Account</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink>View Profile</NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Button onClick={handleLogout}>Logout</Button>
          <ModeToggle />
        </div>
      </nav>
      <Separator />
    </>
  )
}

export default Navbar
