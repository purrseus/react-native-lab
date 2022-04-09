import { AppStackParamList } from '@core/types';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppStackParamList {}
  }
}
