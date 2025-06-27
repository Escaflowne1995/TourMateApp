import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColors } from '../../utils/theme';
import AdminAuthService from '../../services/auth/AdminAuthService';

const AdminLoginScreen = ({ navigation }) => {
  const { isDarkMode } = useTheme();
  const colors = getThemeColors(isDarkMode);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setLoading(true);
    
    try {
      const result = await AdminAuthService.loginAsAdmin(email.trim(), password);
      
      if (result.success && result.isAdmin) {
        // Navigate to admin dashboard
        navigation.replace('AdminDashboard');
      } else {
        const errorMessage = result.error?.message || 'Invalid credentials or insufficient privileges';
        Alert.alert('Access Denied', errorMessage);
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 30,
    },
    logoContainer: {
      alignItems: 'center',
      marginBottom: 50,
    },
    logo: {
      fontSize: 64,
      marginBottom: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.text,
      textAlign: 'center',
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 16,
      color: colors.secondaryText,
      textAlign: 'center',
      marginBottom: 40,
    },
    inputContainer: {
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 8,
    },
    input: {
      backgroundColor: colors.cardBackground,
      borderRadius: 10,
      padding: 15,
      fontSize: 16,
      color: colors.text,
      borderWidth: 1,
      borderColor: colors.border || '#E0E0E0',
    },
    loginButton: {
      backgroundColor: colors.primary,
      padding: 18,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 30,
    },
    loginButtonText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: 'bold',
    },
    disabledButton: {
      opacity: 0.6,
    },
    backButton: {
      alignItems: 'center',
      paddingVertical: 15,
    },
    backButtonText: {
      color: colors.primary,
      fontSize: 16,
      fontWeight: '500',
    },
    adminNote: {
      backgroundColor: colors.cardBackground,
      padding: 15,
      borderRadius: 10,
      marginBottom: 30,
      borderLeftWidth: 4,
      borderLeftColor: colors.primary,
    },
    adminNoteText: {
      fontSize: 14,
      color: colors.text,
      lineHeight: 20,
    },
    adminNoteTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.primary,
      marginBottom: 5,
    }
  });

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>🔐</Text>
          <Text style={styles.title}>Admin Access</Text>
          <Text style={styles.subtitle}>Cebu Tourist App Management</Text>
        </View>

        <View style={styles.adminNote}>
          <Text style={styles.adminNoteTitle}>Admin Login Required</Text>
          <Text style={styles.adminNoteText}>
            Only authorized administrators can access the content management system. 
            Please use your admin credentials to continue.
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Admin Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="admin@touristapp.com"
            placeholderTextColor={colors.secondaryText}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            placeholderTextColor={colors.secondaryText}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <TouchableOpacity
          style={[styles.loginButton, loading && styles.disabledButton]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.loginButtonText}>Access Admin Panel</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back to App</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AdminLoginScreen; 