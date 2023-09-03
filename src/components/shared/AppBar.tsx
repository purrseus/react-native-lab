import { ArrowLeft } from '@assets/icons';
import { Row, Spacer, Text, Touchable } from '@components/core';
import { DEFAULT_HORIZONTAL_EDGE_SPACING, APP_BAR_HEIGHT } from '@core/constants';
import { AppBarAction, StyleCallbackParams } from '@core/interfaces';
import { useLayout, useStyle } from '@hooks';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '@themes';
import { compareMemo, createShadow } from '@utilities';
import { Fragment, useMemo } from 'react';
import { StatusBar, View, ViewProps } from 'react-native';

export interface AppBarProps extends ViewProps {
  title: string;
  rightActions?: AppBarAction[];
  actionSeparatorWidth?: number;
}

const AppBar = compareMemo<AppBarProps>(
  ({ title, rightActions = [], actionSeparatorWidth = 8, ...props }) => {
    const styles = useStyle(createStyles);
    const { canGoBack, goBack } = useNavigation();
    const { layout: sideLayout, handleLayout: handleSideLayout } = useLayout({
      flexibleLayout: false,
    });

    const RightActions = useMemo(
      () =>
        rightActions.map(({ onPress, Icon, size = 24 }: AppBarAction, index, array) => {
          const showSpacerSeparator = index !== array.lastIndex;

          return (
            <Fragment key={index}>
              <Touchable hitSlop={actionSeparatorWidth / 2} onPress={onPress}>
                <Icon width={size} height={size} stroke={styles.icon.tintColor} />
              </Touchable>
              {showSpacerSeparator && <Spacer w={actionSeparatorWidth} />}
            </Fragment>
          );
        }),
      [rightActions, actionSeparatorWidth, styles.icon.tintColor],
    );

    const handleGoBack = canGoBack() ? goBack : undefined;

    return (
      <View {...props} style={styles.rootContainer}>
        <Row style={styles.safeAreaContainer}>
          <Row
            style={[
              styles.sideWrapper,
              styles.leftWrapper,
              { width: sideLayout.width || undefined },
            ]}
          >
            {handleGoBack && (
              <Touchable hitSlop={actionSeparatorWidth / 2} onPress={handleGoBack}>
                <ArrowLeft stroke={styles.icon.tintColor} />
              </Touchable>
            )}
          </Row>

          <Row style={globalStyles.flexFillCenter}>
            <Text numberOfLines={1} style={styles.title}>
              {title}
            </Text>
          </Row>

          <Row
            onLayout={rightActions.isNotEmpty ? handleSideLayout : undefined}
            style={[styles.sideWrapper, styles.rightWrapper]}
          >
            {RightActions}
          </Row>
        </Row>
      </View>
    );
  },
);

const createStyles = ({ create, edgeInsets, colors }: StyleCallbackParams) =>
  create({
    rootContainer: {
      backgroundColor: colors.appBarBackground,
      paddingTop: edgeInsets.top || StatusBar.currentHeight || 0,
      paddingLeft: edgeInsets.left,
      paddingRight: edgeInsets.right,
      ...createShadow(colors.shadow, [0, 4], 0.1, 8, 16),
    },
    safeAreaContainer: {
      height: APP_BAR_HEIGHT,
    },
    sideWrapper: {
      minWidth: '20%',
      alignItems: 'center',
      paddingHorizontal: DEFAULT_HORIZONTAL_EDGE_SPACING,
    },
    leftWrapper: {
      justifyContent: 'flex-start',
    },
    rightWrapper: {
      justifyContent: 'flex-end',
    },
    icon: {
      tintColor: colors.primaryText,
    },
    title: {
      fontWeight: 'bold',
      fontSize: 20,
    },
  });

export default AppBar;
