import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "../features/customers/customerSlice";
import addresReducer from "../features/addres/addreslice";
export default configureStore({
  reducer: {
    customers: customerReducer,
    addres: addresReducer,
  },
});
