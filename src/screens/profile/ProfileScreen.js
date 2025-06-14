import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebase/firebaseConfig';
import UserService from '../../services/user/UserService';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColors } from '../../utils/theme';
import favoritesService from '../../services/api/favoritesService';
import reviewsService from '../../services/api/reviewsService';

const ProfileScreen = ({ navigation, route, userData: userDataProp }) => {
  const { isDarkMode } = useTheme();
  const colors = getThemeColors(isDarkMode);
  const styles = getStyles(colors, isDarkMode);
  
  const [isLoading, setIsLoading] = useState(false);
  const [currentUserData, setCurrentUserData] = useState(userDataProp || route.params?.userData || {});
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);

  // Load favorites and reviews counts
  const loadCounts = async () => {
    try {
      console.log('ProfileScreen: Loading counts...');
      
      const [favCount, revCount] = await Promise.all([
        favoritesService.getFavoritesCount(),
        reviewsService.getReviewsCount()
      ]);
      
      console.log(`ProfileScreen: Loaded counts - Favorites: ${favCount}, Reviews: ${revCount}`);
      
      setFavoritesCount(favCount || 0);
      setReviewsCount(revCount || 0);
    } catch (error) {
      console.error('ProfileScreen: Error loading counts:', error);
      // Set defaults if there's an error
      setFavoritesCount(0);
      setReviewsCount(0);
    }
  };

  // Test function to add sample data - for testing purposes
  const addSampleData = async () => {
    try {
      // Add sample favorites
      const sampleAttractions = [
        {
          id: 'sample1',
          name: 'Temple of Leah',
          location: 'Busay, Cebu City',
          image: { uri: 'https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=300' },
          rating: 4.5,
          category: 'Historical'
        },
        {
          id: 'sample2', 
          name: 'Yap-Sandiego Ancestral House',
          location: 'Parian, Cebu City',
          image: { uri: 'https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=300' },
          rating: 4.2,
          category: 'Heritage'
        }
      ];

      // Add to favorites
      for (const attraction of sampleAttractions) {
        await favoritesService.addToFavorites(attraction);
      }

      // Add sample reviews
      await reviewsService.addReview(sampleAttractions[0], 5, 'Amazing temple with great views!');
      await reviewsService.addReview(sampleAttractions[1], 4, 'Beautiful historic house, well preserved.');

      // Reload counts
      await loadCounts();
      Alert.alert('Success', 'Sample data added! Check your favorites and reviews.');
    } catch (error) {
      console.error('Error adding sample data:', error);
      Alert.alert('Error', 'Failed to add sample data');
    }
  };

  // Test function to clear all data - for testing purposes
  const clearAllData = async () => {
    Alert.alert(
      'Clear All Data',
      'This will remove all favorites and reviews. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            try {
              await favoritesService.clearFavorites();
              await reviewsService.clearReviews();
              await loadCounts();
              Alert.alert('Success', 'All data cleared!');
            } catch (error) {
              console.error('Error clearing data:', error);
              Alert.alert('Error', 'Failed to clear data');
            }
          }
        }
      ]
    );
  };

  // Refresh user data when screen focuses or user changes
  useEffect(() => {
    const refreshUserData = async () => {
      if (auth.currentUser) {
        setIsRefreshing(true);
        try {
          const result = await UserService.getUserData(auth.currentUser);
          if (result.success) {
            setCurrentUserData(result.userData);
            console.log('ProfileScreen: User data refreshed for:', result.userData.email);
          }
        } catch (error) {
          console.error('ProfileScreen: Failed to refresh user data:', error);
        } finally {
          setIsRefreshing(false);
        }
      }
      // Load counts after user data
      await loadCounts();
    };

    // Refresh data when screen loads
    refreshUserData();

    // Set up navigation focus listener to refresh when returning to screen
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('ProfileScreen: Screen focused, refreshing data...');
      refreshUserData();
    });
    
    return unsubscribe;
  }, [navigation]);

  const userProfile = {
    name: currentUserData.fullName || currentUserData.displayName || currentUserData.name || 'Guest User',
    email: currentUserData.email || 'guest@example.com',
    avatar: currentUserData.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400',
    favoriteSpots: favoritesCount,
    reviews: reviewsCount,
    language: 'English',
    currency: 'PHP',
  };

  const menuItems = [
    {
      id: '1',
      title: 'Edit Profile',
      icon: 'person-outline',
      action: () => navigation.navigate('EditProfile', { userData: currentUserData }),
      accessibilityLabel: 'Edit Profile',
      accessibilityHint: 'Opens profile editing screen',
    },
    {
      id: '2',
      title: 'Favorite Cebu Spots',
      icon: 'heart-outline',
      action: () => navigation.navigate('FavoriteSpots'),
      accessibilityLabel: 'Favorite Cebu Spots',
      accessibilityHint: 'View your favorite tourist spots in Cebu',
    },
    {
      id: '3',
      title: 'My Reviews',
      icon: 'star-outline',
      action: () => navigation.navigate('MyReviews'),
      accessibilityLabel: 'My Reviews',
      accessibilityHint: 'View and manage your reviews',
    },
    {
      id: '4',
      title: 'Travel History',
      icon: 'map-outline',
      action: () => navigation.navigate('TravelHistory'),
      accessibilityLabel: 'Travel History',
      accessibilityHint: 'View your travel history and past trips',
    },
    {
      id: '6',
      title: 'Language',
      icon: 'language-outline',
      value: userProfile.language,
      action: () => navigation.navigate('Language'),
      accessibilityLabel: 'Language Settings',
      accessibilityHint: `Currently set to ${userProfile.language}. Tap to change language`,
    },
    {
      id: '8',
      title: 'Settings',
      icon: 'settings-outline',
      action: () => navigation.navigate('Settings'),
      accessibilityLabel: 'Settings',
      accessibilityHint: 'Open app settings and preferences',
    },
    {
      id: '9',
      title: 'Help & Support',
      icon: 'help-circle-outline',
      action: () => navigation.navigate('HelpSupport'),
      accessibilityLabel: 'Help & Support',
      accessibilityHint: 'Get help and contact support',
    },
    {
      id: '10',
      title: 'Add Sample Data (Testing)',
      icon: 'add-circle-outline',
      action: addSampleData,
      accessibilityLabel: 'Add Sample Data',
      accessibilityHint: 'Add sample favorites and reviews for testing',
    },
    {
      id: '11',
      title: 'Clear All Data (Testing)',
      icon: 'trash-outline',
      action: clearAllData,
      accessibilityLabel: 'Clear All Data',
      accessibilityHint: 'Clear all favorites and reviews data for testing',
    },
  ];

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: async () => {
            setIsLoading(true);
            try {
              // Firebase logout
              await signOut(auth);
              navigation.reset({
                index: 0,
                routes: [{ 
                  name: 'Auth',
                  params: {
                    screen: 'Landing'
                  }
                }],
              });
              setIsLoading(false);
            } catch (error) {
              console.error('Logout error:', error);
              Alert.alert('Error', 'Failed to logout. Please try again.');
              setIsLoading(false);
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        accessibilityLabel="Profile Screen"
      >
        <View 
          style={styles.header}
          accessible={true}
          accessibilityLabel="Profile Header"
        >
          <View style={styles.profileHeader}>
            <Image
              source={{ 
                uri: currentUserData.avatar && currentUserData.avatar.startsWith('data:image') 
                  ? currentUserData.avatar 
                  : userProfile.avatar 
              }}
              style={styles.avatar}
              accessible={true}
              accessibilityRole="image"
              accessibilityLabel={`Profile picture of ${userProfile.name}`}
            />
            {isRefreshing && (
              <View style={styles.refreshIndicator}>
                <ActivityIndicator size="small" color="#A855F7" />
              </View>
            )}
            <Text 
              style={styles.name}
              accessible={true}
              accessibilityRole="text"
              accessibilityLabel={`User name: ${userProfile.name}`}
            >
              {userProfile.name}
            </Text>
            <Text 
              style={styles.email}
              accessible={true}
              accessibilityRole="text"
              accessibilityLabel={`Email address: ${userProfile.email}`}
            >
              {userProfile.email}
            </Text>
          </View>
        </View>

        <View style={styles.contentSection}>
          <View 
            style={styles.statsContainer}
            accessible={true}
            accessibilityRole="summary"
            accessibilityLabel={`Your statistics: ${userProfile.favoriteSpots} favorite spots, ${userProfile.reviews} reviews`}
          >
          <TouchableOpacity 
            style={styles.statItem}
            onPress={() => navigation.navigate('FavoriteSpots')}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={`${userProfile.favoriteSpots} favorite spots - tap to view`}
          >
            <Text 
              style={styles.statNumber}
              accessible={true}
              accessibilityRole="text"
            >
              {userProfile.favoriteSpots}
            </Text>
            <Text style={styles.statLabel}>Favorite Spots</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.statItem}
            onPress={() => navigation.navigate('MyReviews')}
            accessible={true}  
            accessibilityRole="button"
            accessibilityLabel={`${userProfile.reviews} reviews - tap to view`}
          >
            <Text 
              style={styles.statNumber}
              accessible={true}
              accessibilityRole="text"
            >
              {userProfile.reviews}
            </Text>
            <Text style={styles.statLabel}>Reviews</Text>
          </TouchableOpacity>
        </View>

        <View 
          style={styles.menuContainer}
          accessible={false}
          accessibilityLabel="Profile menu options"
        >
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={item.action}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={item.accessibilityLabel}
              accessibilityHint={item.accessibilityHint}
              accessibilityState={{ disabled: false }}
            >
              <View style={styles.menuItemLeft}>
                <Ionicons 
                  name={item.icon} 
                  size={24} 
                  color={colors.text}
                  accessible={false}
                />
                <Text style={styles.menuItemText}>{item.title}</Text>
              </View>
              {item.value ? (
                <Text 
                  style={styles.menuItemValue}
                  accessible={false}
                >
                  {item.value}
                </Text>
              ) : (
                <Ionicons 
                  name="chevron-forward" 
                  size={24} 
                  color={colors.textSecondary}
                  accessible={false}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          disabled={isLoading}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Logout"
          accessibilityHint="Logout from your account"
          accessibilityState={{ disabled: isLoading }}
        >
          {isLoading ? (
            <ActivityIndicator 
              color="#A855F7"
              accessible={true}
              accessibilityLabel="Logging out, please wait"
            />
          ) : (
            <>
              <Ionicons 
                name="log-out-outline" 
                size={24} 
                color="#fff"
                accessible={false}
              />
              <Text style={styles.logoutText}>Logout</Text>
            </>
          )}
        </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const getStyles = (colors, isDarkMode) => StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContent: {
    flexGrow: 1,
    backgroundColor: 'transparent',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    backgroundColor: isDarkMode ? colors.cardBackground : 'transparent',
    marginHorizontal: isDarkMode ? 15 : 0,
    marginTop: isDarkMode ? 15 : 0,
    borderRadius: isDarkMode ? 15 : 0,
  },
  contentSection: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'transparent',
  },
  profileHeader: {
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: colors.border,
  },
  refreshIndicator: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 4,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 15,
    textAlign: 'center',
  },
  email: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 5,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 20,
    marginHorizontal: 20,
    marginTop: 0,
    marginBottom: 0,
    borderRadius: 15,
    backgroundColor: colors.cardBackground,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 5,
  },
  menuContainer: {
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 15,
    marginHorizontal: 20,
    backgroundColor: colors.cardBackground,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    minHeight: 60,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 15,
    fontWeight: '500',
  },
  menuItemValue: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: 'bold',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 30,
    marginHorizontal: 20,
    padding: 18,
    borderRadius: 25,
    minHeight: 56,
    backgroundColor: colors.primary,
  },
  logoutText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 10,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;