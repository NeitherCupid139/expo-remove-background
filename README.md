# react-native-remove-background

Remove background from images using iOS 17 Vision framework in Expo/React Native apps.
⚠️Android is not supported.When ML Kit Subject Segmentation is available, it will be used.

## Features

- 🎯 **iOS 17+ Support**: Leverages Apple's latest Vision framework for accurate background removal
- 🚀 **Easy Integration**: Simple API with just one function call
- 📱 **Expo Compatible**: Works seamlessly with Expo managed workflow
- 🖼️ **Multiple Formats**: Supports both local and remote images
- ⚡ **High Performance**: Native implementation for optimal speed

## Installation

```bash
bun add react-native-remove-background
```

## Usage

```typescript
import { removeBackground } from 'react-native-remove-background';

// Remove background from an image
const processImage = async () => {
  try {
    const result = await removeBackground('https://example.com/image.jpg');
    console.log('Processed image URI:', result.uri);
    console.log('Image dimensions:', result.width, 'x', result.height);
  } catch (error) {
    console.error('Failed to remove background:', error);
  }
};
```

## API Reference

### `removeBackground(imageUri: string): Promise<RemoveBackgroundResult>`

Removes the background from the specified image.

**Parameters:**
- `imageUri` (string): The URI of the image. Can be:
  - Local file URI (e.g., `file:///path/to/image.jpg`)
  - Remote HTTP/HTTPS URL (e.g., `https://example.com/image.jpg`)

**Returns:**
- `Promise<RemoveBackgroundResult>`: Object containing:
  - `uri` (string): URI of the processed image with background removed
  - `width` (number): Width of the processed image
  - `height` (number): Height of the processed image

## Platform Support

| Platform | Support | Notes |
|----------|---------|-------|
| iOS 17+ | ✅ Full | Uses Vision framework for background removal |
| iOS < 17 | ❌ | Vision framework features not available |
| Android | ❌ | Vision framework is iOS-only |
| Web | ⚠️ Limited | Returns original image with warning |

## Requirements

- **iOS 17.0 or later** (Required for Vision framework)
- Expo SDK 49+
- React Native 0.72+
- Physical iOS device (Simulator not supported)

## Example

See the [example](./example) directory for a complete working example.

## Implementation Details

This library uses Apple's Vision framework, specifically:
- `VNGenerateForegroundInstanceMaskRequest` for mask generation
- `CIFilter.blendWithMask()` for applying the mask
- Core Image for image processing

The process involves three phases:
1. **Mask Generation**: Create a mask identifying the foreground subject
2. **Mask Application**: Apply the mask to separate subject from background
3. **Image Conversion**: Convert the result to a displayable format

## Limitations

- **Device Only**: This feature requires a physical iOS device and won't work in the iOS Simulator
- **iOS 17+**: The Vision framework features used are only available in iOS 17 and later
- **Performance**: Processing time depends on image size and complexity

## Error Handling

The library throws errors for various scenarios:
- Invalid image URI
- Failed to load image data
- Vision framework processing errors
- File system errors

Always wrap calls in try-catch blocks for proper error handling.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT