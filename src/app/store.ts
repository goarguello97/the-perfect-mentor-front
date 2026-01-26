import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import chatReducer from "../features/chat/chatSlice";
import matchesReducer from "../features/match/matchSlice";
import reportReducer from "../features/reports/reportSlice";
import rolesReducer from "../features/roles/rolesSlice";
import usersReducer from "../features/users/usersSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    roles: rolesReducer,
    matches: matchesReducer,
    chat: chatReducer,
    report: reportReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
