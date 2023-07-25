import React, { useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";

import { AiOutlineDelete } from "react-icons/ai";
import DeleteButtonModel from "./DeleteRecordModel";
import LoadingTable from "./LoadingTable";

const ListCategory = ({ ListData, deleteRecord, isLoading }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteID, setDeleteID] = useState("");

  return (
    <Box>
      <DeleteButtonModel
        itemDelete={deleteID}
        isOpen={isOpen}
        onClose={onClose}
        deleteRecord={deleteRecord}
      />
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Index</Th>
              <Th>Name</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {ListData?.length === 0 && !isLoading ? "No Data" : null}
            {isLoading && <LoadingTable />}

            {!isLoading &&
              ListData?.map((list, index) => {
                return (
                  <Tr
                    key={index.toString()}
                    fontSize={"sm"}
                    _hover={{ bgColor: "gray.200", cursor: "pointer" }}
                  >
                    <Td>{index + 1}</Td>
                    <Td>{list.name.toUpperCase()}</Td>
                    <Td>
                      <IconButton
                        colorScheme="red"
                        size={"sm"}
                        aria-label="Search database"
                        icon={<AiOutlineDelete size={20} />}
                        onClick={() => {
                          setDeleteID(list.name);
                          onOpen();
                        }}
                      />
                    </Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ListCategory;
