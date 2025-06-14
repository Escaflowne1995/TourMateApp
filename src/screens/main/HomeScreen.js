import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColors } from '../../utils/theme';

const featuredAttractions = [
  {
    id: '1',
    name: 'Basilica del Santo Niño',
    location: 'Cebu City',
    image: require('../../../assets/images/basilica.jpg'),
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Magellan\'s Cross',
    location: 'Cebu City',
    image: require('../../../assets/images/magellan-cross.jpg'),
    rating: 4.7,
  },
  {
    id: '3',
    name: 'Temple of Leah',
    location: 'Cebu City',
    image: require('../../../assets/images/temple-of-leah.jpg'),
    rating: 4.6,
  },
];

const popularDestinations = [
  {
    id: '4',
    name: 'Kawasan Falls',
    location: 'Badian',
    image: require('../../../assets/images/kawasan-falls.jpg'),
  },
  {
    id: '5',
    name: 'Moalboal',
    location: 'Cebu',
    image: require('../../../assets/images/moalboal.jpg'),
  },
  {
    id: '6',
    name: 'Oslob',
    location: 'Cebu',
    image: require('../../../assets/images/oslob.jpg'),
  },
];


import { imageMap } from '../../utils/imageMap';


const localDelicacies = [
  // Cebu City
  {
    id: 'd1',
    name: 'Siomai sa Tisa',
    description: 'Famous steamed dumplings from Tisa, Cebu City',
    location: 'Tisa, Cebu City',
    image: imageMap.siomai,
    price: '₱7/piece',
  },
  {
    id: 'd2',
    name: 'Ngohiong',
    description: 'Five-spice roll popular in Cebu City',
    location: 'Colon Street area, Cebu City',
    image: imageMap.ngohiong,
    price: '₱15/piece',
  },
  {
    id: 'd3',
    name: 'Puso',
    description: 'Hanging rice wrapped in coconut leaves',
    location: 'Carbon Market, Cebu City',
    image: imageMap.puso,
    price: '₱10-15/piece',
  },
];

const HomeScreen = ({ navigation, route, userData: userDataProp }) => {
  const { isDarkMode } = useTheme();
  const colors = getThemeColors(isDarkMode);
  const styles = getStyles(colors, isDarkMode);
  
  const userData = userDataProp || route.params?.userData || {};
  const renderAttractionItem = ({ item }) => (
    <TouchableOpacity
      style={styles.attractionCard}
      onPress={() => navigation.navigate('AttractionDetails', { attraction: item })}
    >
      <Image source={item.image} style={styles.attractionImage} />
      <View style={styles.attractionInfo}>
        <Text style={styles.attractionName}>{item.name}</Text>
        <Text style={styles.attractionLocation}>{item.location}</Text>
        <View style={styles.ratingPrice}>
          <Text style={styles.rating}>⭐ {item.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderDestinationItem = ({ item }) => (
    <TouchableOpacity
      style={styles.destinationCard}
      onPress={() => navigation.navigate('AttractionDetails', { attraction: item })}
    >
      <Image source={item.image} style={styles.destinationImage} />
      <Text style={styles.destinationName}>{item.name}</Text>
      <Text style={styles.destinationLocation}>{item.location}</Text>
    </TouchableOpacity>
  );

  const renderDelicacyItem = ({ item }) => (
    <TouchableOpacity
      style={styles.delicacyCard}
      onPress={() => navigation.navigate('AttractionDetails', { attraction: item })}
    >
      <Image source={item.image} style={styles.delicacyImage} />
      <View style={styles.delicacyInfo}>
        <Text style={styles.delicacyName}>{item.name}</Text>
        <Text style={styles.delicacyLocation}>{item.location}</Text>
        <Text style={styles.delicacyDescription}>{item.description}</Text>
        <Text style={styles.delicacyPrice}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome, {userData.fullName?.split(' ')[0] || 'Guest'}!</Text>
          <Text style={styles.subText}>Discover Cebu</Text>
          <Text style={styles.subTextSmall}>Experience the Queen City of the South</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Attractions</Text>
          <FlatList
            data={featuredAttractions}
            renderItem={renderAttractionItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Destinations</Text>
          <FlatList
            data={popularDestinations}
            renderItem={renderDestinationItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Local Delicacies</Text>
          <FlatList
            data={localDelicacies}
            renderItem={renderDelicacyItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
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
  header: {
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
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 5,
  },
  subText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 5,
  },
  subTextSmall: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 5,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: colors.text,
  },
  attractionCard: {
    width: 280,
    borderRadius: 15,
    marginRight: 15,
    backgroundColor: colors.cardBackground,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  attractionImage: {
    width: '100%',
    height: 180,
  },
  attractionInfo: {
    padding: 15,
  },
  attractionName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  attractionLocation: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 5,
  },
  ratingPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  rating: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  destinationCard: {
    width: 160,
    marginRight: 15,
    backgroundColor: colors.cardBackground,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  destinationImage: {
    width: '100%',
    height: 200,
  },
  destinationName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: colors.text,
    paddingHorizontal: 10,
  },
  destinationLocation: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 5,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  delicacyCard: {
    width: 250,
    borderRadius: 15,
    marginRight: 15,
    backgroundColor: colors.cardBackground,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  delicacyImage: {
    width: '100%',
    height: 150,
  },
  delicacyInfo: {
    padding: 15,
  },
  delicacyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  delicacyLocation: {
    fontSize: 14,
    color: colors.primary,
    marginTop: 5,
  },
  delicacyDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 5,
  },
  delicacyPrice: {
    fontSize: 14,
    color: colors.primary,
    marginTop: 8,
    fontWeight: 'bold',
  },
});

export default HomeScreen; 