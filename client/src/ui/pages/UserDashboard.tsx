import * as React from "react";
import {
 Button,
 Flex,
 Stack,
 Link,
 useDisclosure,
 Box,
 Heading,
 Center,
 Avatar,
 Spacer,
 Text,
} from "@chakra-ui/react";
import UserCard from "../components/UserCard";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import StatusCode from "../common/StatusCode";
import Loader from "../components/Loader";
import axios from "axios";
import UserModal from "../components/UserModal";

const UPLOAD_LIST_URL = "http://127.0.0.1:8000/api/listAudioAds";

enum BackenStatus {
 REJECTED = "Rejected",
 APPROVED = "Approved",
 PENDING = "Pending",
}
const backendToFrontend = (backendStatus: BackenStatus) => {
 if (backendStatus == BackenStatus.APPROVED) {
  return StatusCode.APPROVED;
 }
 if (backendStatus == BackenStatus.REJECTED) {
  return StatusCode.REJECTED;
 }
 return StatusCode.PENDING;
};

interface CC {
 end: number;
 start: number;
 text: string;
}

interface Ad {
 id: string;
 title: string;
 status: StatusCode;
 audioFile: string;
 transcript: string;
 cc: CC[];
 description: string;
}

export const UserDashboard = () => {
 const audioElm = React.useRef<HTMLAudioElement>(null);
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
    if (currentAd && currentAd.audioFile == ad.audioFile) {
     audioPlayer.currentTime = 0;
    }
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
  const audioPlayer = audioElm.current;
  if (currentAd !== ad) {
   setisPlaying(false);
   if (audioPlayer) {
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
   }
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
  axios.get(UPLOAD_LIST_URL).then((res) => {
   const ads: Ad[] = [];
   res.data.forEach((el: { ad: any; transcription: any }) => {
    const { id, status, title, audio_file_name, description } = el.ad;
    const { transcript, cc } = el.transcription;

    ads.push({
     audioFile: `http://127.0.0.1:8000/api/audio/${audio_file_name}`,
     description: description,
     title: title,
     transcript: transcript,
     id: id,
     status: backendToFrontend(status),
     cc: cc,
    });
   });

   setAds(ads);
   setIsLoading(false);
  });
 }, []);

 const Adlist = ads.map((el) => {
  return (
   <UserCard
    key={el.id}
    status={el.status}
    title={el.title}
    onAboutMyAdClick={() => {
     onMoreInfoClickHandler(el);
    }}
    isPlaying={!!currentAd && el.id == currentAd.id && isPlaying}
    onPlayerClick={() => {
     onPlayClickHandler(el);
    }}
   />
  );
 });
 const userEmail: string = JSON.parse(localStorage.getItem("auth") as string)
  .user.email;

 return (
  <>
   {currentAd && (
    <UserModal
     title={currentAd.title}
     transcript={currentAd.transcript}
     status={currentAd.status}
     isOpen={isOpen}
     onClose={onCloseHanlder}
     onPlayerClick={() => onPlayClickHandler(currentAd)}
     playerIsPlaying={isPlaying}
     cc={currentAd.cc}
     description={currentAd.description}
    />
   )}
   <audio
    ref={audioElm}
    src={currentAd?.audioFile}
    onLoadedMetadata={onLoadedMetadata}
    onTimeUpdate={() => {}}
    onPause={() => {}}
    onEnded={onAudioEndedHandler}
   ></audio>
   <Stack>
    <Box
     p={4}
     display={{ md: "flex" }}
     maxWidth="32rem"
     borderWidth="1px"
     borderColor="gray"
     borderRadius={8}
     backgroundColor="white"
    >
     <Stack direction="row" w="100%" alignItems="center">
      <Avatar size="2xl" name="jon favreau" src="./imgs/avatar.jpeg" />
      <Spacer />
      <Box>
       <Heading size="sm" py={1} as={"h6"}>
        {userEmail}
       </Heading>
       <Heading size="sm" py={1} as={"h6"}>
        <Text color="green" as={"b"}>
         Approved:{" "}
        </Text>
        {
         ads.filter(({ status }) => {
          if (status == StatusCode.APPROVED) {
           return true;
          }
          return false;
         }).length
        }
       </Heading>
       <Heading size="sm" py={1} as={"h6"}>
        <Text color="red" as={"b"}>
         Rejected:{" "}
        </Text>
        {
         ads.filter(({ status }) => {
          if (status == StatusCode.REJECTED) {
           return true;
          }

          return false;
         }).length
        }
       </Heading>
      </Box>
     </Stack>
    </Box>
    <Box>
     <Stack>
      <Box
       p={0}
       display={{ md: "flex" }}
       width="32rem"
       maxW="100vw"
       borderWidth="1px"
       borderColor="gray"
       borderRadius={8}
       backgroundColor="white"
      >
       <Button w="100%" colorScheme="red" as={ReactRouterLink} to="/adcreation">
        Create A New Audio Ad
       </Button>
      </Box>
     </Stack>
     {isLoading && (
      <Center p={3}>
       <Loader />
      </Center>
     )}
    </Box>
    {!isLoading && Adlist.length > 0 && (
     <Box>
      <Stack>{Adlist}</Stack>
     </Box>
    )}
    {!isLoading && Adlist.length == 0 && (
     <Box>
      <Heading size={"sm"}>
       You have no ads, but you should create some.
      </Heading>
     </Box>
    )}
   </Stack>
  </>
 );
};

export default UserDashboard;
