import { Skeleton, Td, Tr } from "@chakra-ui/react";
import React from "react";

const LoadingTable = ({ columns }) => {
  return (
    <>
      <Tr>
        <Td>
          <Skeleton height="15px" />
        </Td>
        <Td>
          <Skeleton height="15px" />
        </Td>
        <Td>
          <Skeleton height="15px" />
        </Td>
      </Tr>
      <Tr>
        <Td>
          <Skeleton height="15px" />
        </Td>
        <Td>
          <Skeleton height="15px" />
        </Td>
        <Td>
          <Skeleton height="15px" />
        </Td>
      </Tr>
      <Tr>
        <Td>
          <Skeleton height="15px" />
        </Td>
        <Td>
          <Skeleton height="15px" />
        </Td>
        <Td>
          <Skeleton height="15px" />
        </Td>
      </Tr>
    </>
  );
};

export default LoadingTable;
