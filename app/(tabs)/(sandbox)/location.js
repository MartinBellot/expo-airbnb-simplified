import { useTheme } from '@/contexts/ThemeContext';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function LocationScreen() {
  const { theme, isDarkMode } = useTheme();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => { 
    (async () => {
        console.log("Requesting location permissions...");
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log("Location permission status:", status);
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        console.log('Permission to access location was denied');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
        console.log("Current location:", loc);
      setLocation(loc);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={{ color: 'white', textAlign: 'center' }}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
});