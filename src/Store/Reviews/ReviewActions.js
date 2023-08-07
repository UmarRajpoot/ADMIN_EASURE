// GET_ALL_REVIEWS
export const GET_ALL_REVIEWS = "GET_ALL_REVIEWS";

export const getallReviews_Payload = (reviews) => ({
  type: GET_ALL_REVIEWS,
  payload: reviews,
});

export function Review_Data(reviews) {
  return (dispatch) => {
    dispatch(getallReviews_Payload(reviews));
  };
}
