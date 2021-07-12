import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "../features/customers/customerSlice";
import addresReducer from "../features/customers/addreslice";
import userReducer from "../features/customers/userSlice";
import customerPasswordReducer from "../features/customers/customerPasswordsSlice";
import offerReducer from "../features/offers/offerSlice";

export default configureStore({
  reducer: {
    customers: customerReducer,
    addres: addresReducer,
    user: userReducer,
    customerPassword: customerPasswordReducer,
    offers: offerReducer,
  },
});
