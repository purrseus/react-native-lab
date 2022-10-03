import { ONE_SECOND } from '@core/constants';
import { overlayLoading, wait } from '@utilities';

const useLoaderContainer = () => {
  const handleOverlayLoading = async () => {
    overlayLoading.show();
    await wait(ONE_SECOND * 3);
    overlayLoading.hide();
  };

  return { handleOverlayLoading };
};

export default useLoaderContainer;
