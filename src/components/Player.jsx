import React from "react";
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

const Player = ({
  activeSong,
  activeIndex,
  curPlayer,
  setActiveIndex,
  handleClickNext,
  handleClickPrev,
  isMobile,
  setIsModalOpen,
  songs,
}) => {
  if (!activeSong) {
    return (
      <Flex
        w="100%"
        color="#fff"
        fontSize="2rem"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        px={5}
        py={10}
        bg="black.800"
        borderRadius="lg"
      >
        <Text>Select a song to play</Text>
        {isMobile && (
          <Button
            mt={4}
            variant="outline"
            colorScheme="teal"
            onClick={() => setIsModalOpen(true)}
          >
            Select Song
          </Button>
        )}
      </Flex>
    );
  }

  const { artist, cover, name: title, url } = activeSong;
  const imageUrl = cover ? `https://cms.samespace.com/assets/${cover}` : "";

  return (
    <Box
      w="100%"
      p={5}
      borderRadius={{ base: "none", md: "lg" }}
      bg="#000000"
      boxShadow={{ base: "0 -2px 10px rgba(0, 0, 0, 0.3)", md: "lg" }}
      color="white"
      position={{ base: "fixed", md: "relative" }}
      bottom={{ base: 0, md: "auto" }}
      left={{ base: 0, md: "auto" }}
      right={{ base: 0, md: "auto" }}
      zIndex={1000}
    >
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent={{ base: "space-between", md: "center" }}
      >
        <Text fontWeight="bold" fontSize={{ base: "16px", md: "32px" }} mb={2}>
          {title}
        </Text>
        <Text fontSize={{ base: "12px", md: "16px" }} opacity={0.8} mb={4}>
          {artist}
        </Text>
        {imageUrl && (
          <Image
            mb={4}
            src={imageUrl}
            alt={title}
            maxW="100%"
            objectFit="cover"
            borderRadius="md"
            display={{ base: "none", md: "block" }}
          />
        )}
        <AudioPlayer
          showSkipControls={true}
          onClickNext={handleClickNext}
          onClickPrevious={handleClickPrev}
          key={activeIndex}
          src={url}
          ref={curPlayer}
          autoPlay
          loop={false}
          showJumpControls={false}
          style={{
            background: "transparent",
            width: "100%",
            position: "relative",
            bottom: 0,
          }}
        />
        <Flex
          mt={4}
          w="100%"
          justifyContent="space-between"
          display={{ base: "none", md: "flex" }}
        >
          <Button
            leftIcon={<ArrowBackIcon />}
            onClick={handleClickPrev}
            disabled={activeIndex === 0}
            colorScheme="teal"
          >
            Previous
          </Button>
          <Button
            rightIcon={<ArrowForwardIcon />}
            onClick={handleClickNext}
            disabled={activeIndex === songs.length - 1}
            colorScheme="teal"
          >
            Next
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Player;