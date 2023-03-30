import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../App";

const SecureRoute = () => {
  const [user, setUser] = useContext(UserContext);
  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <div
      className="container px-lg-4 py-md-4 py-3"
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Outlet />
    </div>
  );
};
export default SecureRoute;
