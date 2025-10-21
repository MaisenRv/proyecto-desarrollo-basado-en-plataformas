import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PrivateRoute;