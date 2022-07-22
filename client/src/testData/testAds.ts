import StatusCode from "../ui/common/StatusCode";
import HomeDepot from "./Home_Depot_commercial.json";
const dunkin = "./audio/Dunkin.mp3";
const homedepot = "./audio/HomeDepot.mp3";
const homeDepotTranscript = HomeDepot.results.transcripts[0].transcript;
const dunkintranscript =
 "New Dunkin refreshers, vibrant fruit flavors like strawberry, dragon fruit and peach passion fruit, B vitamins and energy from green tea, all under 200 calories. Order ahead via the Duncan effort. Contact this way to order, pay and pick up in the drive through. America runs on Dunkin Price and participation may very limited time offer.";

const testAds = () => {
 return [
  {
   id: "dunkin",
   title: "The Dunkin Donuts Advertisement",
   status: StatusCode.APPROVED,
   audioFile: dunkin,
   transcript: dunkintranscript,
  },
  {
   id: "homedepot",
   title: "The HomeDepot Advertisement",
   status: StatusCode.PENDING,
   audioFile: homedepot,
   transcript: homeDepotTranscript,
  },
  {
   id: "dunkin2",
   title: "2 The Dunkin Donuts Advertisement",
   status: StatusCode.REJECTED,
   audioFile: "http://127.0.0.1:8000/api/audio/Home_Depot_commercial.mp3",
   transcript: dunkintranscript,
  },
 ];
};

export default testAds();
