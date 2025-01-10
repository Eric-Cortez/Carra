import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logoutUser } from "../../features/auth/authSlice";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface LogoutEvent extends React.MouseEvent<HTMLButtonElement> {}

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);

  async function handleLogout(e: LogoutEvent): Promise<void> {
    e.preventDefault();

    try {
      dispatch(logoutUser());

      navigate("/logout");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }
  return (
    <div className="sticky top-0 z-50">
      <nav className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <Link to="/">Carra</Link>
        </div>
        <div className="flex flex-row space-x-4">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/users">
                  <NavigationMenuLink>Network</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  {user?.username ? user.username : "Account"}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <Link to="/profile">
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      View Profile
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Button onClick={handleLogout}>Logout</Button>
          <ModeToggle />
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </nav>
      <Separator />
    </div>
  );
}

export default Navbar;
