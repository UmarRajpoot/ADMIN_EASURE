import * as ActionType from "./ReviewActions";

const initialState = {
  reviews: [],
};

const ReviewsReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case ActionType.GET_ALL_REVIEWS:
      return {
        ...state,
        reviews: actions.payload,
      };
    default:
      return state;
  }
};

export default ReviewsReducer;
