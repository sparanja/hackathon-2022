import * as React from "react";
import { Box, Button, Flex, Stack } from "@chakra-ui/react";
import UserCard from "../components/UserCard";

export const UserDashboard = () => (
 <Flex
  flexDirection="column"
  width="100wh"
  height="100vh"
  backgroundColor="gray.200"
  alignItems="center"
 >
  <Stack>
   <Button colorScheme="red">Create A New Audio Ad</Button>
   <UserCard />
  </Stack>
 </Flex>
);

export default UserDashboard;
