import { colors } from '@themes';
import React, { FC } from 'react';
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native';

const StyledActivityIndicator: FC<ActivityIndicatorProps> = props => {
  return <ActivityIndicator color={colors.primary} {...props} />;
};

export default StyledActivityIndicator;
