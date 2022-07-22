import * as React from "react";
import {
 Box,
 Button,
 Heading,
 Input,
 Link,
 Progress,
 Stack,
 Text,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

export const KitchenSink = () => (
 <Box fontSize="xl">
  <Stack spacing={6}>
   <Box>
    <Heading as="h1">Kitchen Sink</Heading>
   </Box>
   <Box>
    <Heading>Buttons</Heading>
    <Button colorScheme="red">Button</Button>
    <Button colorScheme="gray">Button</Button>
   </Box>
   <Box>
    <Heading>Player</Heading>
   </Box>
   <Box>
    <Heading>Progress</Heading>
    <Progress value={80} />
   </Box>
   <Box>
    <Heading>Form</Heading>
   </Box>
   <Box>
    <Heading>Text Input</Heading>
    <Input placeholder="Basic usage" />
   </Box>
   <Box>
    <Heading>IHM Logo</Heading>
   </Box>
   <Box>
    <Heading>Headers</Heading>
    <Heading>This is a header</Heading>
   </Box>
   <Box>
    <Heading>Text</Heading>
    <Text fontSize="5xl">(5xl) In love with React & Next</Text>
   </Box>
   <Box>
    <Heading>Link</Heading>
    <Link as={ReactRouterLink} to="/login">
     Login
    </Link>
   </Box>
  </Stack>
 </Box>
);

export default KitchenSink;
