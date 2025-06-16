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
        <Ionicons name="airplane" size={iconSize} color="#FFFFFF" />
        <Ionicons name="map" size={mapIconSize} color="#000000" style={styles.mapIcon} />
      </View>
      <View style={styles.titleContainer}>
        <Text style={[styles.title, { fontSize: titleSize, color: '#FFFFFF' }]}>Cebu</Text>
        <Text style={[styles.title, { fontSize: titleSize, color: '#000000' }]}>X</Text>
        <Text style={[styles.title, { fontSize: titleSize, color: '#FFFFFF' }]}>plore</Text>
      </View>
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
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  subtitle: {
    color: '#FFFFFF',
    letterSpacing: 2,
    marginTop: 5,
  },
});

export default Logo; 