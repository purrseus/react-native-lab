import { Language } from '@core/types';
import i18n from '@i18n';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import createPersistOptions from './persistStorage';

type Theme = 'auto' | 'light' | 'dark';

interface CommonState {
  theme: Theme;
  language: Language;
  changeLanguage: (language: Language) => void;
  changeTheme: (theme: Theme) => void;
}

const useCommonStore = create<CommonState>()(
  persist(
    immer(set => ({
      theme: 'auto',
      language: 'en-US',
      changeLanguage: language =>
        set(state => {
          state.language = language;
          i18n.changeLanguage(language);
        }),
      changeTheme: theme =>
        set(state => {
          state.theme = theme;
        }),
    })),
    createPersistOptions('common', {
      onRehydrateStorage: () => innerState => {
        if (innerState?.language) i18n.changeLanguage(innerState.language);
      },
    }),
  ),
);

export default useCommonStore;
