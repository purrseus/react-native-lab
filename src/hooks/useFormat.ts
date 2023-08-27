import { useCommonStore } from '@stores';
import { _formatDateTime, _formatNumber } from '@utilities';

const useFormat = () => {
  useCommonStore(state => state.language);

  return { formatDateTime: _formatDateTime, formatNumber: _formatNumber };
};

export default useFormat;
