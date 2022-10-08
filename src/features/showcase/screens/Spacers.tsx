import { BottomSpacer, Row, Spacer } from '@components/core';
import { StackContainer } from '@components/custom';
import { ProtectedScreenName } from '@core/enums';
import { StyleCallbackParams } from '@core/interfaces';
import { ProtectedScreen } from '@core/types';
import { useStyle } from '@hooks';
import { globalStyles } from '@themes';
import { View } from 'react-native';
import { Separator, ShowcaseItem } from '../components';
import useSpacerContainer from '../containers/useSpacerContainer';

const Spacers: ProtectedScreen<ProtectedScreenName.Spacers> = () => {
  const styles = useStyle(createStyles);
  const { WIDTH, HEIGHT, ...container } = useSpacerContainer();

  return (
    <StackContainer headerTitle={ProtectedScreenName.Spacers}>
      <View style={[globalStyles.flexFillCenter, styles.container]}>
        <ShowcaseItem title={`Show width spacer: ${WIDTH}`} onPress={container.showWidthSpacer} />
        <Separator />
        <ShowcaseItem
          title={`Show height spacer: ${HEIGHT}`}
          onPress={container.showHeightSpacer}
        />
        <Separator />
        <ShowcaseItem title="Show bottomTab spacer" onPress={container.showBottomTabSpacer} />
        <Separator />
        <ShowcaseItem title="Show safeArea spacer" onPress={container.showSafeAreaSpacer} />
        <Separator />
        <ShowcaseItem title="Show halfSafeArea spacer" onPress={container.showHalfSafeAreaSpacer} />

        <Spacer h={100} />

        {container.status === 'spacerWidth' && (
          <Row style={[styles.spacerExampleContainer, styles.row]}>
            <View style={styles.sideView} />
            <Spacer w={WIDTH} />
            <View style={styles.sideView} />
          </Row>
        )}
        {container.status === 'spacerHeight' && (
          <View style={styles.spacerExampleContainer}>
            <Spacer h={HEIGHT} />
          </View>
        )}
      </View>

      {container.status === 'bottomTab' && <BottomSpacer type="bottomTab" />}
      {container.status === 'safeArea' && <BottomSpacer type="safeArea" />}
      {container.status === 'halfSafeArea' && <BottomSpacer type="halfSafeArea" />}
    </StackContainer>
  );
};

const createStyles = ({ create, colors, dimensions }: StyleCallbackParams) =>
  create({
    container: {
      backgroundColor: colors.darkGray,
    },
    spacerExampleContainer: {
      backgroundColor: colors.white,
      width: dimensions.width,
    },
    sideView: {
      flex: 1,
      backgroundColor: colors.darkGray,
    },
    row: {
      height: 32,
    },
  });

export default Spacers;
