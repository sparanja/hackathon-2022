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

export const AdCreationForm = () => {
 const fileInput = React.useRef<HTMLInputElement>(null);
 const adNameInput = React.useRef<HTMLInputElement>(null);
 const adDescriptionInput = React.useRef<HTMLTextAreaElement>(null);
 const [isMakingRequest, setIsMakingReuquest] = React.useState(false);

 const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  /*
   ToDo handling for backend
   */
  event.preventDefault();
  if (fileInput && adNameInput && adDescriptionInput) {
   console.log(fileInput);
   console.log(adNameInput);
   console.log(adDescriptionInput);
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
        <Button>Check Back Later</Button>
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
