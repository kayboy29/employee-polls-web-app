import { configureStore } from "@reduxjs/toolkit";
import users from "./reducers/users";
import authUser from "./reducers/authUser";
import questions from "./reducers/questions";

export const store = configureStore({
  reducer: {
    users,
    authUser,
    questions,
  },
});
