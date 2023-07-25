import React from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";

import { AiOutlineDelete } from "react-icons/ai";

const ProductList = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <TableContainer>
        <Table variant="simple">
          {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
          <Thead>
            <Tr>
              <Th>Index</Th>
              <Th>Product Name</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr
              fontSize={"sm"}
              _hover={{ bgColor: "gray.200", cursor: "pointer" }}
            >
              <Td>0</Td>
              <Td>MEN</Td>
              <Td>
                <IconButton
                  colorScheme="red"
                  size={"sm"}
                  aria-label="Search database"
                  icon={<AiOutlineDelete size={20} />}
                  onClick={() => onOpen()}
                />
              </Td>
            </Tr>
            <Tr fontSize={"sm"}>
              <Td>1</Td>
              <Td>WOMEN</Td>
              <Td>
                <IconButton
                  colorScheme="red"
                  size={"sm"}
                  aria-label="Search database"
                  icon={<AiOutlineDelete size={20} />}
                />
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProductList;
