import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TopSaveLoadCtrl = () => {


    const checkStorageSize = async () => {
        try {
          const keys = await AsyncStorage.getAllKeys();
          let totalSize = 0;
          let keyCollections = '';
          for (const key of keys) {
            const value = await AsyncStorage.getItem(key);
            totalSize += value ? value.length : 0;
            keyCollections += key + ',';
          }
    
          Alert.alert('Storage Size', `The total size of AsyncStorage is ${totalSize} characters. And key collections are ${keyCollections}`);
        } catch (error) {
          console.error('Error while checking storage size:', error);
          Alert.alert('Error', 'Failed to check the storage size');
        }
      };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>TopSaveLoadCtrl --- next</Text>
            <TouchableOpacity style={styles.button} onPress={checkStorageSize}>
                <Text style={styles.buttonText}>Check Storage Size</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
      color: 'white',
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
      },
    button: {
        backgroundColor: '#2196F3',
        borderRadius: 4,
        padding: 8,
      },
      buttonText: {
        color: 'white',
      },
  });

export default TopSaveLoadCtrl;