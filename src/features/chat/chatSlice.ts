import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";

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

interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt?: string;
}

interface ChatState {
  activeChatUser: User | null;
  messages: any[];
  errors: MdErrors;
  status: MdStatus;
}

type RequestStatus = "idle" | "loading" | "succeeded" | "failed";

interface MdErrors {
  activeChatUser: string | null;
}

interface MdStatus {
  activeChatUser: RequestStatus;
}

const initialState: ChatState = {
  activeChatUser: null,
  messages: [],
  status: {
    activeChatUser: "idle",
  },
  errors: {
    activeChatUser: null,
  },
};

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (
    data: { senderId: string; receiverId: string; content: string },
    thunkAPI
  ) => {
    try {
      const response = await axiosInstance.post("/md", data);

      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data || error.message || "Error al enviar el mensaje";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveChat: (state, action) => {
      state.activeChatUser = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    closeChat: (state) => {
      state.activeChatUser = null;
    },
    receiveMessage: (state, action: PayloadAction<Message>) => {
      const msg = action.payload;
      const isRelevant =
        state.activeChatUser?._id === msg.senderId ||
        state.activeChatUser?._id === msg.receiverId;

      const alreadyExists = state.messages.some(
        (m) => m._id.toString() === msg._id.toString()
      );

      if (isRelevant && !alreadyExists) {
        state.messages.push(msg);
      }
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(sendMessage.pending, (state) => {
        state.status.activeChatUser = "loading";
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        
        state.status.activeChatUser = "succeeded";
        state.messages.push(action.payload);
      })
      .addCase(sendMessage.rejected, (state) => {
        state.status.activeChatUser = "failed";
      }),
});

export const { addMessage, closeChat, setActiveChat, receiveMessage } =
  chatSlice.actions;

export default chatSlice.reducer;
