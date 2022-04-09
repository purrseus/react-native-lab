import { TAB_BAR_HEIGHT } from '@core/constants';
import { StyleCallbackParams } from '@core/interfaces';

const styleCallback = ({ colors, create, edgeInsets }: StyleCallbackParams) =>
  create({
    rootContainer: {
      shadowColor: colors.shadowTabBar,
      shadowOpacity: 0.1,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowRadius: 10,
      elevation: 20,
      borderWidth: 0.1,
    },
    container: {
      flexDirection: 'row',
      height: TAB_BAR_HEIGHT,
      backgroundColor: colors.tabBarBackground,
    },
    icon: {
      width: 24,
      height: 24,
      tintColor: colors.tabBlur,
    },
    label: {
      fontSize: 14,
      marginTop: 4,
      color: colors.tabBlur,
    },
    focusedLabel: {
      fontWeight: 'bold',
    },
    bottomInset: {
      height: edgeInsets.bottom / 2,
      width: '100%',
      backgroundColor: colors.tabBarBackground,
    },
  });

export default styleCallback;
