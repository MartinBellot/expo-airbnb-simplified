import { COLORS } from '@/constants/colors';
import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function InspirationBanner() {
  const router = useRouter();
  const { theme, isDarkMode } = useTheme();

  return (
    <Animated.View 
      entering={FadeInDown.delay(900).duration(600).springify()}
      style={styles.inspirationSection}
    >
      <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>Inspiration for your next trip</Text>
      <View style={styles.inspirationCard}>
        <LinearGradient
          colors={[COLORS.accentGradientStart, COLORS.accentGradientMiddle, COLORS.accentGradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.inspirationGradient}
        >
          <Text style={styles.inspirationTitle}>Discover Amazing Places</Text>
          <Text style={styles.inspirationSubtitle}>
            Find unique stays and experiences around the world
          </Text>
          <TouchableOpacity style={styles.inspirationButton} onPress={() => router.push('/(tabs)/explore')}>
            <Text style={styles.inspirationButtonText}>Explore Now</Text>
            <Ionicons name="arrow-forward" size={18} color={COLORS.background} />
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  inspirationSection: {
    paddingHorizontal: 20,
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  inspirationCard: {
    marginTop: 16,
    borderRadius: 24,
    overflow: 'hidden',
  },
  inspirationGradient: {
    padding: 32,
  },
  inspirationTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  inspirationSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 24,
    lineHeight: 22,
  },
  inspirationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.textPrimary,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 30,
    alignSelf: 'flex-start',
    gap: 8,
  },
  inspirationButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.background,
  },
});
