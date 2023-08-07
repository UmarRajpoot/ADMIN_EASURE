import { configureStore } from "@reduxjs/toolkit";

import Categories from "./Categories/CategoriesReducer";
import Products from "./Product/ProductReducer";
import Orders from "./Orders/OrderReducer";
import Auth from "./Auth/AuthReducer";
import Reviews from "./Reviews/ReviewReducer";

const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
  reducer: {
    Categories: Categories,
    Products: Products,
    OrderOptions: Orders,
    Auths: Auth,
    Reviews: Reviews,
  },
});

export default store;
