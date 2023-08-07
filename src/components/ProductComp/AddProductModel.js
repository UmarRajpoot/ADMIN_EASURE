import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

const AddProductModel = ({ isOpen, onClose, ModalTitle, modelBody }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={["3xl", "6xl"]}>
      <ModalOverlay />
      <ModalContent w={"full"}>
        <ModalHeader>{ModalTitle}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{modelBody}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddProductModel;
