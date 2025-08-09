import { registerWebModule, NativeModule } from 'expo';

import { ExpoRemoveBackgroundModuleEvents } from './ExpoRemoveBackground.types';

class ExpoRemoveBackgroundModule extends NativeModule<ExpoRemoveBackgroundModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(ExpoRemoveBackgroundModule, 'ExpoRemoveBackgroundModule');
