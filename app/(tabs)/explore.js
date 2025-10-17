import EmptyState from '@/components/explore/EmptyState';
import FilterChip from '@/components/explore/FilterChip';
import QuickSearches from '@/components/explore/QuickSearches';
import SearchBar from '@/components/explore/SearchBar';
import SearchStats from '@/components/explore/SearchStats';
import PropertyCard from '@/components/property/PropertyCard';
import { useTheme } from '@/contexts/ThemeContext';
import { usePropertyStore } from '@/stores/PropertyStore';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, RefreshControl, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInLeft } from 'react-native-reanimated';

const FILTERS = [
  { id: 'all', label: 'All', icon: 'grid-outline' },
  { id: 'price-low', label: 'Price: Low to High', icon: 'arrow-down-outline' },
  { id: 'price-high', label: 'Price: High to Low', icon: 'arrow-up-outline' },
  { id: 'rating', label: 'Top Rated', icon: 'star-outline' },
  { id: 'new', label: 'New Listings', icon: 'sparkles-outline' },
];

export default function ExploreScreen() {
  const { theme, isDarkMode } = useTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [shouldFocus, setShouldFocus] = useState(false);

  // Récupération depuis le store
  const searchAndFilter = usePropertyStore((state) => state.searchAndFilter);
  const calculateStats = usePropertyStore((state) => state.calculateStats);
  const isLoading = usePropertyStore((state) => state.isLoading);
  const error = usePropertyStore((state) => state.error);
  const fetchProperties = usePropertyStore((state) => state.fetchProperties);

  // Gestion du refresh
  const onRefresh = useCallback(() => {
    fetchProperties();
  }, [fetchProperties]);

  // Auto-focus search bar when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      setShouldFocus(true);
      return () => {
        setShouldFocus(false);
      };
    }, [])
  );

  // Utilise le store pour rechercher et filtrer les propriétés
  const filteredProperties = useMemo(() => {
    return searchAndFilter(searchQuery, selectedFilter);
  }, [searchQuery, selectedFilter, searchAndFilter]);

  // Calcul des statistiques
  const searchStats = useMemo(() => {
    return calculateStats(filteredProperties);
  }, [filteredProperties, calculateStats]);

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleQuickSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

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
        {/* Search Bar */}
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onClear={handleClearSearch}
          shouldFocus={shouldFocus}
        />

        {/* Filter Chips */}
        <Animated.View entering={FadeInLeft.delay(200).duration(600).springify()}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersContent}
            style={styles.filtersContainer}
          >
            {FILTERS.map((filter, index) => (
              <FilterChip
                key={filter.id}
                label={filter.label}
                icon={filter.icon}
                selected={selectedFilter === filter.id}
                onPress={() => setSelectedFilter(filter.id)}
                index={index}
              />
            ))}
          </ScrollView>
        </Animated.View>

        {/* Quick Searches - Show only when no search query */}
        {!searchQuery.trim() && <QuickSearches onSelect={handleQuickSearch} />}

        {/* Search Statistics */}
        {searchQuery.trim() && filteredProperties.length > 0 && (
          <SearchStats
            count={searchStats.totalCount}
            averagePrice={searchStats.averagePrice}
            topRating={searchStats.topRating}
          />
        )}

        {/* Results Counter */}
        {searchQuery.trim() && (
          <Animated.View
            entering={FadeInDown.delay(300).duration(600).springify()}
            style={styles.resultsContainer}
          >
            <Text style={[styles.resultsText, { color: theme.textSecondary }]}>
              {filteredProperties.length} {filteredProperties.length === 1 ? 'result' : 'results'} found
            </Text>
            {(searchQuery.trim() || selectedFilter !== 'all') && (
              <TouchableOpacity
                onPress={() => {
                  setSearchQuery('');
                  setSelectedFilter('all');
                }}
                style={[styles.resetButton, { backgroundColor: theme.surface }]}
              >
                <Ionicons name="refresh-outline" size={16} color={theme.primary} />
                <Text style={[styles.resetText, { color: theme.primary }]}>Reset</Text>
              </TouchableOpacity>
            )}
          </Animated.View>
        )}

        {/* Properties Grid or Empty State */}
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
        ) : filteredProperties.length > 0 ? (
          <View style={styles.propertiesSection}>
            {searchQuery.trim() && (
              <Animated.View
                entering={FadeInDown.delay(400).duration(600).springify()}
                style={styles.sectionHeader}
              >
                <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
                  Search Results
                </Text>
              </Animated.View>
            )}
            <View style={styles.propertiesGrid}>
              {filteredProperties.map((property, index) => (
                <PropertyCard key={property.id} property={property} index={index} />
              ))}
            </View>
          </View>
        ) : (
          <EmptyState searchQuery={searchQuery} />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 80,
    paddingBottom: 100,
  },
  filtersContainer: {
    marginBottom: 20,
  },
  filtersContent: {
    paddingHorizontal: 20,
  },
  resultsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  resultsText: {
    fontSize: 15,
    fontWeight: '600',
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  resetText: {
    fontSize: 14,
    fontWeight: '600',
  },
  propertiesSection: {
    paddingHorizontal: 20,
  },
  sectionHeader: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.5,
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
    paddingVertical: 60,
    paddingHorizontal: 20,
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
