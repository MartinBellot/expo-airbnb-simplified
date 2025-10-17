import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Platform, ScrollView, StatusBar, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function SettingsScreen() {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const router = useRouter();

  const SettingItem = ({ icon, title, subtitle, onPress, showArrow = true, rightComponent }) => (
    <TouchableOpacity
      style={[styles.settingItem, { backgroundColor: theme.surface, borderColor: theme.border }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.settingLeft}>
        <View style={[styles.iconContainer, { backgroundColor: theme.primary + '20' }]}>
          <Ionicons name={icon} size={24} color={theme.primary} />
        </View>
        <View style={styles.settingText}>
          <Text style={[styles.settingTitle, { color: theme.textPrimary }]}>{title}</Text>
          {subtitle && (
            <Text style={[styles.settingSubtitle, { color: theme.textSecondary }]}>{subtitle}</Text>
          )}
        </View>
      </View>
      {rightComponent || (showArrow && (
        <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} />
      ))}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      
      {/* Header */}
      <Animated.View 
        entering={FadeInDown.duration(600).springify()}
        style={[styles.header, { borderBottomColor: theme.border }]}
      >
        <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>Settings</Text>
      </Animated.View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Appearance Section */}
        <Animated.View 
          entering={FadeInDown.delay(200).duration(600).springify()}
          style={styles.section}
        >
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>APPEARANCE</Text>
          
          <SettingItem
            icon={isDarkMode ? "moon" : "sunny"}
            title="Dark Mode"
            subtitle={isDarkMode ? "Enabled" : "Disabled"}
            onPress={toggleTheme}
            showArrow={false}
            rightComponent={
              <Switch
                value={isDarkMode}
                onValueChange={toggleTheme}
                trackColor={{ false: theme.border, true: theme.primary }}
                thumbColor={isDarkMode ? theme.primary : theme.surface}
                ios_backgroundColor={theme.border}
              />
            }
          />
        </Animated.View>

        {/* Account Section */}
        <Animated.View 
          entering={FadeInDown.delay(300).duration(600).springify()}
          style={styles.section}
        >
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>ACCOUNT</Text>
          
          <SettingItem
            icon="person-outline"
            title="Profile"
            subtitle="Manage your account"
            onPress={() => router.push('/profile')}
          />
          
          <SettingItem
            icon="card-outline"
            title="Payment Methods"
            subtitle="Manage payment options"
            onPress={() => console.log('Payment')}
          />
          
          <SettingItem
            icon="heart-outline"
            title="Favorites"
            subtitle="Your saved properties"
            onPress={() => console.log('Favorites')}
          />
        </Animated.View>

        {/* Preferences Section */}
        <Animated.View 
          entering={FadeInDown.delay(400).duration(600).springify()}
          style={styles.section}
        >
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>PREFERENCES</Text>
          
          <SettingItem
            icon="notifications-outline"
            title="Notifications"
            subtitle="Push notifications settings"
            onPress={() => console.log('Notifications')}
          />
          
          <SettingItem
            icon="language-outline"
            title="Language"
            subtitle="English"
            onPress={() => console.log('Language')}
          />
          
          <SettingItem
            icon="location-outline"
            title="Location"
            subtitle="United States"
            onPress={() => console.log('Location')}
          />
        </Animated.View>

        {/* Support Section */}
        <Animated.View 
          entering={FadeInDown.delay(500).duration(600).springify()}
          style={styles.section}
        >
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>SUPPORT</Text>
          
          <SettingItem
            icon="help-circle-outline"
            title="Help Center"
            subtitle="Get help and support"
            onPress={() => console.log('Help')}
          />
          
          <SettingItem
            icon="document-text-outline"
            title="Terms of Service"
            subtitle="Legal information"
            onPress={() => console.log('Terms')}
          />
          
          <SettingItem
            icon="shield-checkmark-outline"
            title="Privacy Policy"
            subtitle="How we protect your data"
            onPress={() => console.log('Privacy')}
          />
        </Animated.View>

        {/* About Section */}
        <Animated.View 
          entering={FadeInDown.delay(600).duration(600).springify()}
          style={styles.section}
        >
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>ABOUT</Text>
          
          <SettingItem
            icon="information-circle-outline"
            title="App Version"
            subtitle="1.0.0"
            onPress={() => console.log('Version')}
            showArrow={false}
          />
        </Animated.View>

        {/* Logout Button */}
        <Animated.View 
          entering={FadeInDown.delay(700).duration(600).springify()}
          style={styles.logoutSection}
        >
          <TouchableOpacity
            style={[styles.logoutButton, { borderColor: theme.error }]}
            activeOpacity={0.7}
            onPress={() => console.log('Logout')}
          >
            <Ionicons name="log-out-outline" size={24} color={theme.error} />
            <Text style={[styles.logoutText, { color: theme.error }]}>Logout</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 20,
    paddingBottom: 100,
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 12,
    marginLeft: 4,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 16,
    marginBottom: 8,
    borderWidth: 1,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 13,
  },
  logoutSection: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 40,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
  },
});
