import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../config/axiosInstance';
import { auth } from '../../firebase/firebase';

type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

interface ReportMessage {
  _id: string;
  reportId: any;
  authorId: any;
  content: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}
interface Report {
  _id: string;
  senderId: any;
  receiverId: any;
  subject: string;
  status: boolean;
  lastMessageAt: string;
  createdAt: string;
  updatedAt: string;
  messages: ReportMessage[];
}

interface ReportErrors {
  reports: string | null;
  report: string | null;
  reponseReport: string | null;
  reportMessage: string | null;
}

interface ReportStatus {
  reports: RequestStatus;
  report: RequestStatus;
  responseReport: RequestStatus;
  reportMessage: RequestStatus;
}

interface ReportState {
  errors: ReportErrors;
  status: ReportStatus;
  reports: Report[];
  report: Report | null;
}

const initialState: ReportState = {
  errors: {
    report: null,
    reports: null,
    reponseReport: null,
    reportMessage: null,
  },
  status: {
    report: 'idle',
    reports: 'idle',
    responseReport: 'idle',
    reportMessage: 'idle',
  },
  report: null,
  reports: [],
};

export const getReports = createAsyncThunk(
  'reports/getReports',
  async (_, thunkAPI) => {
    try {
      const user = auth.currentUser;

      if (!user) throw new Error('Usuario no autenticado');

      const token = await user.getIdToken();

      if (!token) {
        throw new Error('No hay token de autenticación disponible');
      }

      const response = await axiosInstance.get(`/reports/${token}`);

      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data ||
        error.message ||
        'Error al recibir los reportes';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  },
);

export const getReport = createAsyncThunk(
  'reports/getReport',
  async (data: { id: string }, thunkAPI) => {
    try {
      const { id } = data;

      if (!id) throw new Error('Id del reporte inválido');

      const response = await axiosInstance.get(`/reports/report/${id}`);

      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data || error.message || 'Error al recibir el reporte';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  },
);

export const addReport = createAsyncThunk(
  'reports/addReports',
  async (
    data: { receiverId: string; issue: string; content: string },
    thunkAPI,
  ) => {
    try {
      const user = auth.currentUser;

      if (!user) throw new Error('Usuario no autenticado');

      const response = await axiosInstance.post('/reports', {
        ...data,
        senderId: user.uid,
      });

      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data || error.message || 'Error al añadir el reporte';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  },
);

export const putReport = createAsyncThunk(
  'reports/putReports',
  async (
    data: {
      reportId: string;
      senderId: string;
      receiverId: string;
      content: string | undefined;
      answered: boolean | undefined;
    },
    thunkAPI,
  ) => {
    try {
      const response = await axiosInstance.put(
        `/reports/${data.reportId}`,
        data,
      );
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data ||
        error.message ||
        'Error al actualizar el reporte';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  },
);

export const answerReport = createAsyncThunk(
  'reports/answerReport',
  async (data: { reportId: string }, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(`/reports/${data.reportId}`);

      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data ||
        error.message ||
        'Error al responder el reporte';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  },
);

export const addReportMessage = createAsyncThunk(
  'reports/addReportMessage',
  async (
    data: { authorId: string; reportId: string; content: string },
    thunkAPI,
  ) => {
    try {
      const response = await axiosInstance.post('/reports/message', data);

      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data || error.message || 'Error al enviar un mensaje';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  },
);

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getReports.pending, (state) => {
        state.status.reports = 'loading';
      })
      .addCase(getReports.fulfilled, (state, action) => {
        state.status.reports = 'succeeded';
        state.reports = action.payload;
      })
      .addCase(getReports.rejected, (state, action) => {
        state.status.reports = 'failed';
        state.errors.reports = action.payload as string;
      })
      .addCase(getReport.pending, (state) => {
        state.status.report = 'loading';
      })
      .addCase(getReport.fulfilled, (state, action) => {
        state.status.report = 'succeeded';
        state.report = action.payload;
      })
      .addCase(getReport.rejected, (state, action) => {
        state.status.report = 'failed';
        state.errors.report = action.payload as string;
      })
      .addCase(addReport.pending, (state) => {
        state.status.report = 'loading';
      })
      .addCase(addReport.fulfilled, (state, action) => {
        state.status.report = 'succeeded';
        state.report = action.payload;
      })
      .addCase(addReport.rejected, (state, action) => {
        state.errors.report = action.payload as string;
        state.status.report = 'failed';
      })
      .addCase(putReport.pending, (state) => {
        state.status.report = 'loading';
      })
      .addCase(putReport.fulfilled, (state, action) => {
        state.status.report = 'succeeded';
        state.report = action.payload;
      })
      .addCase(putReport.rejected, (state, action) => {
        state.errors.report = action.payload as string;
        state.status.report = 'failed';
      })
      .addCase(answerReport.pending, (state) => {
        state.status.responseReport = 'loading';
      })
      .addCase(answerReport.fulfilled, (state, action) => {
        state.status.responseReport = 'succeeded';
        if(state.report){          
        state.report.status = action.payload.status;
        }
      })
      .addCase(answerReport.rejected, (state, action) => {
        state.errors.reponseReport = action.payload as string;
        state.status.report = 'failed';
      })
      .addCase(addReportMessage.pending, (state) => {
        state.status.reportMessage = 'loading';
      })
      .addCase(addReportMessage.fulfilled, (state, action) => {
        state.status.responseReport = 'succeeded';
        if (state.report) {
          state.report.messages.push(action.payload);
        }
      })
      .addCase(addReportMessage.rejected, (state, action) => {
        state.errors.reportMessage = action.payload as string;
        state.status.reportMessage = 'failed';
      }),
});

export default reportSlice.reducer;
