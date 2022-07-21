import React from "react";

import { Icon } from "@chakra-ui/react";

export const StatusCirle = ({
 w,
 h,
 color,
}: {
 w: number;
 h: number;
 color: string;
}) => {
 return (
  <Icon w={w} h={h} viewBox="0 0 200 200" color={color}>
   <path
    fill="currentColor"
    d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
   />
  </Icon>
 );
};

export default StatusCirle;
