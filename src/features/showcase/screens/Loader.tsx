import { StackContainer } from '@components/custom';
import { ProtectedScreenName } from '@core/enums';
import { ProtectedScreen } from '@core/types';
import { globalStyles } from '@themes';
import { ShowcaseItem } from '../components';
import { useLoaderContainer } from '../containers';

const Loader: ProtectedScreen<ProtectedScreenName.Loader> = () => {
  const { handleOverlayLoading } = useLoaderContainer();

  return (
    <StackContainer
      headerTitle={ProtectedScreenName.Loader}
      wrapperStyle={globalStyles.flexFillCenter}
    >
      <ShowcaseItem title="Show OverlayLoading in 3 seconds" onPress={handleOverlayLoading} />
    </StackContainer>
  );
};

export default Loader;
