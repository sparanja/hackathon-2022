import * as React from "react";
import KitchenSink from "./KitchenSink";
import { ChakraProvider, Container, theme } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import UserLogin from "./ui/pages/UserLogin";
import AdminDashboard from "./ui/pages/AdminDashboard";
import UserDashboard from "./ui/pages/UserDashboard";
import AdCreationForm from "./ui/pages/AdCreationForm";
import AdminLogin from "./ui/pages/AdminLogin";

export const App = () => (
 <ChakraProvider theme={theme}>
  <Routes>
   <Route path="/" element={<UserLogin />} />
   <Route path="adminlogin" element={<AdminLogin />} />
   <Route path="/admindash" element={<AdminDashboard />} />
   <Route path="/userdash" element={<UserDashboard />} />
   <Route path="/adcreation" element={<AdCreationForm />} />
  </Routes>
 </ChakraProvider>
);
