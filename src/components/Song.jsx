import React, { useEffect, useState } from "react";
import { Flex, Image, Text } from "@chakra-ui/react";

const Song = ({ value, onClick }) => {
  const { artist, cover, name: title, url } = value;
  const imageUrl = cover ? `https://cms.samespace.com/assets/${cover}` : "";

  // Fetch duration of the audio file
  const [duration, setDuration] = useState(null);

  useEffect(() => {
    if (url) {
      const audio = new Audio(url);
      const handleMetadata = () => {
        setDuration(audio.duration);
      };
      audio.addEventListener("loadedmetadata", handleMetadata);
      return () => {
        audio.removeEventListener("loadedmetadata", handleMetadata);
      };
    }
  }, [url]);

  // Helper function to format the duration
  const formatDuration = (duration) => {
    if (duration === null) return "Loading...";
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <Flex
      minW="100%"
      alignItems="center"
      px="10px"
      py="4"
      onClick={onClick}
      cursor="pointer"
      _hover={{ backgroundColor: "rgba(255, 255, 255, 0.08)" }}
      flexDirection={{ base: "column", md: "row" }}
      justifyContent="space-between" // Align items at the ends
    >
      {imageUrl && (
        <Image
          src={imageUrl}
          fit="cover"
          rounded="full" // Set rounded="full" for 100% border radius
          h={{ base: "60px", md: "40px" }}
          w={{ base: "60px", md: "40px" }}
          mb={{ base: "8px", md: 0 }}
          mr={{ base: 0, md: "16px" }}
          alt={title}
        />
      )}
      <Flex
        flex="1"
        flexDirection="column"
        ml={{ base: 0, md: "16px" }}
        textAlign={{ base: "center", md: "left" }}
      >
        <Text fontSize={{ base: "16px", md: "18px" }} color="#fff" mb="2">
          {title}
        </Text>
        <Text fontSize={{ base: "14px", md: "14px" }} color="#fff" opacity={0.6} mb="2">
          {artist}
        </Text>
      </Flex>
      <Text fontSize={{ base: "14px", md: "14px" }} color="#fff" opacity={0.6}>
        {formatDuration(duration)}
      </Text>
    </Flex>
  );
};

export default Song;