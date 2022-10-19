import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {text} from './text';

const styles = StyleSheet.create({
  container: {flexDirection: 'row', flexWrap: 'wrap'},
  text: {
    color: 'black',
    fontSize: 10,
  },
});

const App = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        {Array(2000)
          .fill(null)
          .map((_, index) => (
            <Text key={index} style={styles.text}>
              {text[index]}
            </Text>
          ))}
      </View>
    </ScrollView>
  );
};

export default App;
