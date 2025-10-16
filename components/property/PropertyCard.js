import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function PropertyCard({ property, index }) {
  const router = useRouter();
  const { theme, isDarkMode } = useTheme();

  const handlePress = () => {
    router.push({
      pathname: '/(tabs)/property-detail',
      params: {
        id: property.id,
        title: property.title,
        location: property.location,
        price: property.price,
        rating: property.rating,
        image: property.image,
        isNew: property.isNew,
      }
    });
  };

  return (
    <Animated.View
      entering={FadeInDown.delay(500 + index * 100).duration(600).springify()}
      style={styles.propertyCardWrapper}
    >

      <TouchableOpacity 
        style={[
          styles.propertyCard,
          { 
            backgroundColor: theme.surface,
            borderColor: theme.border 
          }
        ]}
        activeOpacity={0.8}
        onPress={handlePress}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: property.image }}
            style={styles.propertyImage}
            contentFit="cover"
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.imageGradient}
          />
          
          {property.isNew && (
            <View style={[styles.newBadge, { backgroundColor: theme.primary }]}>
              <Text style={[
                styles.newBadgeText, 
                { color: isDarkMode ? theme.textPrimary : '#FFFFFF' }
              ]}>
                NEW
              </Text>
            </View>
          )}
          
          <TouchableOpacity style={styles.favoriteButton}>
            <BlurView intensity={60} tint={isDarkMode ? 'dark' : 'light'} style={styles.favoriteBlur}>
              <Ionicons name="heart-outline" size={20} color={theme.textPrimary} />
            </BlurView>
          </TouchableOpacity>

          <View style={styles.ratingBadge}>
            <BlurView intensity={60} tint={isDarkMode ? 'dark' : 'light'} style={styles.ratingBlur}>
              <Ionicons name="star" size={14} color={theme.warning} />
              <Text style={[styles.ratingText, { color: theme.textPrimary }]}>
                {property.rating}
              </Text>
            </BlurView>
          </View>
        </View>

        <View style={styles.propertyInfo}>
          <Text style={[styles.propertyTitle, { color: theme.textPrimary }]} numberOfLines={1}>
            {property.title}
          </Text>
          <Text style={[styles.propertyLocation, { color: theme.textSecondary }]} numberOfLines={1}>
            {property.location}
          </Text>
          <View style={styles.priceContainer}>
            <Text style={[styles.propertyPrice, { color: theme.textPrimary }]}>
              ${property.price}
            </Text>
            <Text style={[styles.priceLabel, { color: theme.textSecondary }]}> / night</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  propertyCardWrapper: {
    width: (width - 56) / 2,
  },
  propertyCard: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    position: 'relative',
  },
  propertyImage: {
    width: '100%',
    height: '100%',
  },
  imageGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  newBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  newBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
  },
  favoriteBlur: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  ratingBlur: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '700',
  },
  propertyInfo: {
    padding: 16,
  },
  propertyTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  propertyLocation: {
    fontSize: 13,
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  propertyPrice: {
    fontSize: 18,
    fontWeight: '700',
  },
  priceLabel: {
    fontSize: 13,
    fontWeight: '500',
  },
});
