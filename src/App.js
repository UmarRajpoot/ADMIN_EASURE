import { Box, Text } from "@chakra-ui/react";
import "./App.css";
import Wrapper from "./components/Wrapper";
import PCategory from "./pages/PCategory";
import Products from "./pages/Products";
import ColorCategory from "./pages/ColorCategory";
import PersonCategory from "./pages/PersonCategory";

import { Routes, Route } from "react-router-dom";
import VarientCategory from "./pages/VarientCategory";
import TypeCategory from "./pages/TypeCategory";
import TypeStyleCategory from "./pages/TypeStyleCategory";
import Sizes from "./pages/Sizes";

function App() {
  return (
    <Box w={"full"} bgColor={"gray.400"}>
      <Wrapper>
        <Routes>
          <Route path="/sizes-category" Component={Sizes} />
          <Route path="/type-style-category" Component={TypeStyleCategory} />
          <Route path="/type-category" Component={TypeCategory} />
          <Route path="/varient-category" Component={VarientCategory} />
          <Route path="/person-category" Component={PersonCategory} />
          <Route path="/parent-category" Component={PCategory} />
          <Route path="/color-category" Component={ColorCategory} />
          <Route path="/products" Component={Products} />
        </Routes>
      </Wrapper>
    </Box>
  );
}

export default App;
