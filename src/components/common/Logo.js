import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColors } from '../../utils/theme';

const Logo = ({ size = 'normal' }) => {
  const { isDarkMode } = useTheme();
  const colors = getThemeColors(isDarkMode);
  
  const iconSize = size === 'large' ? 50 : 40;
  const mapIconSize = size === 'large' ? 40 : 30;
  const titleSize = size === 'large' ? 36 : 28;
  const subtitleSize = size === 'large' ? 18 : 16;

  const styles = getStyles(colors);

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="airplane" size={iconSize} color={colors.primary} />
        <Ionicons name="map" size={mapIconSize} color={colors.text} style={styles.mapIcon} />
      </View>
      <Text style={[styles.title, { fontSize: titleSize }]}>CebuXplore</Text>
      <Text style={[styles.subtitle, { fontSize: subtitleSize }]}>Discover Paradise</Text>
    </View>
  );
};

const getStyles = (colors) => StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  mapIcon: {
    position: 'absolute',
    bottom: -5,
    right: -15,
  },
  title: {
    fontWeight: 'bold',
    color: colors.text,
    letterSpacing: 1,
  },
  subtitle: {
    color: colors.primary,
    letterSpacing: 2,
    marginTop: 5,
  },
});

export default Logo; 