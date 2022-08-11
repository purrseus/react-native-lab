import { UnprotectedScreenName } from '@core/enums';
import { UnprotectedScreen } from '@core/types';

const useRegister = ({
  navigation,
}: Parameters<UnprotectedScreen<UnprotectedScreenName.Register>>[0]) => {
  const goBack = navigation.goBack;

  return { goBack };
};

export default useRegister;
