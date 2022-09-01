import { StyleCallbackParams } from '@core/interfaces';
import { useStyle } from '@hooks';
import { globalStyles } from '@themes';
import { compareMemo } from '@utilities';
import React from 'react';
import { ScrollView, StyleProp, View, ViewProps, ViewStyle } from 'react-native';
import NavigationHeader, { NavigationHeaderProps } from './NavigationHeader';

interface ScreenContainerProps extends ViewProps {
  wrapperType?: 'scrollView' | 'view';
  headerTitle?: NavigationHeaderProps['title'];
  navigationHeaderProps?: NavigationHeaderProps;
  wrapperStyle?: StyleProp<ViewStyle>;
}

const ScreenContainer = compareMemo<ScreenContainerProps>(
  ({
    headerTitle,
    wrapperType = 'scrollView',
    navigationHeaderProps,
    wrapperStyle,
    style,
    children,
    ...props
  }) => {
    const styles = useStyle(createStyles);
    const Wrapper = wrapperType === 'scrollView' ? ScrollView : View;

    return (
      <View {...props} style={[globalStyles.flexFill, style]}>
        {!!headerTitle && <NavigationHeader title={headerTitle} {...navigationHeaderProps} />}
        <Wrapper
          style={[styles.wrapper, wrapperStyle]}
          {...(wrapperType === 'scrollView' && {
            contentContainerStyle: styles.contentContainer,
            automaticallyAdjustsScrollIndicatorInsets: false,
          })}
        >
          {children}
        </Wrapper>
      </View>
    );
  },
);

const createStyles = ({ create, edgeInsets }: StyleCallbackParams) =>
  create({
    wrapper: {
      flex: 1,
      paddingHorizontal: 16,
    },
    contentContainer: {
      paddingBottom: edgeInsets.bottom,
    },
  });

export default ScreenContainer;
