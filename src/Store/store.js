import { configureStore } from "@reduxjs/toolkit";

import PcategoryReducer from "./ParentCategory/PCReducer";

const store = configureStore({
  reducer: {
    ParentCategory: PcategoryReducer,
  },
});

export default store;
