import { Button, Switch } from '@components/core';
import { TabScreenName } from '@core/enums';
import { TabScreen } from '@core/types';
import { useAppDispatch, useBackHandler } from '@hooks';
import { commonActions } from '@store/slices/common';
import { globalStyles } from '@themes';
import { checkPhotoGalleryPermissions } from '@utilities';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

const Messages: TabScreen<TabScreenName.Messages> = () => {
  const dispatch = useAppDispatch();
  const [isActive, setIsActive] = useState(false);

  useBackHandler(BackHandler => {
    BackHandler.exitApp();
    return false;
  });

  useEffect(() => {
    dispatch(commonActions.changeLanguage(isActive ? 'en-US' : 'vi-VN'));
  }, [isActive, dispatch]);

  return (
    <View style={globalStyles.flexCenter}>
      <Switch value={isActive} onChange={setIsActive} />
      <Button title="imagePicker.chooseFromLibrary" onPress={checkPhotoGalleryPermissions} />
    </View>
  );
};

export default Messages;
