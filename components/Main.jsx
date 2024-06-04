import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Modal, Alert, RefreshControl } from 'react-native';
import { StatusBar } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import * as SQLite from 'expo-sqlite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from './ThemeContext';
import Header from './Header';
import styles from './styles';

const Main = ({ navigation, route }) => {
  const { isDarkMode } = useTheme();
  const [selectedImages, setSelectedImages] = useState([]);
  const [focusedImage, setFocusedImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [focusedImageInfo, setFocusedImageInfo] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedDelete, setSelectedDelete] = useState([]);
  const [password, setPassword] = useState('');

  const db = SQLite.openDatabase('data.db');

  const createTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS images (id INTEGER PRIMARY KEY AUTOINCREMENT, uri TEXT, date TEXT);',
        [],
        () => console.log('Table created'),
        (_, err) => console.error(err)
      );
    });
  };

  useEffect(() => {
    const password = route.params.password;
    setPassword(password);
  }, [route.params])



  useEffect(() => {
    createTable();
  }, []);

  const insertImages = async (images) => {
    try {
      const storedImages = await AsyncStorage.getItem('images');
      const parsedImages = storedImages ? JSON.parse(storedImages) : [];
  
      const updatedImages = [...parsedImages, ...images];
  
      await AsyncStorage.setItem('images', JSON.stringify(updatedImages));
    } catch (error) {
      console.error('Error inserting images:', error);
    }
  };

  const loadImagesFromStorage = async () => {
    try {
      const storedImages = await AsyncStorage.getItem('images');
      const parsedImages = storedImages ? JSON.parse(storedImages) : [];
      setSelectedImages(parsedImages);
    } catch (error) {
      console.error('Error loading images from storage:', error);
    }
  };

  useEffect(() => {
    loadImagesFromStorage();
  }, []);

  const handleCancelEditMode = () => {
    setEditMode(false);
  }

  const handleAddPhotoPress = useCallback(async () => {
    try {
      setRefreshing(true);
  
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4],
        quality: 1,
        allowsMultipleSelection: true,
      });
  
      if (!result.cancelled && result.assets) {
        const newImages = result.assets.map((asset, index) => ({
          key: String(selectedImages.length + index + 1),
          uri: asset.uri,
          timestamp: Date.now(),
        }));
  
        setSelectedImages((prevImages) => [...prevImages, ...newImages]);
  
        insertImages(newImages);
      }
    } catch (error) {
      console.error('Error selecting images:', error);
    } finally {
      setRefreshing(false);
    }
  }, [selectedImages]);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    })();
  }, []);

  const handleImagePress = (uri, timestamp) => {
    setFocusedImage(uri);
    setFocusedImageInfo({ uri, dateTime: new Date(timestamp).toLocaleString() });
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setFocusedImage(null);
    setFocusedImageInfo(null);
  };

  const handleHoldPress = (uri) => {
    setEditMode(true);
    toggleImageSelection(uri);
  };  

  const toggleImageSelection = (uri) => {
    if (selectedDelete.includes(uri)) {
      setSelectedDelete((prevSelected) => prevSelected.filter((item) => item !== uri));
    } else {
      setSelectedDelete((prevSelected) => [...prevSelected, uri]);
    }
  };

