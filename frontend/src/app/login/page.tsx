import { useState, useEffect } from "react";
import { GalleryVerticalEnd } from "lucide-react";
import { LoginForm } from "@/components/Forms/login-form";
import lightCarImg from "../../assets/parked-black-car.jpg";
import darkCarImg from "../../assets/lambo.jpg";

export default function LoginPage() {
  const [currentTheme, setCurrentTheme] = useState<"dark" | "light">("light");
  const storageKey = "vite-ui-theme";

  useEffect(() => {
    const savedTheme = localStorage.getItem(storageKey);
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    if (savedTheme === "dark" || savedTheme === "light") {
      setCurrentTheme(savedTheme);
    } else if (savedTheme === "system" || !savedTheme) {
      setCurrentTheme(systemPrefersDark ? "dark" : "light");
    }
  }, []); // This runs once on mount

  const toggleTheme = () => {
    const newTheme = currentTheme === "light" ? "dark" : "light";
    setCurrentTheme(newTheme);
    localStorage.setItem(storageKey, newTheme);
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a
            href="TODO direct to about page? remove 'pointer-events-none' -> "
            className="flex items-center gap-2 font-medium pointer-events-none"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Carra
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src={currentTheme === "light" ? lightCarImg : darkCarImg}
          alt="parked car by Ville Kaisla on Unsplash"
          className="absolute inset-0 h-full w-full object-cover transition-all duration-300"
        />
      </div>
    </div>
  );
}
