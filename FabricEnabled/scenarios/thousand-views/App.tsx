import React from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  container: {flexDirection: 'row', flexWrap: 'wrap'},
  view: {
    height: 2,
    width: 1,
    margin: 1,
    backgroundColor: 'purple',
  },
  textContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 50,
    textAlign: 'center',
  },
});

const App = () => {
  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          {Array(10000)
            .fill(null)
            .map((_, index) => (
              <View key={index} style={styles.view} testID={`VIEW_${index}`} />
            ))}
        </View>
      </ScrollView>
    </>
  );
};

export default App;
