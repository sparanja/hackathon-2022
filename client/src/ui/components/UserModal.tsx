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

interface UserModalProps {
 title: string;
 status: StatusCode;
 transcript: string;
 onOpen?: () => void;
 onClose: () => void;
 isOpen: boolean;
 onPlayerClick: () => void;
 playerIsPlaying: boolean;
 cc: CC[];
 description: string;
}

const statusText = (status: StatusCode) => {
 if (status == StatusCode.PENDING) return "Pending";

 if (status == StatusCode.APPROVED) return "Approved";

 return "Rejected";
};

export const UserModal = ({
 title,
 status,
 onOpen,
 isOpen,
 onClose,
 cc,
 description,
}: UserModalProps) => {
 return (
  <Modal isOpen={isOpen} onClose={onClose}>
   <ModalOverlay></ModalOverlay>
   <ModalContent>
    <ModalHeader>{title}</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
     <Stack>
      <Text>
       <b>Description: </b>
       {description}
      </Text>
      <Text>
       <b>Contains: </b>
       {cc.length} words
      </Text>
      <Text>
       <b>Status: </b>
       <Text color={getStatusColor(status)} as="span">
        {statusText(status)}
       </Text>
      </Text>
     </Stack>
    </ModalBody>
    <ModalFooter></ModalFooter>
   </ModalContent>
  </Modal>
 );
};

export default UserModal;
