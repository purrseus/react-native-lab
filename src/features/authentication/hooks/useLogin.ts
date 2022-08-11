import { UnprotectedScreenName } from '@core/enums';
import { UnprotectedScreen } from '@core/types';
import { useAppDispatch } from '@hooks';
import { authActions } from '@store/slices/auth';

const useLogin = ({
  navigation,
}: Parameters<UnprotectedScreen<UnprotectedScreenName.Login>>[0]) => {
  const dispatch = useAppDispatch();

  const handleLogin = () => {
    dispatch(
      authActions.setToken({
        accessToken: 'fakeAccessToken',
        refreshToken: 'fakeRefreshToken',
      }),
    );
  };

  const navigateToRegister = () => navigation.navigate(UnprotectedScreenName.Register);

  return { handleLogin, navigateToRegister };
};

export default useLogin;
