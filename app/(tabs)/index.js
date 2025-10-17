import Header from '@/components/common/Header';
import CategoryList from '@/components/home/CategoryList';
import InspirationBanner from '@/components/home/InspirationBanner';
import PropertyCard from '@/components/property/PropertyCard';
import { useTheme } from '@/contexts/ThemeContext';
import { usePropertyStore } from '@/stores/PropertyStore';
import { useCallback, useState } from 'react';
import { ActivityIndicator, RefreshControl, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('1');
  const { theme, isDarkMode } = useTheme();
  
  // Récupération des propriétés depuis le store
  const properties = usePropertyStore((state) => state.properties);
  const isLoading = usePropertyStore((state) => state.isLoading);
  const error = usePropertyStore((state) => state.error);
  const fetchProperties = usePropertyStore((state) => state.fetchProperties);

  // Gestion du refresh
  const onRefresh = useCallback(() => {
    fetchProperties();
  }, [fetchProperties]);


  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      
      {/* Header Component */}
      <Header />

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={onRefresh}
            tintColor={theme.primary}
            colors={[theme.primary]}
            progressBackgroundColor={theme.surface}
          />
        }
      >

        <InspirationBanner />

        <View style={{ height: 50 }} />

        <CategoryList 
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Properties Grid Section */}
        <View style={styles.propertiesSection}>
          <Animated.View 
            entering={FadeInDown.delay(400).duration(600).springify()}
            style={styles.sectionHeader}
          >
            <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
              Featured Stays
            </Text>
            <TouchableOpacity>
              <Text style={[styles.seeAllText, { color: theme.primary }]}>See all</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Gestion des états de chargement et d'erreur */}
          {isLoading ? (
            <View style={styles.centerContent}>
              <ActivityIndicator size="large" color={theme.primary} />
              <Text style={[styles.loadingText, { color: theme.textSecondary }]}>
                Chargement des propriétés...
              </Text>
            </View>
          ) : error ? (
            <View style={styles.centerContent}>
              <Text style={[styles.errorText, { color: theme.error || '#ff4444' }]}>
                ⚠️ {error}
              </Text>
            </View>
          ) : (
            <View style={styles.propertiesGrid}>
              {properties.map((property, index) => (
                <PropertyCard 
                  key={property.id}
                  property={property}
                  index={index}
                />
              ))}
            </View>
          )}
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 150,
    paddingBottom: 100,
  },
  propertiesSection: {
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  seeAllText: {
    fontSize: 16,
    fontWeight: '600',
  },
  propertiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'space-between',
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '500',
  },
  errorText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
