import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  AxiosDeleteService,
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
  // ✅ NEW: Meetings (ADMIN)
  meetingsState: {
    data: [],
    error: null,
    loading: false,
  },

  createMeetingState: {
    data: null,
    error: null,
    loading: false,
  },
  deleteMeetingState: {
    loading: false,
    error: null,
    success: false,
  },
  registerMeetingState: {
    data: null,
    loading: false,
    error: null,
  },
  myMeetingsState: {
    loading: false,
    error: null,
    data: [],
  },
  baselineSurveyState: {
    loading: false,
    data: null,
    error: null,
  },
  myBaselineSurveyState: {
    loading: false,
    error: null,
    data: null,
  },
  myTrackSurveysState: {
    loading: false,
    error: null,
    data: [],
  },
  surveyBySlugState: {
    loading: false,
    error: null,
    data: null,
  },
  submitSurveyState: {
    loading: false,
    error: null,
    success: false,
  },
  mySurveyResponsesState: {
    loading: false,
    error: null,
    data: null,
  },
  myAdminSurveyResponsesState: {
    loading: false,
    error: null,
    data: [],
  },
  surveyInsightsState: {
    data: null,
    loading: false,
    error: null,
  },
  allSurveysState: {
    data: [],
    loading: false,
    error: null,
  },
  traineesState: {
    data: [],
    loading: false,
    error: null,
  },
  certificatesState: {
    data: [],
    loading: false,
    error: null,
  },
  adminCertificatesState: {
    data: [],
    loading: false,
    error: null,
    pagination: {
      count: 0,
      next: null,
      previous: null,
    },
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

export const getTrackMeetings = createAsyncThunk(
  "app/getTrackMeetings",
  async (_, { rejectWithValue }) => {
    try {
      const url = process.env.NEXT_PUBLIC_TRACK_MEETINGS_URL;
      const res = await AxiosGetService(url);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.detail || "Failed to fetch meetings"
      );
    }
  }
);

export const createTrackMeeting = createAsyncThunk(
  "app/createTrackMeeting",
  async (data, { rejectWithValue }) => {
    try {
      const url = process.env.NEXT_PUBLIC_TRACK_MEETINGS_CREATE_URL;
      const res = await AxiosPostService(url, data, false);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.detail || "Failed to create meeting"
      );
    }
  }
);

export const deleteTrackMeeting = createAsyncThunk(
  "app/deleteTrackMeeting",
  async (meetingId, { rejectWithValue }) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_TRACK_MEETINGS_URL}${meetingId}/delete/`;
      const res = await AxiosDeleteService(url);
      return { meetingId, data: res.data };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.detail || "Failed to delete meeting"
      );
    }
  }
);

export const registerForMeeting = createAsyncThunk(
  "app/registerForMeeting",
  async ({ meeting_id }, { rejectWithValue }) => {
    try {
      const url = process.env.NEXT_PUBLIC_TRACK_MEETINGS_REGISTER_URL;
      // example: /api/meetings/register/

      const res = await AxiosPostService(url, { meeting_id }, false);

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.detail || "Failed to register for meeting"
      );
    }
  }
);

export const getMyBaselineSurvey = createAsyncThunk(
  "app/getMyBaselineSurvey",
  async (_, { rejectWithValue }) => {
    try {
      const url = process.env.NEXT_PUBLIC_BASELINE_MY_RESPONSE_URL;
      // example: /api/surveys/baseline/my-response/

      const res = await AxiosGetService(url, false);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || "Failed to fetch baseline survey response"
      );
    }
  }
);

// app-redux/features/AppData/appSlice.js

export const submitBaselineSurvey = createAsyncThunk(
  "app/submitBaselineSurvey",
  async (payload, { rejectWithValue }) => {
    try {
      const url = process.env.NEXT_PUBLIC_BASELINE_SURVEY_SUBMIT_URL;
      // example: /api/surveys/baseline/submit/

      const res = await AxiosPostService(url, payload, false);

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data ||
          err.response?.data?.detail ||
          "Failed to submit baseline survey"
      );
    }
  }
);

/* =========================================
   GET MY TRACK MEETINGS
========================================= */
export const getMyMeetings = createAsyncThunk(
  "appData/getMyMeetings",
  async (_, { rejectWithValue }) => {
    try {
      const url = process.env.NEXT_PUBLIC_TRACK_MEETINGS_ME_URL;
      const res = await AxiosGetService(url);

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.detail || "Failed to fetch meetings"
      );
    }
  }
);

export const getMyTrackSurveys = createAsyncThunk(
  "app/getMyTrackSurveys",
  async (_, { rejectWithValue }) => {
    try {
      const url = process.env.NEXT_PUBLIC_MY_TRACK_SURVEYS_URL;

      const res = await AxiosGetService(url, false);

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.detail || "Failed to fetch track surveys"
      );
    }
  }
);

export const getSurveyBySlug = createAsyncThunk(
  "app/getSurveyBySlug",
  async ({ slug }, { rejectWithValue }) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_SURVEY_BY_SLUG_URL}/${slug}/`;
      // example: http://localhost:8000/api/surveys/baseline-survey/

      const res = await AxiosGetService(url, true);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.detail || "Failed to load survey"
      );
    }
  }
);

