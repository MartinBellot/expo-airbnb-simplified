import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

const QUICK_SEARCHES = [
  { id: '1', icon: '🏖️', label: 'Beach', query: 'beach' },
  { id: '2', icon: '⛰️', label: 'Mountain', query: 'mountain' },
  { id: '3', icon: '🏙️', label: 'City', query: 'city' },
  { id: '4', icon: '🌴', label: 'Tropical', query: 'tropical' },
];

export default function QuickSearches({ onSelect }) {
  const { theme } = useTheme();

  return (
    <Animated.View 
      entering={FadeInDown.delay(400).duration(600).springify()}
      style={styles.container}
    >
      <Text style={[styles.title, { color: theme.textPrimary }]}>Quick Searches</Text>
      <View style={styles.grid}>
        {QUICK_SEARCHES.map((item, index) => (
          <Animated.View
            key={item.id}
            entering={FadeInDown.delay(500 + index * 100).duration(600).springify()}
            style={styles.itemWrapper}
          >
            <TouchableOpacity
              style={[
                styles.item,
                {
                  backgroundColor: theme.surface,
                  borderColor: theme.border,
                },
              ]}
              onPress={() => onSelect(item.query)}
              activeOpacity={0.7}
            >
              <Text style={styles.emoji}>{item.icon}</Text>
              <Text style={[styles.label, { color: theme.textPrimary }]}>{item.label}</Text>
              <Ionicons name="arrow-forward" size={16} color={theme.textSecondary} />
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  itemWrapper: {
    width: '48%',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
  },
  emoji: {
    fontSize: 24,
  },
  label: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
  },
});
