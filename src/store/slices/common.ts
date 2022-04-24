import { Language } from '@core/types';
import i18n from '@i18n';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createPersistReducer, getCurrentLanguage } from '@utilities';
import { REHYDRATE } from 'redux-persist';

export interface CommonState {
  isLoading: boolean;
  language: Language;
}

const initialState: CommonState = {
  isLoading: false,
  language: getCurrentLanguage(),
};

const common = createSlice({
  name: 'common',
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
  },
  extraReducers: {
    [REHYDRATE]: (state, { payload }: PayloadAction<Partial<CommonState>>) => {
      if (payload?.language) {
        state.language = payload.language;
        i18n.changeLanguage(payload.language);
      }
    },
  },
});

export const commonActions = common.actions;
export default createPersistReducer(common, { blacklist: ['isLoading'] });
