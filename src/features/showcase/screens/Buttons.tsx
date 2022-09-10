import { icons } from '@assets';
import { Button } from '@components/core';
import { StackContainer } from '@components/custom';
import { StyleCallbackParams } from '@core/interfaces';
import { useStyle } from '@hooks';
import { colors } from '@themes';
import React from 'react';
import Separator from '../components/Separator';

const Buttons = () => {
  const styles = useStyle(createStyles);

  return (
    <StackContainer wrapperType="scrollView" headerTitle="Buttons" wrapperStyle={styles.scrollView}>
      {/* Size */}
      <Button title="Large size (default)" size="large" />
      <Separator />
      <Button title="Medium size" size="medium" />
      <Separator />
      <Button title="Small size" size="small" />
      <Separator />

      {/* Type */}
      <Button title="Filled type (default)" type="filled" />
      <Separator />
      <Button title="Outline type" type="outlined" />
      <Separator />
      <Button title="Tonal type" type="tonal" />
      <Separator />

      {/* Color */}
      <Button title="Another color" color={colors.red} />
      <Separator />
      <Button title="Gradient color" gradient />
      <Separator />
      <Button
        title="Another gradient color"
        gradient
        gradientColors={[colors.blue, colors.purple, colors.red]}
      />
      <Separator />

      {/* State */}
      <Button title="Loading..." loading />
      <Separator />
      <Button title="Disabled" disabled />
      <Separator />

      {/* Icon */}
      <Button title="Title with right icon" iconSpacing={8} iconRight={icons.bottomTab.home} />
      <Separator />
      <Button title="Title with left icon" iconSpacing={8} iconLeft={icons.header.back} />
      <Separator />
      <Button
        title="Title with both icon"
        iconSpacing={8}
        iconLeft={icons.header.back}
        iconRight={icons.bottomTab.home}
      />
      <Separator />
      <Button
        title="Title is not in center position"
        titleCenter={false}
        iconSpacing={8}
        iconRight={icons.bottomTab.home}
      />
    </StackContainer>
  );
};

const createStyles = ({ create }: StyleCallbackParams) =>
  create({
    scrollView: {
      paddingVertical: 16,
    },
  });

export default Buttons;
