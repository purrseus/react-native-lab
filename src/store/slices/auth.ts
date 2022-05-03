import { CommonStatus } from '@core/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { handleRefreshToken } from '@services/requests/auth';
import { createPersistReducer } from '@utilities';

interface AuthState {
  status: CommonStatus;
  accessToken?: string;
  refreshToken?: string;
}

const sliceName = 'auth';

const initialState: AuthState = {
  status: 'idle',
};

const resetState = () => initialState;

export const fetchNewAccessToken = createAsyncThunk(
  `${sliceName}/fetchNewAccessToken`,
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as AuthState;
      if (!state.refreshToken) throw new Error();
      const {
        data: { accessToken },
      } = await handleRefreshToken(state.refreshToken);
      if (typeof accessToken !== 'string') throw new Error();
      return accessToken;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const auth = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setToken: (state, { payload }: PayloadAction<Omit<AuthState, 'status'>>) => {
      if (payload.accessToken) {
        state.accessToken = payload.accessToken;
      }
      if (payload.refreshToken) {
        state.refreshToken = payload.refreshToken;
      }
    },
    logOut: resetState,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchNewAccessToken.pending, state => {
        state.status = 'pending';
      })
      .addCase(fetchNewAccessToken.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.accessToken = payload;
      })
      .addCase(fetchNewAccessToken.rejected, resetState);
  },
});

export const authActions = auth.actions;
export default createPersistReducer(auth, { blacklist: ['status'] });
