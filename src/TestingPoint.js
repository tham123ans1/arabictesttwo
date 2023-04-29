import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FullScreenLayout  from './FullScreenLayout';
import TopSaveLoadCtrl from './TopSaveLoadCtrl'

const TestingPoint  = () => {
  
    return (
        <View style={[
            styles.container,
            ]}>
          <TopSaveLoadCtrl/>
          <FullScreenLayout/>
        </View>
            
       
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
      justifyContent: 'center',
    },
    box: {
      backgroundColor: 'green',
      padding: 20,
      borderRadius: 10,
    },
    text: {
      color : 'white',
      fontSize: 50,
    },
  });

  
export default TestingPoint;