export const submitSurveyResponses = createAsyncThunk(
  "app/submitSurveyResponses",
  async ({ slug, answers }, { rejectWithValue }) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_SURVEY_SUBMIT_URL}${slug}/submit/`;
      const res = await AxiosPostService(url, { answers }, false);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.detail || "Failed to submit survey"
      );
    }
  }
);

export const submitSurveyResponsesOld = createAsyncThunk(
  "app/submitSurveyResponses",
  async ({ survey_id, answers }, { rejectWithValue }) => {
    try {
      const url = process.env.NEXT_PUBLIC_SURVEY_SUBMIT_URL;
      // POST /api/surveys/submit/

      const res = await AxiosPostService(url, { survey_id, answers }, true);

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.detail || "Failed to submit survey"
      );
    }
  }
);

export const getMySurveyResponses = createAsyncThunk(
  "app/getMySurveyResponses",
  async ({ slug }, { rejectWithValue }) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_SURVEY_URL}/${slug}/my-answers/`;
      console.log({ url });
      console.log({ slug });
      // example: /api/surveys/baseline-survey/my-responses/

      const res = await AxiosGetService(url, false);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.detail || "Failed to load survey responses"
      );
    }
  }
);

export const getAdminSurveyResponses = createAsyncThunk(
  "app/getAdminSurveyResponses",
  async (
    { page = 1, email = "", cohort_id = "", survey_type = "" },
    { rejectWithValue }
  ) => {
    try {
      const url = process.env.NEXT_PUBLIC_ADMIN_SURVEY_RESPONSES_URL;

      const params = new URLSearchParams();
      params.append("page", page);

      if (email) params.append("user_email", email);
      if (cohort_id) params.append("cohort_id", cohort_id);
      if (survey_type) params.append("survey_slug", survey_type);

      const res = await AxiosGetService(`${url}?${params.toString()}`);

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.detail || "Failed to fetch survey responses"
      );
    }
  }
);

// app-redux/features/AppData/appSlice.js

export const getSurveyInsights = createAsyncThunk(
  "app/getSurveyInsights",
  async ({ slug }, { rejectWithValue }) => {
    try {
      // alert(0)
      const url = `${process.env.NEXT_PUBLIC_ADMIN_SURVEY_INSIGHTS_URL}/${slug}/insights/`;
      console.log({ url });

      const res = await AxiosGetService(url);
      return res.data;
    } catch (err) {
      console.log({ err });

      return rejectWithValue(
        err.response?.data?.detail || "Failed to load survey insights"
      );
    }
  }
);

