import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/app/hooks";
import { logoutUser } from "@/features/auth/authSlice";
interface LogoutEvent extends React.MouseEvent<HTMLDivElement> {}

const AccountDropdown: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  async function handleLogout(e: LogoutEvent) {
    e.preventDefault();

    try {
      dispatch(logoutUser());

      navigate("/logout");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>Acct</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => navigate("/profile")}>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountDropdown;
