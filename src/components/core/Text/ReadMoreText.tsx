import { StyleCallbackParams } from '@core/interfaces';
import { useAppTranslation, useStyle } from '@hooks';
import { compareMemo } from '@utils';
import { useMemo, useRef, useState } from 'react';
import { NativeSyntheticEvent, TextLayoutEventData } from 'react-native';
import Text, { TextProps } from './Text';

const ReadMoreText = compareMemo<TextProps>(({ children, numberOfLines = 3, ...props }) => {
  const styles = useStyle(createStyles);
  const isFirstRender = useRef(true);
  const [expanded, setExpanded] = useState(false);
  const [paragraph, setParagraph] = useState('');
  const { t } = useAppTranslation('text');
  const [readMoreText, seeLessText] = useMemo(() => [t('readMore'), t('seeLess')], [t]);

  const toggle = () => setExpanded(!expanded);

  const onTextLayout = ({ nativeEvent: { lines } }: NativeSyntheticEvent<TextLayoutEventData>) => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      const suffixTruncatedText = '... ';

      const truncatedText = lines
        .slice(0, numberOfLines)
        .reduce((previousValue, currentValue) => previousValue + currentValue.text, '')
        .slice(0, -(suffixTruncatedText.length + readMoreText.length));

      setParagraph(`${truncatedText}${suffixTruncatedText}`);
    }
  };

  return (
    <Text onTextLayout={onTextLayout} {...props}>
      <Text>{paragraph && !expanded ? paragraph : children}</Text>
      {expanded ? '\n' : ' '}
      <Text onPress={toggle} style={styles.footerText}>
        {expanded ? seeLessText : readMoreText}
      </Text>
    </Text>
  );
});

const createStyles = ({ create, colors }: StyleCallbackParams) =>
  create({
    footerText: {
      color: colors.blue,
    },
  });

export default ReadMoreText;
