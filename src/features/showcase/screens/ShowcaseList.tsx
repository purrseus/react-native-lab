import { Text, TextField, TextInput } from '@components/core';
import { ScreenContainer } from '@components/custom';
import { ProtectedScreenName } from '@core/enums';
import { I18nText, ProtectedScreen } from '@core/types';
import React from 'react';

const ShowcaseList: ProtectedScreen<ProtectedScreenName.ShowcaseList> = () => {
  return (
    <ScreenContainer headerTitle={'Showcase list' as I18nText}>
      <Text>ShowcaseList</Text>
      <TextInput />
      <TextField label="common.cancel" errorText="imagePicker.chooseFromLibrary" />
    </ScreenContainer>
  );
};

export default ShowcaseList;
