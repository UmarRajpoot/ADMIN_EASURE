import React from "react";
import CategoryList from "./CategoryList";
import { Box, Button, Heading, useDisclosure } from "@chakra-ui/react";
import AddCategModel from "./AddCategModel";

const PCategory = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box>
      <AddCategModel isOpen={isOpen} onClose={onClose} />
      <Box
        display={"flex"}
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Heading size={"md"} my={"2"}>
          Parent Category
        </Heading>
        <Button colorScheme="blue" onClick={() => onOpen()}>
          Add New Category
        </Button>
      </Box>
      <CategoryList />
    </Box>
  );
};

export default PCategory;
