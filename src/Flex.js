/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import WriteComp from './WriteComp';

//const { height } = Dimensions.get('window');
//const boxSize = height / 10;

const Flex = () => {
  const [boxSize, setBoxSize] = useState(Dimensions.get('window').height / 3);
  const [height, setHeight] = useState(Dimensions.get('window').height);

  useEffect(() => {
    const updateBoxSize = () => {
      console.log('Dim change', Dimensions.get('window').height);
      setBoxSize(Dimensions.get('window').height / 3);
      setHeight(Dimensions.get('window').height);

    };

    Dimensions.addEventListener('change', updateBoxSize);

    return () => {
      Dimensions.removeEventListener('change', updateBoxSize);
    };
  }, []);

  return (
    <View style={[styles.container, {height : height}]}>
      <View style={[styles.box1, { backgroundColor: 'red', height: boxSize, width: '100%' }]} />
      <View style={[styles.box2, { backgroundColor: 'green', height: boxSize, width: '100%' }]} />
      <View style={[styles.box3, { backgroundColor: 'blue', height: boxSize, width: '100%' }]}>
        <WriteComp/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  box1: {
    marginTop: 10,
  },

});

export default Flex;
