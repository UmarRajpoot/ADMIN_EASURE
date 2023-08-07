import * as ActionType from "./ProductActions";

const initialState = {
  Products: [],
};

const ProductReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case ActionType.GET_ALL_PRODUCTS:
      return {
        ...state,
        Products: actions.payload,
      };
    default:
      return state;
  }
};

export default ProductReducer;
