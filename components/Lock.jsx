import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Linking, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from './ThemeContext';
import { ConfirmAlert } from './Alerter';

const Lock = () => {
  const { isDarkMode } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const [enteredPassword, setPassword] = useState('');
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    checkStoredPassword();
  }, []);

  const checkStoredPassword = async () => {
    try {
      const storedPassword = await AsyncStorage.getItem('appPassword');
      if (!storedPassword) navigation.navigate('Welcome');
    } catch (error) {
      console.error('Error checking stored password:', error);
    }
  };

  const handleUnlockPress = async () => {
    const passedPassword = route.params?.password;

    try {
      const storedPassword = await AsyncStorage.getItem('appPassword');
      if (enteredPassword === storedPassword || enteredPassword === passedPassword) {
        navigation.navigate('Main',{ password: storedPassword });
      } else {
        setConfirm(true);
      }
    } catch (error) {
      console.error('Error unlocking app:', error);
    }
  };

  const handlePrivacyPolicyPress = () => {
    navigation.navigate('Privacy');
  };

  const handleContactUsPress = () => {
    Linking.openURL('https://www.tiktok.com/@zexick');
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#fff' : '#111' }]}>
      <StatusBar
        backgroundColor={isDarkMode ? '#111' : '#111'}
        barStyle={isDarkMode ? 'dark-content' : 'dark-content'}
      />
      <Image source={require('../assets/privatePhotosLogo.png')} style={styles.logo} />
      <View style={styles.box}>
        <Text style={styles.boxTitle}>Confirm your password</Text>
        <Text style={styles.h5}>CONFIRM PASSWORD</Text>
        <TextInput
          placeholder="Enter Password"
          placeholderTextColor="#888"
          autoFocus
          style={[styles.input, { color: isDarkMode ? '#111' : '#fff' }]}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleUnlockPress}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.box2}>
        <Text style={styles.boxTitle}>Privacy Policy</Text>
        <Text style={styles.boxText}>
          Use of this app implies agreement with our privacy policy. Gallery permissions may be collected for specific features. <Text style={{fontWeight: 'bold'}}>Account creation is restricted for security.</Text>
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
        message= "Incorrect password. Please try again."
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
    height: 168,
  },
  box2: {
    backgroundColor: '#222',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    marginTop: 10,
    height: 246,
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
    marginTop:-100,
    marginRight: 20,
    marginBottom: 30,
  },
});

export default Lock;
