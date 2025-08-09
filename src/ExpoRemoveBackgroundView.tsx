import { requireNativeView } from 'expo';
import * as React from 'react';

import { ExpoRemoveBackgroundViewProps } from './ExpoRemoveBackground.types';

const NativeView: React.ComponentType<ExpoRemoveBackgroundViewProps> =
  requireNativeView('ExpoRemoveBackground');

export default function ExpoRemoveBackgroundView(props: ExpoRemoveBackgroundViewProps) {
  return <NativeView {...props} />;
}
