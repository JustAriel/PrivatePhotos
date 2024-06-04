import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity, Image } from 'react-native';

const PrivacyPolicy = () => {
  const handleContactUsPress = () => {
    Linking.openURL('https://www.tiktok.com/@zexick');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/privatePhotosLogo.png')} style={styles.logo} />
      <View style={styles.box}>
        <Text style={styles.heading}>Privacy Policy</Text>
        <Text style={styles.paragraph}>
          Your privacy is important to us. This app requests permission to access your gallery solely for the purpose of allowing you to add and view images within the app.
        </Text>
        <Text style={styles.paragraph}>
          We want to assure you that your images and data stay on your device and are not transferred or stored anywhere else.
        </Text>
        <Text style={styles.paragraph}>
          This app doesn't require accounts, ensuring that your personal data remains safe from unauthorized access.
        </Text>
      </View>
      <View style={styles.box2}>
        <Text style={styles.paragraph}>
          If you have any questions or concerns regarding your privacy, please contact us at
        </Text>
        <TouchableOpacity onPress={handleContactUsPress}>
          <Text style={styles.linkText}>@zexick</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#111",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 400
  },
  heading: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 16,
    color: "#fff",
    margin: 20,
    marginLeft: 30,
  },
  paragraph: {
    fontSize: 16,
    marginTop: 12,
    color: "#fff",
    margin: 10,
    marginHorizontal: 20,
    fontWeight: "bold",
  },
  linkText: {
    color: '#3498db',
    textDecorationLine: 'underline',
    fontSize: 18,
    marginHorizontal: 20,
  },
  box: {
    width: 390,
    height: 260,
    backgroundColor: "#222",
    borderRadius: 12,
    marginBottom: 10,
  },
  box2: {
    width: 390,
    height: 100,
    backgroundColor: "#222",
    borderRadius: 12,
  },
  logo: {
    width: 200,
    height: 200,
    marginTop: 100,
    marginRight: 20,
    marginBottom: 50,
  }
});

export default PrivacyPolicy;
