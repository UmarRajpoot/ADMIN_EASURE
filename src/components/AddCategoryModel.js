import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

const AddCategoryModel = ({ isOpen, onClose, ModalTitle, modelBody }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{ModalTitle}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{modelBody}</ModalBody>
        {/* <ModalFooter>
            <Button variant="ghost" colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              type="submit"
              variant="solid"
              colorScheme="blue"
              isLoading={isLoading}
              loadingText={"Proceeding..."}
            >
              Save
            </Button>
          </ModalFooter> */}
      </ModalContent>
    </Modal>
  );
};

export default AddCategoryModel;
