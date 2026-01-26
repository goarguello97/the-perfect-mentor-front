import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";
import { auth } from "../../firebase/firebase";

type RequestStatus = "idle" | "loading" | "succeeded" | "failed";

interface ReportErrors {
    reports: string | null
    report: string | null
    reponseReport: string | null
}

interface ReportStatus {
  reports: RequestStatus
    report: RequestStatus,
    responseReport: RequestStatus
}

interface ReportState {
    errors: ReportErrors;
    status: ReportStatus;
    reports: any[];
    report: any | null
}

const initialState: ReportState = {
    errors: { report: null, reports: null, reponseReport:null },
    status: { report: "idle", reports: "idle", responseReport: "idle" },
    report: null,
    reports:[]
}

export const getReports = createAsyncThunk("reports/getReports", async (_, thunkAPI) => {
    try {

        const user = auth.currentUser;

      if (!user) throw new Error("Usuario no autenticado");

      const token = await user.getIdToken();

      if (!token) {
        throw new Error("No hay token de autenticación disponible");
      }

        const response = await axiosInstance.get(`/reports/${token}`);

        return response.data
    } catch  (error: any) {
      const errorMessage =
        error.response?.data || error.message || "Error al enviar el mensaje";
      return thunkAPI.rejectWithValue(errorMessage);
    }
})

export const addReport = createAsyncThunk("reports/addReports", async (data:{receiverId:string, issue:string, content:string}, thunkAPI) => {
    try {

        const user = auth.currentUser;

      if (!user) throw new Error("Usuario no autenticado");
        
        const response = await axiosInstance.post("/reports", {...data, senderId: user.uid});
        
        return response.data

    } catch (error: any) {
      const errorMessage =
        error.response?.data || error.message || "Error al enviar el mensaje";
      return thunkAPI.rejectWithValue(errorMessage);
     }
})

export const putReport = createAsyncThunk("reports/putReports", async (data:{reportId:string, senderId:string, receiverId:string, content: string | undefined , answered:boolean | undefined}, thunkAPI) => {
    try {
        const response = await axiosInstance.put(`/reports/${data.reportId}`, data);
        return response.data
    } catch(error: any) {
      const errorMessage =
        error.response?.data || error.message || "Error al enviar el mensaje";
      return thunkAPI.rejectWithValue(errorMessage);
     }
})

export const answerReport = createAsyncThunk("reports/answerReport", async (data:{reportId:string}, thunkAPI) => {
    try {
        
const response = await axiosInstance.put(`/reports/${data.reportId}`)

        return response.data
    } catch (error: any) {
      const errorMessage =
        error.response?.data || error.message || "Error al enviar el mensaje";
      return thunkAPI.rejectWithValue(errorMessage);
     }
})

const reportSlice = createSlice({
    name: "report",
    initialState,
    reducers: {},
    extraReducers: (builder) => builder
        .addCase(
        getReports.pending, (state) => {
            state.status.reports = "loading";
        })
        .addCase(getReports.fulfilled, (state, action) => {
        state.status.reports = "succeeded";
        state.reports = action.payload
        })
        .addCase(getReports.rejected, (state, action) => {
        state.status.reports = "failed";
        state.errors.reports = action.payload as string;
        })
        .addCase(addReport.pending, (state) => {
            state.status.report = "loading";
        })
        .addCase(addReport.fulfilled, (state, action) => {
            state.status.report = "succeeded";
            state.report = action.payload
        }).addCase(addReport.rejected, (state, action) => {
            state.errors.report = action.payload as string;
            state.status.report = "failed"
        }).addCase(putReport.pending, (state) => {
            state.status.report = "loading";
        })
        .addCase(putReport.fulfilled, (state, action) => {
            state.status.report = "succeeded";
            state.report = action.payload
        }).addCase(putReport.rejected, (state, action) => {
            state.errors.report = action.payload as string;
            state.status.report = "failed"
        })
        .addCase(answerReport.pending, (state) => {
            state.status.responseReport = "loading";
        })
        .addCase(answerReport.fulfilled, (state, action) => {
            state.status.responseReport = "succeeded";
            state.report = action.payload
        }).addCase(answerReport.rejected, (state, action) => {
            state.errors.reponseReport = action.payload as string;
            state.status.report = "failed"
    })
})

export default reportSlice.reducer