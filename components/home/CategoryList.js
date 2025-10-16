import { COLORS } from '@/constants/colors';
import { CATEGORIES } from '@/constants/data';
import { useTheme } from '@/contexts/ThemeContext';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';

export default function CategoryList({ selectedCategory, onSelectCategory }) {
  const { theme, isDarkMode } = useTheme();
  
  return (
    <Animated.View entering={FadeInDown.delay(200).duration(600).springify()}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {CATEGORIES.map((category, index) => (
          <Animated.View
            key={category.id}
            entering={FadeInRight.delay(300 + index * 50).duration(600).springify()}
          >
            <TouchableOpacity
              style={[
                styles.categoryCard,
                selectedCategory === category.id && styles.categoryCardActive
              ]}
              onPress={() => onSelectCategory(category.id)}
            >
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text style={[
                styles.categoryName, {color: theme.textSecondary},
                selectedCategory === category.id && { color: theme.textPrimary }
              ]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  categoriesContainer: {
    marginBottom: 24,
  },
  categoriesContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryCard: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  categoryCardActive: {
    backgroundColor: `${COLORS.primary}20`,
    borderColor: COLORS.borderActive,
  },
  categoryIcon: {
    fontSize: 20,
  },
  categoryName: {
    fontSize: 15,
    fontWeight: '600',
  },
});
