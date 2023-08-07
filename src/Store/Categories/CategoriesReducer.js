import * as ActionType from "./CategoriesActions";

const initialState = {
  PersonCat: [],
  PCat: [],
  Varient: [],
  Type: [],
  TypeStyle: [],
  Sizes: [],
  Colors: [],
};

const Categories = (state = initialState, actions) => {
  switch (actions.type) {
    case ActionType.GET_ALL_PERSON_CATEGORIES:
      return {
        ...state,
        PersonCat: actions.payload,
      };
    case ActionType.GET_ALL_PARENT_CATEGORIES:
      return {
        ...state,
        PCat: actions.payload,
      };
    case ActionType.GET_VARIENTS:
      return {
        ...state,
        Varient: actions.payload,
      };
    case ActionType.GET_TYPES:
      return {
        ...state,
        Type: actions.payload,
      };
    case ActionType.GET_TYPES_STYLE:
      return {
        ...state,
        TypeStyle: actions.payload,
      };
    case ActionType.GET_SIZES:
      return {
        ...state,
        Sizes: actions.payload,
      };
    case ActionType.GET_COLORS:
      return {
        ...state,
        Colors: actions.payload,
      };
    default:
      return state;
  }
};

export default Categories;
