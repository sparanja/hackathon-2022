import { Navigate, Outlet, useLocation } from "react-router-dom";

const useAuth = () => {
 const item = localStorage.getItem("auth");
 if (item) {
  return JSON.parse(item) as { user: any };
 }
 return { user: undefined };
};
export const RequireAuth = () => {
 let auth = useAuth();
 let location = useLocation();
 if (!auth.user) {
  return <Navigate to="/login" state={{ from: location }} />;
 }
 return <Outlet />;
};

export default RequireAuth;
