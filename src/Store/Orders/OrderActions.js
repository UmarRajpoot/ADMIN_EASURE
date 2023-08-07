// GET_ALL_PRODUCTS
export const GET_ALL_ORDERS = "GET_ALL_ORDERS";

export const getallOrders_Payload = (orders) => ({
  type: GET_ALL_ORDERS,
  payload: orders,
});

export function Order_Data(orders) {
  return (dispatch) => {
    dispatch(getallOrders_Payload(orders));
  };
}
