import { globalStyles } from '@themes';
import { compareMemo } from '@utilities';
import React from 'react';
import { View, ViewProps } from 'react-native';
import NavigationHeader, { NavigationHeaderProps } from './NavigationHeader';

interface ScreenContainerProps extends ViewProps {
  headerTitle?: NavigationHeaderProps['title'];
  navigationHeaderProps?: NavigationHeaderProps;
}

const ScreenContainer = compareMemo<ScreenContainerProps>(
  ({ headerTitle, navigationHeaderProps, style, children, ...props }) => {
    return (
      <View {...props} style={[globalStyles.flexFill, style]}>
        {!!headerTitle && <NavigationHeader title={headerTitle} {...navigationHeaderProps} />}
        {children}
      </View>
    );
  },
);

export default ScreenContainer;