/* =====================================================
   GET ALL SURVEYS (ADMIN)
===================================================== */
export const getAllSurveys = createAsyncThunk(
  "app/getAllSurveys",
  async (_, { rejectWithValue }) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_ADMIN_SURVEY_INSIGHTS_URL}/`;

      const res = await AxiosGetService(url);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.detail || "Failed to fetch surveys"
      );
    }
  }
);

export const getAllTrainees = createAsyncThunk(
  "app/getAllTrainees",
  async ({ page = 1 } = {}, { rejectWithValue }) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_ADMIN_TRAINESS_URL}?page=${page}`;
      // example: /api/admin/trainees/?page=1

      const res = await AxiosGetService(url);
      return res.data; // { count, next, previous, results }
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.detail || "Failed to fetch trainees"
      );
    }
  }
);

export const getMyCertificates = createAsyncThunk(
  "appData/getMyCertificates",
  async (_, { rejectWithValue }) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_MY_CERTS_URL}`;

      const res = await AxiosGetService(url);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.detail || "Failed to fetch certificates"
      );
    }
  }
);

export const getAllCertificates = createAsyncThunk(
  "app/getAllCertificates",
  async ({ page = 1 } = {}, { rejectWithValue }) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_ADMIN_ADMIN_CERTS_URL}?page=${page}`;
      const res = await AxiosGetService(url);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.detail || "Failed to load certificates"
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
    resetBaselineSurveyState: (state) => {
      state.baselineSurveyState = {
        loading: false,
        data: null,
        error: null,
      };
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

    // ============================
    // GET MEETINGS
    // ============================
    builder
      .addCase(getTrackMeetings.pending, (state) => {
        state.meetingsState.loading = true;
        state.meetingsState.error = null;
      })
      .addCase(getTrackMeetings.fulfilled, (state, action) => {
        state.meetingsState.loading = false;
        state.meetingsState.data = action.payload;
      })
      .addCase(getTrackMeetings.rejected, (state, action) => {
        state.meetingsState.loading = false;
        state.meetingsState.error = action.payload;
        state.meetingsState.data = [];
      });

    // ============================
    // CREATE MEETING
    // ============================
    builder
      .addCase(createTrackMeeting.pending, (state) => {
        state.createMeetingState.loading = true;
        state.createMeetingState.error = null;
      })
      .addCase(createTrackMeeting.fulfilled, (state, action) => {
        state.createMeetingState.loading = false;
        state.createMeetingState.data = action.payload;

        // 🔄 Push newly created meeting into list
        state.meetingsState.data.unshift(action.payload);
      })
      .addCase(createTrackMeeting.rejected, (state, action) => {
        state.createMeetingState.loading = false;
        state.createMeetingState.error = action.payload;
      });
    // ============================
    // DELETE MEETING
    // ============================
    builder
      .addCase(deleteTrackMeeting.pending, (state) => {
        state.deleteMeetingState.loading = true;
        state.deleteMeetingState.error = null;
        state.deleteMeetingState.success = false;
      })
      .addCase(deleteTrackMeeting.fulfilled, (state, action) => {
        state.deleteMeetingState.loading = false;
        state.deleteMeetingState.success = true;

        // 🔄 Mark meeting inactive in meetings list
        state.meetingsState.data = state.meetingsState.data.map((m) =>
          m.id === action.payload.meetingId ? { ...m, is_active: false } : m
        );
      })
      .addCase(deleteTrackMeeting.rejected, (state, action) => {
        state.deleteMeetingState.loading = false;
        state.deleteMeetingState.error = action.payload;
      });
    // ===============================
    // REGISTER FOR MEETING
    // ===============================
    builder
      .addCase(registerForMeeting.pending, (state) => {
        state.registerMeetingState.loading = true;
        state.registerMeetingState.error = null;
      })

      .addCase(registerForMeeting.fulfilled, (state, action) => {
        state.registerMeetingState.loading = false;
        state.registerMeetingState.data = action.payload;
      })

      .addCase(registerForMeeting.rejected, (state, action) => {
        state.registerMeetingState.loading = false;
        state.registerMeetingState.error = action.payload;
      });

    builder
      /* ===============================
     MY MEETINGS
  =============================== */
      .addCase(getMyMeetings.pending, (state) => {
        state.myMeetingsState.loading = true;
        state.myMeetingsState.error = null;
      })
      .addCase(getMyMeetings.fulfilled, (state, action) => {
        state.myMeetingsState.loading = false;
        state.myMeetingsState.data = action.payload;
      })
      .addCase(getMyMeetings.rejected, (state, action) => {
        state.myMeetingsState.loading = false;
        state.myMeetingsState.error = action.payload;
      });

    builder
      // ===============================
      // BASELINE SURVEY SUBMIT
      // ===============================
      .addCase(submitBaselineSurvey.pending, (state) => {
        state.baselineSurveyState.loading = true;
        state.baselineSurveyState.error = null;
        state.baselineSurveyState.data = null;
      })
      .addCase(submitBaselineSurvey.fulfilled, (state, action) => {
        state.baselineSurveyState.loading = false;
        state.baselineSurveyState.data = action.payload;
      })
      .addCase(submitBaselineSurvey.rejected, (state, action) => {
        state.baselineSurveyState.loading = false;
        state.baselineSurveyState.error = action.payload;
      });

    /* =========================================
   GET MY BASELINE SURVEY
========================================= */
    builder
      .addCase(getMyBaselineSurvey.pending, (state) => {
        state.myBaselineSurveyState.loading = true;
        state.myBaselineSurveyState.error = null;
      })
      .addCase(getMyBaselineSurvey.fulfilled, (state, action) => {
        state.myBaselineSurveyState.loading = false;
        state.myBaselineSurveyState.data = action.payload;
      })
      .addCase(getMyBaselineSurvey.rejected, (state, action) => {
        state.myBaselineSurveyState.loading = false;
        state.myBaselineSurveyState.error = action.payload;
      });

    builder

      /* ===========================
     MY TRACK SURVEYS
  =========================== */
      .addCase(getMyTrackSurveys.pending, (state) => {
        state.myTrackSurveysState.loading = true;
        state.myTrackSurveysState.error = null;
      })

      .addCase(getMyTrackSurveys.fulfilled, (state, action) => {
        state.myTrackSurveysState.loading = false;
        state.myTrackSurveysState.data = action.payload;
      })

      .addCase(getMyTrackSurveys.rejected, (state, action) => {
        state.myTrackSurveysState.loading = false;
        state.myTrackSurveysState.error = action.payload;
      });

    builder /* ===========================
   SURVEY BY SLUG
=========================== */
      .addCase(getSurveyBySlug.pending, (state) => {
        state.surveyBySlugState.loading = true;
        state.surveyBySlugState.error = null;
      })

      .addCase(getSurveyBySlug.fulfilled, (state, action) => {
        state.surveyBySlugState.loading = false;
        state.surveyBySlugState.data = action.payload;
      })

      .addCase(getSurveyBySlug.rejected, (state, action) => {
        state.surveyBySlugState.loading = false;
        state.surveyBySlugState.error = action.payload;
      });

    builder
      .addCase(submitSurveyResponses.pending, (state) => {
        state.submitSurveyState.loading = true;
        state.submitSurveyState.error = null;
        state.submitSurveyState.success = false;
      })

      .addCase(submitSurveyResponses.fulfilled, (state) => {
        state.submitSurveyState.loading = false;
        state.submitSurveyState.success = true;
      })

      .addCase(submitSurveyResponses.rejected, (state, action) => {
        state.submitSurveyState.loading = false;
        state.submitSurveyState.error = action.payload;
      });

    builder
      // ===============================
      // GET MY SURVEY RESPONSES
      // ===============================
      .addCase(getMySurveyResponses.pending, (state) => {
        state.mySurveyResponsesState.loading = true;
        state.mySurveyResponsesState.error = null;
      })
      .addCase(getMySurveyResponses.fulfilled, (state, action) => {
        state.mySurveyResponsesState.loading = false;
        state.mySurveyResponsesState.data = action.payload;
      })
      .addCase(getMySurveyResponses.rejected, (state, action) => {
        state.mySurveyResponsesState.loading = false;
        state.mySurveyResponsesState.error = action.payload;
      });
    builder
      /* ================= ADMIN SURVEY RESPONSES ================= */
      .addCase(getAdminSurveyResponses.pending, (state) => {
        state.myAdminSurveyResponsesState.loading = true;
        state.myAdminSurveyResponsesState.error = null;
      })
      .addCase(getAdminSurveyResponses.fulfilled, (state, action) => {
        state.myAdminSurveyResponsesState.loading = false;
        state.myAdminSurveyResponsesState.data = action.payload.results || [];
        state.myAdminSurveyResponsesState.count = action.payload.count;
        state.myAdminSurveyResponsesState.next = action.payload.next;
        state.myAdminSurveyResponsesState.previous = action.payload.previous;
      })
      .addCase(getAdminSurveyResponses.rejected, (state, action) => {
        state.myAdminSurveyResponsesState.loading = false;
        state.myAdminSurveyResponsesState.error = action.payload;
      });

    builder
      .addCase(getSurveyInsights.pending, (state) => {
        state.surveyInsightsState.loading = true;
        state.surveyInsightsState.error = null;
      })
      .addCase(getSurveyInsights.fulfilled, (state, action) => {
        state.surveyInsightsState.loading = false;
        state.surveyInsightsState.data = action.payload;
      })
      .addCase(getSurveyInsights.rejected, (state, action) => {
        state.surveyInsightsState.loading = false;
        state.surveyInsightsState.error = action.payload;
      });
    builder

      /* ===============================
       GET ALL SURVEYS
    =============================== */
      .addCase(getAllSurveys.pending, (state) => {
        state.allSurveysState.loading = true;
        state.allSurveysState.error = null;
      })
      .addCase(getAllSurveys.fulfilled, (state, action) => {
        state.allSurveysState.loading = false;
        state.allSurveysState.data = action.payload;
      })
      .addCase(getAllSurveys.rejected, (state, action) => {
        state.allSurveysState.loading = false;
        state.allSurveysState.error = action.payload;
      });

    builder
      // ================= TRAINEES =================
      .addCase(getAllTrainees.pending, (state) => {
        state.traineesState.loading = true;
        state.traineesState.error = null;
      })
      .addCase(getAllTrainees.fulfilled, (state, action) => {
        state.traineesState.loading = false;
        state.traineesState.data = action.payload;
      })
      .addCase(getAllTrainees.rejected, (state, action) => {
        state.traineesState.loading = false;
        state.traineesState.error = action.payload;
      });
    builder
      /* ===========================
         MY CERTIFICATES
      =========================== */
      .addCase(getMyCertificates.pending, (state) => {
        state.certificatesState.loading = true;
        state.certificatesState.error = null;
      })
      .addCase(getMyCertificates.fulfilled, (state, action) => {
        state.certificatesState.loading = false;
        state.certificatesState.data = action.payload;
      })
      .addCase(getMyCertificates.rejected, (state, action) => {
        state.certificatesState.loading = false;
        state.certificatesState.error = action.payload;
      });
    builder
      .addCase(getAllCertificates.pending, (state) => {
        state.adminCertificatesState.loading = true;
        state.adminCertificatesState.error = null;
      })
      .addCase(getAllCertificates.fulfilled, (state, action) => {
        state.adminCertificatesState.loading = false;
        state.adminCertificatesState.data = action.payload.results;
        state.adminCertificatesState.pagination.count = action.payload.count;
        state.adminCertificatesState.pagination.next = action.payload.next;
        state.adminCertificatesState.pagination.previous =
          action.payload.previous;
      })
      .addCase(getAllCertificates.rejected, (state, action) => {
        state.adminCertificatesState.loading = false;
        state.adminCertificatesState.error = action.payload;
      });
  },
});

export const { ToggleIsDataHub, resetBaselineSurveyState } = appSlice.actions;
export default appSlice.reducer;
