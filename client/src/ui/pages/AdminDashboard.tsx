import * as React from "react";
import { Box, Center, Flex, Stack, Text } from "@chakra-ui/react";
import AdminCard, { StatusCode } from "../components/AdminCard";
import { useDisclosure } from "@chakra-ui/react";
import AdminModal from "../components/AdminModal";
import HomeDepot from "../../testData/Home_Depot_commercial.json";
import Loader from "../components/Loader";
import testAds from "../../testData/testAds";
import axios from "axios";

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
const cc: {
 text: string;
 start: number;
 end: number;
}[] = [];

interface Ad {
 id: string;
 title: string;
 status: StatusCode;
 audioFile: string;
 transcript: string;
}

export const AdminDashboard = () => {
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
 const approveClickHandler = () => {
  if (currentAd && currentAd.status == StatusCode.PENDING) {
   let newCurrentAd: Ad | null = null;
   const newAds = ads.map(({ audioFile, id, status, title, transcript }) => {
    const newAd = {
     audioFile,
     id,
     status: id === currentAd.id ? StatusCode.APPROVED : status,
     title,
     transcript,
    };
    if (id === currentAd.id) {
     newCurrentAd = newAd;
    }
    return newAd;
   });
   setAds(newAds);
   if (newCurrentAd) {
    setCurrentAd(newCurrentAd);
   }
  }
 };

 const rejectClickHandler = () => {
  if (currentAd && currentAd.status == StatusCode.PENDING) {
   let newCurrentAd: Ad | null = null;
   const newAds = ads.map(({ audioFile, id, status, title, transcript }) => {
    const newAd = {
     audioFile,
     id,
     status: id === currentAd.id ? StatusCode.REJECTED : status,
     title,
     transcript,
    };
    if (id === currentAd.id) {
     newCurrentAd = newAd;
    }
    return newAd;
   });
   setAds(newAds);
   if (newCurrentAd) {
    setCurrentAd(newCurrentAd);
   }
  }
 };

 React.useEffect(() => {
  setIsLoading(true);
  axios.get(UPLOAD_LIST_URL).then((res) => {
   console.log(res);
   const ads: Ad[] = [];
   res.data.forEach((el: { ad: any; transcription: any }) => {
    const { id, status, title, audio_file_name } = el.ad;
    const { transcript } = el.transcription;

    ads.push({
     audioFile: `http://127.0.0.1:8000/api/audio/${audio_file_name}`,
     title: title,
     transcript: transcript,
     id: id,
     status: backendToFrontend(status),
    });
   });
   console.log(ads);
   setAds(ads);
   setIsLoading(false);
  });
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
   {currentAd && (
    <AdminModal
     title={currentAd.title}
     transcript={currentAd.transcript}
     status={currentAd.status}
     isOpen={isOpen}
     onClose={onCloseHanlder}
     onPlayerClick={() => onPlayClickHandler(currentAd)}
     playerIsPlaying={isPlaying}
     onApproveClick={approveClickHandler}
     onRejectClick={rejectClickHandler}
    />
   )}

   {isLoading && (
    <Center p={3}>
     <Loader />
    </Center>
   )}
   <audio
    ref={audioElm}
    src={currentAd?.audioFile}
    onLoadedMetadata={onLoadedMetadata}
    onTimeUpdate={() => {}}
    onPause={() => {}}
    onEnded={onAudioEndedHandler}
   ></audio>
   {AdList}
  </>
 );
};
export default AdminDashboard;
