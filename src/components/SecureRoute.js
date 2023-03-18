import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../App";

const SecureRoute = () => {
  const [user, setUser] = useContext(UserContext);
  if (!user) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};
export default SecureRoute;
