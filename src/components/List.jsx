import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  Box,
  Flex,
  Spinner,
  VStack,
  Text,
  Container,
  Input,
  InputGroup,
  InputRightElement,
  useMediaQuery,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import Song from "./Song";
import Player from "./Player";

const List = () => {
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSong, setActiveSong] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeTab, setActiveTab] = useState("forYou");

  const curPlayer = useRef();
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get(
          "https://cms.samespace.com/items/songs"
        );
        setSongs(response.data.data);
        setFilteredSongs(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching songs:", error);
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  const playSong = (song, index) => {
    setActiveSong(song);
    setActiveIndex(index);
  };

  const handleClickNext = () => {
    if (activeIndex !== null && activeIndex < filteredSongs.length - 1) {
      playSong(filteredSongs[activeIndex + 1], activeIndex + 1);
    }
  };

  const handleClickPrev = () => {
    if (activeIndex !== null && activeIndex > 0) {
      playSong(filteredSongs[activeIndex - 1], activeIndex - 1);
    }
  };

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    const filtered = songs.filter(
      (song) =>
        (song.title && song.title.toLowerCase().includes(searchValue)) ||
        (song.artist && song.artist.toLowerCase().includes(searchValue)) ||
        (song.name && song.name.toLowerCase().includes(searchValue))
    );
    setFilteredSongs(filtered);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "topTracks") {
      const topTracks = songs.filter((song) => song.top_track === true);
      setFilteredSongs(topTracks);
    } else {
      setFilteredSongs(songs);
    }
  };

  if (loading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Container maxW="container.xl">
      <Box p={4} ml={4}>
        <Flex direction="row" mb={4}>
          <Text
            fontSize="2xl"
            fontWeight="bold"
            mb={2}
            cursor="pointer"
            color={activeTab === "forYou" ? "blue.500" : "white"}
            onClick={() => handleTabChange("forYou")}
          >
            For You
          </Text>
          <Text
            fontSize="2xl"
            fontWeight="bold"
            ml={8}
            cursor="pointer"
            color={activeTab === "topTracks" ? "blue.500" : "white"}
            onClick={() => handleTabChange("topTracks")}
          >
            Top Tracks
          </Text>
        </Flex>

        {activeTab === "forYou" && (
          <Box>
            {/* Content for "For You" */}
            <Text>For You Content</Text>
          </Box>
        )}

        {activeTab === "topTracks" && (
          <Box>
            {/* Content for "Top Tracks" */}
            <Text>Top Tracks Content</Text>
          </Box>
        )}

        {!isMobile && (
          <InputGroup size="md" mb={4}>
            <InputRightElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputRightElement>
            <Input
              type="text"
              placeholder="Search Song, Artist, Name"
              onChange={handleSearch}
              bg="gray.900"
              border="none"
              color="white"
            />
          </InputGroup>
        )}
        <Flex direction="column" flex="1">
          <VStack spacing={0} flex="1" overflowY="auto" mb={4}>
            {filteredSongs.map((song, index) => (
              <Song key={song.id} value={song} onClick={() => playSong(song, index)} />
            ))}
          </VStack>
        </Flex>
        {activeSong && (
          <Box
            position="fixed"
            bottom={isMobile ? 0 : "auto"}
            top={isMobile ? "auto" : 0}
            right={isMobile ? 0 : 100}
            width={{ base: "100%", md: "300px" }}
            bg={isMobile ? "gray.800" : "black.800"}
            p={4}
            zIndex={1000}
          >
            <Player
              activeSong={activeSong}
              activeIndex={activeIndex}
              curPlayer={curPlayer}
              setActiveIndex={setActiveIndex}
              handleClickNext={handleClickNext}
              handleClickPrev={handleClickPrev}
              isMobile={isMobile}
              setIsModalOpen={() => {}}
              songs={filteredSongs}
            />
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default List;