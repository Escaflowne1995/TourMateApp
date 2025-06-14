import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const mockReviews = [
  {
    id: '1',
    spotName: 'Basilica del Santo Niño',
    location: 'Cebu City',
    image: require('../../../assets/images/basilica.jpg'),
    rating: 5,
    review: 'Amazing historical site! The architecture is breathtaking and the spiritual atmosphere is truly moving. A must-visit when in Cebu.',
    date: '2024-01-15',
    likes: 12,
    helpful: 8,
  },
  {
    id: '2',
    spotName: 'Temple of Leah',
    location: 'Cebu City',
    image: require('../../../assets/images/temple-of-leah.jpg'),
    rating: 4,
    review: 'Beautiful temple with stunning city views. The Roman-inspired architecture is impressive. Great for photos and romantic dates.',
    date: '2024-01-10',
    likes: 8,
    helpful: 5,
  },
  {
    id: '3',
    spotName: 'Kawasan Falls',
    location: 'Badian, Cebu',
    image: require('../../../assets/images/kawasan-falls.jpg'),
    rating: 5,
    review: 'Absolutely spectacular! The turquoise water is crystal clear and perfect for swimming. The canyoneering experience was thrilling!',
    date: '2024-01-05',
    likes: 25,
    helpful: 18,
  },
];

const MyReviewsScreen = ({ navigation }) => {
  const [reviews, setReviews] = useState(mockReviews);

  const deleteReview = (id, spotName) => {
    Alert.alert(
      'Delete Review',
      `Are you sure you want to delete your review for ${spotName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setReviews(reviews.filter(item => item.id !== id));
          }
        }
      ]
    );
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Ionicons
        key={index}
        name={index < rating ? 'star' : 'star-outline'}
        size={16}
        color="#ffd700"
        accessible={false}
      />
    ));
  };

  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewCard}>
      <TouchableOpacity
        style={styles.cardHeader}
        onPress={() => navigation.navigate('AttractionDetails', { attraction: item })}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={`${item.spotName} in ${item.location}`}
        accessibilityHint="Tap to view attraction details"
      >
        <Image 
          source={item.image} 
          style={styles.image}
          accessible={true}
          accessibilityRole="image"
          accessibilityLabel={`Photo of ${item.spotName}`}
        />
        <View style={styles.spotInfo}>
          <Text style={styles.spotName}>{item.spotName}</Text>
          <View style={styles.locationContainer}>
            <Ionicons 
              name="location-outline" 
              size={14} 
              color="#6c757d"
              accessible={false}
            />
            <Text style={styles.location}>{item.location}</Text>
          </View>
          <Text style={styles.reviewDate}>{new Date(item.date).toLocaleDateString()}</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.reviewContent}>
        <View style={styles.ratingContainer}>
          <View 
            style={styles.starsContainer}
            accessible={true}
            accessibilityRole="text"
            accessibilityLabel={`Your rating: ${item.rating} out of 5 stars`}
          >
            {renderStars(item.rating)}
          </View>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteReview(item.id, item.spotName)}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Delete review"
            accessibilityHint={`Delete your review for ${item.spotName}`}
          >
            <Ionicons 
              name="trash-outline" 
              size={20} 
              color="#dc3545"
              accessible={false}
            />
          </TouchableOpacity>
        </View>

        <Text 
          style={styles.reviewText}
          accessible={true}
          accessibilityRole="text"
          accessibilityLabel={`Your review: ${item.review}`}
        >
          {item.review}
        </Text>

        <View style={styles.reviewStats}>
          <View style={styles.statItem}>
            <Ionicons 
              name="heart-outline" 
              size={16} 
              color="#A855F7"
              accessible={false}
            />
            <Text 
              style={styles.statText}
              accessible={true}
              accessibilityRole="text"
              accessibilityLabel={`${item.likes} likes`}
            >
              {item.likes} likes
            </Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons 
              name="thumbs-up-outline" 
              size={16} 
              color="#28a745"
              accessible={false}
            />
            <Text 
              style={styles.statText}
              accessible={true}
              accessibilityRole="text"
              accessibilityLabel={`${item.helpful} people found this helpful`}
            >
              {item.helpful} helpful
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Ionicons 
        name="chatbubble-outline" 
        size={80} 
        color="#ccc"
        accessible={false}
      />
      <Text 
        style={styles.emptyTitle}
        accessible={true}
        accessibilityRole="text"
      >
        No Reviews Yet
      </Text>
      <Text 
        style={styles.emptySubtitle}
        accessible={true}
        accessibilityRole="text"
      >
        Share your experiences by writing reviews for places you've visited!
      </Text>
      <TouchableOpacity
        style={styles.exploreButton}
        onPress={() => navigation.navigate('Home')}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Start Exploring"
        accessibilityHint="Navigate to home screen to discover places to review"
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
        accessibilityLabel="My Reviews Screen"
      >
      <View style={styles.header}>
        <Text 
          style={styles.headerTitle}
          accessible={true}
          accessibilityRole="text"
        >
          My Reviews
        </Text>
        <Text 
          style={styles.headerSubtitle}
          accessible={true}
          accessibilityRole="text"
          accessibilityLabel={`You have written ${reviews.length} reviews`}
        >
          {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
        </Text>
      </View>

      <FlatList
        data={reviews}
        renderItem={renderReviewItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={reviews.length === 0 ? styles.emptyList : styles.list}
        ListEmptyComponent={renderEmptyList}
        showsVerticalScrollIndicator={false}
        accessible={false}
        accessibilityLabel="List of your reviews"
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
  reviewCard: {
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 15,
  },
  cardHeader: {
    marginBottom: 10,
  },
  spotInfo: {
    flex: 1,
    justifyContent: 'center',
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
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginLeft: 4,
  },
  reviewDate: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
  },
  reviewContent: {
    padding: 15,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  deleteButton: {
    padding: 8,
    minHeight: 44,
    minWidth: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 20,
    marginBottom: 15,
  },
  reviewStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 15,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  statText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginLeft: 4,
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

export default MyReviewsScreen; 