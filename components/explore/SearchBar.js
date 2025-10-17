import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { useEffect, useRef } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function SearchBar({ value, onChangeText, onClear, shouldFocus = false }) {
  const { theme, isDarkMode } = useTheme();
  const inputRef = useRef(null);

  useEffect(() => {
    if (shouldFocus && inputRef.current) {
      // Small delay to ensure smooth animation
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [shouldFocus]);

  const handleFocus = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <Animated.View 
      entering={FadeInDown.duration(600).springify()}
      style={styles.container}
    >
      <BlurView 
        intensity={80} 
        tint={isDarkMode ? 'dark' : 'light'} 
        style={[styles.searchBlur, { borderColor: theme.border }]}
      >
        <View style={[styles.searchBar, { backgroundColor: theme.surface }]}>
          <Ionicons name="search" size={22} color={theme.textSecondary} />
          <TextInput
            ref={inputRef}
            style={[styles.input, { color: theme.textPrimary }]}
            placeholder="Search by location, title..."
            placeholderTextColor={theme.textSecondary}
            value={value}
            onChangeText={onChangeText}
            onFocus={handleFocus}
            returnKeyType="search"
            clearButtonMode="never"
          />
          {value.length > 0 && (
            <TouchableOpacity onPress={onClear} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Ionicons name="close-circle" size={20} color={theme.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </BlurView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchBlur: {
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 1,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 30,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '500',
  },
});
