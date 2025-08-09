import { useEvent } from 'expo';
import ExpoRemoveBackground, { ExpoRemoveBackgroundView, removeBackground } from 'expo-remove-background';
import { Button, SafeAreaView, ScrollView, Text, View, Image, Alert } from 'react-native';
import { useState } from 'react';

export default function App() {
  const onChangePayload = useEvent(ExpoRemoveBackground, 'onChange');
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <Group name="Background Removal">
          <Button
            title="Select Test Image"
            onPress={() => {
              // Using a sample image URL for demonstration
              const testImageUrl = 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=800';
              setOriginalImage(testImageUrl);
              setProcessedImage(null);
            }}
          />
          {originalImage && (
            <View style={styles.imageContainer}>
              <Text style={styles.imageLabel}>Original Image:</Text>
              <Image source={{ uri: originalImage }} style={styles.image} />
            </View>
          )}
          {originalImage && (
            <Button
              title={isProcessing ? "Processing..." : "Remove Background"}
              disabled={isProcessing}
              onPress={async () => {
                setIsProcessing(true);
                try {
                  const result = await removeBackground(originalImage);
                  setProcessedImage(result.uri);
                  Alert.alert('Success', `Background removed! Image size: ${result.width}x${result.height}`);
                } catch (error) {
                  Alert.alert('Error', `Failed to remove background: ${error}`);
                } finally {
                  setIsProcessing(false);
                }
              }}
            />
          )}
          {processedImage && (
            <View style={styles.imageContainer}>
              <Text style={styles.imageLabel}>Processed Image:</Text>
              <Image source={{ uri: processedImage }} style={styles.image} />
            </View>
          )}
        </Group>
       
      </ScrollView>
    </SafeAreaView>
  );
}

function Group(props: { name: string; children: React.ReactNode }) {
  return (
    <View style={styles.group}>
      <Text style={styles.groupHeader}>{props.name}</Text>
      {props.children}
    </View>
  );
}

const styles = {
  header: {
    fontSize: 30,
    margin: 20,
  },
  groupHeader: {
    fontSize: 20,
    marginBottom: 20,
  },
  group: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  view: {
    flex: 1,
    height: 200,
  },
  imageContainer: {
    marginVertical: 10,
  },
  imageLabel: {
    fontSize: 16,
    fontWeight: 'bold' as const,
    marginBottom: 5,
  },
  image: {
    width: '100%' as const,
    height: 200,
    resizeMode: 'contain' as const,
    backgroundColor: '#f0f0f0',
  },
};
