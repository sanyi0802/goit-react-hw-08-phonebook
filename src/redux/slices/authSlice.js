import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { register, login, logout, fetchCurrentUser, token } from '../../services/api';

export const registerUser = createAsyncThunk('auth/register', async (userData) => {
  const response = await register(userData);
  if (response.token) {
    token.set(response.token);
  }
  return response;
});

export const loginUser = createAsyncThunk('auth/login', async (userData) => {
  const response = await login(userData);
  if (response.token) {
    token.set(response.token);
  }
  return response;
});

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  await logout();
  token.unset();
});

export const fetchCurrent = createAsyncThunk('auth/fetchCurrent', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const persistedToken = state.auth.token;

  if (!persistedToken) {
    return thunkAPI.rejectWithValue('No token found');
  }

  token.set(persistedToken);
  const response = await fetchCurrentUser();
  return response;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  },
  reducers: {
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })
      .addCase(fetchCurrent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCurrent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchCurrent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearAuth } = authSlice.actions;

export default authSlice.reducer;
