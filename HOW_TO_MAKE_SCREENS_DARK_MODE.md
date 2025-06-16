# How to Make Any Screen Support Dark Mode

The dark mode is working in the Settings screen, but other screens need to be updated to use the theme context. Here's how to make any screen theme-aware:

## ✅ Steps to Make Any Screen Theme-Aware

### 1. Add the Required Imports

Add these imports to the top of your screen file:

```javascript
import { useTheme } from '../../contexts/ThemeContext';  // Adjust path as needed
import { getThemeColors } from '../../utils/theme';     // Adjust path as needed
```

### 2. Add Theme Hook in Your Component

Inside your component function, add:

```javascript
const YourScreen = ({ navigation }) => {
  const { isDarkMode } = useTheme();
  const colors = getThemeColors(isDarkMode);
  const styles = getStyles(colors, isDarkMode);  // Use dynamic styles
  
  // ... rest of your component
};
```

### 3. Replace Static Styles with Dynamic Styles Function

Instead of:
```javascript
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8FAFC',  // Static color
  },
  text: {
    color: '#1F2937',  // Static color
  },
});
```

Use:
```javascript
const getStyles = (colors, isDarkMode) => StyleSheet.create({
  container: {
    backgroundColor: colors.background,  // Theme-aware color
  },
  text: {
    color: colors.text,  // Theme-aware color
  },
});
```

### 4. Replace Fixed Backgrounds

Instead of:
```javascript
<LinearGradient colors={['#A855F7', '#9333EA']} style={styles.container}>
```

Use:
```javascript
<View style={[styles.container, { backgroundColor: colors.background }]}>
```

### 5. Update All Static Colors

Replace all static colors with theme colors:

```javascript
// ❌ Bad - static colors
color: '#1F2937'
backgroundColor: '#FFFFFF'
borderColor: '#E5E7EB'

// ✅ Good - theme colors
color: colors.text
backgroundColor: colors.cardBackground
borderColor: colors.border
```

## 🎨 Available Theme Colors

```javascript
// Light Mode Colors
colors.background = '#F8FAFC'
colors.text = '#1F2937'
colors.textSecondary = '#6B7280'
colors.cardBackground = '#FFFFFF'
colors.border = '#E5E7EB'
colors.primary = '#A855F7'

// Dark Mode Colors  
colors.background = '#111827'
colors.text = '#F9FAFB'
colors.textSecondary = '#D1D5DB'
colors.cardBackground = '#1F2937'
colors.border = '#374151'
colors.primary = '#A855F7'
```

## 🔥 Quick Example - HomeScreen Pattern

Here's how I updated the HomeScreen:

```javascript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColors } from '../../utils/theme';

const HomeScreen = ({ navigation }) => {
  const { isDarkMode } = useTheme();
  const colors = getThemeColors(isDarkMode);
  const styles = getStyles(colors, isDarkMode);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={styles.title}>Welcome!</Text>
      <View style={styles.card}>
        <Text style={styles.cardText}>This card adapts to theme</Text>
      </View>
    </View>
  );
};

const getStyles = (colors, isDarkMode) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 20,
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardText: {
    color: colors.text,
    fontSize: 16,
  },
});

export default HomeScreen;
```

## 📋 Screens That Need Updating

To make dark mode work throughout your app, update these screens using the pattern above:

### Authentication Screens:
- `src/screens/auth/Login.js` 
- `src/screens/auth/Signup.js`
- `src/screens/auth/LandingScreen.js`

### Main Screens:
- `src/screens/main/HomeScreen.js` ✅ (Already done)
- `src/screens/main/SearchScreen.js`
- `src/screens/main/AttractionDetails.js`

### Profile Screens:
- `src/screens/profile/ProfileScreen.js` ✅ (Already done)
- `src/screens/profile/EditProfileScreen.js`
- `src/screens/profile/FavoriteSpotsScreen.js`
- `src/screens/profile/MyReviewsScreen.js`
- `src/screens/profile/TravelHistoryScreen.js`

### Settings Screens:
- `src/screens/settings/SettingsScreen.js` ✅ (Already done)
- `src/screens/settings/LanguageScreen.js`
- `src/screens/settings/HelpSupportScreen.js`

## 🚀 Pro Tips

1. **Test Both Themes**: Always test your screen in both light and dark mode
2. **Consistent Colors**: Use the same color variables across all screens
3. **Icon Colors**: Don't forget to update icon colors using `colors.text` or `colors.primary`
4. **Input Fields**: Use `colors.inputBackground` and `colors.border` for form inputs
5. **Cards/Surfaces**: Use `colors.cardBackground` for cards and elevated surfaces

## 🔧 Testing Your Changes

1. Go to Settings → Dark Mode toggle
2. Navigate to your updated screen
3. Toggle dark mode on/off
4. Verify all colors change appropriately
5. Check text remains readable in both themes

That's it! Follow this pattern for each screen and your entire app will support dark mode! 🌙 