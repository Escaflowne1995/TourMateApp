import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const HelpSupportScreen = ({ navigation }) => {
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const contactOptions = [
    {
      id: '1',
      title: 'Email Support',
      subtitle: 'Get help via email within 24 hours',
      icon: 'mail-outline',
      action: () => {
        Linking.openURL('mailto:support@cebutouristapp.com');
      },
    },
    {
      id: '2',
      title: 'Phone Support',
      subtitle: 'Call us for immediate assistance',
      icon: 'call-outline',
      action: () => {
        Linking.openURL('tel:+639123456789');
      },
    },
    {
      id: '3',
      title: 'Live Chat',
      subtitle: 'Chat with our support team',
      icon: 'chatbubble-outline',
      action: () => {
        Alert.alert('Live Chat', 'Live chat feature coming soon!');
      },
    },
    {
      id: '4',
      title: 'Visit Website',
      subtitle: 'Browse our help center online',
      icon: 'globe-outline',
      action: () => {
        Linking.openURL('https://cebutouristapp.com/help');
      },
    },
  ];

  const faqData = [
    {
      id: '1',
      question: 'How do I add places to my favorites?',
      answer: 'To add a place to your favorites, simply tap the heart icon on any attraction card or details page. You can view all your favorites in the "Favorite Cebu Spots" section of your profile.',
    },
    {
      id: '2',
      question: 'How do I write a review?',
      answer: 'After visiting a place, go to the attraction\'s detail page and tap "Write Review". Rate your experience and share your thoughts to help other travelers.',
    },
    {
      id: '3',
      question: 'Can I use the app offline?',
      answer: 'Yes! You can download maps and attraction information for offline use. Go to Settings > Offline Mode to manage your offline content.',
    },
    {
      id: '4',
      question: 'How do I change the app language?',
      answer: 'Go to Profile > Language to select your preferred language. The app supports English, Filipino, Cebuano, Spanish, Chinese, Japanese, and Korean.',
    },
    {
      id: '5',
      question: 'Is my location data safe?',
      answer: 'Yes, your privacy is important to us. Location data is only used to provide personalized recommendations and is never shared with third parties without your consent.',
    },
    {
      id: '6',
      question: 'How do I report a problem with a place listing?',
      answer: 'If you find incorrect information about a place, tap the "Report Issue" button on the attraction\'s detail page, or contact our support team directly.',
    },
  ];

  const handleContactPress = (option) => {
    option.action();
  };

  const toggleFAQ = (faqId) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  const renderContactOption = (option) => (
    <TouchableOpacity
      key={option.id}
      style={styles.contactItem}
      onPress={() => handleContactPress(option)}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={option.title}
      accessibilityHint={option.subtitle}
    >
      <View style={styles.contactContent}>
        <Ionicons 
          name={option.icon} 
          size={24} 
          color="#FF6B6B" 
          style={styles.contactIcon}
          accessible={false}
        />
        <View style={styles.contactText}>
          <Text style={styles.contactTitle}>{option.title}</Text>
          <Text style={styles.contactSubtitle}>{option.subtitle}</Text>
        </View>
        <Ionicons 
          name="chevron-forward" 
          size={20} 
          color="rgba(255, 255, 255, 0.7)"
          accessible={false}
        />
      </View>
    </TouchableOpacity>
  );

  const renderFAQItem = (faq) => (
    <TouchableOpacity
      key={faq.id}
      style={styles.faqItem}
      onPress={() => toggleFAQ(faq.id)}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={faq.question}
      accessibilityHint={expandedFAQ === faq.id ? 'Tap to collapse answer' : 'Tap to expand answer'}
      accessibilityState={{ expanded: expandedFAQ === faq.id }}
    >
      <View style={styles.faqHeader}>
        <Text style={styles.faqQuestion}>{faq.question}</Text>
        <Ionicons 
          name={expandedFAQ === faq.id ? 'chevron-up' : 'chevron-down'} 
          size={20} 
          color="rgba(255, 255, 255, 0.7)"
          accessible={false}
        />
      </View>
      {expandedFAQ === faq.id && (
        <Text 
          style={styles.faqAnswer}
          accessible={true}
          accessibilityRole="text"
        >
          {faq.answer}
        </Text>
      )}
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.8)']}
      style={styles.container}
    >
      <ScrollView 
        style={styles.scrollView}
        accessible={true}
        accessibilityLabel="Help and Support Screen"
      >
        <View style={styles.header}>
          <Text 
            style={styles.headerTitle}
            accessible={true}
            accessibilityRole="text"
          >
            Help & Support
          </Text>
          <Text 
            style={styles.headerSubtitle}
            accessible={true}
            accessibilityRole="text"
          >
            We're here to help you
          </Text>
        </View>

        <View style={styles.section}>
          <Text 
            style={styles.sectionTitle}
            accessible={true}
            accessibilityRole="text"
          >
            Contact Us
          </Text>
          <View style={styles.contactContainer}>
            {contactOptions.map(renderContactOption)}
          </View>
        </View>

        <View style={styles.section}>
          <Text 
            style={styles.sectionTitle}
            accessible={true}
            accessibilityRole="text"
          >
            Frequently Asked Questions
          </Text>
          <View style={styles.faqContainer}>
            {faqData.map(renderFAQItem)}
          </View>
        </View>

        <View style={styles.section}>
          <Text 
            style={styles.sectionTitle}
            accessible={true}
            accessibilityRole="text"
          >
            App Information
          </Text>
          <View style={styles.appInfoContainer}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Version</Text>
              <Text style={styles.infoValue}>1.0.0</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Last Updated</Text>
              <Text style={styles.infoValue}>January 2024</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Developer</Text>
              <Text style={styles.infoValue}>Cebu Tourism Board</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text 
            style={styles.footerText}
            accessible={true}
            accessibilityRole="text"
          >
            Thank you for using Cebu Tourist App!
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
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
  section: {
    marginTop: 20,
    marginHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  contactContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  contactItem: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    minHeight: 70,
  },
  contactContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactIcon: {
    marginRight: 15,
  },
  contactText: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  contactSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  faqContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  faqItem: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    flex: 1,
    marginRight: 10,
  },
  faqAnswer: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 10,
    lineHeight: 20,
  },
  appInfoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  infoLabel: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  footer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    marginHorizontal: 15,
    marginTop: 20,
    marginBottom: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  footerText: {
    fontSize: 16,
    color: '#FF6B6B',
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default HelpSupportScreen; 