import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_STORAGE_KEY = '@tourist_app_favorites';

class FavoritesService {
  constructor() {
    this.favorites = [];
    this.loadFavorites();
  }

  // Load favorites from AsyncStorage
  async loadFavorites() {
    try {
      const favoritesString = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
      if (favoritesString) {
        this.favorites = JSON.parse(favoritesString);
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
      this.favorites = [];
    }
  }

  // Save favorites to AsyncStorage
  async saveFavorites() {
    try {
      await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(this.favorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  }

  // Get all favorites
  async getFavorites() {
    await this.loadFavorites();
    return this.favorites;
  }

  // Check if attraction is favorite
  async isFavorite(attractionId) {
    await this.loadFavorites();
    return this.favorites.some(fav => fav.id === attractionId);
  }

  // Add to favorites
  async addToFavorites(attraction) {
    await this.loadFavorites();
    
    // Check if already exists
    if (this.favorites.some(fav => fav.id === attraction.id)) {
      return false; // Already exists
    }

    const favoriteItem = {
      ...attraction,
      dateAdded: new Date().toISOString(),
    };

    this.favorites.push(favoriteItem);
    await this.saveFavorites();
    return true;
  }

  // Remove from favorites
  async removeFromFavorites(attractionId) {
    await this.loadFavorites();
    const initialLength = this.favorites.length;
    this.favorites = this.favorites.filter(fav => fav.id !== attractionId);
    
    if (this.favorites.length < initialLength) {
      await this.saveFavorites();
      return true;
    }
    return false; // Not found
  }

  // Get favorites count
  async getFavoritesCount() {
    await this.loadFavorites();
    return this.favorites.length;
  }

  // Clear all favorites (for testing or reset)
  async clearFavorites() {
    this.favorites = [];
    await this.saveFavorites();
  }
}

export default new FavoritesService(); 