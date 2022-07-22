import * as React from "react";
import { ChakraProvider, Container, Flex, theme } from "@chakra-ui/react";
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
import RequireAuthAdmin from "./ui/pages/RequireAuthAdmin";
import NavBar from "./ui/components/Navbar";

export const App = () => {
 return (
  <ChakraProvider theme={theme}>
   <NavBar />
   <Flex
    flexDirection="column"
    width="100wh"
    height="100vh"
    backgroundColor="gray.200"
    alignItems="center"
   >
    <Container py="6">
     <Routes>
      <Route path="/login" element={<UserLogin />} />
      <Route path="/adminlogin" element={<AdminLogin />} />

      <Route element={<RequireAuthAdmin />}>
       <Route path="/admindash" element={<AdminDashboard />} />
      </Route>
      <Route element={<RequireAuth />}>
       <Route path="/" element={<UserDashboard />} />
       <Route path="/adcreation" element={<AdCreationForm />} />
       <Route path="/adsuccess" element={<AdSuccess />} />
       <Route path="/adrejected" element={<AdRejected />} />
       <Route path="/adpending" element={<AdPending />} />
      </Route>
     </Routes>
    </Container>
   </Flex>
  </ChakraProvider>
 );
};
