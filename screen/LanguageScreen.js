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
        <View style={styles.languageText}>
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
            color="#FF6B6B"
            accessible={false}
          />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.8)']}
      style={styles.container}
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
          contentContainerStyle={styles.list}
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
  },
  header: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    marginHorizontal: 15,
    marginTop: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 5,
  },
  list: {
    padding: 15,
  },
  languageItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    marginBottom: 10,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    minHeight: 60,
  },
  selectedLanguageItem: {
    backgroundColor: 'rgba(255, 107, 107, 0.2)',
    borderColor: '#FF6B6B',
    borderWidth: 2,
  },
  languageContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  languageText: {
    flex: 1,
  },
  languageName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  selectedLanguageName: {
    color: '#FF6B6B',
  },
  languageNative: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  selectedLanguageNative: {
    color: 'rgba(255, 107, 107, 0.9)',
  },
  footer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    marginHorizontal: 15,
    marginBottom: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  footerText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default LanguageScreen;