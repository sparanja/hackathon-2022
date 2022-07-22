import * as React from "react";
import {
 Flex,
 Box,
 Stack,
 Input,
 Button,
 FormControl,
 FormLabel,
 Image,
 Center,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const AdminLogin = () => {
 const navigate = useNavigate();
 const emailInput = React.useRef<HTMLInputElement>(null);
 const passwordInput = React.useRef<HTMLInputElement>(null);

 const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  if (emailInput.current && passwordInput.current) {
   console.log(emailInput.current.value);
   console.log(passwordInput.current.value);
   const user = { email: emailInput.current.value, isAdmin: true };
   localStorage.setItem("auth", JSON.stringify({ user }));
   navigate("/admindash");
  }
 };
 return (
  <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center">
   <Box minW={{ base: "90%", md: "468px" }}>
    <form onSubmit={onSubmit}>
     <Stack
      spacing={2}
      p="4rem"
      backgroundColor="whiteAlpha.900"
      boxShadow="md"
     >
      <Center h="150px">
       <Image
        width="150px"
        height="150px"
        src="./imgs/iHeartBeat.png"
        alt="iHeartBeat Logo"
       />
      </Center>
      <FormControl pb="10">
       <FormLabel>Email address</FormLabel>
       <Input ref={emailInput} type="email" />
      </FormControl>
      <FormControl pb="10">
       <FormLabel>Passwrod</FormLabel>
       <Input ref={passwordInput} type="password" />
      </FormControl>
      <Button type="submit" variant="solid" colorScheme="red" width="full">
       Login
      </Button>
     </Stack>
    </form>
   </Box>
  </Stack>
 );
};

export default AdminLogin;
