import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useState } from "react";
import type { RootState } from "@/app/store";
import { loginAsync } from "@/features/auth/authSlice";
export type LoginCredentials = {
  email: string;
  password: string;
};
export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
  });

  const status = useAppSelector((state: RootState) => state.auth.status);
  const error = useAppSelector((state: RootState) => state.auth.error);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await dispatch(loginAsync(credentials)).unwrap();
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };
  // TODO seed demo user in db
  const handleDemoLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await dispatch(loginAsync({ email: "demo@gmail.com", password: "demo" }));
      navigate("/");
    } catch (err) {
      console.log("Demo login failed");
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <div>{status === "failed" && error && <div>{error}</div>}</div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="m@example.com"
            required
            value={credentials.email}
            onChange={handleChange}
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            {/* TODO
            <a
              href="TODO"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a> */}
          </div>
          <Input
            id="password"
            type="password"
            name="password"
            required
            value={credentials.password}
            onChange={handleChange}
          />
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Logging in..." : "Login"}
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div>
        <Button variant="outline" className="w-full" onClick={handleDemoLogin}>
          Demo
        </Button>
      </div>
      {/* TODO
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="TODO" className="underline underline-offset-4">
          Sign up
        </a>
      </div> */}
    </form>
  );
}
