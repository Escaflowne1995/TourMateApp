import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Dimensions,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../../services/firebase/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

const { width, height } = Dimensions.get('window');

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'First name must be at least 2 characters')
    .required('First name is required'),
  lastName: Yup.string()
    .min(2, 'Last name must be at least 2 characters')
    .required('Last name is required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^\+?[\d\s-]{10,}$/, 'Please enter a valid phone number')
    .nullable(),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords do not match')
    .required('Please confirm your password'),
});

const Signup = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignup = async (values) => {
    setIsLoading(true);
    try {
      console.log('Creating user with email:', values.email);
      
      const fullName = `${values.firstName} ${values.lastName}`;
      
      // Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      
      const user = userCredential.user;
      console.log('User created successfully:', user.uid);
      
      // Update user profile with display name
      await updateProfile(user, {
        displayName: fullName
      });
      console.log('User profile updated successfully');
      
      // Save additional user data to Firestore
      console.log('Saving user data to Firestore...');
      try {
        await setDoc(doc(db, 'users', user.uid), {
          firstName: values.firstName,
          lastName: values.lastName,
          fullName: fullName,
          email: values.email,
          phone: values.phone || '',
          createdAt: new Date().toISOString(),
          uid: user.uid,
          avatar: 'https://via.placeholder.com/150/cccccc/969696?text=User',
          location: '',
        });
        console.log('User data saved to Firestore successfully!');
      } catch (firestoreError) {
        console.error('Firestore save error:', firestoreError);
        Alert.alert('Note', 'Account created but profile data save failed. You can update it later.');
      }
      
      // Navigate directly to main app after successful signup
      const userData = {
        uid: user.uid,
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        fullName: fullName,
        phone: values.phone || '',
        avatar: 'https://via.placeholder.com/150/cccccc/969696?text=User',
        location: '',
      };

      navigation.reset({
        index: 0,
        routes: [{ 
          name: 'MainApp', 
          params: { 
            userEmail: userData.email,
            userName: userData.fullName,
            userPhone: userData.phone,
            userAvatar: userData.avatar,
            userData: userData
          } 
        }],
      });
      
    } catch (error) {
      console.error('Signup error:', error);
      let errorMessage = 'Failed to create account. Please try again.';
      
      // Handle specific Firebase errors
      switch (error.code) {
        case 'auth/email-already-in-use':
          // For corrupted accounts, offer to replace them
          if (values.email === 'romeoalbarando115@gmail.com' || values.email === 'ompadking77@gmail.com') {
            Alert.alert(
              'Account Exists',
              'This email has a corrupted account. Would you like to replace it with a new account?',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Replace Account', onPress: () => {
                  Alert.alert(
                    'Account Replacement',
                    'Please contact support or try using a different email address for now. The corrupted account needs to be manually removed.',
                    [{ text: 'OK' }]
                  );
                }}
              ]
            );
            return;
          } else {
            errorMessage = 'This email address is already registered.';
          }
          break;
        case 'auth/weak-password':
          errorMessage = 'Password should be at least 6 characters.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Please enter a valid email address.';
          break;
        default:
          errorMessage = error.message;
      }
      
      Alert.alert('Signup Error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#A855F7', '#9333EA']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <KeyboardAvoidingView 
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.appIcon}>
              <Ionicons name="person-add" size={32} color="#FFFFFF" />
            </View>
            <Text style={styles.appName}>Cebu Explorer</Text>
            <Text style={styles.welcomeText}>Welcome!</Text>
            <Text style={styles.subtitle}>Create your account to get started</Text>
          </View>

          {/* Signup Form */}
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: route?.params?.email || '',
              phone: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSignup}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View style={styles.formContainer}>
                {/* First Name and Last Name Row */}
                <View style={styles.nameRowContainer}>
                  <View style={styles.nameInputContainer}>
                    <Text style={styles.inputLabel}>First Name</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your first name"
                      placeholderTextColor="#9CA3AF"
                      value={values.firstName}
                      onChangeText={handleChange('firstName')}
                      onBlur={handleBlur('firstName')}
                      editable={!isLoading}
                    />
                    {touched.firstName && errors.firstName && (
                      <Text style={styles.errorText}>{errors.firstName}</Text>
                    )}
                  </View>

                  <View style={styles.nameInputContainer}>
                    <Text style={styles.inputLabel}>Last Name</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your last name"
                      placeholderTextColor="#9CA3AF"
                      value={values.lastName}
                      onChangeText={handleChange('lastName')}
                      onBlur={handleBlur('lastName')}
                      editable={!isLoading}
                    />
                    {touched.lastName && errors.lastName && (
                      <Text style={styles.errorText}>{errors.lastName}</Text>
                    )}
                  </View>
                </View>

                {/* Email Input */}
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Email</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    placeholderTextColor="#9CA3AF"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    editable={!isLoading}
                  />
                </View>
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}

                {/* Phone Input */}
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Phone Number</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your phone number"
                    placeholderTextColor="#9CA3AF"
                    value={values.phone}
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    keyboardType="phone-pad"
                    editable={!isLoading}
                  />
                </View>
                {touched.phone && errors.phone && (
                  <Text style={styles.errorText}>{errors.phone}</Text>
                )}

                {/* Password Input */}
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Password</Text>
                  <View style={styles.passwordContainer}>
                    <TextInput
                      style={[styles.input, styles.passwordInput]}
                      placeholder="Enter your password"
                      placeholderTextColor="#9CA3AF"
                      value={values.password}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      secureTextEntry={!showPassword}
                      editable={!isLoading}
                    />
                    <TouchableOpacity
                      style={styles.eyeButton}
                      onPress={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      <Ionicons
                        name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                        size={20}
                        color="#9CA3AF"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}

                {/* Confirm Password Input */}
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Confirm Password</Text>
                  <View style={styles.passwordContainer}>
                    <TextInput
                      style={[styles.input, styles.passwordInput]}
                      placeholder="Confirm your password"
                      placeholderTextColor="#9CA3AF"
                      value={values.confirmPassword}
                      onChangeText={handleChange('confirmPassword')}
                      onBlur={handleBlur('confirmPassword')}
                      secureTextEntry={!showConfirmPassword}
                      editable={!isLoading}
                    />
                    <TouchableOpacity
                      style={styles.eyeButton}
                      onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                      disabled={isLoading}
                    >
                      <Ionicons
                        name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                        size={20}
                        color="#9CA3AF"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                {touched.confirmPassword && errors.confirmPassword && (
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                )}

                {/* Create Button */}
                <TouchableOpacity 
                  style={[styles.createButton, isLoading && styles.disabledButton]} 
                  onPress={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.createButtonText}>Create</Text>
                  )}
                </TouchableOpacity>

                {/* Sign In Link */}
                <TouchableOpacity 
                  style={styles.signInLink}
                  onPress={() => navigation.navigate('Login')}
                  disabled={isLoading}
                >
                  <Text style={styles.signInText}>
                    Already have an account? <Text style={styles.signInLinkText}>Log In</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
    minHeight: height,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  appIcon: {
    width: 64,
    height: 64,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  appName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#374151',
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeButton: {
    position: 'absolute',
    right: 16,
    top: 14,
    padding: 4,
  },
  createButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  createButtonText: {
    color: '#A855F7',
    fontSize: 16,
    fontWeight: '700',
  },
  signInLink: {
    alignItems: 'center',
  },
  signInText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  signInLinkText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  errorText: {
    color: '#FEF2F2',
    fontSize: 12,
    marginTop: -15,
    marginBottom: 10,
    marginLeft: 4,
    fontWeight: '500',
  },
  disabledButton: {
    opacity: 0.6,
  },
  nameRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  nameInputContainer: {
    flex: 1,
    marginHorizontal: 4,
  },
});

export default Signup;
