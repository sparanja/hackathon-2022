import React, { FC, useState } from "react";
import { Flex, Box, Stack, Heading, Button, Spacer } from "@chakra-ui/react";
import PlayerButton from "./PlayerButton";
import StatusCode, { getStatusColor } from "../common/StatusCode";
import StatusCirle from "./StatusCircle";

export interface UserCardProps {
 title: string;
 onPlayerClick: () => void;
 isPlaying: boolean;
 status: StatusCode;
}

const title = "A title to be displayed";

const UserCard = ({
 title,
 onPlayerClick,
 isPlaying,
 status,
}: UserCardProps) => {
 return (
  <Box
   p={4}
   display={{ md: "flex" }}
   maxWidth="32rem"
   borderWidth="1px"
   borderColor="gray"
   borderRadius={8}
   backgroundColor="white"
  >
   <Stack w="100%" spacing={5}>
    <Flex direction="row" alignItems="center">
     <Box>
      <Heading noOfLines={1}>{title}</Heading>
     </Box>
     <Spacer />
     <Box>
      <StatusCirle h={12} w={12} color={getStatusColor(status)} />
     </Box>
    </Flex>
    <Flex direction="row" alignItems="center">
     <PlayerButton size="lg" isPlaying={isPlaying} onClick={onPlayerClick} />
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
