import { OverlayLoadingMethods } from '@core/interfaces';
import { compareMemo } from '@utils';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { View } from 'react-native';
import Modal from '../Modal/Modal';
import ActivityIndicator from './ActivityIndicator';
import { useTailwind } from '@hooks';

const OverlayLoading = compareMemo<OverlayLoadingMethods, unknown>(
  forwardRef((_, ref) => {
    const { tw } = useTailwind();
    const [isVisible, setIsVisible] = useState(false);

    useImperativeHandle(ref, () => ({ show: setIsVisible }), []);

    return (
      <Modal isVisible={isVisible}>
        <View style={tw`self-center p-5 rounded-xl bg-black/60`}>
          <ActivityIndicator size="large" />
        </View>
      </Modal>
    );
  }),
);

export default OverlayLoading;
