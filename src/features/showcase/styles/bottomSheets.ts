import { StyleCallbackParams } from '@core/interfaces';

const createBottomSheetsStyles = ({ create }: StyleCallbackParams) =>
  create({
    scrollView: {
      paddingVertical: 16,
    },
  });

export default createBottomSheetsStyles;
