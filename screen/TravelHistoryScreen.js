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

const mockTravelHistory = [
  {
    id: '1',
    tripName: 'Cebu City Heritage Tour',
    date: '2024-01-15',
    duration: '1 Day',
    places: [
      { name: 'Basilica del Santo Niño', image: require('../assets/images/basilica.jpg') },
      { name: 'Magellan\'s Cross', image: require('../assets/images/magellan-cross.jpg') },
    ],
    totalPlaces: 5,
    status: 'Completed',
  },
  {
    id: '2',
    tripName: 'Beach and Nature Adventure',
    date: '2024-01-08', 
    duration: '3 Days',
    places: [
      { name: 'Kawasan Falls', image: require('../assets/images/kawasan-falls.jpg') },
      { name: 'Moalboal', image: require('../assets/images/moalboal.jpg') },
    ],
    totalPlaces: 4,
    status: 'Completed',
  },
  {
    id: '3',
    tripName: 'Temple and Cultural Sites',
    date: '2024-01-01',
    duration: '2 Days',
    places: [
      { name: 'Temple of Leah', image: require('../assets/images/temple-of-leah.jpg') },
    ],
    totalPlaces: 3,
    status: 'Completed',
  },
];

const TravelHistoryScreen = ({ navigation }) => {
  const [travelHistory, setTravelHistory] = useState(mockTravelHistory);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return '#28a745';
      case 'In Progress': return '#ffc107';
      case 'Cancelled': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const renderTravelItem = ({ item }) => (
    <TouchableOpacity
      style={styles.tripCard}
      onPress={() => {
        // Navigate to trip details (could be implemented later)
        console.log('View trip details:', item.tripName);
      }}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`${item.tripName}, ${item.duration} trip on ${new Date(item.date).toLocaleDateString()} with ${item.totalPlaces} places visited`}
      accessibilityHint="Tap to view trip details"
    >
      <View style={styles.tripHeader}>
        <View style={styles.tripInfo}>
          <Text style={styles.tripName}>{item.tripName}</Text>
          <View style={styles.tripMeta}>
            <View style={styles.metaItem}>
              <Ionicons 
                name="calendar-outline" 
                size={16} 
                color="rgba(255, 255, 255, 0.7)"
                accessible={false}
              />
              <Text style={styles.metaText}>{new Date(item.date).toLocaleDateString()}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons 
                name="time-outline" 
                size={16} 
                color="rgba(255, 255, 255, 0.7)"
                accessible={false}
              />
              <Text style={styles.metaText}>{item.duration}</Text>
            </View>
          </View>
        </View>
        <View 
          style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}
          accessible={true}
          accessibilityRole="text"
          accessibilityLabel={`Status: ${item.status}`}
        >
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.placesPreview}>
        <Text 
          style={styles.placesTitle}
          accessible={true}
          accessibilityRole="text"
        >
          Places Visited ({item.totalPlaces})
        </Text>
        <View style={styles.placesImages}>
          {item.places.slice(0, 3).map((place, index) => (
            <Image
              key={index}
              source={place.image}
              style={[
                styles.placeImage,
                { marginLeft: index > 0 ? -10 : 0 }
              ]}
              accessible={true}
              accessibilityRole="image"
              accessibilityLabel={`Photo of ${place.name}`}
            />
          ))}
          {item.totalPlaces > 3 && (
            <View 
              style={[styles.placeImage, styles.moreImages]}
              accessible={true}
              accessibilityRole="text"
              accessibilityLabel={`And ${item.totalPlaces - 3} more places`}
            >
              <Text style={styles.moreImagesText}>+{item.totalPlaces - 3}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Ionicons 
        name="map-outline" 
        size={80} 
        color="rgba(255, 255, 255, 0.3)"
        accessible={false}
      />
      <Text 
        style={styles.emptyTitle}
        accessible={true}
        accessibilityRole="text"
      >
        No Travel History
      </Text>
      <Text 
        style={styles.emptySubtitle}
        accessible={true}
        accessibilityRole="text"
      >
        Start exploring Cebu to build your travel history!
      </Text>
      <TouchableOpacity
        style={styles.exploreButton}
        onPress={() => navigation.navigate('Home')}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Start Exploring"
        accessibilityHint="Navigate to home screen to start your travel journey"
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
        accessibilityLabel="Travel History Screen"
      >
        <View style={styles.header}>
          <Text 
            style={styles.headerTitle}
            accessible={true}
            accessibilityRole="text"
          >
            Travel History
          </Text>
          <Text 
            style={styles.headerSubtitle}
            accessible={true}
            accessibilityRole="text"
            accessibilityLabel={`You have ${travelHistory.length} completed trips`}
          >
            {travelHistory.length} {travelHistory.length === 1 ? 'trip' : 'trips'}
          </Text>
        </View>

        <FlatList
          data={travelHistory}
          renderItem={renderTravelItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={travelHistory.length === 0 ? styles.emptyList : styles.list}
          ListEmptyComponent={renderEmptyList}
          showsVerticalScrollIndicator={false}
          accessible={false}
          accessibilityLabel="List of your travel history"
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
  tripCard: {
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
  tripInfo: {
    flex: 1,
  },
  placeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  location: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginLeft: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  visitDate: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    backgroundColor: '#A855F7',
  },
  statusText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
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
  duration: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
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
  startTravelButton: {
    backgroundColor: '#A855F7',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    minHeight: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startTravelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  tripName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  tripMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 5,
  },
  metaText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginLeft: 5,
  },
  placesPreview: {
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 215, 0, 0.2)',
  },
  placesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 10,
  },
  placesImages: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fff',
  },
  moreImages: {
    backgroundColor: '#A855F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreImagesText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
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

export default TravelHistoryScreen; 