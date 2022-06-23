import { Button, ImagePicker, Switch } from '@components/core';
import { Image, ImagePickerMethods } from '@components/core/ImagePicker';
import { TabScreenName } from '@core/enums';
import { TabScreen } from '@core/types';
import { useAppDispatch, useBackHandler } from '@hooks';
import { commonActions } from '@store/slices/common';
import { globalStyles } from '@themes';
import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';

const Messages: TabScreen<TabScreenName.Messages> = () => {
  const dispatch = useAppDispatch();
  const [isActive, setIsActive] = useState(false);
  const imagePickerRef = useRef<ImagePickerMethods | null>(null);
  const [image, setImage] = useState<Image[]>([]);

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
      <Button title="common.cancel" onPress={() => imagePickerRef.current?.pick()} />
      <ImagePicker ref={imagePickerRef} onChangeImage={setImage} images={image} />
    </View>
  );
};

export default Messages;
