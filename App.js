import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import LandingScreen from './screen/LandingScreen';
import Login from './screen/Login';
import Signup from './screen/Signup';
import AuthTest from './components/AuthTest';
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
      <AuthStack.Screen name="AuthTest" component={AuthTest} />
    </AuthStack.Navigator>
  );
}

function MainTabs({ route }) {
  const userData = route.params?.userData || {};
  
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
        tabBarInactiveTintColor: 'gray',
        headerStyle: {
          backgroundColor: '#FFFFFF',
        },
        headerTintColor: '#A855F7',
        headerTitleStyle: {
          color: '#A855F7',
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        options={{
          title: userData.name ? `Welcome, ${userData.name.split(' ')[0]}!` : 'Discover Cebu'
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

export default function App() {
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
        <Stack.Screen name="Auth" component={AuthScreens} />
        <Stack.Screen name="MainApp" component={MainTabs} />
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
