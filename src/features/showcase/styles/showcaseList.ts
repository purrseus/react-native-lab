import { StyleCallbackParams } from '@core/interfaces';

const createShowcaseListStyles = ({ create }: StyleCallbackParams) =>
  create({
    scrollView: {
      paddingVertical: 16,
    },
  });

export default createShowcaseListStyles;
