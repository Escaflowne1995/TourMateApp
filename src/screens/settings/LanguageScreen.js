import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const languages = [
  { id: '1', name: 'English', nativeName: 'English', code: 'en' },
  { id: '2', name: 'Filipino', nativeName: 'Filipino', code: 'fil' },
  { id: '3', name: 'Cebuano', nativeName: 'Bisaya', code: 'ceb' },
  { id: '4', name: 'Spanish', nativeName: 'Español', code: 'es' },
  { id: '5', name: 'Chinese (Simplified)', nativeName: '中文(简体)', code: 'zh-CN' },
  { id: '6', name: 'Japanese', nativeName: '日本語', code: 'ja' },
  { id: '7', name: 'Korean', nativeName: '한국어', code: 'ko' },
];

const LanguageScreen = ({ navigation }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handleLanguageSelect = (languageCode, languageName) => {
    if (languageCode === selectedLanguage) return;

    Alert.alert(
      'Change Language',
      `Change language to ${languageName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Change',
          onPress: () => {
            setSelectedLanguage(languageCode);
            Alert.alert(
              'Language Changed',
              'The app will restart after changing the language to apply the new settings.',
              [{ text: 'OK', onPress: () => navigation.goBack() }]
            );
          }
        }
      ]
    );
  };

  const renderLanguageItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.languageItem,
        selectedLanguage === item.code && styles.selectedLanguageItem
      ]}
      onPress={() => handleLanguageSelect(item.code, item.name)}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`${item.name}, ${item.nativeName}`}
      accessibilityHint={`Change language to ${item.name}`}
      accessibilityState={{ selected: selectedLanguage === item.code }}
    >
      <View style={styles.languageContent}>
        <View style={styles.languageInfo}>
          <Text style={[
            styles.languageName,
            selectedLanguage === item.code && styles.selectedLanguageName
          ]}>
            {item.name}
          </Text>
          <Text style={[
            styles.languageNative,
            selectedLanguage === item.code && styles.selectedLanguageNative
          ]}>
            {item.nativeName}
          </Text>
        </View>
        {selectedLanguage === item.code && (
          <Ionicons 
            name="checkmark-circle" 
            size={24} 
            color="#A855F7"
            accessible={false}
            style={styles.checkIcon}
          />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={['#A855F7', '#9333EA']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <View 
        style={styles.content}
        accessible={true}
        accessibilityLabel="Language Selection Screen"
      >
        <View style={styles.header}>
          <Text 
            style={styles.headerTitle}
            accessible={true}
            accessibilityRole="text"
          >
            Language
          </Text>
          <Text 
            style={styles.headerSubtitle}
            accessible={true}
            accessibilityRole="text"
          >
            Choose your preferred language
          </Text>
        </View>

        <FlatList
          data={languages}
          renderItem={renderLanguageItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.languageContainer}
          showsVerticalScrollIndicator={false}
          accessible={false}
          accessibilityLabel="List of available languages"
        />

        <View style={styles.footer}>
          <Text 
            style={styles.footerText}
            accessible={true}
            accessibilityRole="text"
          >
            The app will restart after changing the language to apply the new settings.
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    padding: 20,
    marginHorizontal: 15,
    marginTop: 15,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 5,
  },
  languageContainer: {
    marginTop: 20,
    marginHorizontal: 15,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    minHeight: 70,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  selectedLanguageItem: {
          backgroundColor: 'rgba(168, 85, 247, 0.2)',
    borderColor: '#A855F7',
    borderWidth: 2,
  },
  languageContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  languageInfo: {
    flex: 1,
    marginLeft: 15,
  },
  languageName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  selectedLanguageName: {
    color: '#A855F7',
  },
  languageNative: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  selectedLanguageNative: {
    color: 'rgba(168, 85, 247, 0.9)',
  },
  footer: {
    padding: 20,
    marginHorizontal: 15,
    marginBottom: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  footerText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    lineHeight: 20,
  },
  checkIcon: {
    marginLeft: 10,
  },
});

export default LanguageScreen;