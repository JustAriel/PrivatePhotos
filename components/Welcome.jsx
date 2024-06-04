import React,{ useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Linking, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from './ThemeContext';
import { ConfirmAlert, ConfirmationAlert } from './Alerter';

const Welcome = ({ navigation }) => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleButtonPress = async () => {
    if (password.length >= 4 && password === confirmPassword) {
      try {
        setShowConfirmationModal(true);
      } catch (error) {
        console.error('Error saving password:', error);
      }
    } else {
      setConfirm(true);
    }
  };

  const handleConfrim = async () => {
    try {
      await AsyncStorage.setItem('appPassword', password);
      navigation.navigate('Main', { password })
    } catch (err) {
      console.error(err);
    }
    setShowConfirmationModal(false);
  }

  const handleCamcel = () => {
    setShowConfirmationModal(false);
  }

  const handlePrivacyPolicyPress = () => {
    navigation.navigate('Privacy');
  };

  const handleContactUsPress = () => {
    Linking.openURL('https://www.tiktok.com/@zexick');
  };

  useEffect(() => {
    checkPasswordAndNavigate();
  }, []);
  
  const checkPasswordAndNavigate = async () => {
    try {
      const storedPassword = await AsyncStorage.getItem('appPassword');
      if (storedPassword) {
        navigation.navigate('Lock', { password: storedPassword });
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#fff' : '#111' }]}>
      <StatusBar
        backgroundColor={isDarkMode ? '#111' : '#111'}
        barStyle={isDarkMode ? 'dark-content' : 'dark-content'}
      />
      <Image source={require('../assets/privatePhotosLogo.png')} style={styles.logo} />
      <View style={styles.box}>
        <Text style={styles.boxTitle}>Password Creation</Text>
        <Text style={styles.h5}>FIRST STEP</Text>
        <TextInput
          placeholder="Enter Password"
          placeholderTextColor="#888"
          autoFocus
          style={[styles.input, { color: isDarkMode ? '#111' : '#fff' }]}
          onChangeText={(text) => setPassword(text)}
        />
        <Text style={styles.h5}>SECOND STEP</Text>
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="#888"
          style={[styles.input, { color: isDarkMode ? '#111' : '#fff' }]}
          onChangeText={(text) => setConfirmPassword(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.box2}>
        <Text style={styles.boxTitle}>Privacy Policy</Text>
        <Text style={styles.boxText}>
          By using this app, you agree to our privacy policy. We may collect gallery permissions
          for certain features.
        </Text>
        <TouchableOpacity onPress={handlePrivacyPolicyPress}>
          <Text style={styles.linkText}>Read our privacy policy</Text>
        </TouchableOpacity>
        <Text style={styles.boxTitle}>Contact Us</Text>
        <Text style={styles.boxText}>
          For any inquiries or assistance, you can contact us on TikTok.
        </Text>
        <TouchableOpacity onPress={handleContactUsPress}>
          <Text style={styles.linkText}>@zexick</Text>
        </TouchableOpacity>
      </View>
      <ConfirmAlert 
        visible={confirm}
        onClose={() => setConfirm(false)}
        message="Password must be at least 4 characters and match the confirmation."
      />
      <ConfirmationAlert 
        visible={showConfirmationModal}
        onConfirm={handleConfrim}
        onCancel={handleCamcel}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    height: "100%",
  },
  box: {
    backgroundColor: '#222',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    marginTop: 10,
    height: 228,
  },
  box2: {
    backgroundColor: '#222',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    marginTop: 10,
    height: 230,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: "#fff",
    marginBottom: 20,
    paddingHorizontal: 3,
    borderRadius: 5,
    color: '#fff',
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 1,
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginTop: 0,
    paddingVertical: 10,
  },
  buttonText: {
    color: '#111',
    fontSize: 18,
    fontWeight:"bold",
  },
  h5: {
    fontSize: 9,
    letterSpacing: 2,
    marginLeft: 10,
    color: "#fff",
  },
  boxTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  boxText: {
    color: '#fff',
    marginBottom: 10,
  },
  linkText: {
    color: '#3498db',
    textDecorationLine: 'underline',
    marginBottom: 30,
  },
  logo: {
    width: 150,
    height: 150,
    marginTop:-80,
    marginRight: 20,
    marginBottom: 10,
  },
});

export default Welcome;
