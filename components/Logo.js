import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Logo = ({ size = 'normal' }) => {
  const iconSize = size === 'large' ? 50 : 40;
  const mapIconSize = size === 'large' ? 40 : 30;
  const titleSize = size === 'large' ? 36 : 28;
  const subtitleSize = size === 'large' ? 18 : 16;

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="airplane" size={iconSize} color="#FF6B6B" />
        <Ionicons name="map" size={mapIconSize} color="#fff" style={styles.mapIcon} />
      </View>
      <Text style={[styles.title, { fontSize: titleSize }]}>CebuXplore</Text>
      <Text style={[styles.subtitle, { fontSize: subtitleSize }]}>Discover Paradise</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
    color: '#fff',
    letterSpacing: 1,
  },
  subtitle: {
    color: '#FF6B6B',
    letterSpacing: 2,
    marginTop: 5,
  },
});

export default Logo; 