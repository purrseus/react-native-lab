import { StyleCallbackParams } from '@core/interfaces';

const styleCallback = ({ create, colors }: StyleCallbackParams) =>
  create({
    screenStyle: {
      backgroundColor: colors.background,
    },
  });

export default styleCallback;
