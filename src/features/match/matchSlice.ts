import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";
import { auth } from "../../firebase/firebase";

interface User {
  _id: string;
  fullname: string;
}

interface MatchRequest {
  sentByMe: {
    senderId: { _id: string; fullname: string };
    receiverId: { _id: string; fullname: string };
    status: string;
  }[];
  receivedByMe: {
    senderId: { _id: string; fullname: string };
    receiverId: { _id: string; fullname: string };
    status: string;
  }[];
  status: string;
}

type RequestStatus = "idle" | "loading" | "succeeded" | "failed";

interface MatchErrors {
  matches: string | null;
  match: string | null;
  matchesReq: string | null;
}

interface MatchStatus {
  matches: RequestStatus;
  match: RequestStatus;
  matchesReq: RequestStatus;
}

interface MatchState {
  matches: User[] | null;

  matchesReq: MatchRequest | null;
  status: MatchStatus;
  errors: MatchErrors;
}

const initialState: MatchState = {
  matches: null,
  matchesReq: null,
  status: {
    matches: "idle",
    match: "idle",
    matchesReq: "idle",
  },
  errors: {
    matches: null,
    match: null,
    matchesReq: null,
  },
};

export const getMatches = createAsyncThunk(
  "matches/getMatchs",
  async (_, thunkAPI) => {
    try {
      const user = auth.currentUser;

      if (!user) throw new Error("Usuario no identificado");

      const token = await user.getIdToken();
      const response = await axiosInstance.get(`/matches/${token}`);

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

export const getMatchesReq = createAsyncThunk(
  "matches/getMatchesReq",
  async (_, thunkAPI) => {
    try {
      const user = auth.currentUser;

      if (!user) throw new Error("Usuario no identificado");

      const token = await user.getIdToken();
      const response = await axiosInstance.get(`/matches/req/${token}`);
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

export const match = createAsyncThunk(
  "matches/match",
  async (data: { senderId: string; receiverId: string }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/matches`, data);

      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data || error.message || "Error al enviar la solicitud";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const responseMatch = createAsyncThunk(
  "matches/responseMatch",
  async (
    data: { senderId: string; receiverId: string; response: boolean },
    thunkAPI
  ) => {
    try {
      const response = await axiosInstance.patch(
        `/matches/${data.receiverId}`,
        { senderId: data.senderId, response: data.response }
      );

      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data || error.message || "Error al enviar la solicitud";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

const matchSlice = createSlice({
  name: "match",
  initialState,
  reducers: {
    resetMatchStatus: () => ({
      ...initialState,
      status: { ...initialState.status, match: "idle" as RequestStatus },
    }),
    addReceivedRequest: (state, action: PayloadAction<any>) => {
      state.matchesReq?.receivedByMe.push(action.payload);
    },
    moveRequestToFriends: (state, action: PayloadAction<any>) => {
      const { friendId, friendName } = action.payload;

      if (state.matchesReq) {
        state.matchesReq.sentByMe = state.matchesReq?.sentByMe.filter(
          (m) => m.receiverId !== friendId && m.receiverId?._id !== friendId
        );
      }

      state.matches?.push({
        _id: friendId,
        fullname: friendName,
      });
    },
  },
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
      })
      .addCase(match.pending, (state) => {
        state.status.match = "loading";
      })
      .addCase(match.fulfilled, (state) => {
        state.status.match = "succeeded";
      })
      .addCase(match.rejected, (state, action) => {
        state.status.match = "failed";
        state.errors.match = action.payload as string;
      })
      .addCase(getMatchesReq.pending, (state) => {
        state.status.matchesReq = "loading";
      })
      .addCase(getMatchesReq.fulfilled, (state, action) => {
        state.status.matchesReq = "succeeded";
        state.matchesReq = action.payload;
      })
      .addCase(getMatchesReq.rejected, (state, action) => {
        state.status.matchesReq = "failed";
        state.errors.matchesReq = action.payload as string;
      })
      .addCase(responseMatch.pending, (state) => {
        state.status.matchesReq = "loading";
      })
      .addCase(responseMatch.fulfilled, (state) => {
        state.status.matchesReq = "succeeded";
      })
      .addCase(responseMatch.rejected, (state, action) => {
        state.status.matchesReq = "failed";
        state.errors.matchesReq = action.payload as string;
      });
  },
});

export const { resetMatchStatus, addReceivedRequest, moveRequestToFriends } =
  matchSlice.actions;
export default matchSlice.reducer;
