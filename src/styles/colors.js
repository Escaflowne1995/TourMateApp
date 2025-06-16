export const LightColors = {
  // New Palette based on user image
  primary: '#D7301F', // Strong Red
  primaryDark: '#B82415', // Darker Red
  secondary: '#FC8D59', // Bright Orange
  tertiary: '#FDCC8A', // Light Orange
  
  // Backgrounds
  background: '#FEF0D9', // Very Light Orange/Cream
  cardBackground: '#FFFFFF',
  surface: '#FFFFFF', 
  inputBackground: '#FFFFFF',
  
  // Text
  text: '#2C3E50', // Keeping dark text for readability
  textSecondary: '#5D6D7E',
  textPlaceholder: '#95A5A6',
  
  // Borders and dividers
  border: '#FDCC8A', // Light Orange
  
  // Status colors
  error: '#D7301F', // Strong Red for errors
  success: '#27AE60', // Keeping green for success
  warning: '#FC8D59', // Bright Orange for warnings
  
  // Accent colors
  accent: '#FC8D59', // Bright Orange
  highlight: '#FDCC8A', // Light Orange
  info: '#3498DB', // Keeping blue for info
};

export const DarkColors = {
    // New Palette based on user image - Dark Mode
    primary: '#FC8D59', // Bright Orange as primary on dark background
    primaryDark: '#D7301F', // Strong Red as dark variant
    secondary: '#FDCC8A', // Light Orange
    tertiary: '#FEF0D9', // Very Light Orange/Cream
  
    // Dark backgrounds from original theme
    background: '#121212', // A more standard dark background
    cardBackground: '#1E1E1E',
    surface: '#1E1E1E',
    inputBackground: '#2C2C2C',
  
    // Light text for dark mode, using palette colors
    text: '#FEF0D9', // Lightest color from palette
    textSecondary: '#FDCC8A', // Lighter orange for secondary text
    textPlaceholder: '#95A5A6', // Keeping a muted placeholder color
  
    // Borders
    border: '#FC8D59', // Orange for borders
  
    // Status colors
    error: '#CF6679', // Material Design standard for dark theme error
    success: '#66BB6A', // A lighter green for dark theme
    warning: '#FDCC8A', // Lighter orange for warnings
  
    // Accents
    accent: '#FC8D59', // Orange for accent
    highlight: '#FDCC8A', // Lighter orange for highlight
    info: '#42A5F5', // Bright blue from original dark theme
};

// Legacy export for backward compatibility
export const Colors = LightColors; 