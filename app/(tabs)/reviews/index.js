import ReviewCard from '@/components/review/ReviewCard';
import { useTheme } from '@/contexts/ThemeContext';
import { useHostReviewStore } from '@/stores/HostReviewStore';
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function HostReviewScreen() {
  const { theme } = useTheme();
  const { hostReviews, isLoading, error, fetchHostReviews } = useHostReviewStore();

  useEffect(() => {
    fetchHostReviews();
  }, []);

  const handleRefresh = () => {
    fetchHostReviews();
  };

  const renderErrorState = () => (
    <Animated.View 
      entering={FadeInDown.duration(600)}
      style={[styles.errorState, { backgroundColor: theme.surface }]}
    >
      <Ionicons name="alert-circle-outline" size={64} color={theme.error} />
      <Text style={[styles.errorTitle, { color: theme.textPrimary }]}>
        Erreur de chargement
      </Text>
    </Animated.View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <Animated.View 
        entering={FadeInDown.duration(600).springify()}
        style={[styles.header, { borderBottomColor: theme.border }]}
      >
        <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>Host Reviews</Text>
      </Animated.View>

      {error ? (
        renderErrorState()
      ) : (
        
        <FlatList
          data={hostReviews}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <ReviewCard review={item} index={index} />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={handleRefresh}
              tintColor={theme.primary}
              colors={[theme.primary]}
            />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
    header: {
      paddingTop: 60,
      paddingBottom: 20,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
    },
    headerTitle: {
      fontSize: 32,
      fontWeight: '700',
      letterSpacing: -0.5,
    },
  listContent: {
    paddingTop: 16,
    paddingBottom: 20,
  },
  errorState: {
    margin: 16,
    padding: 40,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 8,
  },
});