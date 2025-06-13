import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../components/firebaseConfig';

const { width, height } = Dimensions.get('window');

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const MAX_LOGIN_ATTEMPTS = 5;

const Login = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);

  const handleLogin = async (values) => {
    if (loginAttempts >= MAX_LOGIN_ATTEMPTS) {
      Alert.alert('Too Many Attempts', 'Please try again later.');
      return;
    }

    setIsLoading(true);
    
    try {
      console.log('Attempting login with email:', values.email);
      
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;
      
      console.log('Login successful for user:', user.email);
      
      // Get user data from Firestore
      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);
      
      let userData = {
        uid: user.uid,
        email: user.email,
        fullName: user.displayName || 'User',
        avatar: user.photoURL || 'https://via.placeholder.com/150/cccccc/969696?text=User',
      };
      
      if (userDocSnap.exists()) {
        const firestoreData = userDocSnap.data();
        userData = {
          ...userData,
          fullName: firestoreData.fullName || userData.fullName,
          phone: firestoreData.phone || '',
          avatar: firestoreData.avatar || userData.avatar,
          location: firestoreData.location || '',
          bio: firestoreData.bio || '',
        };
      }
      
      // Navigate to main app with user data
      navigation.reset({
        index: 0,
        routes: [{ 
          name: 'MainApp', 
          params: { 
            userEmail: userData.email,
            userName: userData.fullName,
            userPhone: userData.phone || '',
            userAvatar: userData.avatar,
            userData: userData
          } 
        }],
      });
      
    } catch (error) {
      console.error('Login error:', error);
      setLoginAttempts(prev => prev + 1);
      
      if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
        Alert.alert(
          'Account Not Found',
          'We couldn\'t find an account with those credentials. Would you like to create a new account?',
          [
            { text: 'Cancel', style: 'cancel' },
            { 
              text: 'Sign Up', 
              onPress: () => navigation.navigate('Signup', { 
                email: values.email 
              })
            }
          ]
        );
      } else if (error.code === 'auth/wrong-password') {
        Alert.alert('Invalid Password', 'The password you entered is incorrect.');
      } else if (error.code === 'auth/too-many-requests') {
        Alert.alert('Too Many Attempts', 'Too many failed login attempts. Please try again later.');
      } else {
        Alert.alert('Login Failed', 'Please check your credentials and try again.');
      }
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
              <Ionicons name="location" size={32} color="#FFFFFF" />
            </View>
            <Text style={styles.appName}>Cebu Explorer</Text>
            <Text style={styles.welcomeText}>Welcome!</Text>
            <Text style={styles.subtitle}>Please sign in to continue</Text>
          </View>

          {/* Login Card */}
          <View style={styles.loginCard}>
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={validationSchema}
              onSubmit={handleLogin}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View style={styles.formContainer}>
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
                      autoComplete="email"
                      editable={!isLoading}
                    />
                  </View>
                  {touched.email && errors.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
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
                        autoComplete="password"
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

                  {/* Forgot Password */}
                  <TouchableOpacity style={styles.forgotPassword}>
                    <Text style={styles.forgotPasswordText}>Forgot password?</Text>
                  </TouchableOpacity>

                  {/* Log In Button */}
                  <TouchableOpacity 
                    style={[
                      styles.loginButton,
                      (loginAttempts >= MAX_LOGIN_ATTEMPTS || isLoading) && styles.disabledButton
                    ]} 
                    onPress={handleSubmit}
                    disabled={loginAttempts >= MAX_LOGIN_ATTEMPTS || isLoading}
                  >
                    {isLoading ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text style={styles.loginButtonText}>Log In</Text>
                    )}
                  </TouchableOpacity>

                  {/* Create Account Link */}
                  <TouchableOpacity 
                    style={styles.createAccountLink}
                    onPress={() => navigation.navigate('Signup')}
                    disabled={isLoading}
                  >
                    <Text style={styles.createAccountText}>
                      Don't have an account? <Text style={styles.createAccountLinkText}>Create</Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </View>
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
    paddingVertical: 60,
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
  loginCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 8,
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
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#374151',
    backgroundColor: '#F9FAFB',
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#A855F7',
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#A855F7',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#A855F7',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  createAccountLink: {
    alignItems: 'center',
  },
  createAccountText: {
    fontSize: 14,
    color: '#6B7280',
  },
  createAccountLinkText: {
    color: '#A855F7',
    fontWeight: '600',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: -15,
    marginBottom: 10,
    marginLeft: 4,
  },
  disabledButton: {
    opacity: 0.6,
  },
});

export default Login;
