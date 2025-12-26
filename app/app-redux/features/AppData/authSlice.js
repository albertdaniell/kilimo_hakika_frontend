import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosPostService } from "../../../../constants/AxiosService";

const loginState = {
  data: null,
  error: null,
  loading: false,
};

const initialState = {
  loginState,
};

/**
 * LOGIN
 */
const extractErrorMessage = (error) => {
  if (typeof error === "string") return error;
  if (Array.isArray(error?.detail)) return error.detail[0];
  if (typeof error?.detail === "string") return error.detail;
  return "Login failed";
};
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const { dataPassed } = data;
      const url = process.env.NEXT_PUBLIC_LOGIN_URL;

      const res = await AxiosPostService(url, dataPassed, true);
      return res.data; // { access, user }
    } catch (err) {


      return rejectWithValue(extractErrorMessage(err) || "Login failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.loginState.data = null;
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
    },
    hydrateAuthFromStorage: (state) => {
      if (typeof window === "undefined") return;

      const access = localStorage.getItem("access_token");
      const user = localStorage.getItem("user");

      if (access && user) {
        state.loginState.data = {
          access,
          user: JSON.parse(user),
        };
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginState.loading = true;
        state.loginState.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginState.loading = false;
        state.loginState.data = action.payload;

        // 🔐 STORE IN LOCAL STORAGE
        localStorage.setItem("access_token", action.payload.access);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginState.loading = false;
        state.loginState.error = action.payload;
      });
  },
});

export const { logout,hydrateAuthFromStorage } = authSlice.actions;
export default authSlice.reducer;