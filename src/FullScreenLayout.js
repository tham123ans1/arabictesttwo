import React, {useState} from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import WriteComp from './WriteComp';
import UseCustomCoord from './UseCustomCoord';
import WriteComp1 from './WriteComp1';
import WriteComp2 from './WriteComp2';

const FullScreenLayout = () => {

    const [scrollCounter, setScrollCounter] = useState(0);

    const handleScroll = () => {
        // Logic to handle scroll
        console.log('Parent scroll called');
        setScrollCounter((prevScrollCounter) => prevScrollCounter + 1);
      };

      const writeComp2Ids = Array(12)
        .fill(null)
        .map((_, index) => `write_comp_2_id_${index}`);

  return (
    <View style={styles.container}>
      {/*<View style={[styles.view, { backgroundColor: 'red' }]} />*/}
      <ScrollView contentContainerStyle={styles.scrollViewContent} onScroll={handleScroll}
        scrollEventThrottle={16}>
        {writeComp2Ids.map((id, index) => (
        <View key={id} style={[styles.view ]}> 
            <WriteComp2 id={id} updateComponentPositionKey={scrollCounter} />
        </View>
        ))}
      </ScrollView>
    </View>
  );
};

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  view: {
    height: 400,
    width: '100%',
    backgroundColor: 'blue', 
    marginTop:100,
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
});

export default FullScreenLayout;
