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

interface AdminModalProps {
 title: string;
 status: StatusCode;
 transcript: string;
 onOpen?: () => void;
 onClose: () => void;
 isOpen: boolean;
 onPlayerClick: () => void;
 playerIsPlaying: boolean;
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

 return (
  <Modal isOpen={isOpen} onClose={onClose}>
   <ModalOverlay></ModalOverlay>
   <ModalContent>
    <ModalHeader>{title}</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
     <Stack>
      <Flex mb="-10" mr="-2" justifyContent="end">
       <PlayerButton
        size="lg"
        isPlaying={playerIsPlaying}
        onClick={onPlayerClick}
       ></PlayerButton>
      </Flex>
      <Box borderColor="grey" borderWidth={1} p={3} rounded={8}>
       <Text>{transcript}</Text>
      </Box>
     </Stack>
    </ModalBody>
    <ModalFooter>
     {status === StatusCode.PENDING && (
      <Box>
       <Button colorScheme="green">Approve</Button>
       <Button colorScheme="red">Reject</Button>
      </Box>
     )}
     {status !== StatusCode.PENDING && <StatusEl />}
    </ModalFooter>
   </ModalContent>
  </Modal>
 );
};

export default AdminModal;
