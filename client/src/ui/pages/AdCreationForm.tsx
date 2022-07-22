import * as React from "react";
import {
 Box,
 Button,
 Flex,
 FormControl,
 FormLabel,
 Heading,
 Input,
 Spacer,
 Spinner,
 Stack,
 Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import { Link as ReactRouterLink } from "react-router-dom";

export const AdCreationForm = () => {
 const fileInput = React.useRef<HTMLInputElement>(null);
 const adNameInput = React.useRef<HTMLInputElement>(null);
 const adDescriptionInput = React.useRef<HTMLTextAreaElement>(null);
 const [isMakingRequest, setIsMakingReuquest] = React.useState(false);
 const UPLOAD_URL = "http://127.0.0.1:8000/api/upload";

 const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  /*
   ToDo handling for backend
   */
  event.preventDefault();
  if (fileInput.current && adNameInput.current && adDescriptionInput.current) {
   /**
    * {
    * adName:
    * adDescription:
    * audioFile
    * }
    * */
   console.log(fileInput.current.value);
   console.log(adNameInput.current.value);
   console.log(adDescriptionInput.current.value);
   console.log({
    adName: adNameInput.current.value,
    adDescriptionInput: adDescriptionInput.current.value,
    file: fileInput.current.value,
   });

   if (fileInput.current.files) {
    const formData = new FormData();
    formData.append("name", adNameInput.current.value);
    formData.append("description", adDescriptionInput.current.value);
    formData.append("fileName", fileInput.current.files[0].name);
    formData.append("file", fileInput.current.files[0]);
    axios
     .post(UPLOAD_URL, formData, {
      headers: {
       "Content-Type": "multipart/form-data",
      },
     })
     .then((res) => {
      console.log("File Uploaded");
     })
     .catch((err) => {
      console.log(err);
     });
   }
   setIsMakingReuquest(true);
  }
 };

 if (isMakingRequest) {
  return (
   <Flex
    flexDirection="column"
    width="100wh"
    height="100vh"
    backgroundColor="gray.200"
    justifyContent="center"
    alignItems="center"
   >
    <Stack spacing={6}>
     <Box minW={{ base: "90%", md: "468px" }}>
      <Stack spacing={6} justifyContent="center">
       <Box>
        <Heading color="red" pb="10">
         An IHM Logo
        </Heading>
       </Box>
       <Box>
        <Heading p="3">Finishing Your Ad Placement</Heading>
       </Box>
       <Box>
        <Spinner
         thickness="4px"
         speed="0.65s"
         emptyColor="gray"
         color="red"
         size="xl"
        />
       </Box>
       <Box>
        <Button colorScheme="red" as={ReactRouterLink} to="/">
         Check Back Later
        </Button>
       </Box>
      </Stack>
     </Box>
    </Stack>
   </Flex>
  );
 }

 return (
  <Flex
   flexDirection="column"
   width="100wh"
   height="100vh"
   backgroundColor="gray.200"
   justifyContent="center"
   alignItems="center"
  >
   <Stack spacing={6}>
    <Heading color="red" pb="10">
     An IHM Logo
    </Heading>
    <Box minW={{ base: "90%", md: "468px" }}>
     <form onSubmit={handleSubmit}>
      <Stack
       spacing={4}
       p="4rem"
       backgroundColor="whiteAlpha.900"
       boxShadow="md"
      >
       <FormControl pb="10">
        <FormLabel>Ad Name:</FormLabel>
        <Input
         ref={adNameInput}
         type="text"
         placeholder="Your Ad Name..."
         required
        />
       </FormControl>
       <FormControl pb="10">
        <FormLabel>Ad Description:</FormLabel>
        <Textarea
         ref={adDescriptionInput}
         placeholder="Your Ad lists the following about your Company's Product"
         required
        />
       </FormControl>
       <FormControl pb="10">
        <FormLabel>Audio File:</FormLabel>
        <Input ref={fileInput} type="file" required />
       </FormControl>
       <FormControl pb="10">
        <Flex flexDirection="row">
         <Button type="submit" variant="solid" colorScheme="red">
          Submit
         </Button>
         <Spacer />
         <Button>Reset</Button>
        </Flex>
       </FormControl>
      </Stack>
     </form>
    </Box>
   </Stack>
  </Flex>
 );
};

export default AdCreationForm;
