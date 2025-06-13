import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const allAttractions = [
  {
    id: '1',
    name: 'Basilica del Santo Niño',
    location: 'Cebu City',
    image: require('../assets/images/basilica.jpg'),
    rating: 4.8,
    category: 'Historical',
  },
  {
    id: '2',
    name: 'Magellan\'s Cross',
    location: 'Cebu City',
    image: require('../assets/images/magellan-cross.jpg'),
    rating: 4.7,
    category: 'Historical',
  },
  {
    id: '3',
    name: 'Temple of Leah',
    location: 'Cebu City',
    image: require('../assets/images/temple-of-leah.jpg'),
    rating: 4.6,
    category: 'Cultural',
  },
  {
    id: '4',
    name: 'Kawasan Falls',
    location: 'Badian, Cebu',
    image: require('../assets/images/kawasan-falls.jpg'),
    rating: 4.9,
    category: 'Nature',
  },
  {
    id: '5',
    name: 'Moalboal',
    location: 'Moalboal, Cebu',
    image: require('../assets/images/moalboal.jpg'),
    rating: 4.8,
    category: 'Beach',
  },
  {
    id: '6',
    name: 'Oslob Whale Sharks',
    location: 'Oslob, Cebu',
    image: require('../assets/images/oslob.jpg'),
    rating: 4.7,
    category: 'Adventure',
  },
  {
    id: '7',
    name: 'Fort San Pedro',
    location: 'Cebu City',
    image: require('../assets/images/fort-san-pedro.jpg'),
    rating: 4.5,
    category: 'Historical',
  },
  {
    id: '8',
    name: 'Bantayan Island',
    location: 'Bantayan, Cebu',
    image: require('../assets/images/bantayan.jpg'),
    rating: 4.8,
    category: 'Beach',
  },
  {
    id: '9',
    name: 'Sirao Flower Garden',
    location: 'Cebu City',
    image: require('../assets/images/sirao-garden.jpg'),
    rating: 4.4,
    category: 'Nature',
  },
  {
    id: '10',
    name: 'Tops Lookout',
    location: 'Cebu City',
    image: require('../assets/images/tops-lookout.jpg'),
    rating: 4.6,
    category: 'Viewpoint',
  },
];

const categories = ['All', 'Historical', 'Cultural', 'Nature', 'Beach', 'Adventure', 'Viewpoint'];

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredAttractions = allAttractions.filter((attraction) => {
    const matchesSearch =
      attraction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attraction.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || attraction.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item && styles.selectedCategory,
      ]}
      onPress={() => setSelectedCategory(item)}
    >
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item && styles.selectedCategoryText,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderAttractionItem = ({ item }) => (
    <TouchableOpacity
      style={styles.attractionCard}
      onPress={() => navigation.navigate('AttractionDetails', { attraction: item })}
    >
      <Image source={item.image} style={styles.attractionImage} />
      <View style={styles.attractionInfo}>
        <Text style={styles.attractionName}>{item.name}</Text>
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={16} color="rgba(255, 255, 255, 0.7)" />
          <Text style={styles.attractionLocation}>{item.location}</Text>
        </View>
        <View style={styles.ratingPrice}>
          <Text style={styles.rating}>⭐ {item.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={['#A855F7', '#9333EA']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="rgba(255, 255, 255, 0.7)" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search destinations..."
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <FlatList
        data={filteredAttractions}
        renderItem={renderAttractionItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.attractionsList}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 15,
    padding: 15,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#fff',
  },
  categoriesContainer: {
    marginBottom: 15,
  },
  categoryItem: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  selectedCategory: {
    backgroundColor: '#A855F7',
  },
  categoryText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  attractionsList: {
    padding: 15,
  },
  attractionCard: {
    flexDirection: 'row',
    borderRadius: 15,
    marginBottom: 15,
    backgroundColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  attractionImage: {
    width: 120,
    height: 120,
  },
  attractionInfo: {
    flex: 1,
    padding: 15,
  },
  attractionName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  attractionLocation: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginLeft: 5,
  },
  ratingPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  rating: {
    color: '#A855F7',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default SearchScreen; 