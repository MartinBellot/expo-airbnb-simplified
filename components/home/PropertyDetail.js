import { COLORS } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Dimensions, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function PropertyDetail() {
  const params = useLocalSearchParams();
  const router = useRouter();
  
  // Reconstruction de l'objet property depuis les params
  const property = {
    id: params.id,
    title: params.title,
    location: params.location,
    price: params.price,
    rating: params.rating,
    image: params.image,
    isNew: params.isNew === 'true',
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Image principale */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: property.image }}
            style={styles.mainImage}
            contentFit="cover"
          />
          <LinearGradient
            colors={['rgba(0,0,0,0.6)', 'transparent', 'transparent']}
            style={styles.topGradient}
          />
          
          {/* Bouton retour */}
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <BlurView intensity={60} tint="dark" style={styles.backBlur}>
              <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
            </BlurView>
          </TouchableOpacity>

          {/* Bouton favori */}
          <TouchableOpacity style={styles.favoriteButton}>
            <BlurView intensity={60} tint="dark" style={styles.favoriteBlur}>
              <Ionicons name="heart-outline" size={24} color={COLORS.textPrimary} />
            </BlurView>
          </TouchableOpacity>

          {property.isNew && (
            <Animated.View 
              entering={FadeInDown.delay(200).duration(600)}
              style={styles.newBadge}
            >
              <Text style={styles.newBadgeText}>NEW</Text>
            </Animated.View>
          )}
        </View>

        {/* Contenu de la page */}
        <View style={styles.content}>
          {/* Titre et localisation */}
          <Animated.View 
            entering={FadeInUp.delay(100).duration(600)}
            style={styles.headerSection}
          >
            <Text style={styles.propertyTitle}>{property.title}</Text>
            <View style={styles.locationRow}>
              <Ionicons name="location" size={20} color={COLORS.textSecondary} />
              <Text style={styles.locationText}>{property.location}</Text>
            </View>
          </Animated.View>

          {/* Rating et reviews */}
          <Animated.View 
            entering={FadeInUp.delay(200).duration(600)}
            style={styles.ratingSection}
          >
            <View style={styles.ratingCard}>
              <Ionicons name="star" size={24} color={COLORS.warning} />
              <Text style={styles.ratingValue}>{property.rating}</Text>
              <Text style={styles.ratingLabel}>Rating</Text>
            </View>
            <View style={styles.ratingCard}>
              <Ionicons name="chatbubbles" size={24} color={COLORS.primary} />
              <Text style={styles.ratingValue}>127</Text>
              <Text style={styles.ratingLabel}>Reviews</Text>
            </View>
            <View style={styles.ratingCard}>
              <Ionicons name="bed" size={24} color={COLORS.primary} />
              <Text style={styles.ratingValue}>3</Text>
              <Text style={styles.ratingLabel}>Bedrooms</Text>
            </View>
          </Animated.View>

          {/* Description */}
          <Animated.View 
            entering={FadeInUp.delay(300).duration(600)}
            style={styles.section}
          >
            <Text style={styles.sectionTitle}>About this place</Text>
            <Text style={styles.descriptionText}>
              Discover the perfect getaway in this stunning property. Enjoy breathtaking views, 
              modern amenities, and a truly unforgettable experience. This carefully curated space 
              offers the perfect blend of comfort and luxury, making it an ideal choice for your 
              next vacation.
            </Text>
          </Animated.View>

          {/* Équipements */}
          <Animated.View 
            entering={FadeInUp.delay(400).duration(600)}
            style={styles.section}
          >
            <Text style={styles.sectionTitle}>Amenities</Text>
            <View style={styles.amenitiesList}>
              {[
                { icon: 'wifi', label: 'Free WiFi' },
                { icon: 'car', label: 'Free Parking' },
                { icon: 'snow', label: 'Air Conditioning' },
                { icon: 'restaurant', label: 'Kitchen' },
                { icon: 'tv', label: 'TV' },
                { icon: 'water', label: 'Pool' },
              ].map((amenity, index) => (
                <View key={index} style={styles.amenityItem}>
                  <View style={styles.amenityIcon}>
                    <Ionicons name={amenity.icon} size={20} color={COLORS.primary} />
                  </View>
                  <Text style={styles.amenityLabel}>{amenity.label}</Text>
                </View>
              ))}
            </View>
          </Animated.View>

          {/* Host info */}
          <Animated.View 
            entering={FadeInUp.delay(500).duration(600)}
            style={styles.section}
          >
            <Text style={styles.sectionTitle}>Hosted by</Text>
            <View style={styles.hostCard}>
              <View style={styles.hostAvatar}>
                <Ionicons name="person" size={32} color={COLORS.primary} />
              </View>
              <View style={styles.hostInfo}>
                <Text style={styles.hostName}>John Doe</Text>
                <Text style={styles.hostLabel}>Superhost · 5 years hosting</Text>
              </View>
              <TouchableOpacity style={styles.contactButton}>
                <Ionicons name="chatbubble-ellipses" size={20} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </ScrollView>

      {/* Footer avec prix */}
      <Animated.View 
        entering={FadeInUp.delay(600).duration(600)}
        style={styles.footer}
      >
        <BlurView intensity={80} tint="light" style={styles.footerBlur}>
          <View style={styles.footerContent}>
            <View style={styles.priceSection}>
              <Text style={styles.priceValue}>${property.price}</Text>
              <Text style={styles.priceLabel}>per night</Text>
            </View>
            <TouchableOpacity style={styles.bookButton}>
              <Text style={styles.bookButtonText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  imageContainer: {
    width: width,
    height: height * 0.45,
    position: 'relative',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 120,
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    left: 20,
    zIndex: 10,
  },
  backBlur: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  favoriteButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    right: 20,
    zIndex: 10,
  },
  favoriteBlur: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  newBadge: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  newBadgeText: {
    color: COLORS.textPrimary,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  content: {
    padding: 20,
  },
  headerSection: {
    marginBottom: 20,
  },
  propertyTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  ratingSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  ratingCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    marginHorizontal: 4,
  },
  ratingValue: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: 8,
  },
  ratingLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  descriptionText: {
    fontSize: 15,
    lineHeight: 24,
    color: COLORS.textSecondary,
  },
  amenitiesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 8,
  },
  amenityIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amenityLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  hostCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  hostAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  hostInfo: {
    flex: 1,
  },
  hostName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  hostLabel: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  contactButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  footerBlur: {
    overflow: 'hidden',
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
  },
  priceSection: {
    flex: 1,
  },
  priceValue: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  priceLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  bookButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 16,
  },
  bookButtonText: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
});

