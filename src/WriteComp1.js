import React, {useRef, useState, useEffect} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, PanResponder } from 'react-native';

const WriteComp1 = ({ coordinates }) => {
    
    const [coordinates1, setCoordinates1] = useState([
        { x: 0, y: 0 },
      ]);

    const [containerWidth, setContainerWidth] = useState(0);
    const [containerHeight, setContainerHeight] = useState(0);

    //const [componentPosition, setComponentPosition] = useState({ x: 0, y: 0 });
    const componentPositionRef = useRef({ x: 0, y: 0 });

    const containerWidthRef = useRef(0);
    const containerHeightRef = useRef(0);


    const containerRef = useRef(null);
    const panResponder = useRef(null);

    const measureContainer = (event) => {
        const { width, height } = event.nativeEvent.layout;
        setContainerWidth(width);
        setContainerHeight(height);
        containerWidthRef.current = width;
        containerHeightRef.current = height;

        console.log('measureContainer -> width = ',width, ', height = ', height);
        
        containerRef.current.measure((fx, fy, width, height, px, py) => {
            //setComponentPosition({ x: px, y: py });
            componentPositionRef.current = { x: px, y: py }; // Update the ref value
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
            
            const currentComponentPosition = componentPositionRef.current; // Use the ref value
            const currentContainerWidth = containerWidthRef.current; // Use the ref value
            const currentContainerHeight = containerHeightRef.current; // Use the ref value
      
            const xd = currentContainerWidth - touch.locationX; //x coordinate start from right side for arabic
            const yd = touch.locationY;


            const screenY = yd + currentComponentPosition.y;
            const pageX = Math.round(touch.pageX);
            const pageY = Math.round(touch.pageY);

            console.log('touch.pageX=',pageX, ',touch.pageY=',pageY);

            const x = Math.round(xd);
            const y = Math.round(yd);
            // Check if the touch coordinates are within the component bounds
            //if (x >= 0 && x <= containerWidth && y >= 0 && y <= containerHeight) {
            // since y>=0 is not working, so using the screen coordinate to restrict
            //if (x >= 0 && x <= containerWidth && touch.pageY >= componentPosition.y && y <= containerHeight) {
            
            console.log('currentContainerWidth = ', currentContainerWidth);
            console.log('currentContainerHeight = ', currentContainerHeight);
            
            const maxX = currentComponentPosition.x + currentContainerWidth;
            const maxY = currentComponentPosition.y + currentContainerHeight;
            console.log (
                pageX, '>=', currentComponentPosition.x,'&&', pageX,' <=', maxX, 
                '&&', pageY,' >=', currentComponentPosition.y,' &&', pageY, '<=', maxY
            );



            if ( pageX >= currentComponentPosition.x && pageX <= maxX 
                && pageY >= currentComponentPosition.y && pageY <= maxY) {
                console.log('x = ', x, ', y = ', y);
            setCoordinates1((prevCoordinates) => [...prevCoordinates, { x, y }]);
            }
          },
        });
      }, [containerWidth, containerHeight]);

  return (
    <View style={styles.container} ref={containerRef}
    onLayout={measureContainer}  {...panResponder.current?.panHandlers} >
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
      <TouchableOpacity style={styles.touchableArea}  />
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

export default WriteComp1;
