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
import { auth, db, storage } from '../components/firebaseConfig';
import { doc, updateDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';

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

  const handleSave = async () => {
    if (!auth.currentUser) {
      Alert.alert('Error', 'You must be logged in to update your profile.');
      return;
    }

    setIsLoading(true);
    
    try {
      const user = auth.currentUser;
      
      // Update Firebase Auth profile
      await updateProfile(user, {
        displayName: profileData.name,
        photoURL: profileData.avatar
      });

      // Update Firestore user document
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, {
        fullName: profileData.name,
        email: profileData.email,
        phone: profileData.phone,
        location: profileData.location,
        bio: profileData.bio,
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
              navigation.goBack();
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

  const uploadImageToFirebase = async (uri) => {
    try {
      // Check if user is authenticated
      if (!auth.currentUser) {
        throw new Error('User not authenticated');
      }

      console.log('Starting image upload for user:', auth.currentUser.uid);
      
      // Convert image to blob
      const response = await fetch(uri);
      if (!response.ok) {
        throw new Error('Failed to fetch image');
      }
      
      const blob = await response.blob();
      console.log('Image blob created, size:', blob.size);
      
      // Create unique filename
      const filename = `profile_pictures/${auth.currentUser.uid}_${Date.now()}.jpg`;
      console.log('Upload path:', filename);
      
      const imageRef = ref(storage, filename);
      
      // Upload image with metadata
      const metadata = {
        contentType: 'image/jpeg',
        customMetadata: {
          uploadedBy: auth.currentUser.uid,
          uploadedAt: new Date().toISOString()
        }
      };
      
      console.log('Starting upload...');
      const uploadResult = await uploadBytes(imageRef, blob, metadata);
      console.log('Upload successful:', uploadResult.metadata.name);
      
      // Get download URL
      const downloadURL = await getDownloadURL(imageRef);
      console.log('Download URL obtained:', downloadURL);
      
      return downloadURL;
    } catch (error) {
      console.error('Image upload error details:', {
        code: error.code,
        message: error.message,
        serverResponse: error.serverResponse
      });
      
      // Provide more specific error messages
      if (error.code === 'storage/unauthorized') {
        throw new Error('You are not authorized to upload images. Please log in again.');
      } else if (error.code === 'storage/quota-exceeded') {
        throw new Error('Storage quota exceeded. Please try again later.');
      } else if (error.code === 'storage/unauthenticated') {
        throw new Error('Please log in to upload images.');
      } else if (error.code === 'storage/unknown') {
        throw new Error('Upload failed due to server error. Please check your internet connection and try again.');
      } else {
        throw new Error(`Upload failed: ${error.message}`);
      }
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
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5, // Reduced quality to avoid size issues
        base64: false,
        exif: false,
      });

      if (!result.canceled && result.assets[0]) {
        setIsLoading(true);
        try {
          const downloadURL = await uploadImageToFirebase(result.assets[0].uri);
          setProfileData({...profileData, avatar: downloadURL});
          Alert.alert('Success', 'Profile picture updated!');
        } catch (error) {
          Alert.alert('Error', 'Failed to upload image. Please try again.');
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
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5, // Reduced quality to avoid size issues
        base64: false,
        exif: false,
      });

      if (!result.canceled && result.assets[0]) {
        setIsLoading(true);
        try {
          const downloadURL = await uploadImageToFirebase(result.assets[0].uri);
          setProfileData({...profileData, avatar: downloadURL});
          Alert.alert('Success', 'Profile picture updated!');
        } catch (error) {
          Alert.alert('Error', 'Failed to upload image. Please try again.');
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
    <LinearGradient
      colors={['#A855F7', '#9333EA']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
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
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 30,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#fff',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#A855F7',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
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
    color: '#fff',
    marginBottom: 10,
    marginLeft: 5,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 16,
    color: '#fff',
    minHeight: 50,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
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