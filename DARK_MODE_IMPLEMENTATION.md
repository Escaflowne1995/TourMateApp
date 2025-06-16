# Dark Mode Implementation Guide

## Overview
Dark mode has been successfully implemented in your Cebu Tourist App. The implementation uses React Context to manage theme state globally and provides a seamless way to switch between light and dark themes.

## Key Features
- ✅ Global theme context with persistent storage
- ✅ Light and dark color schemes
- ✅ Settings toggle to control dark mode
- ✅ Theme-aware styling utilities
- ✅ Automatic theme persistence using AsyncStorage

## How to Use Dark Mode

### 1. Toggle Dark Mode
Go to **Settings Screen** → **App Section** → **Dark Mode** toggle to switch between light and dark themes.

### 2. Making Components Theme-Aware

To make any component support dark mode, follow this pattern:

```javascript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeColors } from '../utils/theme';

const YourComponent = () => {
  const { isDarkMode } = useTheme();
  const colors = getThemeColors(isDarkMode);
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background,
    },
    text: {
      color: colors.text,
    },
    card: {
      backgroundColor: colors.cardBackground,
      borderColor: colors.border,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Theme-aware text</Text>
    </View>
  );
};
```

### 3. Available Colors

#### Light Theme Colors:
- `background`: '#F8FAFC'
- `text`: '#1F2937'
- `cardBackground`: '#FFFFFF'
- `border`: '#E5E7EB'

#### Dark Theme Colors:
- `background`: '#111827'
- `text`: '#F9FAFB'
- `cardBackground`: '#1F2937'
- `border`: '#374151'

### 4. Theme Context API

```javascript
const { isDarkMode, toggleTheme, isLoading } = useTheme();
```

- `isDarkMode`: Boolean indicating current theme
- `toggleTheme()`: Function to switch between themes
- `isLoading`: Boolean indicating if theme is still loading from storage

## Files Modified/Created

1. **Created:**
   - `src/contexts/ThemeContext.js` - Theme context provider
   - `src/utils/theme.js` - Theme utility functions
   - `src/components/ThemeAwareComponent.js` - Example component

2. **Modified:**
   - `src/styles/colors.js` - Added dark theme colors
   - `src/screens/settings/SettingsScreen.js` - Connected to theme context
   - `App.js` - Wrapped with ThemeProvider
   - `app.json` - Set userInterfaceStyle to "automatic"

## Extending Dark Mode

To add dark mode support to other screens:

1. Import the theme hooks:
   ```javascript
   import { useTheme } from '../contexts/ThemeContext';
   import { getThemeColors } from '../utils/theme';
   ```

2. Use the theme in your component:
   ```javascript
   const { isDarkMode } = useTheme();
   const colors = getThemeColors(isDarkMode);
   ```

3. Replace static colors with theme colors in your styles.

## Testing
- The dark mode setting is automatically saved and restored when the app restarts
- Toggle the dark mode switch in Settings to see the theme change
- All theme-aware components should update immediately

The dark mode is now fully functional! 🌙 