import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  AxiosGetService,
  AxiosPostService,
} from "../../../../constants/AxiosService";

const initialState = {
  language: 0,
  tracksState: {
    data: [],
    error: null,
    loading: false,
  },
  cohortsState: {
    data: [],
    error: null,
    loading: false,
  },
  myEnrolmentState: {
    data: [],
    error: null,
    loading: false,
  },
  // ✅ NEW
  learningProgressState: {
    data: [],
    error: null,
    loading: false,
  },
};

/**
 * FETCH TRACKS
 */
export const getTracks = createAsyncThunk(
  "app/getTracks",
  async (_, { rejectWithValue }) => {
    try {
      const url = process.env.NEXT_PUBLIC_TRACKS_URL;
      const res = await AxiosGetService(url);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.detail?.[0] || "Failed to fetch tracks"
      );
    }
  }
);

export const getTracksDetail = createAsyncThunk(
  "app/getTracksDetail",
  async (uuid, { rejectWithValue }) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_TRACKS_URL}${uuid}/`;
      const res = await AxiosGetService(url);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.detail?.[0] || "Failed to fetch tracks"
      );
    }
  }
);

export const getCohorts = createAsyncThunk(
  "app/getCohorts",
  async (_, { rejectWithValue }) => {
    try {
      const url = process.env.NEXT_PUBLIC_COHORT_URL;
      const res = await AxiosGetService(url);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.detail?.[0] || "Failed to fetch tracks"
      );
    }
  }
);

export const selectTrack = createAsyncThunk(
  "app/selectTrack",
  async (data, { rejectWithValue }) => {
    try {
      const { dataPassed } = data;
      const url = process.env.NEXT_PUBLIC_TRACKS_ENROLL_URL;

      const res = await AxiosPostService(url, dataPassed, false);
      return res.data; // { access, user }
    } catch (err) {
      return rejectWithValue(err || "Login failed");
    }
  }
);

export const getMyEnrollment = createAsyncThunk(
  "app/getMyEnrollment",
  async (_, { rejectWithValue }) => {
    try {
      const url = process.env.NEXT_PUBLIC_TRACKS_MY_ENROLMENT_URL;
      const res = await AxiosGetService(url);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.detail?.[0] || "Failed to fetch tracks"
      );
    }
  }
);

export const getMyLearningProgress = createAsyncThunk(
  "app/getMyLearningProgress",
  async (_, { rejectWithValue }) => {
    try {
      const url = process.env.NEXT_PUBLIC_LEARNING_PROGRESS_URL;
      const res = await AxiosGetService(url);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.detail || "Failed to fetch learning progress"
      );
    }
  }
);
const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    ToggleIsDataHub: (state, action) => {
      state.isDataHub = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔄 Pending
      .addCase(getTracks.pending, (state) => {
        state.tracksState.loading = true;
        state.tracksState.error = null;
      })

      // ✅ Success
      .addCase(getTracks.fulfilled, (state, action) => {
        state.tracksState.loading = false;
        state.tracksState.data = action.payload;
      })

      // ❌ Error
      .addCase(getTracks.rejected, (state, action) => {
        state.tracksState.loading = false;
        state.tracksState.error = action.payload;
        state.tracksState.data = [];
      });

    builder
      // 🔄 Pending
      .addCase(getCohorts.pending, (state) => {
        state.cohortsState.loading = true;
        state.cohortsState.error = null;
      })

      // ✅ Success
      .addCase(getCohorts.fulfilled, (state, action) => {
        state.cohortsState.loading = false;
        state.cohortsState.data = action.payload;
      })

      // ❌ Error
      .addCase(getCohorts.rejected, (state, action) => {
        state.cohortsState.loading = false;
        state.cohortsState.error = action.payload;
        state.cohortsState.data = [];
      });

    builder
      // 🔄 Pending
      .addCase(getMyEnrollment.pending, (state) => {
        state.myEnrolmentState.loading = true;
        state.myEnrolmentState.error = null;
      })

      // ✅ Success
      .addCase(getMyEnrollment.fulfilled, (state, action) => {
        state.myEnrolmentState.loading = false;
        state.myEnrolmentState.data = action.payload;
      })

      // ❌ Error
      .addCase(getMyEnrollment.rejected, (state, action) => {
        state.myEnrolmentState.loading = false;
        state.myEnrolmentState.error = action.payload;
        state.myEnrolmentState.data = [];
      });
    builder
      // 🔄 Pending
      .addCase(getMyLearningProgress.pending, (state) => {
        state.learningProgressState.loading = true;
        state.learningProgressState.error = null;
      })

      // ✅ Success
      .addCase(getMyLearningProgress.fulfilled, (state, action) => {
        state.learningProgressState.loading = false;
        state.learningProgressState.data = action.payload;
      })

      // ❌ Error
      .addCase(getMyLearningProgress.rejected, (state, action) => {
        state.learningProgressState.loading = false;
        state.learningProgressState.error = action.payload;
        state.learningProgressState.data = [];
      });
  },
});

export const { ToggleIsDataHub } = appSlice.actions;
export default appSlice.reducer;
