import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";
import { auth } from "../../firebase/firebase";

interface User {
  _id: string;
  id: string;
  name: string;
  lastname: string;
  fullname: string;
  username: string;
  date: string;
  country: string;
  email: string;
  mentor: any[];
  role: { role: string };
  md: any[];
  matchReq: any[];
  matchSend: any[];
  match: any[];
  verify: boolean;
  skills: string[];
  recoveryToken: string;
  createdAt: string;
  updatedAt: string;
}

interface Info {
  months: {
    month: string;
    newUsers: { mentor: number; mentee: number; total?: number }; // Forzamos a que 'total' exista aquí
    totalCumulative: { mentor: number; mentee: number; grandTotal: number };
  }[];
  summary: {
    totalUsersAllTime: number;
    totalNewUsersThisYear: number;
    breakdownAllTime:{
      mentors:number
      mentees:number
    }
  };
}

type RequestStatus = "idle" | "loading" | "succeeded" | "failed";

interface UsersErrors {
  users: string | null;
  user: string | null;
  info: string | null;
}

interface UsersStatus {
  users: RequestStatus;
  user: RequestStatus;
  info: RequestStatus;
}

interface UsersState {
  users: User[] | null;
  user: User | null;
  info: Info | null;
  page: number | null;
  total: number | null;
  totalPages: number | null;
  status: UsersStatus;
  errors: UsersErrors;
}

const initialState: UsersState = {
  users: null,
  user: null,
  info: null,
  page: null,
  total: null,
  totalPages: null,
  status: {
    users: "idle",
    user: "idle",
    info: "idle",
  },
  errors: {
    users: null,
    user: null,
    info: null,
  },
};

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (filters: string | undefined = "", thunkAPI) => {
    try {
      const user = auth.currentUser;

      if (!user) throw new Error("Usuario no autenticado");

      const token = user.getIdToken();

      if (!token) {
        throw new Error("No hay token de autenticación disponible");
      }

      const response = await axiosInstance.get(`/users?${filters}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data ||
        error.message ||
        "Error al obtener los usuarios";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const getUserPerMonth = createAsyncThunk(
  "users/getUsersPerMonth",
  async (_, thunkAPI) => {
    try {
      const user = auth.currentUser;

      if (!user) throw new Error("Usuario no autenticado");

      const token = user.getIdToken();

      if (!token) {
        throw new Error("No hay token de autenticación disponible");
      }
      const stadistics = await axiosInstance.get("/users/stats/info", {
        headers: { Authorization: `Bearer ${token}` },
      });

      return stadistics.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data ||
        error.message ||
        "Error al obtener los usuarios";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.status.users = "loading";
        state.errors.users = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status.users = "succeeded";
        const { users, isScrolling } = action.payload;

        if (isScrolling) {
          const existingIds = new Set(state.users?.map((u) => u.id));
          const newUsers = users.filter((u: any) => !existingIds.has(u.id));

          state.users = [...(state.users || []), ...newUsers];
        } else {
          state.users = users;
        }

        state.page = action.payload.page;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
        state.errors.users = null;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.status.users = "failed";
        state.errors.users = action.payload as string;
      })
      .addCase(getUserPerMonth.pending, (state) => {
        state.status.info = "loading";
      })
      .addCase(getUserPerMonth.fulfilled, (state, action) => {
        state.status.info = "succeeded";
        state.info = action.payload;
      })
      .addCase(getUserPerMonth.rejected, (state, action) => {
        state.status.info = "failed";
        state.errors.info = action.payload as string;
      });
  },
});

export default usersSlice.reducer;
