import { useTheme } from '@/contexts/ThemeContext';
import { StatusBar, StyleSheet, Text, View } from 'react-native';

export default function ExploreScreen() {
  const { theme, isDarkMode } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <Text style={[styles.title, { color: theme.textPrimary }]}>Explore</Text>
      <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Coming Soon...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
  },
});
