import React, { useState, useRef, useEffect } from "react";
import { Box, Stack } from "@chakra-ui/react";
import { FaPause, FaPlay } from "react-icons/fa";
import { IconButton, Icon } from "@chakra-ui/react";

const PlayerIcon = ({ isPlaying }: { isPlaying: boolean }) => {
 return isPlaying ? <Icon as={FaPause} /> : <Icon as={FaPlay} />;
};

interface PlayerButtonProps {
 isPlaying?: boolean;
 size?: string;
 onClick: () => void;
}

export const PlayerButton = ({
 isPlaying = false,
 size = "md",
 onClick,
}: PlayerButtonProps) => {
 return (
  <IconButton
   colorScheme="red"
   onClick={onClick}
   isRound={true}
   aria-label={isPlaying ? "Pause audio" : "Play Audio"}
   icon={<PlayerIcon isPlaying={isPlaying} />}
   size={size}
  />
 );
};

export default PlayerButton;
