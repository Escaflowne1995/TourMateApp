import AsyncStorage from '@react-native-async-storage/async-storage';

const REVIEWS_STORAGE_KEY = '@tourist_app_reviews';

class ReviewsService {
  constructor() {
    this.reviews = [];
    this.loadReviews();
  }

  // Load reviews from AsyncStorage
  async loadReviews() {
    try {
      const reviewsString = await AsyncStorage.getItem(REVIEWS_STORAGE_KEY);
      if (reviewsString) {
        this.reviews = JSON.parse(reviewsString);
      }
    } catch (error) {
      console.error('Error loading reviews:', error);
      this.reviews = [];
    }
  }

  // Save reviews to AsyncStorage
  async saveReviews() {
    try {
      await AsyncStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(this.reviews));
    } catch (error) {
      console.error('Error saving reviews:', error);
    }
  }

  // Get all reviews
  async getReviews() {
    await this.loadReviews();
    return this.reviews;
  }

  // Get reviews for a specific attraction
  async getReviewsForAttraction(attractionId) {
    await this.loadReviews();
    return this.reviews.filter(review => review.attractionId === attractionId);
  }

  // Add a new review
  async addReview(attraction, rating, reviewText) {
    await this.loadReviews();
    
    const newReview = {
      id: Date.now().toString(), // Simple ID generation
      attractionId: attraction.id,
      spotName: attraction.name,
      location: attraction.location,
      image: attraction.image,
      rating: rating,
      review: reviewText || '',
      date: new Date().toISOString(),
      likes: 0,
      helpful: 0,
    };

    // Remove existing review for the same attraction (user can only have one review per place)
    this.reviews = this.reviews.filter(review => review.attractionId !== attraction.id);
    
    // Add new review
    this.reviews.unshift(newReview); // Add to beginning of array
    await this.saveReviews();
    return newReview;
  }

  // Update an existing review
  async updateReview(reviewId, rating, reviewText) {
    await this.loadReviews();
    
    const reviewIndex = this.reviews.findIndex(review => review.id === reviewId);
    if (reviewIndex !== -1) {
      this.reviews[reviewIndex] = {
        ...this.reviews[reviewIndex],
        rating: rating,
        review: reviewText || '',
        date: new Date().toISOString(), // Update the date
      };
      await this.saveReviews();
      return this.reviews[reviewIndex];
    }
    return null;
  }

  // Delete a review
  async deleteReview(reviewId) {
    await this.loadReviews();
    const initialLength = this.reviews.length;
    this.reviews = this.reviews.filter(review => review.id !== reviewId);
    
    if (this.reviews.length < initialLength) {
      await this.saveReviews();
      return true;
    }
    return false; // Not found
  }

  // Get user's review for a specific attraction
  async getUserReviewForAttraction(attractionId) {
    await this.loadReviews();
    return this.reviews.find(review => review.attractionId === attractionId);
  }

  // Get reviews count
  async getReviewsCount() {
    await this.loadReviews();
    return this.reviews.length;
  }

  // Get average rating for an attraction
  async getAverageRating(attractionId) {
    const attractionReviews = await this.getReviewsForAttraction(attractionId);
    if (attractionReviews.length === 0) return 0;
    
    const totalRating = attractionReviews.reduce((sum, review) => sum + review.rating, 0);
    return (totalRating / attractionReviews.length).toFixed(1);
  }

  // Clear all reviews (for testing or reset)
  async clearReviews() {
    this.reviews = [];
    await this.saveReviews();
  }

  // Like a review (increment likes)
  async likeReview(reviewId) {
    await this.loadReviews();
    const reviewIndex = this.reviews.findIndex(review => review.id === reviewId);
    if (reviewIndex !== -1) {
      this.reviews[reviewIndex].likes += 1;
      await this.saveReviews();
      return this.reviews[reviewIndex];
    }
    return null;
  }

  // Mark review as helpful (increment helpful count)
  async markReviewHelpful(reviewId) {
    await this.loadReviews();
    const reviewIndex = this.reviews.findIndex(review => review.id === reviewId);
    if (reviewIndex !== -1) {
      this.reviews[reviewIndex].helpful += 1;
      await this.saveReviews();
      return this.reviews[reviewIndex];
    }
    return null;
  }
}

export default new ReviewsService(); 