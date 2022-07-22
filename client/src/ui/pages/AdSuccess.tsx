import * as React from "react";
import { Button, Flex, Heading, Stack } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

export const AdSuccess = () => {
 return (
  <Flex
   flexDirection="column"
   width="100wh"
   height="100vh"
   backgroundColor="gray.200"
   justifyContent="center"
   alignItems="center"
  >
   <Stack spacing={6}>
    <Heading color="red" pb="10">
     An IHM Logo
    </Heading>
    <Heading pb="10">Your Ad placement was a success</Heading>
    <Button w="100%" colorScheme="red" as={ReactRouterLink} to="/">
     Back To Profile
    </Button>
   </Stack>
  </Flex>
 );
};

export default AdSuccess;
