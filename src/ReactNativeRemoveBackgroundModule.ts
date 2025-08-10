import { NativeModule, requireNativeModule } from 'expo';

import { ReactNativeRemoveBackgroundModuleEvents, RemoveBackgroundResult } from './ReactNativeRemoveBackground.types';

declare class ReactNativeRemoveBackgroundModule extends NativeModule<ReactNativeRemoveBackgroundModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
  removeBackground(imageUri: string): Promise<RemoveBackgroundResult>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ReactNativeRemoveBackgroundModule>('ReactNativeRemoveBackground');
