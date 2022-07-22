import * as React from "react";
import {
 Modal,
 ModalOverlay,
 ModalContent,
 ModalHeader,
 ModalFooter,
 ModalBody,
 ModalCloseButton,
 Button,
 Text,
 Box,
 Stack,
 Flex,
 Heading,
} from "@chakra-ui/react";
import StatusCode, { getStatusColor } from "../common/StatusCode";
import PlayerButton from "./PlayerButton";

interface CC {
 end: number;
 start: number;
 text: string;
}

interface AdminModalProps {
 title: string;
 status: StatusCode;
 transcript: string;
 onOpen?: () => void;
 onClose: () => void;
 isOpen: boolean;
 onPlayerClick: () => void;
 playerIsPlaying: boolean;
 onRejectClick: () => void;
 onApproveClick: () => void;
 cc: CC[];
 playerTime: number;
}

const statusText = (status: StatusCode) => {
 if (status == StatusCode.PENDING) return "Pending";

 if (status == StatusCode.APPROVED) return "Approved";

 return "Rejected";
};

export const AdminModal = ({
 title,
 status,
 transcript,
 onOpen,
 isOpen,
 onClose,
 onPlayerClick,
 playerIsPlaying,
 onApproveClick,
 onRejectClick,
 cc,
 playerTime,
}: AdminModalProps) => {
 const statusColor = getStatusColor(status);

 const StatusEl = () => {
  return (
   <Heading>
    Status:
    <Text as="span" color={statusColor}>
     {" "}
     {statusText(status)}
    </Text>
   </Heading>
  );
 };

 const transcriptList = () => {
  return transcript.split(" ").map((s, i, a) => {
   return (
    <Text
     key={i}
     as={"span"}
     color={
      cc[i].start <= playerTime && playerTime <= cc[i].end ? "red" : undefined
     }
    >
     {i < a.length - 1 ? s + " " : s}
    </Text>
   );
  });
 };

 return (
  <Modal isOpen={isOpen} onClose={onClose}>
   <ModalOverlay></ModalOverlay>
   <ModalContent>
    <ModalHeader>{title}</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
     <Box>{<StatusEl />}</Box>
     <Stack>
      <Flex mb="-10" mr="-2" justifyContent="end">
       <PlayerButton
        size="lg"
        isPlaying={playerIsPlaying}
        onClick={onPlayerClick}
       ></PlayerButton>
      </Flex>
      <Box borderColor="grey" borderWidth={1} p={3} rounded={8}>
       <Text>{transcriptList()}</Text>
      </Box>
     </Stack>
    </ModalBody>
    <ModalFooter>
     {status === StatusCode.PENDING && (
      <Box>
       <Button colorScheme="green" onClick={onApproveClick}>
        Approve
       </Button>
       <Button colorScheme="red" onClick={onRejectClick}>
        Reject
       </Button>
      </Box>
     )}
    </ModalFooter>
   </ModalContent>
  </Modal>
 );
};

export default AdminModal;
