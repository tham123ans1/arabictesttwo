/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'react-native';
import Flex from './Flex';
import FullScreenLayout from './FullScreenLayout';
import StartingPoint from './StartingPoint';
import TestingPoint from './TestingPoint';

const App = () => {
  return (
    <View style={[
      styles.container,
      ]}>
      <TestingPoint/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default App;
