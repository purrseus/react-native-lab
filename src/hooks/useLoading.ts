import { commonActions } from '@store/slices/common';
import { useCallback } from 'react';
import useAppDispatch from './useAppDispatch';
import useAppSelector from './useAppSelector';

const useLoading = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(state => state.common);

  const toggleLoading = useCallback(
    (payload?: boolean) => dispatch(commonActions.toggleLoading(payload)),
    [dispatch],
  );
  return { toggleLoading, isLoading };
};

export default useLoading;
