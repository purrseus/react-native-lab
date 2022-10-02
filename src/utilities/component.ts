import { OverlayLoadingMethods } from '@core/interfaces';
import { createRef, ForwardRefExoticComponent, memo, PropsWithoutRef, RefAttributes } from 'react';
import isEqual from 'react-fast-compare';

export const overlayLoadingRef = createRef<OverlayLoadingMethods>();

export const showOverlayLoading = (isShow: boolean) => overlayLoadingRef.current?.show(isShow);

export const compareMemo = <T, P = undefined>(
  Component: P extends undefined
    ? (props: T) => JSX.Element
    : ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>>,
) => memo(Component, isEqual);
