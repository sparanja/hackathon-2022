import React, { useState } from "react";
import {
 Flex,
 Box,
 Stack,
 Input,
 InputGroup,
 Heading,
 Button,
 FormControl,
 FormLabel,
 FormHelperText,
} from "@chakra-ui/react";

export const UserLogin = () => (
 <Flex
  flexDirection="column"
  width="100wh"
  height="100vh"
  backgroundColor="gray.200"
  justifyContent="center"
  alignItems="center"
 >
  <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center">
   <Heading color="red" pb="10">
    An IHM Logo
   </Heading>
   <Box minW={{ base: "90%", md: "468px" }}>
    <form>
     <Stack
      spacing={4}
      p="4rem"
      backgroundColor="whiteAlpha.900"
      boxShadow="md"
     >
      <FormControl pb="10">
       <FormLabel>Email address</FormLabel>
       <Input type="email" placeholder="johnsmith@website.com" />
      </FormControl>
      <FormControl pb="10">
       <FormLabel>Email address</FormLabel>
       <Input type="password" placeholder="Password" />
      </FormControl>
      <Button type="submit" variant="solid" colorScheme="red" width="full">
       Login
      </Button>
     </Stack>
    </form>
   </Box>
  </Stack>
 </Flex>
);

export default UserLogin;