const handleDeleteSelectedImages = async () => {
  setEditMode(false);

  try {
    const storedImages = await AsyncStorage.getItem('images');
    const parsedImages = storedImages ? JSON.parse(storedImages) : [];

    const updatedImages = parsedImages.filter((image) => !selectedDelete.includes(image.uri));

    await AsyncStorage.setItem('images', JSON.stringify(updatedImages));

    setSelectedImages(updatedImages);
    handleCloseModal();
  } catch (error) {
    console.error('Error deleting images:', error);
    Alert.alert('Failed to delete images. Please try again.');
  }

};


  const handleDeleteImage = async () => {
    try {
      if (focusedImageInfo && focusedImageInfo.uri) {
        const storedImages = await AsyncStorage.getItem('images');
        const parsedImages = storedImages ? JSON.parse(storedImages) : [];
  
        const updatedImages = parsedImages.filter((image) => image.uri !== focusedImageInfo.uri);
        await AsyncStorage.setItem('images', JSON.stringify(updatedImages));
  
        setSelectedImages(updatedImages);
        handleCloseModal();
      } else {
        console.error('Invalid image information for deletion.');
        Alert.alert('Failed to delete image. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      Alert.alert('Failed to delete image. Please try again.');
    }
  };

  const handleSaveImage = async () => {
    try {
      if (focusedImageInfo && focusedImageInfo.uri) {
        const asset = await MediaLibrary.createAssetAsync(focusedImageInfo.uri);
  
        if (asset) {
          const currentTime = new Date().toLocaleTimeString();
          const updatedFocusedImageInfo = { ...focusedImageInfo, time: currentTime };
  
          const albumName = 'Private';
          const album = await MediaLibrary.getAlbumAsync(albumName);
  
          if (album) {
            await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
            Alert.alert('Image saved to gallery!');
          } else {
            const newAlbum = await MediaLibrary.createAlbumAsync(albumName, asset, false);
            if (newAlbum) {
              Alert.alert('Image saved to gallery!');
            } else {
              console.log('Failed to create album. Please try again.');
            }
          }
        } else {
          console.log('Invalid image asset. Please try again.');
        }
      } else {
        console.log('Invalid image information. Please try again.');
      }
    } catch (error) {
      console.log('Failed to save image. Please try again.');
    }
  };  

  const renderDateBox = (dateTime) => {
    return (
      <View style={styles.dateContainer}>
        {focusedImageInfo && focusedImageInfo.dateTime ? (
          <View style={styles.info}>
            <Text style={styles.dateText}>{`${focusedImageInfo.dateTime}`}</Text>
            <Text style={styles.uriText}>{focusedImageInfo.uri}</Text>
          </View>
        ) : null}
      </View>
    );
  };

  const renderSaveDeleteButtons = () => {
    return (
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSaveImage}>
          <Text style={styles.buttonText}>Save to Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2} onPress={() => handleDeleteImage(focusedImage.uri)}>
          <Text style={styles.buttonText2}>Delete from App</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderNoPicturesButton = () => {
    if (selectedImages.length === 0) {
      return (
        <TouchableOpacity style={styles.noPicturesButton} onPress={handleAddPhotoPress}>
          <Text style={styles.noPicturesButtonText}>Add Pictures</Text>
          <Image source={require('../images/addIcon3.png')} style={styles.addButton2} />
        </TouchableOpacity>
      );
    }
    return null;
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#fff' : '#111' }]}>
      <StatusBar
        backgroundColor={isDarkMode ? '#222' : '#222'}
        barStyle={isDarkMode ? 'dark-content' : 'dark-content'}
      />
      <Header navigation={navigation} password={password} />
      {selectedImages.length === 0 && renderNoPicturesButton()}
      <FlatList
        data={selectedImages}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => (editMode ? toggleImageSelection(item.uri) : handleImagePress(item.uri, item.timestamp))}
            onLongPress={() => handleHoldPress(item.uri)}
            activeOpacity={.5}
          >
            <Image
              source={{ uri: item.uri }}
              style={[
                styles.selectedImage,
                {
                  borderColor: editMode && selectedDelete.includes(item.uri) ? 'white' : 'transparent',
                  borderWidth: editMode ? 2 : 0,
                },
              ]}
            />
          </TouchableOpacity>
        )}
        numColumns={3}
        refreshControl={<RefreshControl refreshing={refreshing} tintColor={'#f51'} />}
      />
      {editMode ? (
        <>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteSelectedImages}>
            <Text style={styles.deleteButtonText}>Delete Selected Photos.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton2} onPress={handleCancelEditMode}>
            <Text style={styles.deleteButtonText2}>Cancel Delete Proccess.</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity style={styles.addButton} onPress={handleAddPhotoPress}>
          <View style={styles.addView}>
            <Text style={styles.addButtonText}>Add Photo</Text>
            <Text style={styles.addButtonHr}>|</Text>
            <Text style={styles.addButtonDescr}>
              Tap to add photos from your gallery that you want to lock on the app (remember to delete the photos from the gallery if needed)
            </Text>
          </View>
        </TouchableOpacity>
      )}
      <Modal visible={isModalVisible} transparent={true} onRequestClose={handleCloseModal}>
        <StatusBar
          backgroundColor={isDarkMode ? '#000' : '#000'}
          barStyle={isDarkMode ? 'dark-content' : 'dark-content'}
        />
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
            <Text style={styles.addButtonText}>Close Photo</Text>
            <Text style={styles.addButtonHr}>|</Text>
            <Text style={styles.addButtonDescr}>
              Tap to close the photo and go to the main screen and watch other images on the app you added.
            </Text>
          </TouchableOpacity>
          <Image source={{ uri: focusedImageInfo ? focusedImageInfo.uri : null }} style={styles.modalImage} />
          <View style={styles.box}>
            <Text>
              {renderDateBox(focusedImageInfo ? focusedImageInfo.dateTime : null)}
            </Text>
            <Text style={styles.boxText}>
              {renderSaveDeleteButtons()}
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Main;
