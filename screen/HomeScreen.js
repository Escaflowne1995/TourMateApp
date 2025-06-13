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
import { LinearGradient } from 'expo-linear-gradient';

const featuredAttractions = [
  {
    id: '1',
    name: 'Basilica del Santo Niño',
    location: 'Cebu City',
    image: require('../assets/images/basilica.jpg'),
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Magellan\'s Cross',
    location: 'Cebu City',
    image: require('../assets/images/magellan-cross.jpg'),
    rating: 4.7,
  },
  {
    id: '3',
    name: 'Temple of Leah',
    location: 'Cebu City',
    image: require('../assets/images/temple-of-leah.jpg'),
    rating: 4.6,
  },
];

const popularDestinations = [
  {
    id: '4',
    name: 'Kawasan Falls',
    location: 'Badian',
    image: require('../assets/images/kawasan-falls.jpg'),
  },
  {
    id: '5',
    name: 'Moalboal',
    location: 'Cebu',
    image: require('../assets/images/moalboal.jpg'),
  },
  {
    id: '6',
    name: 'Oslob',
    location: 'Cebu',
    image: require('../assets/images/oslob.jpg'),
  },
];


// imageMap.js
export const imageMap = {
  siomai: require('../assets/images/siomai.jpg'),
  ngohiong: require('../assets/images/ngohiong.jpg'),
  puso: require('../assets/images/puso.jpg'),
};


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

const HomeScreen = ({ navigation }) => {
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
    <LinearGradient
      colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.8)']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Discover Cebu</Text>
          <Text style={styles.subText}>Experience the Queen City of the South</Text>
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
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  subText: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#fff',
  },
  attractionCard: {
    width: 280,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    marginRight: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  attractionImage: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  attractionInfo: {
    padding: 15,
  },
  attractionName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  attractionLocation: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 5,
  },
  ratingPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  rating: {
    color: '#ffd700',
    fontSize: 14,
  },
  destinationCard: {
    width: 160,
    marginRight: 15,
  },
  destinationImage: {
    width: '100%',
    height: 200,
    borderRadius: 15,
  },
  destinationName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#fff',
  },
  destinationLocation: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 5,
  },
  delicacyCard: {
    width: 250,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    marginRight: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  delicacyImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  delicacyInfo: {
    padding: 15,
  },
  delicacyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  delicacyLocation: {
    fontSize: 14,
    color: '#ffd700',
    marginTop: 5,
  },
  delicacyDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 5,
  },
  delicacyPrice: {
    fontSize: 14,
    color: '#ffd700',
    marginTop: 8,
    fontWeight: 'bold',
  },
});

export default HomeScreen; 