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
import DataUtils from '../../utils/dataUtils';

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
      
      // Debug data separation (helps identify issues)
      await DataUtils.debugDataSeparation();
      
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
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshing={isRefreshing}
        onRefresh={loadCounts}
      >
        {/* Premium Profile Header with Gradient */}
        <LinearGradient
          colors={[colors.primary, colors.secondary, colors.tertiary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerGradient}
        >
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Image 
                source={{ 
                  uri: currentUserData.avatar && currentUserData.avatar.startsWith('data:image') 
                    ? currentUserData.avatar 
                    : userProfile.avatar 
                }} 
                style={styles.avatar} 
              />
            </View>
            <Text style={styles.userName}>{userProfile.name}</Text>
            <Text style={styles.userEmail}>{userProfile.email}</Text>
            
            {/* Premium Stats Cards */}
            <View style={styles.statsContainer}>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{userProfile.favoriteSpots}</Text>
                <Text style={styles.statLabel}>Favorite Spots</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{userProfile.reviews}</Text>
                <Text style={styles.statLabel}>Reviews</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Premium Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={item.action}
              activeOpacity={0.8}
              accessible={true}
              accessibilityLabel={item.accessibilityLabel}
              accessibilityHint={item.accessibilityHint}
            >
              <View style={styles.menuIconContainer}>
                <Ionicons name={item.icon} size={24} color={colors.primary} />
              </View>
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                {item.value && (
                  <Text style={styles.menuValue}>{item.value}</Text>
                )}
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          ))}
          
          {/* Premium Logout Button */}
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <>
                <Ionicons name="log-out-outline" size={24} color="#FFF" />
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
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  headerGradient: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  profileHeader: {
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  userName: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFF',
    marginBottom: 4,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#FFF',
    opacity: 0.9,
    textAlign: 'center',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
  },
  statCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    minWidth: 100,
    backdropFilter: 'blur(10px)',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#FFF',
    opacity: 0.9,
    fontWeight: '600',
    textAlign: 'center',
  },
  menuContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  menuItem: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.border,
  },
  menuIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuContent: {
    flex: 1,
    marginLeft: 16,
  },
  menuTitle: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '600',
    marginBottom: 2,
  },
  menuValue: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: colors.error,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
    shadowColor: colors.error,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  logoutText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
});

export default ProfileScreen;