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
  Image,
} from "@chakra-ui/react";

import { AiOutlineDelete } from "react-icons/ai";
import DeleteButtonModel from "../DeleteRecordModel";
import LoadingTable from "../LoadingTable";
import ListOrderModel from "../Model/ListOrderModel";

const ListOrders = ({ THeadsList, ListData, deleteRecord, isLoading }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const ModelOrder = useDisclosure();
  const [deleteID, setDeleteID] = useState("");
  const [selectRow, setSelectRow] = useState("");

  return (
    <Box>
      <ListOrderModel
        isOpen={ModelOrder.isOpen}
        onClose={ModelOrder.onClose}
        showRow={selectRow}
      />
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
              {THeadsList.map((th, index) => {
                return <Th key={index.toString()}>{th}</Th>;
              })}
              <Th>Actions</Th>
            </Tr>
          </Thead>
          {/* {ListData?.length === 0 && !isLoading ? "No Data" : null} */}
          <Tbody>
            {isLoading && <LoadingTable />}
            {!isLoading &&
              ListData?.map((list, index) => {
                return (
                  <Tr
                    key={index.toString()}
                    fontSize={"sm"}
                    _hover={{ bgColor: "gray.200", cursor: "pointer" }}
                    onClick={() => {
                      setSelectRow(list);
                      ModelOrder.onOpen();
                    }}
                  >
                    <Td>{index + 1}</Td>
                    <Td>{list.country}</Td>
                    <Td>{list.firstname}</Td>
                    <Td>{list.lastname}</Td>
                    <Td>{list.address}</Td>
                    <Td>{list.city}</Td>
                    <Td>{list.state}</Td>
                    <Td>{list.zipcode}</Td>
                    <Td>{list.phone}</Td>

                    <Td>
                      <IconButton
                        colorScheme="red"
                        size={"sm"}
                        aria-label="Search database"
                        icon={<AiOutlineDelete size={20} />}
                        onClick={() => {
                          setDeleteID(list.id);
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

export default ListOrders;
