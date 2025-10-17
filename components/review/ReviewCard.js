import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function ReviewCard({ review, index }) {
  const router = useRouter();
  const { theme, isDarkMode } = useTheme();

  const handlePress = () => {
    router.push({
      pathname: '/(tabs)/reviews/review-detail',
      params: {
        id: review.id,
      }
    });
  };

  return (
    <Animated.View
      entering={FadeInDown.delay(300 + index * 100).duration(600).springify()}
      style={styles.reviewCardWrapper}
    >
      <TouchableOpacity 
        style={[
          styles.reviewCard,
          { 
            backgroundColor: theme.surface,
            borderColor: theme.border 
          }
        ]}
        activeOpacity={0.8}
        onPress={handlePress}
      > 
        <View style={styles.cardContent}>
          <View style={styles.headerSection}>
            <View style={[styles.avatarContainer]}>
              <Image source={{ uri: "https://i.pravatar.cc/150?u=" + review.email }} style={{ width: 48, height: 48, borderRadius: 24 }} />
            </View>
            
            <View style={styles.reviewerInfo}>
              <Text style={[styles.reviewerName, { color: theme.textPrimary }]} numberOfLines={1}>
                {review.name}
              </Text>
              <Text style={[styles.reviewerEmail, { color: theme.textSecondary }]} numberOfLines={1}>
                {review.email}
              </Text>
            </View>
          </View>

          <Text style={[styles.reviewBody, { color: theme.textSecondary }]} numberOfLines={3}>
            {review.body}
          </Text>

          <View style={styles.footerSection}>
            <View style={styles.readMoreContainer}>
              <Text style={[styles.readMoreText, { color: theme.primary }]}>
                Lire plus
              </Text>
              <Ionicons name="chevron-forward" size={16} color={theme.primary} />
            </View>
          </View>
        </View>

        <LinearGradient
          colors={[theme.primary + '00', theme.primary + '05']}
          style={styles.cardGradient}
        />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  reviewCardWrapper: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  reviewCard: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardContent: {
    padding: 16,
  },
  cardGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    pointerEvents: 'none',
  },
  headerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  reviewerInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  reviewerEmail: {
    fontSize: 12,
  },
  reviewBody: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  footerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  readMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  readMoreText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
