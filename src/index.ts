// Reexport the native module. On web, it will be resolved to ReactNativeRemoveBackgroundModule.web.ts
// and on native platforms to ReactNativeRemoveBackgroundModule.ts
export { default } from './ReactNativeRemoveBackgroundModule';
export { default as ReactNativeRemoveBackgroundView } from './ReactNativeRemoveBackgroundView';
export * from  './ReactNativeRemoveBackground.types';

import ReactNativeRemoveBackgroundModule from './ReactNativeRemoveBackgroundModule';
import type { RemoveBackgroundResult } from './ReactNativeRemoveBackground.types';

/**
 * Remove background from an image using iOS 17 Vision framework
 * @param imageUri - The URI of the image (can be local file:// or remote http/https URL)
 * @returns Promise that resolves to an object containing the processed image URI and dimensions
 */
export async function removeBackground(imageUri: string): Promise<RemoveBackgroundResult> {
  return await ReactNativeRemoveBackgroundModule.removeBackground(imageUri);
}
