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
  Img,
  Text,
  HStack,
  Badge,
} from "@chakra-ui/react";

import { AiFillEye, AiOutlineDelete } from "react-icons/ai";
import DeleteButtonModel from "../DeleteRecordModel";
import LoadingTable from "../LoadingTable";
import ListProductModel from "../Model/ListProductModel";
import ProductPhotoModel from "./ProductPhotoModel";
import { FaRegImage } from "react-icons/fa";
import { FcVideoCall } from "react-icons/fc";

const ListProduct = ({
  THeadsList,
  ListData,
  deleteRecord,
  isLoading,
  onRowClick,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const ModelButton = useDisclosure();
  const PhotoModel = useDisclosure();
  const [deleteID, setDeleteID] = useState("");
  const [photoURL, setphotoURL] = useState("");

  const [selectRow, setSelectRow] = useState("");

  // console.log("Get List", ListData);
  return (
    <Box>
      <ListProductModel
        isOpen={ModelButton.isOpen}
        onClose={ModelButton.onClose}
        showRow={selectRow}
      />
      <ProductPhotoModel
        isOpen={PhotoModel.isOpen}
        onClose={PhotoModel.onClose}
        showRow={selectRow}
      />
      <DeleteButtonModel
        itemDelete={deleteID}
        isOpen={isOpen}
        onClose={onClose}
        deleteRecord={deleteRecord}
        itemPhoto={photoURL}
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
                // console.log("Colors",);
                return (
                  <Tr
                    key={index.toString()}
                    fontSize={"sm"}
                    _hover={{ bgColor: "gray.200", cursor: "pointer" }}
                  >
                    <Td>{index + 1}</Td>
                    <Td>{list.productname}</Td>
                    <Td alignItems={"center"} justifyContent={"center"}>
                      <Box boxSize={"20"} position={"relative"}>
                        <Box position={"absolute"} right={-2} top={-2}>
                          <IconButton
                            colorScheme="blue"
                            size={"sm"}
                            icon={<FaRegImage size={20} />}
                            onClick={() => {
                              setSelectRow(list);
                              PhotoModel.onOpen();
                            }}
                          />
                        </Box>
                        {list.productimage && (
                          <Badge
                            bgColor={"gray.500"}
                            color={"white"}
                            position={"absolute"}
                            right={0}
                            bottom={0}
                          >
                            {list.productimage &&
                            list.productimage.length - 1 !== 0
                              ? `+${list.productimage.length - 1}`
                              : null}
                          </Badge>
                        )}
                        <Img
                          src={list.productimage && list.productimage[0]}
                          width={"20"}
                          height={"20"}
                        />
                      </Box>
                    </Td>
                    <Td alignItems={"center"} justifyContent={"center"}>
                      <Box boxSize={"20"} position={"relative"}>
                        <Box position={"absolute"} right={-2} top={-2}>
                          <IconButton
                            colorScheme="blue"
                            size={"sm"}
                            icon={<FaRegImage size={20} />}
                            onClick={() => {
                              setSelectRow(list);
                              PhotoModel.onOpen();
                            }}
                          />
                        </Box>
                        {<FcVideoCall fontSize={80} />}
                      </Box>
                    </Td>
                    {/* <Td>{list.productimage}</Td> */}
                    <Td>{list.parentcategory}</Td>
                    <Td>{list.personname}</Td>
                    <Td>{list.varientname}</Td>
                    <Td>{list.typename}</Td>
                    <Td>{list.typestylename}</Td>
                    <Td>{list.price}</Td>
                    <Td>{list.sizes.join("/")}</Td>
                    {/* <Td>
                      {Object.entries(list.colors).map((color) =>
                        console.log(color[1].CLASSIC)
                      )}
                    </Td> */}

                    <Td>
                      <HStack>
                        <IconButton
                          colorScheme="green"
                          size={"sm"}
                          icon={<AiFillEye size={20} />}
                          onClick={() => {
                            setSelectRow(list);
                            ModelButton.onOpen();
                          }}
                        />
                        <IconButton
                          colorScheme="red"
                          size={"sm"}
                          icon={<AiOutlineDelete size={20} />}
                          onClick={() => {
                            setDeleteID(list.productname);
                            setphotoURL(list.productimage);
                            onOpen();
                          }}
                        />
                      </HStack>
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

export default ListProduct;
