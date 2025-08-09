// Reexport the native module. On web, it will be resolved to ExpoRemoveBackgroundModule.web.ts
// and on native platforms to ExpoRemoveBackgroundModule.ts
export { default } from './ExpoRemoveBackgroundModule';
export { default as ExpoRemoveBackgroundView } from './ExpoRemoveBackgroundView';
export * from  './ExpoRemoveBackground.types';

import ExpoRemoveBackgroundModule from './ExpoRemoveBackgroundModule';
import type { RemoveBackgroundResult } from './ExpoRemoveBackground.types';

/**
 * Remove background from an image using iOS 17 Vision framework
 * @param imageUri - The URI of the image (can be local file:// or remote http/https URL)
 * @returns Promise that resolves to an object containing the processed image URI and dimensions
 */
export async function removeBackground(imageUri: string): Promise<RemoveBackgroundResult> {
  return await ExpoRemoveBackgroundModule.removeBackground(imageUri);
}
