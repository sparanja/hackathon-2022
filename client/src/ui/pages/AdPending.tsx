import * as React from "react";
import { Button, Center, Flex, Heading, Image, Stack } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

export const AdPending = () => {
 return (
  <Stack spacing={6}>
   <Center pb={10}>
    <Image
     boxSize="200px"
     objectFit="contain"
     display="inline-block"
     src="./imgs/IHM.png"
     alt="IHM logo"
    />
   </Center>
   <Heading pb="10">
    Your Ad has our system a bit confused, well need to manually review it.
   </Heading>
   <Button w="100%" colorScheme="red" as={ReactRouterLink} to="/">
    Back To Profile
   </Button>
  </Stack>
 );
};

export default AdPending;
