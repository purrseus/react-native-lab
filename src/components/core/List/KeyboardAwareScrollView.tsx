import { PADDING_VERTICAL_INPUT } from '@core/constants';
import { compareMemo } from '@utilities';
import {
  KeyboardAwareScrollView as RNKeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from 'react-native-keyboard-aware-scroll-view';

const KeyboardAwareScrollView = compareMemo<KeyboardAwareScrollViewProps>(
  ({ children, ...props }) => (
    <RNKeyboardAwareScrollView
      automaticallyAdjustContentInsets={false}
      automaticallyAdjustsScrollIndicatorInsets={false}
      extraScrollHeight={PADDING_VERTICAL_INPUT}
      keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
      {...props}
    >
      {children}
    </RNKeyboardAwareScrollView>
  ),
);

export default KeyboardAwareScrollView;
