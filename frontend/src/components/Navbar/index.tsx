import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "@/components/mode-toggle";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import AccountDropdown from "../account-dropdown";

const Navbar: React.FC = () => {
  return (
    <div className={cn("sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60")}>
      <nav className="container mx-auto flex h-16 items-center justify-between px-1">
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-xl font-bold tracking-tight hover:text-primary transition-colors"
          >
            Carra
          </Link>
        </div>

        <NavigationMenu>
          <NavigationMenuList className="flex items-center gap-4">
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={cn(
                  navigationMenuTriggerStyle(),
                  "bg-transparent hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Link to="/users" className="flex items-center">
                  Network
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem className="flex items-center">
              <ModeToggle />
            </NavigationMenuItem>

            <NavigationMenuItem className="cursor-pointer">
              <div className="ml-2">
                <AccountDropdown />
              </div>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
      <Separator className="opacity-50" />
    </div>
  );
};

export default Navbar;
