# Accessibility Guide for Cebu Tourist App

## Overview
This guide documents the accessibility features implemented in the Cebu Tourist App, focusing on making the app usable by people with disabilities, particularly those who use screen readers or have visual impairments.

## Accessibility Features Implemented

### ProfileScreen Accessibility

#### 1. Screen Reader Support
- **Semantic Roles**: All interactive elements have appropriate `accessibilityRole` properties
  - Interactive elements: `accessibilityRole="button"`
  - Images: `accessibilityRole="image"`
  - Text content: `accessibilityRole="text"`
  - Summary information: `accessibilityRole="summary"`

#### 2. Descriptive Labels
- **Profile Image**: Describes the user's profile picture with their name
- **User Information**: Clear labels for name and email with descriptive context
- **Statistics**: Combined accessible labels that announce both numbers and their meaning
- **Menu Items**: Each menu item has both a label and a hint explaining its function
- **Logout Button**: Clear label and hint about the action

#### 3. Touch Target Improvements
- **Minimum Size**: All interactive elements meet the 44pt minimum touch target size
- **Increased Padding**: Menu items and buttons have larger touch areas
- **Clear Spacing**: Adequate spacing between interactive elements

#### 4. Visual Accessibility
- **Improved Contrast**: Text colors meet WCAG AA contrast requirements
  - Primary text: `#212529` on white background (contrast ratio: 16.05:1)
  - Secondary text: `#495057` on white background (contrast ratio: 9.86:1)
  - White text on gradient: Better opacity for improved readability
- **Font Weight**: Slightly bolder fonts for better readability
- **Text Alignment**: Centered text for better visual hierarchy

#### 5. State Management
- **Disabled States**: Loading states are properly communicated to screen readers
- **Loading Indicators**: Activity indicators have descriptive labels
- **Button States**: Disabled buttons are marked with `accessibilityState`

## Accessibility Props Reference

### Essential Props Used

```javascript
// For interactive elements
accessibilityRole="button"
accessibilityLabel="What this element is"
accessibilityHint="What happens when you interact with it"
accessibilityState={{ disabled: boolean }}

// For decorative elements
accessible={false} // Icons that are purely decorative

// For images
accessibilityRole="image"
accessibilityLabel="Description of what the image shows"

// For text elements
accessibilityRole="text"
accessibilityLabel="Enhanced description if needed"

// For summary/statistical information
accessibilityRole="summary"
accessibilityLabel="Summary of key information"
```

### Valid React Native Accessibility Roles
React Native supports the following accessibility roles:
- `button` - Interactive buttons and touchable elements
- `text` - Text content
- `image` - Images and visual content
- `imagebutton` - Images that are also buttons
- `summary` - Summary or statistical information
- `header` - Header text (iOS only)
- `link` - Links (iOS only)
- `search` - Search fields
- `keyboardkey` - Keyboard keys
- `adjustable` - Adjustable elements like sliders
- `checkbox` - Checkboxes
- `radio` - Radio buttons
- `combobox` - Combo boxes/dropdowns
- `menu` - Menus (iOS only)
- `menubar` - Menu bars (iOS only)
- `menuitem` - Menu items (iOS only)
- `progressbar` - Progress indicators
- `scrollbar` - Scroll bars
- `spinbutton` - Spin buttons/steppers
- `switch` - Toggle switches
- `tab` - Tabs
- `tablist` - Tab lists
- `timer` - Timers
- `toolbar` - Toolbars

**Note**: Some roles are platform-specific. Always test on both iOS and Android.

## Testing Accessibility

### iOS Testing
1. **VoiceOver**: Enable Settings > Accessibility > VoiceOver
2. **Navigation**: Use swipe gestures to navigate through elements
3. **Activation**: Double-tap to activate elements
4. **Rotor**: Use the rotor to navigate by element type

### Android Testing
1. **TalkBack**: Enable Settings > Accessibility > TalkBack
2. **Navigation**: Use explore by touch and linear navigation
3. **Activation**: Double-tap to activate elements
4. **Reading Controls**: Use volume keys for reading control

### Manual Testing Checklist
- [ ] All interactive elements are focusable and have clear labels
- [ ] Navigation order is logical
- [ ] Screen reader announces all important information
- [ ] No essential information is conveyed by color alone
- [ ] Text meets contrast requirements
- [ ] Touch targets are at least 44pt in size
- [ ] Loading states are announced to screen readers

## Guidelines for Future Development

### 1. Always Include Accessibility Props
When creating new components, always consider:
- What role does this element serve?
- What would a screen reader user need to know?
- How do I describe the action that will happen?

### 2. Test Early and Often
- Use screen readers during development
- Test with actual users with disabilities when possible
- Use automated accessibility testing tools

### 3. Color and Contrast
- Never rely on color alone to convey information
- Ensure text meets WCAG AA contrast requirements (4.5:1 for normal text, 3:1 for large text)
- Use tools like WebAIM's Contrast Checker

### 4. Touch Targets
- Minimum 44pt x 44pt touch targets
- Adequate spacing between interactive elements
- Consider users with motor impairments

### 5. Dynamic Content
- Announce changes to screen reader users
- Use `accessibilityLiveRegion` for important updates
- Manage focus appropriately when content changes

## Common Accessibility Patterns

### Button Pattern
```javascript
<TouchableOpacity
  accessible={true}
  accessibilityRole="button"
  accessibilityLabel="Clear, descriptive label"
  accessibilityHint="What happens when pressed"
  accessibilityState={{ disabled: isDisabled }}
  onPress={handlePress}
>
  <Icon accessible={false} />
  <Text>Button Text</Text>
</TouchableOpacity>
```

### List Item Pattern
```javascript
<TouchableOpacity
  accessible={true}
  accessibilityRole="button"
  accessibilityLabel="Item name and status"
  accessibilityHint="Action description"
  onPress={handlePress}
>
  <Icon accessible={false} />
  <Text>Item Text</Text>
  <Text accessible={false}>Secondary Text</Text>
</TouchableOpacity>
```

### Image Pattern
```javascript
<Image
  source={imageSource}
  accessible={true}
  accessibilityRole="image"
  accessibilityLabel="Descriptive text of image content"
/>
```

## Resources
- [React Native Accessibility Guide](https://reactnative.dev/docs/accessibility)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [iOS VoiceOver Testing Guide](https://developer.apple.com/accessibility/ios/voiceover/)
- [Android TalkBack Testing Guide](https://support.google.com/accessibility/android/answer/6283677)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

## Contributing
When adding new features or modifying existing ones, please ensure all accessibility guidelines are followed and update this guide accordingly. 