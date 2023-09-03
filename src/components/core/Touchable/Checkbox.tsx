/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tick } from '@assets/icons';
import { CheckboxItem, StyleCallbackParams } from '@core/interfaces';
import { useStyle } from '@hooks';
import { compareMemo } from '@utilities';
import { StyleProp, ViewProps, ViewStyle } from 'react-native';
import Row from '../Layout/Row';
import Spacer from '../Spacer/Spacer';
import Text from '../Text/Text';
import Touchable from './Touchable';

interface CheckboxProps<T = any> extends Omit<CheckboxItem<T>, 'value'>, Omit<ViewProps, 'style'> {
  isActive?: boolean;
  onPress: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const _Checkbox = compareMemo<CheckboxProps>(
  ({ label, isActive, onPress, disabled, containerStyle, ...props }) => {
    const behaviorStyle = disabled ? 'Disabled' : 'Enabled';
    const stateStyle = isActive ? 'Active' : 'Inactive';
    const styles = useStyle(createStyles);

    return (
      <Row {...props} style={[styles.container, containerStyle]}>
        <Touchable
          hitSlop={8}
          style={[styles.checkbox, styles[`checkbox${behaviorStyle}${stateStyle}`]]}
          {...{ disabled, onPress }}
        >
          <Tick stroke={styles.tick.tintColor} width={10} height={10} opacity={+!!isActive} />
        </Touchable>
        <Spacer w={6} />
        <Text style={styles[`label${behaviorStyle}`]}>{label}</Text>
      </Row>
    );
  },
);

const createStyles = ({ colors, create }: StyleCallbackParams) =>
  create({
    container: {
      alignItems: 'center',
    },
    checkbox: {
      borderRadius: 6,
      borderWidth: 1,
      width: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    checkboxEnabledInactive: {
      borderColor: colors.primaryText,
    },
    checkboxEnabledActive: {
      backgroundColor: colors.primary,
      borderColor: colors.transparent,
    },
    checkboxDisabledInactive: {
      borderColor: colors.lightGray,
    },
    checkboxDisabledActive: {
      backgroundColor: colors.lightGray,
      borderColor: colors.transparent,
    },
    tick: {
      tintColor: colors.white,
    },
    labelEnabled: {
      color: colors.primaryText,
    },
    labelDisabled: {
      color: colors.lightGray,
    },
  });

const Checkbox = _Checkbox as <T = any>(props: CheckboxProps<T>) => JSX.Element;

export default Checkbox;
