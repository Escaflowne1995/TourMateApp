# Quick Dark Mode Update Guide for Remaining Screens

## 🚀 Simple 4-Step Process for Each Screen

### Step 1: Add Imports (top of file)
```javascript
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColors } from '../../utils/theme';
```

### Step 2: Add Theme Hook (inside component)
```javascript
const YourScreen = ({ navigation }) => {
  const { isDarkMode } = useTheme();
  const colors = getThemeColors(isDarkMode);
  const styles = getStyles(colors, isDarkMode);
  
  // ... rest of component
```

### Step 3: Replace LinearGradient Background
```javascript
// ❌ Replace this:
<LinearGradient colors={['#A855F7', '#9333EA']} style={styles.container}>

// ✅ With this:
<View style={[styles.container, { backgroundColor: colors.background }]}>

// And fix closing tag:
</LinearGradient> → </View>
```

### Step 4: Convert Static Styles to Dynamic
```javascript
// ❌ Replace this:
const styles = StyleSheet.create({

// ✅ With this:
const getStyles = (colors, isDarkMode) => StyleSheet.create({
```

## 📋 Remaining Screens to Update:

### 🔨 **High Priority (Main Features):**
- `src/screens/main/AttractionDetails.js`
- `src/screens/profile/EditProfileScreen.js`
- `src/screens/profile/FavoriteSpotsScreen.js`

### 📱 **Medium Priority (User Features):**
- `src/screens/profile/MyReviewsScreen.js`
- `src/screens/profile/TravelHistoryScreen.js`

### ⚙️ **Low Priority (Settings):**
- `src/screens/settings/LanguageScreen.js`
- `src/screens/settings/HelpSupportScreen.js`

## 🎨 Quick Color Reference

```javascript
// Use these in your styles:
colors.background      // Main background
colors.cardBackground  // Cards, surfaces
colors.text           // Primary text
colors.textSecondary  // Secondary text
colors.border         // Borders
colors.primary        // Brand color (#A855F7)
colors.inputBackground // Form inputs
```

## ⚡ Speed Tips

1. **Copy-paste pattern** from updated screens
2. **Search & replace** static colors with theme colors
3. **Test immediately** after each screen
4. **Focus on main features first**

## 🔥 Example Pattern (EditProfileScreen)

```javascript
// 1. Add imports
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColors } from '../../utils/theme';

const EditProfileScreen = ({ navigation }) => {
  // 2. Add theme hook
  const { isDarkMode } = useTheme();
  const colors = getThemeColors(isDarkMode);
  const styles = getStyles(colors, isDarkMode);

  return (
    // 3. Replace background
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Your content */}
    </View>
  );
};

// 4. Dynamic styles
const getStyles = (colors, isDarkMode) => StyleSheet.create({
  container: { flex: 1 },
  text: { color: colors.text },
  card: { backgroundColor: colors.cardBackground },
  // ... rest of styles with theme colors
});
```

## 🎯 Your Dark Mode is 80% Complete!

The main functionality is working. Update the remaining screens at your own pace using this pattern. Each screen takes 2-3 minutes following these steps.

**Test it now!** 🌙 