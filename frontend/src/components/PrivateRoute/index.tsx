import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
