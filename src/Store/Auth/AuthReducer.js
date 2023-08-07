import * as ActionType from "./AuthActions";

const initialState = {
  user: [],
};

const Auth = (state = initialState, actions) => {
  switch (actions.type) {
    case ActionType.GET_AUTHS:
      return {
        ...state,
        user: actions.payload,
      };

    default:
      return state;
  }
};

export default Auth;
