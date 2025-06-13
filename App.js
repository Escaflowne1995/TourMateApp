import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import LandingScreen from './screen/LandingScreen';
import Login from './screen/Login';
import Signup from './screen/Signup';
import HomeScreen from './screen/HomeScreen';
import AttractionDetails from './screen/AttractionDetails';
import ProfileScreen from './screen/ProfileScreen';
import SearchScreen from './screen/SearchScreen';
import EditProfileScreen from './screen/EditProfileScreen';
import FavoriteSpotsScreen from './screen/FavoriteSpotsScreen';
import MyReviewsScreen from './screen/MyReviewsScreen';
import TravelHistoryScreen from './screen/TravelHistoryScreen';
import LanguageScreen from './screen/LanguageScreen';
import SettingsScreen from './screen/SettingsScreen';
import HelpSupportScreen from './screen/HelpSupportScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const AuthStack = createStackNavigator();

function AuthScreens() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Landing" component={LandingScreen} />
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Signup" component={Signup} />
    </AuthStack.Navigator>
  );
}

function MainTabs() {
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
        tabBarActiveTintColor: '#FF6B6B',
        tabBarInactiveTintColor: 'gray',
        headerStyle: {
          backgroundColor: '#FF6B6B',
        },
        headerTintColor: '#fff',
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          title: 'Discover Cebu'
        }}
      />
      <Tab.Screen 
        name="Search" 
        component={SearchScreen}
        options={{
          title: 'Search Places'
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          title: 'My Profile'
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={AuthScreens} />
        <Stack.Screen name="MainApp" component={MainTabs} />
        <Stack.Screen
          name="AttractionDetails"
          component={AttractionDetails}
          options={{ 
            headerShown: true,
            title: 'Attraction Details',
            headerStyle: {
              backgroundColor: '#FF6B6B',
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfileScreen}
          options={{ 
            headerShown: true,
            title: 'Edit Profile',
            headerStyle: {
              backgroundColor: '#FF6B6B',
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="FavoriteSpots"
          component={FavoriteSpotsScreen}
          options={{ 
            headerShown: true,
            title: 'Favorite Spots',
            headerStyle: {
              backgroundColor: '#FF6B6B',
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="MyReviews"
          component={MyReviewsScreen}
          options={{ 
            headerShown: true,
            title: 'My Reviews',
            headerStyle: {
              backgroundColor: '#FF6B6B',
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="TravelHistory"
          component={TravelHistoryScreen}
          options={{ 
            headerShown: true,
            title: 'Travel History',
            headerStyle: {
              backgroundColor: '#FF6B6B',
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="Language"
          component={LanguageScreen}
          options={{ 
            headerShown: true,
            title: 'Language',
            headerStyle: {
              backgroundColor: '#FF6B6B',
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ 
            headerShown: true,
            title: 'Settings',
            headerStyle: {
              backgroundColor: '#FF6B6B',
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="HelpSupport"
          component={HelpSupportScreen}
          options={{ 
            headerShown: true,
            title: 'Help & Support',
            headerStyle: {
              backgroundColor: '#FF6B6B',
            },
            headerTintColor: '#fff',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
