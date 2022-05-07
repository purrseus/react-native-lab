import { colors } from '@themes';
import { compareMemo } from '@utilities';
import React from 'react';
import { ActivityIndicator as RNActivityIndicator, ActivityIndicatorProps } from 'react-native';

const ActivityIndicator = compareMemo<ActivityIndicatorProps>(props => {
  return <RNActivityIndicator color={colors.primary} {...props} />;
});

export default ActivityIndicator;
