// HomeScreen.js - Premium tourism experience with enhanced UI
import React from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColors } from '../../utils/theme';
import HorizontalCarousel from '../../components/home/HorizontalCarousel';
import useHomeData from '../../hooks/useHomeData';

const HomeScreen = ({ navigation, route, userData: userDataProp }) => {
  const { isDarkMode } = useTheme();
  const colors = getThemeColors(isDarkMode);
  const styles = getStyles(colors, isDarkMode);
  
  // Dependency Injection - All data logic separated into custom hook
  const {
    featuredAttractions,
    popularDestinations,
    localDelicacies,
    isLoading,
    navigateToAttraction,
    navigateToDelicacy
  } = useHomeData();

  // Handle navigation with proper data passing
  const handleAttractionPress = (attraction) => {
    navigateToAttraction(navigation, attraction);
  };

  const handleDelicacyPress = (delicacy) => {
    navigateToDelicacy(navigation, delicacy);
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Discovering paradise...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Premium Welcome Header with Gradient */}
        <LinearGradient
          colors={[colors.primary, colors.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.welcomeGradient}
        >
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeTitle}>
              🏝️ Discover Cebu
            </Text>
            <Text style={styles.welcomeSubtitle}>
              Your gateway to paradise
            </Text>
            <Text style={styles.welcomeDescription}>
              Explore pristine beaches, rich culture, and unforgettable experiences in the Queen City of the South
            </Text>
          </View>
        </LinearGradient>

        {/* Content Sections with Enhanced Spacing */}
        <View style={styles.contentContainer}>
          {/* Featured Attractions Section */}
          <HorizontalCarousel
            title="✨ Featured Attractions"
            data={featuredAttractions}
            onItemPress={handleAttractionPress}
            colors={colors}
            showRating={true}
          />

          {/* Popular Destinations Section */}
          <HorizontalCarousel
            title="🔥 Popular Destinations"
            data={popularDestinations}
            onItemPress={handleAttractionPress}
            colors={colors}
          />

          {/* Local Delicacies Section */}
          <HorizontalCarousel
            title="🍽️ Local Delicacies"
            data={localDelicacies}
            onItemPress={handleDelicacyPress}
            colors={colors}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const getStyles = (colors, isDarkMode) => StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  welcomeGradient: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  welcomeContainer: {
    alignItems: 'center',
    textAlign: 'center',
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  welcomeSubtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
    opacity: 0.95,
  },
  welcomeDescription: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
    textAlign: 'center',
    opacity: 0.9,
    maxWidth: 300,
    fontWeight: '400',
  },
  contentContainer: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 18,
    color: colors.textSecondary,
    fontWeight: '500',
  },
});

export default HomeScreen; 