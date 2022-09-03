import { UnprotectedScreenName } from '@core/enums';
import { UnprotectedScreen } from '@core/types';

const useRegisterContainer = ({
  navigation: { goBack },
}: Parameters<UnprotectedScreen<UnprotectedScreenName.Register>>[0]) => {
  return { goBack };
};

export default useRegisterContainer;
