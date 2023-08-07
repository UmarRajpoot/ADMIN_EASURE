// GET_AUTHENTICATIONS
export const GET_AUTHS = "GET_AUTHS";

export const getAuths_Payload = (user) => ({
  type: GET_AUTHS,
  payload: user,
});

export function Auth_Data(user) {
  return (dispatch) => {
    dispatch(getAuths_Payload(user));
  };
}
