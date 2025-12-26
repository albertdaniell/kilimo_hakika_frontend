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
  adminCohortsState: {
    data: [],
    error: null,
    loading: false,
  },
  adminDashboardStatsState: {
    data: null,
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

/**
 * FETCH ALL COHORTS (ADMIN)
 */
export const getAdminCohorts = createAsyncThunk(
  "app/getAdminCohorts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await AxiosGetService(
        process.env.NEXT_PUBLIC_COHORT_ADMIN_URL
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.detail || "Failed to fetch cohorts"
      );
    }
  }
);

/**
 * CREATE COHORT
 */
export const createCohort = createAsyncThunk(
  "app/createCohort",
  async (dataPassed, { rejectWithValue }) => {
    try {
      const res = await AxiosPostService(
        process.env.NEXT_PUBLIC_COHORT_CREATE_URL,
        dataPassed,
        false
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.detail || "Failed to create cohort"
      );
    }
  }
);

/**
 * UPDATE COHORT
 */
export const updateCohort = createAsyncThunk(
  "app/updateCohort",
  async ({ id, dataPassed }, { rejectWithValue }) => {
    try {
      const res = await AxiosPostService(
        `${process.env.NEXT_PUBLIC_COHORT_UPDATE_URL}${id}/update/`,
        dataPassed,
        false
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.detail || "Failed to update cohort"
      );
    }
  }
);

/**
 * DELETE COHORT
 */
export const deleteCohort = createAsyncThunk(
  "app/deleteCohort",
  async (id, { rejectWithValue }) => {
    try {
      await AxiosPostService(
        `${process.env.NEXT_PUBLIC_COHORT_DELETE_URL}${id}/delete/`,
        {},
        false
      );
      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.detail || "Failed to delete cohort"
      );
    }
  }
);

/**
 * ADMIN DASHBOARD STATS
 */
export const getAdminDashboardStats = createAsyncThunk(
  "app/getAdminDashboardStats",
  async (_, { rejectWithValue }) => {
    try {
      const url = process.env.NEXT_PUBLIC_ADMIN_DASHBOARD_STATS_URL;
      const res = await AxiosGetService(url);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.detail || "Failed to fetch admin dashboard stats"
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

    builder
      // =========================
      // ADMIN COHORTS
      // =========================

      .addCase(getAdminCohorts.pending, (state) => {
        state.adminCohortsState.loading = true;
        state.adminCohortsState.error = null;
      })
      .addCase(getAdminCohorts.fulfilled, (state, action) => {
        state.adminCohortsState.loading = false;
        state.adminCohortsState.data = action.payload;
      })
      .addCase(getAdminCohorts.rejected, (state, action) => {
        state.adminCohortsState.loading = false;
        state.adminCohortsState.error = action.payload;
      })

      .addCase(createCohort.fulfilled, (state, action) => {
        state.adminCohortsState.data.unshift(action.payload);
      })

      .addCase(updateCohort.fulfilled, (state, action) => {
        state.adminCohortsState.data = state.adminCohortsState.data.map(
          (cohort) =>
            cohort.id === action.payload.id ? action.payload : cohort
        );
      })

      .addCase(deleteCohort.fulfilled, (state, action) => {
        state.adminCohortsState.data = state.adminCohortsState.data.filter(
          (cohort) => cohort.id !== action.payload
        );
      });

    builder
      // ======================================
      // ADMIN DASHBOARD STATS
      // ======================================
      .addCase(getAdminDashboardStats.pending, (state) => {
        state.adminDashboardStatsState.loading = true;
        state.adminDashboardStatsState.error = null;
      })

      .addCase(getAdminDashboardStats.fulfilled, (state, action) => {
        state.adminDashboardStatsState.loading = false;
        state.adminDashboardStatsState.data = action.payload;
      })

      .addCase(getAdminDashboardStats.rejected, (state, action) => {
        state.adminDashboardStatsState.loading = false;
        state.adminDashboardStatsState.error = action.payload;
        state.adminDashboardStatsState.data = null;
      });
  },
});

export const { ToggleIsDataHub } = appSlice.actions;
export default appSlice.reducer;
