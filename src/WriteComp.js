/* eslint-disable prettier/prettier */
import React, {useState, useEffect, useRef, useReducer, useLayoutEffect} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
//import { Svg, Path /* any other components you need */ } from './SvgComponents';

import Svg, {Path} from 'react-native-svg-web';



var lastTouchDownX = -1;
var lastTouchDownY = -1;

var pageYMin = 0;
var pageYMax = 0;

var PreviousEndIndex = [];

const WriteComp = (props) => {

    console.log('******WriteComp******');
    const [path, setPath] = useState('M 0 0');
    const svgRef = useRef(null);
    useEffect( () => {

        svgRef.current.measure((x, y, width, height, pageX, pageY) => {
            pageYMin = pageY;
            pageYMax = pageY + height;
            
            console.log('useEffect -> pageY = ', pageY, 'height = ', height );
            console.log('x=',x,'y=',y,'width=',width,'height=',height,'pageX=',pageX,'pageY=',pageY);
          });

        const loadDrawing = async () => {
            PreviousEndIndex = [];
        };
        loadDrawing();

    }, [props]);

  
    useLayoutEffect( () => {
        console.log("useLayoutEffect");
        const timeoutId = setTimeout(() => {
            svgRef.current.measure((x, y, width, height, pageX, pageY) => {
              pageYMin = pageY;
              pageYMax = pageY + height;
              console.log('useLayoutEffect pageY = ', pageY, 'height = ', height )
            });
          }, 10);
          
         

        const loadDrawing = async () => {

            PreviousEndIndex = [];

        };
        loadDrawing();

        return () => {
            clearTimeout(timeoutId);
          };

    }, []);


const getLocalCoords = (elem, x, y) => {
    const rect = elem.getBoundingClientRect();
    return {
        x1: x - rect.left,
        y1: y - rect.top
    };
    };
    
  const handleTouchStart = event => {
    console.log('handleTouchStart called');
    const touch = event.nativeEvent.touches[0];
    const x = touch.locationX;
    const y = touch.locationY;
    //console.log(x,y);
    lastTouchDownX = x;
    lastTouchDownY = y;
    PreviousEndIndex[PreviousEndIndex.length] = path.length;
    
    const newPath = `${path} M ${x.toFixed(0)} ${y.toFixed(0)}`;
    setPath(newPath);
  };
  const handleTouchMove = async(event) => {
    console.log('*******WriteComp.handleTouchMove*****')
    const touch = event.nativeEvent.touches[0];
    const x = touch.locationX;
    const y = touch.locationY;
    
    if ( touch.pageY > pageYMin && touch.pageY < pageYMax ) {
        console.log('*******WriteComp.handleTouchMove*****   touch.pageY > pageYMin && touch.pageY < pageYMax')
        const newPath = `${path} L ${x.toFixed(0)} ${y.toFixed(0)}`;
        setPath(newPath);
    }
};

  const handleTap = async(event) => {
        const touch = event.nativeEvent;
        const x = touch.locationX;
        const y = touch.locationY;
        
        if (Math.floor(lastTouchDownX) === Math.floor(x) && Math.floor(lastTouchDownY) === Math.floor(y)) {
            //console.log('handleTap lastTouchDown are same');
            const xEnd = x + 10;
            const yEnd = y ;
            const newPath = `${path} M ${x.toFixed(0)} ${y.toFixed(0)} L ${xEnd.toFixed(0)} ${yEnd.toFixed(0)} `;
            setPath(newPath);
        }
    };

    
    const handleTouchEnd = async(event) => {
        console.log("handleTouchEnd");
        // const touch = event.nativeEvent.touches[0];
        // const x = touch.locationX;
        // const y = touch.locationY;
        // const newPath = `${path} M ${x} ${y}`;
        // setPath(newPath);
    };

  const onSave = async () => {

    console.log("onSave is called");
    //const FAL = FirestoreAccessLayer();
    //const answerDoc = await FAL.updateOrCreateSubDocument('answers', cuser?.id, cquestion?.id, cindex.toString(), {'student_answer' : path });
   // const questionId = cquestion?.id;
   // const userSave = await FAL.updateOrCreateDocument('Users', cuser?.id, { current_question: questionId, [questionId] : cindex});
   // console.log(userSave);
    //console.log(answerDoc);
  };

  const onClear = () => {

    console.log("onClear is called");
    setPath('');
    PreviousEndIndex = [];
  };

  const onUndo = () => {

    console.log("onUndo is called");
    setPath(path.slice(0, PreviousEndIndex[PreviousEndIndex.length - 1]));
    PreviousEndIndex = PreviousEndIndex.slice(0, PreviousEndIndex.length - 1);  //reduce the index (index -1)
    
  };

  return (
    <View style={{ flex: 1, backgroundColor:'grey' }}>
        <View ref={svgRef} style={{ flex: 1 }}>
            <Svg width={'100%'} height={'100%'} onTouchMove={handleTouchMove} onTouchStart={handleTouchStart} onPress={handleTap} onTouchEnd={handleTouchEnd} >
            <Path d={path} fill="none" stroke="white" strokeWidth="9" />
            </Svg>
        </View>
        <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
          
        </View>
    </View>
  );
};

export default WriteComp;
