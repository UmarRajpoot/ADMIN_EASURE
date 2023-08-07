import { Box, Heading, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../Config/Url";
import axios from "axios";
import { Order_Data } from "../../Store/Orders/OrderActions";
import { useDispatch, useSelector } from "react-redux";
import ListOrders from "../../components/Orders/ListOrders";
import ListOrderModel from "../../components/Model/ListOrderModel";

const Orders = () => {
  const [isLoading, setIsLoading] = useState(false);

  const Orders = useSelector((state) => state.OrderOptions.Orders);

  const dispatch = useDispatch();

  const getallOrders = async () => {
    setIsLoading(true);
    return await axios
      .get(`${BASE_URL}/Order`)
      .then((resp) => {
        // console.log(resp.data);
        dispatch(Order_Data(resp.data.response));
        setIsLoading(false);
      })
      .catch((error) => {
        console.warn(error);
        setIsLoading(false);
      });
  };

  const deleteRecord = async (id) => {
    return await axios
      .delete(`${BASE_URL}/Order`, {
        data: {
          orderid: id,
        },
      })
      .then(() => {
        getallOrders();
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  useEffect(() => {
    getallOrders();
  }, []);
  return (
    <Box>
      <Box
        display={"flex"}
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Heading size={"md"} my={"2"}>
          Orders
        </Heading>
        {/* <Button colorScheme="blue" onClick={() => onOpen()}>
          Add Parent Category
        </Button> */}
      </Box>
      <ListOrders
        THeadsList={[
          "Country",
          "First name",
          "last name",
          "Address",
          "City",
          "State",
          "Zipcode",
          "phone",
        ]}
        ListData={Orders}
        deleteRecord={deleteRecord}
      />
    </Box>
  );
};

export default Orders;
