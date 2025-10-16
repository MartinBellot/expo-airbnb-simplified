import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function SearchStats({ count, averagePrice, topRating }) {
  const { theme } = useTheme();

  if (count === 0) return null;

  const stats = [
    {
      icon: 'home-outline',
      label: 'Properties',
      value: count.toString(),
    },
    {
      icon: 'cash-outline',
      label: 'Avg. Price',
      value: `$${Math.round(averagePrice)}`,
    },
    {
      icon: 'star',
      label: 'Top Rating',
      value: topRating.toFixed(2),
    },
  ];

  return (
    <Animated.View
      entering={FadeInDown.delay(300).duration(600).springify()}
      style={styles.container}
    >
      {stats.map((stat, index) => (
        <Animated.View
          key={stat.label}
          entering={FadeInDown.delay(400 + index * 100).duration(600).springify()}
          style={[
            styles.statCard,
            {
              backgroundColor: theme.surface,
              borderColor: theme.border,
            },
          ]}
        >
          <View style={[styles.iconContainer, { backgroundColor: theme.primary + '20' }]}>
            <Ionicons name={stat.icon} size={20} color={theme.primary} />
          </View>
          <Text style={[styles.value, { color: theme.textPrimary }]}>{stat.value}</Text>
          <Text style={[styles.label, { color: theme.textSecondary }]}>{stat.label}</Text>
        </Animated.View>
      ))}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  value: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
  },
});
