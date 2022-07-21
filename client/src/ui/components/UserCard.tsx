import React, { FC, useState } from "react";
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
 Spacer,
 Icon,
} from "@chakra-ui/react";
import PlayerButton from "./PlayerButton";
import StatusCodes, { getStatusColor } from "../common/StatusCodes";
import StatusCirle from "./StatusCircle";

export interface UserCardProps {}

const title = "A title to be displayed";
const nothing = () => {
 console.log("Noting was called");
};

const UserCard = () => {
 return (
  <Box
   p={4}
   display={{ md: "flex" }}
   maxWidth="32rem"
   borderWidth="1px"
   borderColor="gray"
   borderRadius={8}
   backgroundColor="white"
   margin={2}
  >
   <Stack spacing={5}>
    <Flex direction="row" alignItems="center">
     <Box>
      <Heading noOfLines={1}>{title}</Heading>
     </Box>
     <Box>
      <StatusCirle h={12} w={12} color="red" />
     </Box>
    </Flex>
    <Flex direction="row" alignItems="center">
     <PlayerButton size="lg" isPlaying={false} onClick={nothing} />
     <Spacer />
     <Box>
      <Button>Fix Ad</Button>
     </Box>
    </Flex>
   </Stack>
  </Box>
 );
};

export default UserCard;
