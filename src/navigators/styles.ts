import { StyleCallbackParams } from '@core/interfaces';

const createStyles = ({ create, color }: StyleCallbackParams) =>
  create({
    screenStyle: {
      backgroundColor: color.background,
    },
  });

export default createStyles;
