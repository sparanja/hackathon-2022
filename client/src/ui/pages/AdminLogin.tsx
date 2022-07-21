import * as React from "react";
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
 Image,
 Center,
} from "@chakra-ui/react";

export const AdminLogin = () => (
 <Flex
  flexDirection="column"
  width="100wh"
  height="100vh"
  backgroundColor="gray.200"
  justifyContent="center"
  alignItems="center"
 >
  <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center">
   <Box minW={{ base: "90%", md: "468px" }}>
    <form>
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
       <Input type="email" />
      </FormControl>
      <FormControl pb="10">
       <FormLabel>Passwrod</FormLabel>
       <Input type="password" />
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

export default AdminLogin;
