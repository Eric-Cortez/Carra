import { UNAUTHORIZED } from "@/constants/statusCodes";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Custom hook that redirects the user to the login page if an "Unauthorized" error is found in the Redux state.
 *
 * This hook listens for changes to the `error` variable (which should be part of the Redux state).
 * If the `error` value is "Unauthorized", the user is automatically redirected to the login page ("/login").
 *
 * This hook uses the `useNavigate` hook from `react-router-dom` to handle the redirection.
 *
 * @param {string | null} error - The error message from the Redux state that triggers the redirect.
 *                             If the error is "Unauthorized", the redirect to "/login" occurs.
 *
 * @returns {void} This hook does not return any value.
 *
 * @example
 * // In your component
 * const { error } = useAppSelector((state: RootState) => state.questions,);
 * useUnauthorizedRedirect(error);
 */

export const useUnauthorizedRedirect = (error: string | null) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (error === UNAUTHORIZED) {
      navigate("/login");
    }
  }, [error, navigate]);
};
