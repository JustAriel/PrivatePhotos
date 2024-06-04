import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { useTheme } from './ThemeContext';

const Alerter = ({ isModalVisible, toggleModal, navigation }) => {
  const { isDarkMode } = useTheme();

  return (
    <Modal visible={isModalVisible} animationType="slide" transparent={true}>
      <StatusBar
        backgroundColor={isDarkMode ? '#111' : '#111'}
        barStyle={isDarkMode ? 'dark-content' : 'dark-content'}
      />
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.alertText}>
            Are you sure you want to change your password for the app?
          </Text>
          <TouchableOpacity style={styles.closeButton} onPress={() => navigation.navigate('Welcome')}>
            <Text style={styles.closeButtonText}>Yes, I'm sure.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
            <Text style={styles.closeButtonText}>No, I didn't.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const DeleteAlerter = ({ handleDeleteImage, onCancel, isVisible }) => {
  const { isDarkMode } = useTheme();

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <StatusBar
        backgroundColor={isDarkMode ? '#111' : '#111'}
        barStyle={isDarkMode ? 'dark-content' : 'dark-content'}
      />
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.alertText}>
            Are you sure you want to delete the selected picture?
          </Text>
          <TouchableOpacity style={styles.closeButton} onPress={() => handleDeleteImage(true)}>
            <Text style={styles.closeButtonText}>Yes, I'm sure.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={() => handleDeleteImage(false)}>
            <Text style={styles.closeButtonText}>No, I didn't.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onCancel}>
            <Text style={styles.closeButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const ConfirmAlert = ({ message, onClose, visible }) => {
  return (
    <Modal transparent visible={visible} animationType="slide">
      <StatusBar
        backgroundColor={'#000'}
        barStyle={'dark-content'}
      />
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>{message}</Text>
          <TouchableOpacity style={styles.modalButton} onPress={onClose}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const ConfirmationAlert = ({ visible, onConfirm, onCancel }) => {
  return (
    <Modal transparent={true} animationType="slide" visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Are you sure to set this password? Make sure to remember it!</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.modalButton2} onPress={onConfirm}>
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton2} onPress={onCancel}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#222', // Dark background color
    width: 300,
  },
  alertText: {
    color: 'white', // Text color
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#333', // Dark button background color
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 5,
  },
  closeButtonText: {
    color: 'white', // Button text color
    fontWeight: 'bold',
  },
  modalText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign:'center',
    marginBottom: 5,
  },
  modalButton: {
    backgroundColor: '#333',
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    paddingVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign:"center"
  },
  modalButton2: {
    backgroundColor: '#333',
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginTop: 5,
    paddingVertical: 10,
  },
});

export { Alerter, DeleteAlerter, ConfirmAlert, ConfirmationAlert };
