import { Box, Text } from "@chakra-ui/react";
import "./App.css";
import Wrapper from "./components/Wrapper";
import PCategory from "./pages/PCategory";
import Products from "./pages/Products";
import ColorCategory from "./pages/ColorCategory";
import PersonCategory from "./pages/PersonCategory";
import Reviews from "./pages/Reviews";

import { Routes, Route, useNavigate } from "react-router-dom";
import VarientCategory from "./pages/VarientCategory";
import TypeCategory from "./pages/TypeCategory";
import TypeStyleCategory from "./pages/TypeStyleCategory";
import Sizes from "./pages/Sizes";
import Orders from "./pages/Orders";
import Auth from "./pages/Auth";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function App() {
  const AuthState = useSelector((state) => state.Auths.user);

  const navigate = useNavigate();

  useEffect(() => {
    navigate("/auth");
  }, []);

  return (
    <Box w={"full"} bgColor={"gray.400"}>
      {AuthState.length === 0 ? (
        <Routes>
          <Route path="/auth" Component={Auth} />
        </Routes>
      ) : (
        <Wrapper>
          <Routes>
            <Route path="/reviews" Component={Reviews} />
            <Route path="/orders" Component={Orders} />
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
      )}
    </Box>
  );
}

export default App;
