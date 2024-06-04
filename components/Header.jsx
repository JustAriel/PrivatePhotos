import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, Button } from 'react-native';
import { Alerter } from './Alerter';

const Header = ({ navigation, password }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.header}>
      <Text style={styles.privatePhotosText}>Private Photos</Text>
      <Text style={styles.privatePhotosDescr}>
        Welcome, <Text style={{ fontWeight: 'bold', color: "#b51f" }}>{password}</Text>! Secure your memories by adding photos from your gallery. Your privacy, your memories.
      </Text>   
      <TouchableOpacity style={styles.settingsButton} onPress={toggleModal}>
        <Image source={require('../images/settings4.png')} style={styles.settings} />
      </TouchableOpacity>

      <Alerter isModalVisible={isModalVisible} toggleModal={toggleModal} navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
    alignItems: 'center',
    backgroundColor: "#222",
    paddingRight: 55,
  },
  privatePhotosText: {
    fontSize: 20,
    color: '#f51b',
    fontWeight: "bold",
    letterSpacing: 2,
    marginTop: 30,
  },
  privatePhotosDescr: {
    fontSize: 12,
    color: 'white',
    fontWeight: "400",
    letterSpacing: 1,
    width: 250,
    textAlign: "center",
  },
  settingsButton: {
    marginTop: 10,
    padding: 5,
    borderRadius: 50,
    position: "absolute",
    top: 35,
    right: 20,
  },
  settings: {
    width: 35,
    height: 35,
  },
});

export default Header;
