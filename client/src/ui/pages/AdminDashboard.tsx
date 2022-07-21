import * as React from "react";
import { Box, Flex, Stack } from "@chakra-ui/react";
import AdminCard, { StatusCodes } from "../components/AdminCard";
import {
 Modal,
 ModalOverlay,
 ModalContent,
 ModalHeader,
 ModalFooter,
 ModalBody,
 ModalCloseButton,
 useDisclosure,
 Button,
} from "@chakra-ui/react";

export const AdminDashboard = () => {
 const mp3 = "./audio/Dunkin.mp3";
 const audioElm = React.useRef<HTMLAudioElement>(null);
 const title = "A very long title for this Ad";
 const statusCode = StatusCodes.APPROVED;
 const { isOpen, onOpen, onClose } = useDisclosure();
 const [isPlaying, setisPlaying] = React.useState(false);
 const onPlayClickHandler = () => {
  const updateIsPlaying = !isPlaying;
  setisPlaying(updateIsPlaying);
  const audioPlayer = audioElm.current;
  if (audioPlayer) {
   if (updateIsPlaying) {
    audioPlayer.play();
   } else {
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
   }
  }
 };
 const onPlayMoreInfoClickHandler = () => {
  if (!isOpen) {
   onOpen();
  }
 };
 const onAudioEndedHandler = () => {
  setisPlaying(false);
  const audioPlayer = audioElm.current;
  if (audioPlayer) {
   audioPlayer.pause();
  }
 };

 return (
  <>
   <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay></ModalOverlay>
    <ModalContent>
     <ModalHeader>{title}</ModalHeader>
     <ModalCloseButton />
     <ModalBody>Lorem</ModalBody>
     <ModalFooter>
      <Button colorScheme="green">Approve</Button>
      <Button colorScheme="red">Reject</Button>
     </ModalFooter>
    </ModalContent>
   </Modal>
   <Flex
    flexDirection="column"
    width="100wh"
    height="100vh"
    backgroundColor="gray.200"
    alignItems="center"
   >
    <audio
     ref={audioElm}
     src={mp3}
     onTimeUpdate={() => {}}
     onPause={() => {}}
     onEnded={onAudioEndedHandler}
    ></audio>
    <AdminCard
     title={title}
     status={statusCode}
     isPlaying={isPlaying}
     onPlayClick={onPlayClickHandler}
     onMoreInfoClick={onPlayMoreInfoClickHandler}
    />
   </Flex>
  </>
 );
};
export default AdminDashboard;
