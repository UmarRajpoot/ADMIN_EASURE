import * as ActionType from "./OrderActions";

const initialState = {
  Orders: [],
};

const OrderReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case ActionType.GET_ALL_ORDERS:
      return {
        ...state,
        Orders: actions.payload,
      };
    default:
      return state;
  }
};

export default OrderReducer;
