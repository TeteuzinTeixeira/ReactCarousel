import React, {useState,useRef} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Animated } from 'react-native';

import OnboardingItem from './OnboardingItem';
import slides from '../../slides';

export default function Onboarding() {
    const [currentIndex, setCurrentindex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef(null)
    const viewableItemsChanged = useRef(({viewableItems}) => {
        setCurrentindex(viewableItems[0].index);
    }).current;

  return (
    <View style={styles.container}>
        <View style={{flex:3}}>
            <FlatList
            data={slides}
            renderItem={({item}) => <OnboardingItem item={item}/>}
            horizontal
            showHorizontalScrollIndicator
            padingEnabled
            bouces={false}
            keyExtractor={(item)=>item.id}
            onScroll={Animated.event([{nativeEvent: {contentOffset: {x:scrollX}}}], {useNativeDriver:false,})}

            scrollEventThrottle={32}
            onViewableItemsChanged={viewableItemsChanged}
            ref={slidesRef}
            />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
