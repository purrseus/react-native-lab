import { ONE_SECOND } from '@core/constants';
import { useLoading } from '@hooks';
import { wait } from '@utilities';

const useLoaderContainer = () => {
  const { toggleLoading } = useLoading();

  const handleOverlayLoading = async () => {
    toggleLoading(true);
    await wait(ONE_SECOND * 3);
    toggleLoading(false);
  };

  return { handleOverlayLoading };
};

export default useLoaderContainer;
