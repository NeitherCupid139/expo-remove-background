import * as React from 'react';

import { ExpoRemoveBackgroundViewProps } from './ExpoRemoveBackground.types';

export default function ExpoRemoveBackgroundView(props: ExpoRemoveBackgroundViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
