import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import axiosInstance from "../../config/axiosInstance";
import { auth } from "../../firebase/firebase";
import { firebaseErrorSpa } from "./firebaseErrors";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface Register {
  username: string;
  email: string;
  password: string;
}
interface Login {
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  ok: boolean | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
  ok: null,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ username, email, password }: Register, thunkAPI) => {
    try {
      const firebaseUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (!firebaseUser.user) {
        throw new Error("Error al crear el usuario.");
      }

      const user = firebaseUser.user;

      const response = await axiosInstance.post(`/users/`, {
        id: user.uid,
        username,
        email,
      });

      return response.data;
    } catch (error: any) {
      const errorMessage =
        (firebaseErrorSpa.hasOwnProperty(error.code) &&
          firebaseErrorSpa[error.code]) ||
        error.response?.data;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }: Login, thunkAPI) => {
    try {
      const firebaseUser = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (!firebaseUser.user) {
        throw new Error("Error al iniciar sesión.");
      }

      const user = firebaseUser.user;

      const response = await axiosInstance.get(`/users/${user.uid}`);

      return {
        id: user.uid,
        username: response.data.username,
        email: response.data.email,
        role: response.data.role,
      };
    } catch (error: any) {
      const errorMessage =
        (firebaseErrorSpa.hasOwnProperty(error.code) &&
          firebaseErrorSpa[error.code]) ||
        error.response?.data;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: () => initialState,
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, _) => {
        state.isLoading = false;
        state.ok = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = {
          id: action.payload.id,
          name: action.payload.username,
          email: action.payload.email,
          role: action.payload.role,
        };
        state.ok = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetAuthState, logout } = authSlice.actions;
export default authSlice.reducer;
