import * as React from "react";
import { Box, Flex, Image, Spacer, Stack, Link } from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
export const NavBar = () => {
 const navigate = useNavigate();
 const logoutHandler = () => {
  localStorage.removeItem("auth");
  navigate("/");
 };
 return (
  <Flex
   align="center"
   justify="center"
   bg="white"
   color="red"
   position="static"
   boxSize="full"
   px={3}
   alignItems="center"
   borderColor="red"
   borderBottomWidth="2px"
  >
   <Box h="64px" w="64px">
    <Image
     width="64px"
     height="64px"
     src="./imgs/iHeartBeat.png"
     alt="iHeartBeat Logo"
    />
   </Box>
   <Spacer />
   <Box>
    <Stack direction="row">
     <Link px="3" as={ReactRouterLink} to="/adminlogin">
      Admin Area
     </Link>
     <Link px="3" as={ReactRouterLink} to="/">
      Home
     </Link>
     <Link px="3" as={"button"} onClick={logoutHandler}>
      Logout
     </Link>
    </Stack>
   </Box>
  </Flex>
 );
};

export default NavBar;
