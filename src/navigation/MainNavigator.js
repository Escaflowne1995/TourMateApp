import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/main/HomeScreen';
import SearchScreen from '../screens/main/SearchScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeColors } from '../utils/theme';

const Tab = createBottomTabNavigator();

export default function MainNavigator({ route }) {
  const userData = route.params?.userData || {};
  const { isDarkMode } = useTheme();
  const colors = getThemeColors(isDarkMode);
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#A855F7',
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.cardBackground,
          borderTopColor: colors.border,
        },
        headerStyle: {
          backgroundColor: colors.cardBackground,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          color: colors.text,
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        options={{
          title: (userData.fullName || userData.displayName || userData.name) ? 
            `Welcome, ${(userData.fullName || userData.displayName || userData.name).split(' ')[0]}!` : 
            'Discover Cebu'
        }}
      >
        {(props) => <HomeScreen {...props} userData={userData} />}
      </Tab.Screen>
      <Tab.Screen 
        name="Search" 
        options={{
          title: 'Search Places'
        }}
      >
        {(props) => <SearchScreen {...props} userData={userData} />}
      </Tab.Screen>
      <Tab.Screen 
        name="Profile" 
        options={{
          title: 'My Profile'
        }}
      >
        {(props) => <ProfileScreen {...props} userData={userData} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
} 