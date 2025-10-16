import { useTheme } from '@/contexts/ThemeContext';
import { StyleSheet, Text } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function EmptyState({ searchQuery }) {
  const { theme } = useTheme();

  return (
    <Animated.View 
      entering={FadeInDown.duration(600).springify()}
      style={styles.container}
    >
      <Text style={styles.emoji}>🔍</Text>
      <Text style={[styles.title, { color: theme.textPrimary }]}>
        No results found
      </Text>
      <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
        {searchQuery ? `No properties match "${searchQuery}"` : 'Try adjusting your search'}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
});
