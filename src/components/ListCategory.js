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
  HStack,
} from "@chakra-ui/react";

import { AiOutlineDelete } from "react-icons/ai";
import DeleteButtonModel from "./DeleteRecordModel";
import LoadingTable from "./LoadingTable";
import { GrStar } from "react-icons/gr";

const ListCategory = ({ THeadsList, ListData, deleteRecord, isLoading }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteID, setDeleteID] = useState("");
  const [phototUrl, setphototUrl] = useState("");

  return (
    <Box>
      <DeleteButtonModel
        itemDelete={deleteID}
        itemPhoto={phototUrl}
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
                  >
                    <Td>{index + 1}</Td>
                    {list.title && (
                      <Td>
                        <HStack>
                          {Array.from({ length: list.starcount }).map(
                            (star) => {
                              return <GrStar />;
                            }
                          )}
                        </HStack>
                      </Td>
                    )}
                    {list.title && <Td>{list.title}</Td>}
                    {list.desc && <Td>{list.desc}</Td>}
                    {list.name && <Td>{list.name.toUpperCase()}</Td>}

                    {list.colorcode && (
                      <Td>
                        <Box
                          p={"3"}
                          w={"2"}
                          rounded={"full"}
                          bgColor={list.colorcode}
                        ></Box>
                      </Td>
                    )}
                    {list.colorType && <Td>{list.colorType.toUpperCase()}</Td>}
                    {list.photo && (
                      <Td>
                        <Image src={list.photo} width={20} height={20} />
                      </Td>
                    )}
                    <Td>
                      <IconButton
                        colorScheme="red"
                        size={"sm"}
                        aria-label="Search database"
                        icon={<AiOutlineDelete size={20} />}
                        onClick={() => {
                          if (list.name) {
                            setDeleteID(list.name);
                          } else {
                            setDeleteID(list.id);
                          }
                          setphototUrl(list.photo);
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
