import * as React from "react";
import { Box, Button, Flex, Stack, Link } from "@chakra-ui/react";
import UserCard from "../components/UserCard";
import { Link as ReactRouterLink } from "react-router-dom";

const logoutHandler = () => {};

export const UserDashboard = () => (
 <Flex
  flexDirection="column"
  width="100wh"
  height="100vh"
  backgroundColor="gray.200"
  alignItems="center"
 >
  <Stack>
   <Button onClick={logoutHandler}>LogOut</Button>
   <Button colorScheme="red" as={ReactRouterLink} to="/adcreation">
    Create A New Audio Ad
   </Button>
   <UserCard />
  </Stack>
 </Flex>
);

export default UserDashboard;
