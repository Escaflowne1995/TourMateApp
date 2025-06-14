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
import * as ImagePicker from 'expo-image-picker';
import { auth, db } from '../../services/firebase/firebaseConfig';
import { doc, updateDoc, setDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColors } from '../../utils/theme';

const EditProfileScreen = ({ navigation, route }) => {
  const { isDarkMode } = useTheme();
  const colors = getThemeColors(isDarkMode);
  const styles = getStyles(colors, isDarkMode);
  
  const userData = route.params?.userData || {};
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: userData.fullName || userData.displayName || userData.name || 'Guest User',
    email: userData.email || 'guest@example.com',
    phone: userData.phone || '',
    location: userData.location || 'Cebu City, Philippines',
    avatar: userData.avatar || ''
  });

  const handleSave = async () => {
    if (!auth.currentUser) {
      Alert.alert('Error', 'You must be logged in to update your profile.');
      return;
    }

    setIsLoading(true);
    
    try {
      const user = auth.currentUser;
      
      // Update Firebase Auth profile (display name only, avatar stored in Firestore)
      await updateProfile(user, {
        displayName: profileData.name
        // Note: photoURL removed because base64 images are too long for Firebase Auth
      });

      // Update Firestore user document
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, {
        fullName: profileData.name,
        email: profileData.email,
        phone: profileData.phone,
        location: profileData.location,
        avatar: profileData.avatar,
        updatedAt: new Date().toISOString(),
        uid: user.uid
      }, { merge: true }); // merge: true means update existing fields, don't overwrite the whole document

      Alert.alert(
        'Profile Updated',
        'Your profile has been successfully updated!',
        [
          {
            text: 'OK',
            onPress: () => {
              // Navigate back and trigger a refresh of the profile screen
              navigation.navigate('Profile', { 
                refresh: true,
                userData: {
                  ...userData,
                  fullName: profileData.name,
                  email: profileData.email,
                  phone: profileData.phone,
                  location: profileData.location,
                  avatar: profileData.avatar
                }
              });
            }
          }
        ]
      );
    } catch (error) {
      console.error('Profile save error:', error);
      Alert.alert(
        'Error', 
        'Failed to update profile. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const convertImageToBase64 = async (uri) => {
    try {
      console.log('Converting image to base64 for user:', auth.currentUser.uid);
      
      // Import the simple image service
      const SimpleImageService = require('../../services/image/SimpleImageService').default;
      
      // Convert to base64 using our simple service
      const result = await SimpleImageService.convertToBase64(uri);
      
      if (result.success) {
        console.log('Base64 conversion successful');
        return result.base64;
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Base64 conversion error:', error);
      throw new Error(`Image processing failed: ${error.message}`);
    }
  };

  const pickImageFromGallery = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (permissionResult.granted === false) {
        Alert.alert('Permission Required', 'Permission to access gallery is required!');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5, // Reduced quality to avoid size issues
        base64: false,
        exif: false,
      });

      if (!result.canceled && result.assets[0]) {
        setIsLoading(true);
        try {
          const base64Avatar = await convertImageToBase64(result.assets[0].uri);
          setProfileData({...profileData, avatar: base64Avatar});
          Alert.alert('Success', 'Profile picture updated!');
        } catch (error) {
          Alert.alert('Error', 'Failed to process image. Please try again.');
        } finally {
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.error('Gallery error:', error);
      Alert.alert('Error', 'Failed to open gallery.');
    }
  };

  const pickImageFromCamera = async () => {
    try {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      
      if (permissionResult.granted === false) {
        Alert.alert('Permission Required', 'Permission to access camera is required!');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: 'images',
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5, // Reduced quality to avoid size issues
        base64: false,
        exif: false,
      });

      if (!result.canceled && result.assets[0]) {
        setIsLoading(true);
        try {
          const base64Avatar = await convertImageToBase64(result.assets[0].uri);
          setProfileData({...profileData, avatar: base64Avatar});
          Alert.alert('Success', 'Profile picture updated!');
        } catch (error) {
          Alert.alert('Error', 'Failed to process image. Please try again.');
        } finally {
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.error('Camera error:', error);
      Alert.alert('Error', 'Failed to open camera.');
    }
  };

  const handleChangeAvatar = () => {
    Alert.alert(
      'Change Profile Picture',
      'Choose an option',
      [
        { text: 'Camera', onPress: pickImageFromCamera },
        { text: 'Gallery', onPress: pickImageFromGallery },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
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
            colors={['#A855F7', '#9333EA']}
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
    </View>
  );
};

const getStyles = (colors, isDarkMode) => StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: 20,
    marginHorizontal: 15,
    marginTop: 50,
    borderRadius: 15,
    backgroundColor: colors.cardBackground,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: colors.border,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.primary,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.cardBackground,
  },
  form: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 10,
    marginLeft: 5,
  },
  input: {
    backgroundColor: colors.inputBackground,
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 16,
    color: colors.text,
    minHeight: 50,
    borderWidth: 1,
    borderColor: colors.border,
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
    backgroundColor: colors.primary,
  },
  buttonGradient: {
    padding: 18,
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