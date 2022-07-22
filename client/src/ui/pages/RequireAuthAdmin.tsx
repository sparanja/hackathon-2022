import { Navigate, Outlet, useLocation } from "react-router-dom";

const useAuth = () => {
 const item = localStorage.getItem("auth");
 if (item) {
  return JSON.parse(item) as { user: any };
 }
 return { user: undefined };
};
export const RequireAuthAdmin = () => {
 let auth = useAuth();
 let location = useLocation();
 if (!auth.user || !auth.user.isAdmin) {
  return <Navigate to="/adminlogin" state={{ from: location }} />;
 }
 return <Outlet />;
};

export default RequireAuthAdmin;
