import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import matchesReducer from "../features/match/matchSlice";
import rolesReducer from "../features/roles/rolesSlice";
import usersReducer from "../features/users/usersSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    roles: rolesReducer,
    matches: matchesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
