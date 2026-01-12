import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";

interface User {
  _id: string;
  fullname: string;
}

type RequestStatus = "idle" | "loading" | "succeeded" | "failed";

interface MatchErrors {
  matches: string | null;
}

interface MatchStatus {
  matches: RequestStatus;
}

interface MatchState {
  matches: User[] | null;
  totalPages: number | null;
  status: MatchStatus;
  errors: MatchErrors;
}

const initialState: MatchState = {
  matches: null,
  totalPages: null,
  status: {
    matches: "idle",
  },
  errors: {
    matches: null,
  },
};

export const getMatches = createAsyncThunk(
  "matches/getMatchs",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/matches");

      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data ||
        error.message ||
        "Error al obtener la lista de amigos";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

const matchSlice = createSlice({
  name: "match",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getMatches.pending, (state) => {
        state.status.matches = "loading";
      })
      .addCase(getMatches.fulfilled, (state, action) => {
        state.status.matches = "succeeded";
        state.matches = action.payload;
      })
      .addCase(getMatches.rejected, (state, action) => {
        state.status.matches = "failed";
        state.errors.matches = action.payload as string;
      });
  },
});

export default matchSlice.reducer;
