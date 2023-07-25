export const GET_ALL_PARENT_CATEGORIES = "GET_ALL_PARENT_CATEGORIES";

export const getallPCat_Payload = (PCat) => ({
  type: GET_ALL_PARENT_CATEGORIES,
  payload: PCat,
});

export function getallPCat_Data(PCat) {
  return (dispatch) => {
    dispatch(getallPCat_Payload(PCat));
  };
}
