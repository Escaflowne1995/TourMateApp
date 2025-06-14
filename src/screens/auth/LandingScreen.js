import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Logo from '../../components/common/Logo';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColors } from '../../utils/theme';

const { width, height } = Dimensions.get('window');

const LandingScreen = ({ navigation }) => {
  const { isDarkMode } = useTheme();
  const colors = getThemeColors(isDarkMode);
  const styles = getStyles(colors, isDarkMode);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.content}>
        <View style={styles.header}>
          <Logo size="large" />
          <Text style={styles.subtitle}>
            Experience the Queen City of the South
          </Text>
        </View>

        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <Ionicons name="map-outline" size={32} color={colors.primary} />
            <Text style={styles.featureText}>Explore Historical Sites</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="water-outline" size={32} color={colors.primary} />
            <Text style={styles.featureText}>Beautiful Beaches</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="restaurant-outline" size={32} color={colors.primary} />
            <Text style={styles.featureText}>Local Cuisine</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Login')}
          >
            <View style={styles.buttonGradient}>
              <Text style={styles.buttonText}>Get Started</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Your gateway to Cebu's finest destinations
          </Text>
        </View>
      </View>
    </View>
  );
};

const getStyles = (colors, isDarkMode) => StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: StatusBar.currentHeight + 40,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: isDarkMode ? colors.cardBackground : 'transparent',
    borderRadius: isDarkMode ? 15 : 0,
    marginHorizontal: isDarkMode ? 15 : 0,
    padding: isDarkMode ? 20 : 20,
  },
  subtitle: {
    fontSize: 18,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 20,
  },
  featuresContainer: {
    paddingHorizontal: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  featureText: {
    color: colors.text,
    fontSize: 18,
    marginLeft: 15,
  },
  buttonContainer: {
    paddingHorizontal: 20,
  },
  button: {
    borderRadius: 25,
    overflow: 'hidden',
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: colors.primary,
  },
  buttonGradient: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  footerText: {
    color: colors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default LandingScreen; 