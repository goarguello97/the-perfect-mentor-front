import type { PayloadAction } from "@reduxjs/toolkit";
import { configureStore, createSlice } from "@reduxjs/toolkit";

type AppState = {
  theme: "light" | "dark";
};

const initialState: AppState = {
  theme: "dark",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },
    setTheme(state, action: PayloadAction<AppState["theme"]>) {
      state.theme = action.payload;
    },
  },
});

export const { toggleTheme, setTheme } = appSlice.actions;

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});

// Tipos inferidos para usar en toda la app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
