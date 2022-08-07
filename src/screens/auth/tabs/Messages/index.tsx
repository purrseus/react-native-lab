import { Button, ImagePicker, Switch } from '@components/core';
import { Image, ImagePickerMethods } from '@components/core/bottom-sheets/ImagePicker';
import { TabScreenName } from '@core/enums';
import { TabScreen } from '@core/types';
import { useAppDispatch, useAppSelector, useBackHandler, useNotFirstTime } from '@hooks';
import { commonActions } from '@store/slices/common';
import { globalStyles } from '@themes';
import React, { useRef, useState } from 'react';
import { View } from 'react-native';

const Messages: TabScreen<TabScreenName.Messages> = () => {
  const dispatch = useAppDispatch();
  const { language } = useAppSelector(state => state.common);
  const imagePickerRef = useRef<ImagePickerMethods | null>(null);
  const [image, setImage] = useState<Image[]>([]);

  const handleActive = (value: boolean) => {
    dispatch(commonActions.changeLanguage(value ? 'en-US' : 'vi-VN'));
  };

  useBackHandler(BackHandler => {
    BackHandler.exitApp();
    return false;
  });

  useNotFirstTime(() => {
    console.log('alo');
    return () => console.log('clean');
  }, [language]);

  return (
    <View style={globalStyles.flexCenter}>
      <Switch value={language === 'en-US'} onChange={handleActive} />
      <Button title="common.cancel" onPress={() => imagePickerRef.current?.pick()} />
      <ImagePicker ref={imagePickerRef} onChangeImage={setImage} images={image} />
    </View>
  );
};

export default Messages;
