import { useTheme } from '@/contexts/ThemeContext';
import { useUserStore } from '@/stores/UserStore';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, Platform, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function ProfileScreen() {
  const { theme, isDarkMode } = useTheme();
  const router = useRouter();
  const { user, updateUser, updateAddress } = useUserStore();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    bio: user.bio,
    street: user.address.street,
    city: user.address.city,
    state: user.address.state,
    zipCode: user.address.zipCode,
    country: user.address.country,
  });

  const handleSave = () => {
    updateUser({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      bio: formData.bio,
    });
    updateAddress({
      street: formData.street,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
      country: formData.country,
    });
    setIsEditing(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const handleCancel = () => {
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      bio: user.bio,
      street: user.address.street,
      city: user.address.city,
      state: user.address.state,
      zipCode: user.address.zipCode,
      country: user.address.country,
    });
    setIsEditing(false);
  };

  const InputField = ({ label, value, onChangeText, placeholder, multiline = false, icon }) => (
    <View style={styles.inputContainer}>
      <View style={styles.inputLabelRow}>
        {icon && <Ionicons name={icon} size={16} color={theme.textSecondary} style={styles.inputIcon} />}
        <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>{label}</Text>
      </View>
      <TextInput
        style={[
          styles.input,
          multiline && styles.inputMultiline,
          {
            backgroundColor: theme.surface,
            color: theme.textPrimary,
            borderColor: theme.border,
          },
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.textSecondary + '80'}
        editable={isEditing}
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
      />
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />

      {/* Header */}
      <Animated.View
        entering={FadeInDown.duration(600).springify()}
        style={[styles.header, { borderBottomColor: theme.border }]}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={theme.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>Profile</Text>
        <TouchableOpacity
          onPress={() => isEditing ? handleSave() : setIsEditing(true)}
          style={styles.actionButton}
        >
          <Text style={[styles.actionButtonText, { color: theme.primary }]}>
            {isEditing ? 'Save' : 'Edit'}
          </Text>
        </TouchableOpacity>
      </Animated.View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Picture Section */}
        <Animated.View
          entering={FadeInDown.delay(200).duration(600).springify()}
          style={styles.avatarSection}
        >
          <View style={[styles.avatarContainer, { backgroundColor: theme.primary + '20' }]}>
            {user.avatar ? (
              <Image source={{ uri: user.avatar }} style={styles.avatar} />
            ) : (
              <Ionicons name="person" size={60} color={theme.primary} />
            )}
          </View>
          {user.verified && (
            <View style={[styles.verifiedBadge, { backgroundColor: theme.primary }]}>
              <Ionicons name="checkmark-circle" size={24} color="#fff" />
            </View>
          )}
          {isEditing && (
            <TouchableOpacity
              style={[styles.changePhotoButton, { backgroundColor: theme.surface, borderColor: theme.border }]}
              onPress={() => Alert.alert('Change Photo', 'Photo upload feature coming soon!')}
            >
              <Ionicons name="camera" size={20} color={theme.primary} />
              <Text style={[styles.changePhotoText, { color: theme.primary }]}>Change Photo</Text>
            </TouchableOpacity>
          )}
        </Animated.View>

        {/* Personal Information */}
        <Animated.View
          entering={FadeInDown.delay(300).duration(600).springify()}
          style={styles.section}
        >
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>PERSONAL INFORMATION</Text>

          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <InputField
                label="First Name"
                value={formData.firstName}
                onChangeText={(text) => setFormData({ ...formData, firstName: text })}
                placeholder="First name"
                icon="person-outline"
              />
            </View>
            <View style={styles.halfWidth}>
              <InputField
                label="Last Name"
                value={formData.lastName}
                onChangeText={(text) => setFormData({ ...formData, lastName: text })}
                placeholder="Last name"
              />
            </View>
          </View>

          <InputField
            label="Email"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            placeholder="email@example.com"
            icon="mail-outline"
          />

          <InputField
            label="Phone"
            value={formData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
            placeholder="+1 234 567 8900"
            icon="call-outline"
          />

          <InputField
            label="Bio"
            value={formData.bio}
            onChangeText={(text) => setFormData({ ...formData, bio: text })}
            placeholder="Tell us about yourself"
            multiline
            icon="create-outline"
          />
        </Animated.View>

        {/* Address */}
        <Animated.View
          entering={FadeInDown.delay(400).duration(600).springify()}
          style={styles.section}
        >
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>ADDRESS</Text>

          <InputField
            label="Street"
            value={formData.street}
            onChangeText={(text) => setFormData({ ...formData, street: text })}
            placeholder="Street address"
            icon="home-outline"
          />

          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <InputField
                label="City"
                value={formData.city}
                onChangeText={(text) => setFormData({ ...formData, city: text })}
                placeholder="City"
              />
            </View>
            <View style={styles.halfWidth}>
              <InputField
                label="State"
                value={formData.state}
                onChangeText={(text) => setFormData({ ...formData, state: text })}
                placeholder="State"
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <InputField
                label="ZIP Code"
                value={formData.zipCode}
                onChangeText={(text) => setFormData({ ...formData, zipCode: text })}
                placeholder="12345"
              />
            </View>
            <View style={styles.halfWidth}>
              <InputField
                label="Country"
                value={formData.country}
                onChangeText={(text) => setFormData({ ...formData, country: text })}
                placeholder="Country"
              />
            </View>
          </View>
        </Animated.View>

        {/* Account Info */}
        <Animated.View
          entering={FadeInDown.delay(500).duration(600).springify()}
          style={styles.section}
        >
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>ACCOUNT INFO</Text>

          <View style={[styles.infoCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
            <View style={styles.infoRow}>
              <Ionicons name="calendar-outline" size={20} color={theme.textSecondary} />
              <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Member since</Text>
              <Text style={[styles.infoValue, { color: theme.textPrimary }]}>
                {new Date(user.joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </Text>
            </View>
            <View style={[styles.divider, { backgroundColor: theme.border }]} />
            <View style={styles.infoRow}>
              <Ionicons name="shield-checkmark-outline" size={20} color={theme.primary} />
              <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>Verification status</Text>
              <Text style={[styles.infoValue, { color: theme.primary }]}>
                {user.verified ? 'Verified' : 'Not verified'}
              </Text>
            </View>
          </View>
        </Animated.View>

        {/* Cancel Button (only when editing) */}
        {isEditing && (
          <Animated.View
            entering={FadeInDown.delay(600).duration(600).springify()}
            style={styles.cancelSection}
          >
            <TouchableOpacity
              style={[styles.cancelButton, { borderColor: theme.border, backgroundColor: theme.surface }]}
              onPress={handleCancel}
            >
              <Text style={[styles.cancelButtonText, { color: theme.textSecondary }]}>Cancel</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  actionButton: {
    width: 60,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 20,
    paddingBottom: 100,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  verifiedBadge: {
    position: 'absolute',
    top: 85,
    right: '50%',
    marginRight: -70,
    borderRadius: 12,
  },
  changePhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  changePhotoText: {
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 16,
    marginLeft: 4,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  inputIcon: {
    marginRight: 6,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
    paddingTop: 14,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  infoCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoLabel: {
    flex: 1,
    fontSize: 15,
    marginLeft: 12,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    marginVertical: 8,
  },
  cancelSection: {
    paddingHorizontal: 20,
    marginTop: 8,
    marginBottom: 20,
  },
  cancelButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
