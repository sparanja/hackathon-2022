import React, { useRef } from "react";
import {
 Flex,
 Box,
 Stack,
 Input,
 Heading,
 Button,
 FormControl,
 FormLabel,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const UserLogin = () => {
 const navigate = useNavigate();
 const emailInput = useRef<HTMLInputElement>(null);
 const passwordInput = useRef<HTMLInputElement>(null);

 const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  if (emailInput.current && passwordInput.current) {
   console.log(emailInput.current.value);
   console.log(passwordInput.current.value);
   const user = { email: emailInput.current.value };
   localStorage.setItem("auth", JSON.stringify({ user }));
   navigate("/");
  }
 };

 return (
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
     <form onSubmit={onSubmit}>
      <Stack
       spacing={4}
       p="4rem"
       backgroundColor="whiteAlpha.900"
       boxShadow="md"
      >
       <FormControl pb="10">
        <FormLabel>Email address</FormLabel>
        <Input
         ref={emailInput}
         type="email"
         placeholder="johnsmith@website.com"
         required
        />
       </FormControl>
       <FormControl pb="10">
        <FormLabel>Email address</FormLabel>
        <Input
         ref={passwordInput}
         type="password"
         placeholder="Password"
         required
        />
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
};

export default UserLogin;
