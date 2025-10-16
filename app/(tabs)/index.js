import Header from '@/components/common/Header';
import CategoryList from '@/components/home/CategoryList';
import InspirationBanner from '@/components/home/InspirationBanner';
import PropertyCard from '@/components/property/PropertyCard';
import { PROPERTIES } from '@/constants/data';
import { useTheme } from '@/contexts/ThemeContext';
import { useState } from 'react';
import { Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('1');
  const { theme, isDarkMode } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      
      {/* Header Component */}
      <Header />

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* SIZEDBOX:*/}
        <View style={{ height: 30 }} />
        {/* Inspiration Banner Component */}
        <InspirationBanner />

        <View style={{ height: 50 }} />

        {/* Categories Component */}
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

          <View style={styles.propertiesGrid}>
            {PROPERTIES.map((property, index) => (
              <PropertyCard 
                key={property.id}
                property={property}
                index={index}
              />
            ))}
          </View>
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
    paddingTop: Platform.OS === 'ios' ? 180 : 150,
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
});
