import { ProtectedScreenName, TabScreenName } from '@core/enums';
import { TabScreen } from '@core/types';

const useHome = ({ navigation }: Parameters<TabScreen<TabScreenName.Home>>[0]) => {
  const goToShowcase = () => navigation.navigate(ProtectedScreenName.ShowcaseList);

  return { goToShowcase };
};

export default useHome;
