import { APP_NAME } from '@/constants/colors';
import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import ThemeToggleButton from './ThemeToggleButton';

export default function Header() {
  const { theme, isDarkMode } = useTheme();
  const router = useRouter();
  
  return (
    <Animated.View 
      entering={FadeInDown.duration(600).springify()}
      style={styles.header}
    >
      <BlurView 
        intensity={80} 
        tint={isDarkMode ? 'dark' : 'light'} 
        style={[styles.headerBlur, { borderBottomColor: theme.border }]}
      >
        <View style={styles.headerContent}>
        
          <View style={styles.logoContainer}>
            <Image 
              source={require('@/assets/images/logo.png')} 
              style={styles.logoImage}
              resizeMode="contain"
            />
            <Text style={[styles.logo, { color: theme.primary }]}>{APP_NAME}</Text>
          </View>
          
          <View style={styles.rightContainer}>
            <ThemeToggleButton style={styles.themeButton} />
            <TouchableOpacity style={styles.profileButton}>
              <Ionicons name="person-circle-outline" size={32} color={theme.textPrimary} />
            </TouchableOpacity>
          </View>
        </View>


        <View style={{ height: 20 }} />
        

      </BlurView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    paddingTop: Platform.OS === 'ios' ? 0 : 0,
  },
  headerBlur: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    overflow: 'hidden',
    borderBottomWidth: 1,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoImage: {
    width: 32,
    height: 32,
  },
  logo: {
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  themeButton: {
    width: 40,
    height: 40,
  },
  profileButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderWidth: 1,
  },
  searchPlaceholder: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '500',
  },
  filterButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
