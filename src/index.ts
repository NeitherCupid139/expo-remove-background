// Reexport the native module. On web, it will be resolved to ExpoRemoveBackgroundModule.web.ts
// and on native platforms to ExpoRemoveBackgroundModule.ts
export { default } from './ExpoRemoveBackgroundModule';
export { default as ExpoRemoveBackgroundView } from './ExpoRemoveBackgroundView';
export * from  './ExpoRemoveBackground.types';
