import { ONE_SECOND } from '@core/constants';
import { showOverlayLoading, wait } from '@utilities';

const useLoaderContainer = () => {
  const handleOverlayLoading = async () => {
    showOverlayLoading(true);
    await wait(ONE_SECOND * 3);
    showOverlayLoading(false);
  };

  return { handleOverlayLoading };
};

export default useLoaderContainer;
