import { icons } from '@assets';
import { Button, Spacer, Text } from '@components/core';
import { useAppDispatch, useBackHandler, useFormat, useMeasure } from '@hooks';
import { commonActions } from '@store/slices/common';
import { logger } from '@utilities';
import React from 'react';
import { View } from 'react-native';

const Messages = () => {
  const dispatch = useAppDispatch();
  const { numberFormatter } = useFormat();
  const { ref, measure } = useMeasure<View>();
  logger(measure);

  useBackHandler(BackHandler => {
    BackHandler.exitApp();
    return false;
  });

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <View ref={ref}>
        <Button
          title="tab.messages"
          gradient
          leftIcon={icons.home}
          rightIcon={icons.message}
          iconSize={24}
          iconSpacing={20}
          iconProps={{ tintColor: 'white' }}
          loading
        />
      </View>
      <Spacer h40 />
      <Button
        title="tab.messages"
        type="outline"
        leftIcon={icons.home}
        rightIcon={icons.message}
        iconSpacing={20}
        // iconProps={{ tintColor: 'white' }}
        // loading
      />
      <Text onPress={() => dispatch(commonActions.changeLanguage('en-US'))}>
        {numberFormatter(1_000_000_000, '0a')}
      </Text>
    </View>
  );
};

export default Messages;
