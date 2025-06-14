import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import RatingModal from '../../components/modals/RatingModal';
import favoritesService from '../../services/api/favoritesService';
import reviewsService from '../../services/api/reviewsService';

const { height } = Dimensions.get('window');

const AttractionDetails = ({ route, navigation }) => {
  const { attraction } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [userRating, setUserRating] = useState(null);
  const [userReview, setUserReview] = useState(null);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [averageRating, setAverageRating] = useState(attraction.rating || 0);

  useEffect(() => {
    loadAttractionData();
  }, [attraction.id]);

  const loadAttractionData = async () => {
    try {
      // Check if attraction is favorite
      const favorite = await favoritesService.isFavorite(attraction.id);
      setIsFavorite(favorite);

      // Load user's review for this attraction
      const review = await reviewsService.getUserReviewForAttraction(attraction.id);
      if (review) {
        setUserRating(review.rating);
        setUserReview(review);
      }

      // Load reviews count and average rating
      const attractionReviews = await reviewsService.getReviewsForAttraction(attraction.id);
      setReviewsCount(attractionReviews.length);
      
      const avgRating = await reviewsService.getAverageRating(attraction.id);
      if (avgRating > 0) {
        setAverageRating(parseFloat(avgRating));
      }
    } catch (error) {
      console.error('Error loading attraction data:', error);
    }
  };

  const getAttractionDescription = (name) => {
    const descriptions = {
      'Basilica del Santo Niño': 'The Basilica del Santo Niño is a 16th-century minor basilica in Cebu City, Philippines. It is the oldest Roman Catholic church in the country, built on the spot where the image of the Santo Niño de Cebu was found during the expedition of Miguel López de Legazpi.',
      'Magellan\'s Cross': 'Magellan\'s Cross is a Christian cross planted by Portuguese and Spanish explorers as ordered by Ferdinand Magellan upon arriving in Cebu in 1521. The cross is housed in a chapel next to the Basilica del Santo Niño.',
      'Temple of Leah': 'Often called the "Taj Mahal of Cebu," the Temple of Leah is a Roman-inspired temple built as a symbol of undying love. It features a grand staircase, statues, and a stunning view of the city.',
      'Kawasan Falls': 'Located in Badian, Kawasan Falls is a three-layered waterfall known for its turquoise water. It\'s a popular spot for canyoneering and swimming.',
      'Moalboal': 'Famous for its sardine run and vibrant marine life, Moalboal is a must-visit for diving and snorkeling enthusiasts. You can also spot sea turtles and colorful coral reefs.',
      'Oslob': 'Known for whale shark watching, Oslob offers a unique opportunity to see these gentle giants up close. The area also features beautiful beaches and historical sites.',
    };
    return descriptions[name] || 'Description not available.';
  };

  const handleFavoriteToggle = async () => {
    try {
      if (isFavorite) {
        // Remove from favorites
        const success = await favoritesService.removeFromFavorites(attraction.id);
        if (success) {
          setIsFavorite(false);
          Alert.alert('Removed', 'Removed from your favorites');
        }
      } else {
        // Add to favorites
        const success = await favoritesService.addToFavorites(attraction);
        if (success) {
          setIsFavorite(true);
          Alert.alert('Added', 'Added to your favorites!');
        }
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      Alert.alert('Error', 'Failed to update favorites');
    }
  };

  const handleRatingSubmit = async ({ rating, review }) => {
    try {
      const newReview = await reviewsService.addReview(attraction, rating, review);
      setUserRating(rating);
      setUserReview(newReview);
      
      // Reload reviews data
      await loadAttractionData();
      
      Alert.alert(
        'Thank You!',
        'Your rating has been submitted successfully.',
        [{ text: 'OK' }]
      );
    } catch (error) {
      console.error('Error submitting rating:', error);
      Alert.alert('Error', 'Failed to submit rating');
    }
  };

  return (
    <>
      <LinearGradient
        colors={['#A855F7', '#9333EA']}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <ScrollView style={styles.scrollView}>
          <View style={styles.imageContainer}>
            <Image source={attraction.image} style={styles.image} />
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={handleFavoriteToggle}
            >
              <Ionicons
                name={isFavorite ? 'heart' : 'heart-outline'}
                size={24}
                color={isFavorite ? '#A855F7' : '#fff'}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.detailsContainer}>
            <Text style={styles.name}>{attraction.name}</Text>
            <View style={styles.locationContainer}>
              <Ionicons name="location-outline" size={20} color="rgba(255,255,255,0.8)" />
              <Text style={styles.location}>{attraction.location}</Text>
            </View>

            <View style={styles.ratingContainer}>
              <View style={styles.ratingInfo}>
                <Ionicons name="star" size={20} color="#A855F7" />
                <Text style={styles.rating}>{averageRating}</Text>
                <Text style={styles.reviews}>({reviewsCount} reviews)</Text>
              </View>
              <TouchableOpacity
                style={styles.rateButton}
                onPress={() => setShowRatingModal(true)}
              >
                <Text style={styles.rateButtonText}>
                  {userReview ? 'Update Rating' : 'Rate this place'}
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.description}>
              {getAttractionDescription(attraction.name)}
            </Text>

            <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>Highlights</Text>
              <View style={styles.highlightsList}>
                <View style={styles.highlightItem}>
                  <Ionicons name="camera-outline" size={24} color="rgba(255,255,255,0.8)" />
                  <Text style={styles.highlightText}>Perfect for photography</Text>
                </View>
                <View style={styles.highlightItem}>
                  <Ionicons name="time-outline" size={24} color="rgba(255,255,255,0.8)" />
                  <Text style={styles.highlightText}>Best time: Early morning</Text>
                </View>
                <View style={styles.highlightItem}>
                  <Ionicons name="people-outline" size={24} color="rgba(255,255,255,0.8)" />
                  <Text style={styles.highlightText}>Family-friendly</Text>
                </View>
              </View>
            </View>

            {userRating && (
              <View style={styles.userRatingContainer}>
                <Text style={styles.userRatingTitle}>Your Rating</Text>
                <View style={styles.userRatingStars}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Ionicons
                      key={star}
                      name="star"
                      size={20}
                      color={star <= userRating ? '#A855F7' : 'rgba(255,255,255,0.3)'}
                    />
                  ))}
                </View>
              </View>
            )}

            <View style={styles.promotionalMessage}>
              <Text style={styles.promotionalText}>
                Visit this amazing destination and create unforgettable memories in Cebu!
              </Text>
              <Text style={styles.promotionalSubtext}>
                Contact local tourism offices for visiting information.
              </Text>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>

      <RatingModal
        visible={showRatingModal}
        onClose={() => setShowRatingModal(false)}
        onSubmit={handleRatingSubmit}
        attractionName={attraction.name}
        existingReview={userReview}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 300,
  },
  favoriteButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 20,
  },
  detailsContainer: {
    padding: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  location: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginLeft: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  ratingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 16,
    color: '#A855F7',
    marginLeft: 5,
    marginRight: 10,
    fontWeight: '600',
  },
  reviews: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  rateButton: {
    backgroundColor: '#A855F7',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  rateButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 24,
    marginTop: 20,
  },
  infoSection: {
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  highlightsList: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
    padding: 15,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  highlightText: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginLeft: 10,
  },
  userRatingContainer: {
    marginTop: 30,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
  },
  userRatingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  userRatingStars: {
    flexDirection: 'row',
    gap: 5,
  },
  promotionalMessage: {
    marginTop: 30,
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
    alignItems: 'center',
  },
  promotionalText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  promotionalSubtext: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default AttractionDetails; 