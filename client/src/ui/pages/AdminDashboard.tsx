import * as React from "react";
import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import AdminCard, { StatusCode } from "../components/AdminCard";
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
import AdminModal from "../components/AdminModal";
import HomeDepot from "../../testData/Home_Depot_commercial.json";

const transcript = HomeDepot.results.transcripts[0].transcript;
const cc: {
 text: string;
 start: number;
 end: number;
}[] = [];
HomeDepot.results.items.forEach(({ alternatives, end_time, start_time }) => {
 if (start_time && end_time) {
  cc.push({
   text: alternatives[0].content,
   start: parseFloat(start_time),
   end: parseFloat(end_time),
  });
 }
});

const tanscriptAndCC = {
 transcript,
 cc,
};

interface Ad {
 id: string;
 title: string;
 status: StatusCode;
 audioFile: string;
 transcript: string;
}

export const AdminDashboard = () => {
 const dunkin = "./audio/Dunkin.mp3";
 const homedepot = "./audio/HomeDepot.mp3";
 const audioElm = React.useRef<HTMLAudioElement>(null);
 const title = "A very long title for this Ad";
 const statusCode = StatusCode.APPROVED;
 const { isOpen, onOpen, onClose } = useDisclosure();
 const [isPlaying, setisPlaying] = React.useState(false);
 const [ads, setAds] = React.useState<Ad[]>([]);
 const [isLoading, setIsLoading] = React.useState<boolean>(true);
 const [currentAd, setCurrentAd] = React.useState<Ad | null>(null);
 const onCloseHanlder = () => {
  onClose();
 };
 const onPlayClickHandler = (ad: Ad) => {
  // If Current Ad is the ad
  // Flip Is playing
  const audioPlayer = audioElm.current;
  if (ad == currentAd) {
   const updateIsPlaying = !isPlaying;
   setisPlaying(updateIsPlaying);
   if (audioPlayer) {
    if (updateIsPlaying) {
     audioPlayer.play();
    } else {
     audioPlayer.pause();
     audioPlayer.currentTime = 0;
    }
   }
  } else {
   if (audioPlayer) {
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
   }
   setisPlaying(true);
   setCurrentAd(ad);
  }
 };
 const onLoadedMetadata = () => {
  if (isPlaying) {
   const audioPlayer = audioElm.current;
   if (audioPlayer) {
    audioPlayer.play();
   }
  }
 };
 const onMoreInfoClickHandler = (ad: Ad) => {
  if (currentAd !== ad) {
   setisPlaying(false);
  }
  setCurrentAd(ad);
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

 React.useEffect(() => {
  setIsLoading(true);
  setTimeout(() => {
   setAds([
    {
     id: "dunkin",
     title: "The Dunkin Donuts Advertisement",
     status: StatusCode.APPROVED,
     audioFile: dunkin,
     transcript: transcript,
    },
    {
     id: "homedepot",
     title: "The HomeDepot Advertisement",
     status: StatusCode.PENDING,
     audioFile: homedepot,
     transcript: transcript,
    },
    {
     id: "dunkin2",
     title: "2 The Dunkin Donuts Advertisement",
     status: StatusCode.REJECTED,
     audioFile: dunkin,
     transcript: transcript,
    },
   ]);
   setIsLoading(false);
  }, 3000);
 }, []);

 const AdList = ads.map((el) => {
  return (
   <AdminCard
    key={el.id}
    title={el.title}
    status={el.status}
    transcript={el.transcript}
    isPlaying={!!currentAd && el.id == currentAd.id && isPlaying}
    onPlayClick={() => {
     onPlayClickHandler(el);
    }}
    onMoreInfoClick={() => {
     onMoreInfoClickHandler(el);
    }}
   />
  );
 });

 return (
  <>
   {currentAd ? (
    <AdminModal
     title={currentAd.title}
     transcript={currentAd.transcript}
     status={currentAd.status}
     isOpen={isOpen}
     onClose={onCloseHanlder}
     onPlayerClick={() => onPlayClickHandler(currentAd)}
     playerIsPlaying={isPlaying}
    />
   ) : undefined}
   <Flex
    flexDirection="column"
    width="100wh"
    height="100vh"
    backgroundColor="gray.200"
    alignItems="center"
   >
    <audio
     ref={audioElm}
     src={currentAd?.audioFile}
     onLoadedMetadata={onLoadedMetadata}
     onTimeUpdate={() => {}}
     onPause={() => {}}
     onEnded={onAudioEndedHandler}
    ></audio>
    {AdList}
   </Flex>
  </>
 );
};
export default AdminDashboard;
