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
  Table,
  Thead,
  Th,
  Tr,
  Td,
  Tbody,
} from "@chakra-ui/react";

const ListOrderModel = ({ isOpen, onClose, showRow }) => {
  const ModelText = ({ title, value }) => {
    return (
      <Box>
        <Text fontWeight={"bold"}>{title}</Text>
        <Text>{value}</Text>
      </Box>
    );
  };
  const ModelTable = ({ title, value }) => {
    return (
      <Table>
        <Thead>
          <Tr>
            {title.map((tit, index) => {
              return <Th key={index}>{tit}</Th>;
            })}
          </Tr>
        </Thead>
        <Tbody>
          {value.map((valu, index) => {
            return (
              <Tr key={index}>
                <Td>{valu.count}</Td>
                <Td>{valu.productname}</Td>
                <Td>{valu.productsize}</Td>
                <Td>{valu.productcolor}</Td>
                <Td>${valu.productPrice}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={["2xl"]}>
      <ModalOverlay />
      <ModalContent overflow={"hidden"}>
        <ModalHeader>Order Detail</ModalHeader>
        <ModalCloseButton />
        <ModalBody overflow={"auto"}>
          <ModelText title={"Country"} value={showRow.country} />
          <ModelText
            title={"Full Name"}
            value={`${showRow.firstname}-${showRow.lastname}`}
          />
          <ModelText title={"Address"} value={showRow.address} />
          <ModelText title={"City"} value={showRow.city} />
          <ModelText title={"State"} value={showRow.state} />
          <ModelText title={"Zip Code"} value={showRow.zipcode} />
          <ModelText title={"Phone"} value={showRow.phone} />
          {/* <ModelText
            title={["Count", "Product Name", "Price"]}
            value={[showRow.orderItems]}
          /> */}
          <ModelTable
            title={["Count", "Product Name", "Size", "Color", "Price"]}
            value={showRow.orderItems}
          />
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

export default ListOrderModel;
