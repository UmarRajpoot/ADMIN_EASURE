import * as ActionType from "./PCActions";

const initialState = {
  PCat: [],
};

const Pcat_Reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case ActionType.GET_ALL_PARENT_CATEGORIES:
      return {
        ...state,
        PCat: actions.payload,
      };

    default:
      return state;
  }
};

export default Pcat_Reducer;
