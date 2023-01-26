import { PublicScreenName } from '@core/enums';
import { PublicScreenProps } from '@core/types';
import { useAppDispatch } from '@hooks';
import { authActions } from '@store/slices/auth';

const useLoginContainer = ({ navigation }: PublicScreenProps<PublicScreenName.Login>) => {
  const dispatch = useAppDispatch();

  const handleLogin = () => {
    dispatch(
      authActions.setToken({
        accessToken: 'fakeAccessToken',
        refreshToken: 'fakeRefreshToken',
      }),
    );
  };

  const navigateToRegister = () => navigation.navigate(PublicScreenName.Register);

  return { handleLogin, navigateToRegister };
};

export default useLoginContainer;
