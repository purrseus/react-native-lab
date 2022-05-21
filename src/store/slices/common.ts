import { Language } from '@core/types';
import i18n from '@i18n';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createPersistReducer, getCurrentLanguage } from '@utilities';
import { REHYDRATE } from 'redux-persist';

type Theme = 'auto' | 'light' | 'dark';

export interface CommonState {
  isLoading: boolean;
  language: Language;
  theme: Theme;
}

const SLICE_NAME = 'common';

const initialState: CommonState = {
  isLoading: false,
  language: getCurrentLanguage(),
  theme: 'auto',
};

const commonSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    toggleLoading: (state, { payload }: PayloadAction<boolean | undefined>) => {
      if (payload === undefined) {
        state.isLoading = !state.isLoading;
        return;
      }
      state.isLoading = payload;
    },
    changeLanguage: (state, { payload }: PayloadAction<Language>) => {
      state.language = payload;
      i18n.changeLanguage(payload);
    },
    changeTheme: (state, { payload }: PayloadAction<Theme>) => {
      state.theme = payload;
    },
  },
  extraReducers: {
    [REHYDRATE]: (_, { payload }: PayloadAction<Partial<Omit<CommonState, 'isLoading'>>>) => {
      if (payload?.language) {
        i18n.changeLanguage(payload.language);
      }
    },
  },
});

export const commonActions = commonSlice.actions;
export default createPersistReducer(commonSlice, { blacklist: ['isLoading'] });
