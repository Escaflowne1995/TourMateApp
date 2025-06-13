import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const mockFavorites = [
  {
    id: '1',
    name: 'Basilica del Santo Niño',
    location: 'Cebu City',
    image: require('../assets/images/basilica.jpg'),
    rating: 4.8,
    category: 'Historical',
    dateAdded: '2024-01-15',
  },
  {
    id: '2',
    name: 'Temple of Leah',
    location: 'Cebu City',
    image: require('../assets/images/temple-of-leah.jpg'),
    rating: 4.6,
    category: 'Cultural',
    dateAdded: '2024-01-10',
  },
  {
    id: '3',
    name: 'Kawasan Falls',
    location: 'Badian, Cebu',
    image: require('../assets/images/kawasan-falls.jpg'),
    rating: 4.9,
    category: 'Nature',
    dateAdded: '2024-01-05',
  },
];

const FavoriteSpotsScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState(mockFavorites);

  const removeFavorite = (id) => {
    setFavorites(favorites.filter(item => item.id !== id));
  };

  const renderFavoriteItem = ({ item }) => (
    <TouchableOpacity
      style={styles.favoriteCard}
      onPress={() => navigation.navigate('AttractionDetails', { attraction: item })}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`${item.name} in ${item.location}, rated ${item.rating} stars`}
      accessibilityHint="Tap to view details about this favorite spot"
    >
      <Image 
        source={item.image} 
        style={styles.image}
        accessible={true}
        accessibilityRole="image"
        accessibilityLabel={`Photo of ${item.name}`}
      />
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <View style={styles.titleContainer}>
            <Text style={styles.spotName}>{item.name}</Text>
            <View style={styles.locationContainer}>
              <Ionicons 
                name="location-outline" 
                size={16} 
                color="rgba(255,255,255,0.8)"
                accessible={false}
              />
              <Text style={styles.location}>{item.location}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => removeFavorite(item.id)}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Remove from favorites"
            accessibilityHint={`Remove ${item.name} from your favorites`}
          >
            <Ionicons 
              name="heart" 
              size={24} 
              color="#A855F7"
              accessible={false}
            />
          </TouchableOpacity>
        </View>
        
        <View style={styles.cardFooter}>
          <View style={styles.ratingContainer}>
            <Ionicons 
              name="star" 
              size={16} 
              color="#A855F7"
              accessible={false}
            />
            <Text style={styles.rating}>{item.rating}</Text>
          </View>
          <Text style={styles.category}>{item.category}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Ionicons 
        name="heart-outline" 
        size={80} 
        color="#ccc"
        accessible={false}
      />
      <Text 
        style={styles.emptyTitle}
        accessible={true}
        accessibilityRole="text"
      >
        No Favorite Spots Yet
      </Text>
      <Text 
        style={styles.emptySubtitle}
        accessible={true}
        accessibilityRole="text"
      >
        Start exploring Cebu and add places to your favorites!
      </Text>
      <TouchableOpacity
        style={styles.exploreButton}
        onPress={() => navigation.navigate('Home')}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Start Exploring"
        accessibilityHint="Navigate to home screen to discover places"
      >
        <Text style={styles.exploreButtonText}>Start Exploring</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient
      colors={['#A855F7', '#9333EA']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <View 
        style={styles.content}
        accessible={true}
        accessibilityLabel="Favorite Cebu Spots Screen"
      >
      <View style={styles.header}>
        <Text 
          style={styles.headerTitle}
          accessible={true}
          accessibilityRole="text"
        >
          Your Favorite Spots
        </Text>
        <Text 
          style={styles.headerSubtitle}
          accessible={true}
          accessibilityRole="text"
          accessibilityLabel={`You have ${favorites.length} favorite spots`}
        >
          {favorites.length} {favorites.length === 1 ? 'spot' : 'spots'}
        </Text>
      </View>

      <FlatList
        data={favorites}
        renderItem={renderFavoriteItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={favorites.length === 0 ? styles.emptyList : styles.list}
        ListEmptyComponent={renderEmptyList}
        showsVerticalScrollIndicator={false}
        accessible={false}
        accessibilityLabel="List of favorite spots"
      />
    </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    padding: 20,
    marginHorizontal: 15,
    marginTop: 15,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 5,
  },
  list: {
    padding: 15,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  favoriteCard: {
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 15,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  titleContainer: {
    flex: 1,
    marginRight: 10,
  },
  spotName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginLeft: 4,
  },
  removeButton: {
    padding: 5,
    minHeight: 44,
    minWidth: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 16,
    color: '#A855F7',
    marginLeft: 4,
    fontWeight: '600',
  },
  category: {
    fontSize: 14,
    color: '#A855F7',
    fontWeight: '600',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  exploreButton: {
    backgroundColor: '#A855F7',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    minHeight: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exploreButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FavoriteSpotsScreen; 