import { colors } from '@themes';
import { comparedMemo } from '@utilities';
import React from 'react';
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native';

const StyledActivityIndicator = comparedMemo<ActivityIndicatorProps>(props => {
  return <ActivityIndicator color={colors.primary} {...props} />;
});

export default StyledActivityIndicator;
