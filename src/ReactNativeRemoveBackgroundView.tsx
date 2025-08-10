import { requireNativeView } from 'expo';
import * as React from 'react';

import { ReactNativeRemoveBackgroundViewProps } from './ReactNativeRemoveBackground.types';

const NativeView: React.ComponentType<ReactNativeRemoveBackgroundViewProps> =
  requireNativeView('ReactNativeRemoveBackground');

export default function ReactNativeRemoveBackgroundView(props: ReactNativeRemoveBackgroundViewProps) {
  return <NativeView {...props} />;
}
