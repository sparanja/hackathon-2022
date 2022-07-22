import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { Routes, Route, useLocation, Outlet, Navigate } from "react-router-dom";
import UserLogin from "./ui/pages/UserLogin";
import AdminDashboard from "./ui/pages/AdminDashboard";
import UserDashboard from "./ui/pages/UserDashboard";
import AdCreationForm from "./ui/pages/AdCreationForm";
import AdminLogin from "./ui/pages/AdminLogin";
import AdSuccess from "./ui/pages/AdSuccess";
import AdRejected from "./ui/pages/AdRejected";
import AdPending from "./ui/pages/AdPending";
import RequireAuth from "./ui/pages/RequireAuth";

export const App = () => {
 return (
  <ChakraProvider theme={theme}>
   <Routes>
    <Route path="/login" element={<UserLogin />} />
    <Route path="/adminlogin" element={<AdminLogin />} />
    <Route element={<RequireAuth />}>
     <Route path="/admindash" element={<AdminDashboard />} />
     <Route path="/" element={<UserDashboard />} />
     <Route path="/adcreation" element={<AdCreationForm />} />
     <Route path="/adsuccess" element={<AdSuccess />} />
     <Route path="/adrejected" element={<AdRejected />} />
     <Route path="/adpending" element={<AdPending />} />
    </Route>
   </Routes>
  </ChakraProvider>
 );
};
