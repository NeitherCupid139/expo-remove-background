import ExpoModulesCore
import Vision
import CoreImage
import CoreImage.CIFilterBuiltins
import UIKit

public class ExpoRemoveBackgroundModule: Module {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  public func definition() -> ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('ExpoRemoveBackground')` in JavaScript.
    Name("ExpoRemoveBackground")

    // Sets constant properties on the module. Can take a dictionary or a closure that returns a dictionary.
    Constants([
      "PI": Double.pi
    ])

    // Defines event names that the module can send to JavaScript.
    Events("onChange")

    // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
    Function("hello") {
      return "Hello world! 👋"
    }

    // Defines a JavaScript function that always returns a Promise and whose native code
    // is by default dispatched on the different thread than the JavaScript runtime runs on.
    AsyncFunction("setValueAsync") { (value: String) in
      // Send an event to JavaScript.
      self.sendEvent("onChange", [
        "value": value
      ])
    }
    
    // Remove background from image using iOS 17 Vision framework
    AsyncFunction("removeBackground") { (imageUri: String) -> [String: Any] in
      return try await self.removeBackgroundFromImage(imageUri: imageUri)
    }

    // Enables the module to be used as a native view. Definition components that are accepted as part of the
    // view definition: Prop, Events.
    View(ExpoRemoveBackgroundView.self) {
      // Defines a setter for the `url` prop.
      Prop("url") { (view: ExpoRemoveBackgroundView, url: URL) in
        if view.webView.url != url {
          view.webView.load(URLRequest(url: url))
        }
      }

      Events("onLoad")
    }
  }
  
  // MARK: - Background Removal Implementation
  
  private func removeBackgroundFromImage(imageUri: String) async throws -> [String: Any] {
    guard let url = URL(string: imageUri) else {
      throw NSError(domain: "ExpoRemoveBackground", code: 1, userInfo: [NSLocalizedDescriptionKey: "Invalid image URI"])
    }
    
    let imageData: Data
    if url.isFileURL {
      imageData = try Data(contentsOf: url)
    } else {
      let (data, _) = try await URLSession.shared.data(from: url)
      imageData = data
    }
    
    guard let uiImage = UIImage(data: imageData),
          let inputImage = CIImage(image: uiImage) else {
      throw NSError(domain: "ExpoRemoveBackground", code: 2, userInfo: [NSLocalizedDescriptionKey: "Failed to create CIImage from data"])
    }
    
    guard let maskImage = try await createMask(from: inputImage) else {
      throw NSError(domain: "ExpoRemoveBackground", code: 3, userInfo: [NSLocalizedDescriptionKey: "Failed to create mask"])
    }
    
    let outputImage = applyMask(mask: maskImage, to: inputImage)
    let finalImage = convertToUIImage(ciImage: outputImage)
    
    // Save the processed image to temporary directory
    let tempDir = FileManager.default.temporaryDirectory
    let fileName = "removed_bg_\(UUID().uuidString).png"
    let fileURL = tempDir.appendingPathComponent(fileName)
    
    guard let imageData = finalImage.pngData() else {
      throw NSError(domain: "ExpoRemoveBackground", code: 4, userInfo: [NSLocalizedDescriptionKey: "Failed to convert image to PNG data"])
    }
    
    try imageData.write(to: fileURL)
    
    return [
      "uri": fileURL.absoluteString,
      "width": finalImage.size.width,
      "height": finalImage.size.height
    ]
  }
  
  private func createMask(from inputImage: CIImage) async throws -> CIImage? {
    guard #available(iOS 17.0, *) else {
      throw NSError(domain: "ExpoRemoveBackground", code: 5, userInfo: [NSLocalizedDescriptionKey: "Background removal requires iOS 17.0 or later"])
    }
    
    let request = VNGenerateForegroundInstanceMaskRequest()
    let handler = VNImageRequestHandler(ciImage: inputImage)
    
    return try await withCheckedThrowingContinuation { continuation in
      do {
        try handler.perform([request])
        
        if let result = request.results?.first {
          do {
            let mask = try result.generateScaledMaskForImage(forInstances: result.allInstances, from: handler)
            let ciImage = CIImage(cvPixelBuffer: mask)
            continuation.resume(returning: ciImage)
          } catch {
            continuation.resume(throwing: error)
          }
        } else {
          continuation.resume(returning: nil)
        }
      } catch {
        continuation.resume(throwing: error)
      }
    }
  }
  
  private func applyMask(mask: CIImage, to image: CIImage) -> CIImage {
    let filter = CIFilter.blendWithMask()
    
    filter.inputImage = image
    filter.maskImage = mask
    filter.backgroundImage = CIImage.empty()
    
    return filter.outputImage!
  }
  
  private func convertToUIImage(ciImage: CIImage) -> UIImage {
    guard let cgImage = CIContext(options: nil).createCGImage(ciImage, from: ciImage.extent) else {
      fatalError("Failed to render CGImage")
    }
    
    return UIImage(cgImage: cgImage)
  }
}
