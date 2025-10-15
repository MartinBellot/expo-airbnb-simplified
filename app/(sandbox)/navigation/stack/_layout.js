import { Stack } from 'expo-router';
import { COLORS } from '../../../../constants/colors';

export default function SandboxStackLayout() {
   
  //return <Stack screenOptions={{ headerShown: false }} />;
  //DESIGN HEADER:
  return <Stack screenOptions={{
    headerStyle: { backgroundColor: COLORS.background },
    headerTitleStyle: { color: COLORS.textPrimary, fontSize: 20, fontWeight: 'bold' },
    headerTintColor: COLORS.textPrimary,
    headerShown: true,
  }} />;
}
