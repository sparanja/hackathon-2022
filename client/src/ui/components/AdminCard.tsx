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

export enum StatusCodes {
 PENDING = "PENDING",
 APPROVED = "APPROVED",
 REJECTED = "REJECTED",
}

export interface AdminCardProps {
 title: string;
 status: StatusCodes;
 isPlaying: boolean;
 transcript?: string;
 onMoreInfoClick: () => void;
 onPlayClick: () => void;
}

const AdminCard = ({
 title,
 status,
 isPlaying,
 transcript,
 onMoreInfoClick,
 onPlayClick,
}: AdminCardProps) => {
 const statusColor = (): string => {
  if ((status = StatusCodes.APPROVED)) {
   return "green";
  }
  if ((status = StatusCodes.REJECTED)) {
   return "red";
  }
  return "yellow";
 };

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
     <Spacer />
     <Box px={3}>
      <Icon w={12} h={12} viewBox="0 0 200 200" color={statusColor()}>
       <path
        fill="currentColor"
        d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
       />
      </Icon>
     </Box>
    </Flex>
    <Flex direction="row" alignItems="center">
     <Box width="200px" px={3}>
      <Heading fontSize="xs" noOfLines={4}>
       {transcript}
      </Heading>
     </Box>
     <Spacer />
     <Box px={3}>
      <Button onClick={onMoreInfoClick}>More Info</Button>
     </Box>
     <Spacer />
     <Box px={3}>
      <PlayerButton isPlaying={isPlaying} onClick={onPlayClick} />
     </Box>
    </Flex>
   </Stack>
  </Box>
 );
};

export default AdminCard;
