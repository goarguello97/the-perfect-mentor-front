import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../config/axiosInstance';

type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

interface RolesErrors {
  roles: string | null;
}

interface RolesStatus {
  roles: RequestStatus;
}

interface UsersState {
  roles: [] | null;
  status: RolesStatus;
  errors: RolesErrors;
}

const initialState: UsersState = {
  roles: null,
  status: {
    roles: 'idle',
  },
  errors: {
    roles: null,
  },
};

export const getRoles = createAsyncThunk(
  'roles/getRoles',
  async (_, thunkAPI) => {
    try {
      // const user = auth.currentUser;

      // if (!user) throw new Error("Usuario no autenticado");

      // const token = user.getIdToken();

      // if (!token) {
      //   throw new Error("No hay token de autenticación disponible");
      // }

      const response = await axiosInstance.get('/roles', {
        //   headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data ||
        error.message ||
        'Error al obtener los usuarios';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  },
);

const rolesSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRoles.pending, (state) => {
        state.status.roles = 'loading';
      })
      .addCase(getRoles.fulfilled, (state, action) => {
        state.status.roles = 'succeeded';
        state.roles = action.payload;
      })
      .addCase(getRoles.rejected, (state, action) => {
        state.status.roles = 'failed';
        state.errors.roles = action.payload as string;
      });
  },
});

export default rolesSlice.reducer;
