import { Stack } from 'expo-router';

export default function ReviewLayout() {

  return (
      <Stack
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen 
          name="index" 
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="review-detail" 
          options={{
            headerShown: false,
          }}
        />
      </Stack>
  );
}
