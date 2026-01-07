import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
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

type RequestStatus = "idle" | "loading" | "succeeded" | "failed";
interface AuthStatus {
  login: RequestStatus;
  register: RequestStatus;
  activation: RequestStatus;
  persistance: RequestStatus;
  passwordRecovery: RequestStatus;
  updatePassword: RequestStatus;
}

interface AuthErrors {
  login: string | null;
  register: string | null;
  activation: string | null;
  persistance: string | null;
  passwordRecovery: string | null;
  updatePassword: string | null;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isPersisted: boolean;
  status: AuthStatus;
  errors: AuthErrors;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isPersisted: false,
  status: {
    login: "idle",
    register: "idle",
    activation: "idle",
    persistance: "idle",
    passwordRecovery: "idle",
    updatePassword: "idle",
  },
  errors: {
    login: null,
    register: null,
    activation: null,
    persistance: null,
    passwordRecovery: null,
    updatePassword: null,
  },
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

      if (!response.data.verify) {
        await signOut(auth);
        throw new Error("Debes activar tu usuario.");
      }

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
        error.response?.data ||
        error.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const validationUser = createAsyncThunk(
  "auth/validateUser",
  async (token: string, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/users/auth/validate", {
        headers: { Authorization: `Bearer ${token}` },
      });

      return {
        token,
        user: {
          id: response.data.id,
          username: response.data.username,
          email: response.data.email,
          role: response.data.role,
        },
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

export const activateUser = createAsyncThunk(
  "auth/activateUser",
  async (token: string, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/users/auth/activate`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return {
        user: {
          id: response.data.id,
          username: response.data.username,
          email: response.data.email,
          role: response.data.role,
        },
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

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      await signOut(auth);
    } catch (error: any) {
      const errorMessage =
        (firebaseErrorSpa.hasOwnProperty(error.code) &&
          firebaseErrorSpa[error.code]) ||
        error.response?.data ||
        error.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const recoverPassword = createAsyncThunk(
  "auth/recoverPassword",
  async (email: string, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        "/users/recover-password",
        email
      );

      return { message: response.data.message };
    } catch (error: any) {
      const errorMessage =
        (firebaseErrorSpa.hasOwnProperty(error.code) &&
          firebaseErrorSpa[error.code]) ||
        error.response?.data ||
        error.message ||
        "Error al enviar el email de recuperación";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async (
    { token, password }: { token: string; password: string },
    thunkAPI
  ) => {
    try {
      const response = await axiosInstance.put(
        "/users/update/password",
        { password },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return {
        message: response.data.message || "Contraseña actualizada exitosamente",
      };
    } catch (error: any) {
      const errorMessage =
        (firebaseErrorSpa.hasOwnProperty(error.code) &&
          firebaseErrorSpa[error.code]) ||
        error.response?.data ||
        error.message ||
        "Error al cambiar la contraseña";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: () => ({ ...initialState, isInitializing: false }),
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isPersisted = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status.register = "loading";
      })
      .addCase(registerUser.fulfilled, (state, _) => {
        state.status.register = "succeeded";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.user = null;
        state.status.register = "failed";
        state.errors.register = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.status.login = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = {
          id: action.payload.id,
          name: action.payload.username,
          email: action.payload.email,
          role: action.payload.role,
        };
        state.status.login = "succeeded";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status.login = "failed";
        state.errors.login = action.payload as string;
      })
      .addCase(validationUser.pending, (state) => {
        state.status.persistance = "loading";
      })
      .addCase(validationUser.fulfilled, (state, action) => {
        state.user = {
          id: action.payload.user.id,
          name: action.payload.user.username,
          email: action.payload.user.email,
          role: action.payload.user.role,
        };
        state.token = action.payload.token;
        state.status.persistance = "succeeded";
        state.isPersisted = true;
      })
      .addCase(validationUser.rejected, (state, action) => {
        state.user = null;
        state.token = null;
        state.isPersisted = false;
        state.status.persistance = "failed";
        state.errors.persistance = action.payload as string;
      })
      .addCase(activateUser.pending, (state) => {
        state.status.activation = "loading";
      })
      .addCase(activateUser.fulfilled, (state, action) => {
        state.user = {
          id: action.payload.user.id,
          name: action.payload.user.username,
          email: action.payload.user.email,
          role: action.payload.user.role,
        };
        state.status.activation = "succeeded";
      })
      .addCase(activateUser.rejected, (state, action) => {
        state.user = null;
        state.status.activation = "failed";
        state.errors.activation = action.payload as string;
      })
      .addCase(logoutUser.fulfilled, (state, _) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.isPersisted = false;
        state.status.login = "idle";
        state.status.register = "idle";
        state.status.activation = "idle";
        state.status.persistance = "idle";
        state.errors.login = null;
        state.errors.register = null;
        state.errors.activation = null;
        state.errors.persistance = null;
      })
      .addCase(logoutUser.rejected, (state, _) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.isPersisted = false;
        state.status.login = "idle";
        state.status.register = "idle";
        state.status.activation = "idle";
        state.status.persistance = "idle";
      })
      .addCase(recoverPassword.pending, (state) => {
        state.status.passwordRecovery = "loading";
        state.errors.passwordRecovery = null;
      })
      .addCase(recoverPassword.fulfilled, (state) => {
        state.status.passwordRecovery = "succeeded";
        state.errors.passwordRecovery = null;
      })
      .addCase(recoverPassword.rejected, (state, action) => {
        state.status.passwordRecovery = "failed";
        state.errors.passwordRecovery = action.payload as string;
      })
      .addCase(updatePassword.pending, (state) => {
        state.status.updatePassword = "loading";
        state.errors.updatePassword = null;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.status.updatePassword = "succeeded";
        state.errors.updatePassword = null;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.status.updatePassword = "failed";
        state.errors.updatePassword = action.payload as string;
      });
  },
});

export const { resetAuthState, logout } = authSlice.actions;
export default authSlice.reducer;
