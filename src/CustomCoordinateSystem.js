import React, {useRef, useState, useEffect} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, PanResponder } from 'react-native';

const CustomCoordinateSystem = ({ coordinates }) => {
    
    const [coordinates1, setCoordinates1] = useState([
        { x: 0, y: 0 },
      ]);

    const [containerWidth, setContainerWidth] = useState(0);
    const [containerHeight, setContainerHeight] = useState(0);
    const [componentPosition, setComponentPosition] = useState({ x: 0, y: 0 });

    const containerRef = useRef(null);
    const panResponder = useRef(null);

    const measureContainer = (event) => {
        const { width, height } = event.nativeEvent.layout;
        setContainerWidth(width);
        setContainerHeight(height);
        console.log('measureContainer -> width = ',width, ', height = ', height);
        
        containerRef.current.measure((fx, fy, width, height, px, py) => {
            setComponentPosition({ x: px, y: py });
            console.log('component position = (',px,',',py,')');
          });

      };

      const handleTap = async (event) => {
        const touch = event.nativeEvent;
        const x = containerWidth - touch.locationX;
        const y = touch.locationY;
        console.log('coords -> (', x,',',y,')');
        setCoordinates1((prevCoordinates) => [...prevCoordinates, { x, y }]);
      };

      useEffect(() => {
        panResponder.current = PanResponder.create({
          onStartShouldSetPanResponder: () => true,
          onMoveShouldSetPanResponder: () => true,
          onPanResponderEnd: (evt, gestureState) => {
            console.log('onPanResponderEnd');
          },
          onPanResponderMove: (evt, gestureState) => {
            const touch = evt.nativeEvent;
            const xd = containerWidth - touch.locationX;
            const yd = touch.locationY;
            const screenY = yd + componentPosition.y;
            
            console.log('touch.pageX=',touch.pageX, ',touch.pageY=',touch.pageY);

            const x = Math.round(xd);
            const y = Math.round(yd);
            // Check if the touch coordinates are within the component bounds
            //if (x >= 0 && x <= containerWidth && y >= 0 && y <= containerHeight) {
            // since y>=0 is not working, so using the screen coordinate to restrict
            //if (x >= 0 && x <= containerWidth && touch.pageY >= componentPosition.y && y <= containerHeight) {
            if (touch.pageX >= componentPosition.x && touch.pageX <= componentPosition.x + containerWidth 
                && touch.pageY >= componentPosition.y && touch.pageY <= componentPosition.y + containerHeight) {
                console.log('component y = ', y, ', screen y = ', screenY);
            setCoordinates1((prevCoordinates) => [...prevCoordinates, { x, y }]);
            }
          },
        });
      }, [containerWidth, containerHeight, componentPosition]);

  return (
    <View style={styles.container} ref={containerRef}
    onLayout={measureContainer}  onPress={handleTap} {...panResponder.current?.panHandlers} >
      {coordinates1.map((coord, index) => (
        <View
          key={index}
          style={[
            styles.element,
            {
              right: coord.x,
              top: coord.y,
            },
          ]}
        >
          <Text>{`(${coord.x}, ${coord.y})`}</Text>
        </View>
      ))}
      <TouchableOpacity style={styles.touchableArea} onPress={handleTap} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
  },
  element: {
    position: 'absolute',
    backgroundColor: 'orange',
    padding: 8,
    borderRadius: 4,
  },
  touchableArea: {
    flex: 1,
  },
});

export default CustomCoordinateSystem;
