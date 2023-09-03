import {
  IconTextInput,
  KeyboardAwareScrollView,
  MultilineTextInput,
  ReadMoreText,
  Text,
  TextInput,
} from '@components/core';
import { StackContainer } from '@components/shared';
import { ProtectedScreenName } from '@core/enums';
import { StyleCallbackParams } from '@core/interfaces';
import { useStyle } from '@hooks';
import { useTranslation } from 'react-i18next';
import { Separator } from '../components';
import { Home } from '@assets/icons';

export default function TextsScreen() {
  const { t } = useTranslation();
  const styles = useStyle(createStyles);

  return (
    <StackContainer title={ProtectedScreenName.Texts}>
      <KeyboardAwareScrollView style={styles.keyboardView}>
        <Text>Normal text</Text>

        <Separator />

        <Text>Locale text: {t('common.cancel')}</Text>

        <Separator />

        <ReadMoreText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </ReadMoreText>

        <Separator />

        <Text>SinglelineTextInput</Text>
        <TextInput style={styles.singlelineTextInput} />

        <Separator />

        <Text>IconTextInput (left)</Text>
        <IconTextInput placeholder="IconTextInput (left)" IconLeftComponent={<Home />} />

        <Separator />

        <Text>IconTextInput (right)</Text>
        <IconTextInput placeholder="IconTextInput (right)" IconRightComponent={<Home />} />

        <Separator />

        <Text>IconTextInput (both)</Text>
        <IconTextInput
          placeholder="IconTextInput (both)"
          IconLeftComponent={<Home />}
          IconRightComponent={<Home />}
        />

        <Separator />

        <Text>MultilineTextInput</Text>
        <MultilineTextInput
          placeholder="MultilineTextInput"
          containerStyle={styles.multilineTextInput}
        />

        <Separator />

        <Text>MultilineTextInput dynamicHeight</Text>
        <MultilineTextInput
          dynamicHeight
          placeholder="MultilineTextInput"
          containerStyle={styles.dynamicHeightMultilineTextInput}
        />
      </KeyboardAwareScrollView>
    </StackContainer>
  );
}

const createStyles = ({ create }: StyleCallbackParams) =>
  create({
    keyboardView: {
      paddingHorizontal: 16,
    },
    singlelineTextInput: {
      borderWidth: 1,
      width: '100%',
    },
    multilineTextInput: {
      width: '100%',
    },
    dynamicHeightMultilineTextInput: {
      width: '100%',
    },
  });
