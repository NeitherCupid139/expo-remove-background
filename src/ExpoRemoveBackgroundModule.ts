import { NativeModule, requireNativeModule } from 'expo';

import { ExpoRemoveBackgroundModuleEvents, RemoveBackgroundResult } from './ExpoRemoveBackground.types';

declare class ExpoRemoveBackgroundModule extends NativeModule<ExpoRemoveBackgroundModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
  removeBackground(imageUri: string): Promise<RemoveBackgroundResult>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoRemoveBackgroundModule>('ExpoRemoveBackground');
