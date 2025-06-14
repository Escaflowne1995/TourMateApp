import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import AttractionDetails from '../screens/main/AttractionDetails';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import FavoriteSpotsScreen from '../screens/profile/FavoriteSpotsScreen';
import MyReviewsScreen from '../screens/profile/MyReviewsScreen';
import TravelHistoryScreen from '../screens/profile/TravelHistoryScreen';
import LanguageScreen from '../screens/settings/LanguageScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';
import HelpSupportScreen from '../screens/settings/HelpSupportScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{ 
          headerShown: false,
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerTintColor: '#A855F7',
          headerTitleStyle: {
            color: '#A855F7',
            fontWeight: '600',
          },
        }}
      >
        <Stack.Screen name="Auth" component={AuthNavigator} />
        <Stack.Screen name="MainApp" component={MainNavigator} />
        <Stack.Screen
          name="AttractionDetails"
          component={AttractionDetails}
          options={{ 
            headerShown: true,
            title: 'Attraction Details',
            headerStyle: {
              backgroundColor: '#FFFFFF',
            },
            headerTintColor: '#A855F7',
          }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfileScreen}
          options={{ 
            headerShown: true,
            title: 'Edit Profile',
            headerStyle: {
              backgroundColor: '#FFFFFF',
            },
            headerTintColor: '#A855F7',
          }}
        />
        <Stack.Screen
          name="FavoriteSpots"
          component={FavoriteSpotsScreen}
          options={{ 
            headerShown: true,
            title: 'Favorite Spots',
            headerStyle: {
              backgroundColor: '#FFFFFF',
            },
            headerTintColor: '#A855F7',
          }}
        />
        <Stack.Screen
          name="MyReviews"
          component={MyReviewsScreen}
          options={{ 
            headerShown: true,
            title: 'My Reviews',
            headerStyle: {
              backgroundColor: '#FFFFFF',
            },
            headerTintColor: '#A855F7',
          }}
        />
        <Stack.Screen
          name="TravelHistory"
          component={TravelHistoryScreen}
          options={{ 
            headerShown: true,
            title: 'Travel History',
            headerStyle: {
              backgroundColor: '#FFFFFF',
            },
            headerTintColor: '#A855F7',
          }}
        />
        <Stack.Screen
          name="Language"
          component={LanguageScreen}
          options={{ 
            headerShown: true,
            title: 'Language',
            headerStyle: {
              backgroundColor: '#FFFFFF',
            },
            headerTintColor: '#A855F7',
          }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ 
            headerShown: true,
            title: 'Settings',
            headerStyle: {
              backgroundColor: '#FFFFFF',
            },
            headerTintColor: '#A855F7',
          }}
        />
        <Stack.Screen
          name="HelpSupport"
          component={HelpSupportScreen}
          options={{ 
            headerShown: true,  
            title: 'Help & Support',
            headerStyle: {
              backgroundColor: '#FFFFFF',
            },
            headerTintColor: '#A855F7',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
} 