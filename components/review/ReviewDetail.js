import { useTheme } from '@/contexts/ThemeContext';
import { useHostReviewStore } from '@/stores/HostReviewStore';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

export default function ReviewDetail() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { theme, isDarkMode } = useTheme();
  const { addHostResponse, hostReviews } = useHostReviewStore();
  
  const review = hostReviews.find(r => r.id == params.id);

  const [responseText, setResponseText] = useState('');

  const handleAddResponse = () => {
    if (responseText.trim()) {
      console.log('Adding host response to review ID:', review.id);
      addHostResponse(review.id, responseText);
      setResponseText('');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Animated.View 
          entering={FadeInDown.duration(600)}
          style={[styles.headerContainer, { backgroundColor: theme.surface }]}
        >
          
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <BlurView 
              intensity={isDarkMode ? 60 : 80} 
              tint={isDarkMode ? 'dark' : 'light'} 
              style={styles.backBlur}
            >
              <Ionicons name="arrow-back" size={24} color={theme.textPrimary} />
            </BlurView>
          </TouchableOpacity>

          <View style={styles.headerContent}>
            <Image source={{ uri: "https://i.pravatar.cc/150?u=" + review.email }} style={styles.avatarLarge} />
            
            <Text style={[styles.reviewerName, { color: theme.textPrimary }]}>
              {review.name}
            </Text>
            
            <Text style={[styles.reviewerEmail, { color: theme.textSecondary }]}>
              {review.email}
            </Text>

          </View>
        </Animated.View>

        <View style={styles.content}>
          <Animated.View 
            entering={FadeInUp.delay(200).duration(600)}
            style={[styles.reviewSection, { backgroundColor: theme.surface }]}
          >
            <View style={styles.sectionHeader}>
              <Ionicons name="document-text" size={24} color={theme.primary} />
              <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
                Avis détaillé
              </Text>
            </View>
            
            <Text style={[styles.reviewBody, { color: theme.textSecondary }]}>
              {review.body}
            </Text>
          </Animated.View>
        </View>

        {review.hostResponse && (
          <View style={styles.content}>
            <Animated.View 
              entering={FadeInUp.delay(200).duration(600)}
              style={[styles.reviewSection, { backgroundColor: theme.surface }]}
            >
              <View style={styles.sectionHeader}>
                <Ionicons name="chatbubble-ellipses" size={24} color={theme.primary} />
                <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
                  Réponse de l'hôte
                </Text>
              </View>
              
              <Text style={[styles.reviewBody, { color: theme.textSecondary }]}>
                {review.hostResponse}
              </Text>
            </Animated.View>
          </View>
        )}

        <View style={styles.content}>
          <Animated.View 
            entering={FadeInUp.delay(200).duration(600)}
            style={[styles.reviewSection, { backgroundColor: theme.surface }]}
          >
            <View style={styles.sectionHeader}>
              <Ionicons name="chatbubble-ellipses" size={24} color={theme.primary} />
              <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
                Ajouter une réponse
              </Text>
            </View>
            
            <TextInput
              style={[styles.textInput, { 
                backgroundColor: isDarkMode ? '#333' : '#f0f0f0',
                color: theme.textPrimary,
              }]}
              placeholder="Écrire une réponse en tant qu'hôte..."
              placeholderTextColor={isDarkMode ? '#888' : '#aaa'}
              value={responseText}
              onChangeText={setResponseText}
            />
            <TouchableOpacity 
              style={[styles.submitButton, { backgroundColor: theme.primary }]}
              onPress={handleAddResponse}
            >
              <Text style={[styles.submitButtonText, { color: theme.onPrimary }]}>
                Soumettre la réponse
              </Text>
            </TouchableOpacity>
          </Animated.View>
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
    paddingBottom: 40,
  },
  headerContainer: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 30,
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 30,
    left: 16,
    zIndex: 10,
    borderRadius: 12,
    overflow: 'hidden',
  },
  backBlur: {
    padding: 10,
  },
  headerContent: {
    alignItems: 'center',
  },
  avatarLarge: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  reviewerName: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 6,
    textAlign: 'center',
  },
  reviewerEmail: {
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  content: {
    padding: 16,
    gap: 16,
  },
  reviewSection: {
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  reviewBody: {
    fontSize: 16,
    lineHeight: 24,
  },
  textInput: {
    minHeight: 100,
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  submitButton: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
