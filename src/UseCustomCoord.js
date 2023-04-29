import React from 'react';
import { SafeAreaView } from 'react-native';
import CustomCoordinateSystem from './CustomCoordinateSystem';

const UseCustomCoord = () => {
  const coordinates = [
    { x: 20, y: 20 },
    { x: 60, y: 40 },
    { x: 100, y: 80 },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomCoordinateSystem coordinates={coordinates} />
    </SafeAreaView>
  );
};

export default UseCustomCoord;



