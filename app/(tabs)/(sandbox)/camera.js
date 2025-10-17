import { CameraView, useCameraPermissions } from 'expo-camera';
import { StyleSheet, Text, View } from 'react-native';

export default function CameraScreen() {
  const [permissions, requestPermissions] = useCameraPermissions();

  if (!permissions?.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>La permission d'accéder à la caméra est requise.</Text>
        <Text style={styles.text} onPress={requestPermissions}>
          Appuyez ici pour autoriser l'accès à la caméra.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} />
      <Text style={styles.text}>Camera Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: '100%',
    height: '80%',
  },
  text: {
    marginTop: 20,
    fontSize: 18,
  },
}); 