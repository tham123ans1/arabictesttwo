import React, {useRef, useState, useEffect, useCallback} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, PanResponder, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Svg, {Path} from 'react-native-svg';

var startOfTap = true;

//this is first commit

const WriteComp2 = ({ id, updateComponentPositionKey }) => {

    const [path, setPath] = useState('');
    const [scrolled1, setScrolled1] = useState(0);

    const pathRef = useRef('');
    

    const updateComponentPosition = useCallback(() => {
        console.log('updateComponentPosition called');
        containerRef.current.measure((fx, fy, width, height, px, py) => {
          componentPositionRef.current = { x: px, y: py }; // Update the ref value
          console.log('component position after scroll = (', px, ',', py, ')', ', (width=', width,',height=',height,')');
        });
      }, []);


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
            console.log('component position = (',px,',',py,')','(width=', width,',height=',height,')');
          });

      };

      const handleTap = async (event) => {
        const touch = event.nativeEvent;
        const x = containerWidth - touch.locationX;
        const y = touch.locationY;
        console.log('coords -> (', x,',',y,')');
        setCoordinates1((prevCoordinates) => [...prevCoordinates, { x, y }]);
      };

      const createTransformedPath = (originalPath) => {
        const modifiedPath = originalPath.replace(/([ML])(\d+(\.\d+)?)/g, (match, letter, x) => {
          const transformedX = containerWidthRef.current - parseFloat(x);
          return `${letter}${transformedX}`;
        });
    
        return modifiedPath;
      };

      useEffect(() => {
        panResponder.current = PanResponder.create({
          onStartShouldSetPanResponder: () => true,
          onMoveShouldSetPanResponder: () => true,
          onPanResponderGrant: (evt) => {
            const touch = evt.nativeEvent;
            // Handle your tap event here
            console.log('Tap event:', touch.pageX, touch.pageY);

            const relativeX = touch.pageX - componentPositionRef.current.x;
            const relativeY = touch.pageY - componentPositionRef.current.y;

            console.log('Tap event relative coordinates:', relativeX, relativeY);

            const currentContainerWidth = containerWidthRef.current; // Use the ref value
            const xd = currentContainerWidth - touch.locationX; 
            const yd = touch.locationY;

            const x = Math.round(xd);
            const y = Math.round(yd);
            const xTo = x+5;

            const newPath = `${pathRef.current} M ${x.toFixed(0)} ${y.toFixed(0)} L ${xTo.toFixed(0)} ${y.toFixed(0)}`;
            console.log(newPath);
            //const transformedPath = createTransformedPath(newPath);
            setPath(newPath);
            pathRef.current = newPath;


          },
          onPanResponderEnd: (evt, gestureState) => {
            //console.log('onPanResponderEnd');
            startOfTap = true;
          },
//          onResponderTerminationRequest: () => false,
          onPanResponderMove: (evt, gestureState) => {
            const touch = evt.nativeEvent;
            
            const currentComponentPosition = componentPositionRef.current; // Use the ref value
            const currentContainerWidth = containerWidthRef.current; // Use the ref value
            const currentContainerHeight = containerHeightRef.current; // Use the ref value
      
            const xd = currentContainerWidth - touch.locationX; //x coordinate start from right side for arabic

            //const xd = touch.locationX; //x coordinate start from right side for arabic
            
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
            
            //console.log('currentContainerWidth = ', currentContainerWidth);
            //console.log('currentContainerHeight = ', currentContainerHeight);
            
            const maxX = currentComponentPosition.x + currentContainerWidth;
            const maxY = currentComponentPosition.y + currentContainerHeight;
            // console.log (
            //     pageX, '>=', currentComponentPosition.x,'&&', pageX,' <=', maxX, 
            //     '&&', pageY,' >=', currentComponentPosition.y,' &&', pageY, '<=', maxY
            // );



            if ( pageX >= currentComponentPosition.x && pageX <= maxX 
                && pageY >= currentComponentPosition.y && pageY <= maxY) {
                console.log('inside condition : ', 'x = ', x, ', y = ', y);
                setCoordinates1((prevCoordinates) => [...prevCoordinates, { x, y }]);
                if (startOfTap === true) {
                    //console.log('startOfTap');
                    const xTo = x + 4;
                    //const yTo = y + 1;
                    //const newPath = `${pathRef.current} M ${x.toFixed(0)} ${y.toFixed(0)} L ${xTo.toFixed(0)} ${y.toFixed(0)}`;
                    const newPath = `${pathRef.current} M ${x.toFixed(0)} ${y.toFixed(0)}`;
                    console.log(newPath);
                    //const transformedPath = createTransformedPath(newPath);
                    setPath(newPath);
                    //setPath(newPath);
                    pathRef.current = newPath; // Update the ref value
                    //console.log(newPath);
                    startOfTap = false;
                } else {
                    //console.log('not startOfTap');

                    const newPath = `${pathRef.current} L ${x.toFixed(0)} ${y.toFixed(0)}`;
                    //const transformedPath = createTransformedPath(newPath);
                    setPath(newPath);
                    //setPath(newPath);
                    pathRef.current = newPath; // Update the ref value
                    //console.log(newPath);
                }
            }
          },
        });

      

        updateComponentPosition();

      }, [containerWidth, containerHeight, path, updateComponentPosition, updateComponentPositionKey]);

      useEffect(() => {
        console.log(id + ' --> WriteComp2.useEffect[id] CALLED ONCE ONCE ONCE ONCE ONCE ONCE ONCE ONCE ONCE ONCE ONCE ONCE ONCE ONCE ONCE ONCE ONCE ONCE ONCE ONCE ONCE ONCE ONCE ONCE ONCE ONCE ')
        
        
        async function loadData(key) {
          const isReactNative1 = typeof navigator !== 'undefined' && navigator.product === 'ReactNative';
          console.log('isReactNative1 ', isReactNative1);
          if (isReactNative1) {
            return AsyncStorage.getItem(key);
          } else {
            return new Promise((resolve, reject) => {
              try {
                const value = window.localStorage.getItem(key);
                resolve(value);
                console.log('loadData Success', value);
              } catch (error) {
                console.log('loadData Error', error);
                reject(error);
              }
            });
          }
        }
        
        // Load the path from AsyncStorage for the given id when the component mounts
        const loadPath = async () => {
          try {
            
            //const storedPath = await AsyncStorage.getItem(id+'_path');
            const storedPath = await loadData(id+'_path');

            if (storedPath) {
              console.log(storedPath);
              setPath(storedPath);
              pathRef.current = storedPath;
            } else {
                console.log(id+' key is not found');
            }
          } catch (error) {
            console.error('Error while loading path:', error);
          }
        };
    
        loadPath();

    },[id]);

      const savePath = async () => {
        try {
            console.log('savePath called*****************************************************');
          const key = `${id}_path`;
          console.log('***********************PATH to store*****************');
          console.log(path);
          console.log('************************END***************');
          
          //await AsyncStorage.setItem(key, path);
          await saveData(key, path);
          
          //Alert.alert('Success', 'Path saved successfully!');
          if (isReactNative) {
            Alert.alert('Success', 'Path saved successfully!');
          } else {
            window.alert('Path saved successfully!');
          }
          
        } catch (error) {
          console.error('Error while saving path:', error);
          Alert.alert('Error', 'Failed to save the path');
        }
      };


      const isReactNative = typeof navigator !== 'undefined' && navigator.product === 'ReactNative';

async function saveData(key, value) {
  if (isReactNative) {
    return AsyncStorage.setItem(key, value);
  } else {
    return new Promise((resolve, reject) => {
      try {
        window.localStorage.setItem(key, value);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
}



  return (
    <View style={styles.container} ref={containerRef} onLayout={measureContainer}>
          {/*transform={`scale(-1, 1) translate(-${containerWidthRef.current}, 0)`}*//*this  line works for android*/ }
          <View style={styles.drawingArea} {...panResponder.current?.panHandlers}>
            <Svg width={'100%'} height={'100%'} transform={`scale(-1, 1)`}>
              <Path d={path} fill="none" stroke="black" strokeWidth="7" />
            </Svg>
          </View>

      <TouchableOpacity style={styles.saveButton} onPress={savePath}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
  },
  drawingArea: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
  saveButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#2196F3',
    borderRadius: 4,
    padding: 10,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default WriteComp2;
