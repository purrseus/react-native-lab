import { OverlayLoadingMethods } from '@core/interfaces';
import { ForwardRefExoticComponent, PropsWithoutRef, RefAttributes, createRef, memo } from 'react';
import isEqual from 'react-fast-compare';

export const overlayLoadingRef = createRef<OverlayLoadingMethods>();

export const overlayLoading = {
  show: () => overlayLoadingRef.current?.show(true),
  hide: () => overlayLoadingRef.current?.show(false),
};

export const compareMemo = <T, P = undefined>(
  Component: P extends undefined
    ? (props: T) => JSX.Element
    : ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>>,
) => memo(Component, isEqual);
