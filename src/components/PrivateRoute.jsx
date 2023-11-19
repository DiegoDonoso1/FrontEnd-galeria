import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export function PrivateRoute({ element, isAuthenticated }) {
  return isAuthenticated ? element : <Navigate to="/login" />;
}
