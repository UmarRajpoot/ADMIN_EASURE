// GET_ALL_PRODUCTS
export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";

export const getallProducts_Payload = (products) => ({
  type: GET_ALL_PRODUCTS,
  payload: products,
});

export function Product_Data(products) {
  return (dispatch) => {
    dispatch(getallProducts_Payload(products));
  };
}
