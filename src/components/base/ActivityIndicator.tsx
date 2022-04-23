import { colors } from '@themes';
import { comparedMemo } from '@utilities';
import React from 'react';
import { ActivityIndicator as RNActivityIndicator, ActivityIndicatorProps } from 'react-native';

const ActivityIndicator = comparedMemo<ActivityIndicatorProps>(props => {
  return <RNActivityIndicator color={colors.primary} {...props} />;
});

export default ActivityIndicator;
