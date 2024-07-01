import React from "react";
import { Box, Flex, Image, Avatar } from "@chakra-ui/react";
import { Assets } from "../Assets"; // Ensure the Assets module has the paths to the logo and a default avatar image

const Sidebar = () => {
  return (
    <Flex
      h="100%"
      position={"fixed"}
      flexDirection="column"
      justifyContent="space-between"
      alignItems="flex-start"
     
      p={4} // Reduced padding
      color="black"
      maxW="200px" // Reduced max width
    >
      <Box>
        <Image src={Assets.LogoIcon} alt="Spotify Logo" mb={2} />
      </Box>
      <Box>
        <Avatar size="md" name="User Name" src={Assets.ProfileIcon} />
      </Box>
    </Flex>
  );
};

export default Sidebar;