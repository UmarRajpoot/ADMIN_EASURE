// GET_ALL_PERSON_CATEGORIES
export const GET_ALL_PERSON_CATEGORIES = "GET_ALL_PERSON_CATEGORIES";

export const getallPersonCat_Payload = (PersonCat) => ({
  type: GET_ALL_PERSON_CATEGORIES,
  payload: PersonCat,
});

export function PersonCat_Data(PersonCat) {
  return (dispatch) => {
    dispatch(getallPersonCat_Payload(PersonCat));
  };
}

// GET_ALL_PARENT_CATEGORIES
export const GET_ALL_PARENT_CATEGORIES = "GET_ALL_PARENT_CATEGORIES";

export const getallPCat_Payload = (PCat) => ({
  type: GET_ALL_PARENT_CATEGORIES,
  payload: PCat,
});

export function PCat_Data(PCat) {
  return (dispatch) => {
    dispatch(getallPCat_Payload(PCat));
  };
}

// GET_ALL_VARIENTS
export const GET_VARIENTS = "GET_VARIENTS";

export const getallVarients_Payload = (varient) => ({
  type: GET_VARIENTS,
  payload: varient,
});

export function Varients_Data(varient) {
  return (dispatch) => {
    dispatch(getallVarients_Payload(varient));
  };
}

// GET_ALL_TYPES
export const GET_TYPES = "GET_TYPES";

export const getallTypes_Payload = (type) => ({
  type: GET_TYPES,
  payload: type,
});

export function Types_Data(type) {
  return (dispatch) => {
    dispatch(getallTypes_Payload(type));
  };
}

// GET_ALL_TYPES_STYLE
export const GET_TYPES_STYLE = "GET_TYPES_STYLE";

export const getallTypesStyle_Payload = (typestyle) => ({
  type: GET_TYPES_STYLE,
  payload: typestyle,
});

export function TypesStyle_Data(typestyle) {
  return (dispatch) => {
    dispatch(getallTypesStyle_Payload(typestyle));
  };
}

// GET_ALL_SIZES
export const GET_SIZES = "GET_SIZES";

export const getallSizes_Payload = (sizes) => ({
  type: GET_SIZES,
  payload: sizes,
});

export function Sizes_Data(sizes) {
  return (dispatch) => {
    dispatch(getallSizes_Payload(sizes));
  };
}

// GET_ALL_COLORS
export const GET_COLORS = "GET_COLORS";

export const getallColors_Payload = (colors) => ({
  type: GET_COLORS,
  payload: colors,
});

export function Colors_Data(colors) {
  return (dispatch) => {
    dispatch(getallColors_Payload(colors));
  };
}
