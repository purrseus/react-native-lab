import { commonActions } from '@store/slices/common';
import useAppDispatch from './useAppDispatch';
import useAppSelector from './useAppSelector';

const useLoading = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(state => state.common);

  const toggleLoading = (payload?: boolean) => dispatch(commonActions.toggleLoading(payload));
  return { toggleLoading, isLoading };
};

export default useLoading;
