import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { ThemeProvider } from '../contexts/ThemeContext';
import { usePropertyStore } from '../stores/PropertyStore';

export default function RootLayout() {
  const fetchProperties = usePropertyStore((state) => state.fetchProperties);

  // Charge les propriétés au démarrage de l'app
  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <ThemeProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen 
          name="(tabs)" 
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
