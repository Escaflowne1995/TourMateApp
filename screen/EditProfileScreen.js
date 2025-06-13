import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const EditProfileScreen = ({ navigation, route }) => {
  const userData = route.params?.userData || {};
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: userData.name || 'Guest User',
    email: userData.email || 'guest@example.com',
    phone: userData.phone || '',
    location: userData.location || 'Cebu City, Philippines',
    bio: userData.bio || '',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400'
  });

  const handleSave = () => {
    setIsLoading(true);
    
    // Mock save operation
    setTimeout(() => {
      Alert.alert(
        'Profile Updated',
        'Your profile has been successfully updated!',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.goBack();
            }
          }
        ]
      );
      setIsLoading(false);
    }, 1000);
  };

  const handleChangeAvatar = () => {
    Alert.alert(
      'Change Profile Picture',
      'Choose an option',
      [
        { text: 'Camera', onPress: () => console.log('Camera selected') },
        { text: 'Gallery', onPress: () => console.log('Gallery selected') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  return (
    <LinearGradient
      colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.8)']}
      style={styles.container}
    >
      <ScrollView 
        style={styles.scrollView}
        accessible={true}
        accessibilityLabel="Edit Profile Screen"
      >
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.avatarContainer}
          onPress={handleChangeAvatar}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Change profile picture"
          accessibilityHint="Tap to change your profile picture"
        >
          <Image
            source={{ uri: profileData.avatar }}
            style={styles.avatar}
            accessible={true}
            accessibilityRole="image"
            accessibilityLabel={`Current profile picture of ${profileData.name}`}
          />
          <View style={styles.cameraIcon}>
            <Ionicons name="camera" size={20} color="#fff" accessible={false} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={profileData.name}
            onChangeText={(text) => setProfileData({...profileData, name: text})}
            placeholder="Enter your full name"
            accessible={true}
            accessibilityLabel="Full Name"
            accessibilityHint="Enter your full name"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={profileData.email}
            onChangeText={(text) => setProfileData({...profileData, email: text})}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            accessible={true}
            accessibilityLabel="Email Address"
            accessibilityHint="Enter your email address"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={profileData.phone}
            onChangeText={(text) => setProfileData({...profileData, phone: text})}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            accessible={true}
            accessibilityLabel="Phone Number"
            accessibilityHint="Enter your phone number"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.input}
            value={profileData.location}
            onChangeText={(text) => setProfileData({...profileData, location: text})}
            placeholder="Enter your location"
            accessible={true}
            accessibilityLabel="Location"
            accessibilityHint="Enter your current location"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Bio</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={profileData.bio}
            onChangeText={(text) => setProfileData({...profileData, bio: text})}
            placeholder="Tell us about yourself..."
            multiline={true}
            numberOfLines={4}
            textAlignVertical="top"
            accessible={true}
            accessibilityLabel="Biography"
            accessibilityHint="Write a short bio about yourself"
          />
        </View>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          disabled={isLoading}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Save Changes"
          accessibilityHint="Save your profile changes"
          accessibilityState={{ disabled: isLoading }}
        >
          <LinearGradient
            colors={['#FF6B6B', '#FF8E8E']}
            style={styles.buttonGradient}
          >
            {isLoading ? (
              <ActivityIndicator 
                color="#fff" 
                accessible={true}
                accessibilityLabel="Saving changes, please wait"
              />
            ) : (
              <Text style={styles.saveButtonText}>Save Changes</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginHorizontal: 15,
    marginTop: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#FF6B6B',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#FF6B6B',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginTop: 10,
    marginHorizontal: 15,
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    minHeight: 50,
  },
  textArea: {
    minHeight: 100,
    paddingTop: 15,
  },
  saveButton: {
    borderRadius: 25,
    overflow: 'hidden',
    marginTop: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonGradient: {
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditProfileScreen; 