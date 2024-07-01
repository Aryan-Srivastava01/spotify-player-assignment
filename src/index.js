import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";

const rootElement = document.getElementById("root");

// Using createRoot to render the application
const root = ReactDOM.createRoot(rootElement);
root.render(
  <ChakraProvider>
    <App />
  </ChakraProvider>
);