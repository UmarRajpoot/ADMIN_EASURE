import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Box,
} from "@chakra-ui/react";

const ListProductModel = ({ isOpen, onClose, showRow }) => {
  const ModelText = ({ title, value }) => {
    return (
      <Box>
        <Text fontWeight={"bold"}>{title}</Text>
        <Text>{value}</Text>
      </Box>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Product Detail</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ModelText title={"Product Name"} value={showRow.productname} />
          <ModelText title={"Parent Category"} value={showRow.parentcategory} />
          <ModelText title={"Person Name"} value={showRow.personname} />
          <ModelText title={"Varient"} value={showRow.varientname} />
          <ModelText title={"Type"} value={showRow.typename} />
          <ModelText title={"Type Style"} value={showRow.typestylename} />
          <ModelText title={"Price"} value={showRow.price} />
          <ModelText title={"Sizes"} value={showRow.sizes} />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ListProductModel;
