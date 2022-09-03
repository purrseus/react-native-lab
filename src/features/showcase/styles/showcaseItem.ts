import { StyleCallbackParams } from '@core/interfaces';

const createShowcaseItemStyles = ({ create, fonts, colors }: StyleCallbackParams) =>
  create({
    item: {
      padding: 16,
      backgroundColor: colors.lightGray,
      borderRadius: 8,
      alignItems: 'center',
    },
    itemText: {
      fontSize: 16,
      fontFamily: fonts.quicksandBold,
    },
  });

export default createShowcaseItemStyles;
