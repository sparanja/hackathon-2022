import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { Routes, Route, useLocation, Outlet, Navigate } from "react-router-dom";
import UserLogin from "./ui/pages/UserLogin";
import AdminDashboard from "./ui/pages/AdminDashboard";
import UserDashboard from "./ui/pages/UserDashboard";
import AdCreationForm from "./ui/pages/AdCreationForm";
import AdminLogin from "./ui/pages/AdminLogin";

const isLoggedIn = () => {
 const LoggedIn = false;
 return !!LoggedIn;
};

const CustomWrapper = ({ isLoggedIn, ...props }: any) => {
 const location = useLocation();
 if (!isLoggedIn) {
  return <Navigate to={`/login`} replace state={{ location }} />;
 }
 return <Outlet />;
};

export const App = () => (
 <ChakraProvider theme={theme}>
  <Routes>
   <Route path="/login" element={<UserLogin />} />
   <Route path="/adminlogin" element={<AdminLogin />} />
   <Route path="/admindash" element={<AdminDashboard />} />
   <Route path="" element={<CustomWrapper isLoggedIn={isLoggedIn} />}>
    <Route path="" element={<UserDashboard />} />
   </Route>
   <Route path="/adcreation" element={<AdCreationForm />} />
  </Routes>
 </ChakraProvider>
);
