import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  SimpleGrid,
  GridItem,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";

import Sidebar from "./components/Sidebar";
import List from "./components/List";
import axios from "axios";
import "./App.css";

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const handleWindowSizeChange = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const curPlayer = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSong, setActiveSong] = useState({});

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get("https://cms.samespace.com/items/songs");
        setSongs(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  const handleSearch = (e) => {
    const searchVal = e.target.value.toLowerCase();
    const songArr = !loading ? songs : [];

    const filteredSongs = songArr.filter((val) => {
      const artist = val.artist?.toLowerCase() || "";
      const title = val.title?.toLowerCase() || "";
      return artist.includes(searchVal) || title.includes(searchVal);
    });

    setSongs(filteredSongs);
  };

  const handleSongChange = (index, song) => {
    setActiveSong(song);
    setActiveIndex(index);
  };

  return (
    <Box minH="100vh" opacity="0.9" background="#000000" className="App">
      <Flex direction="column" h="100%">
       
        <SimpleGrid
          templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
          gap={4}
          h="100%"
          p={0}
          columns={{ sm: 1, md: 3 }}
          px={0}
        >
          <GridItem h="100%">
            {/* Sidebar */}
            <Sidebar isOpen={isOpen} onClose={onClose} />
          </GridItem>
          <GridItem h="100%">
            {/* List Component */}
            <List
              songs={songs}
              loading={loading}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              handleSearch={handleSearch}
              handleSongChange={handleSongChange}
              setIsModalOpen={setIsModalOpen}
              isMobile={isMobile}
            />
          </GridItem>
        </SimpleGrid>
      </Flex>
    </Box>
  );
}

export default App;