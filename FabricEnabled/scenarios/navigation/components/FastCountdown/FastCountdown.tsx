import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  Days,
  Hours,
  Minutes,
  Seconds,
  useStartCountdown,
} from './useFastCountdown';

const styles = StyleSheet.create({
  container: {width: 50, alignItems: 'center'},
  value: {color: 'white', fontWeight: 'bold', fontSize: 20},
  text: {color: 'white'},
});

const FastCountdownItem = ({Value, text}: {Value: any; text: string}) => (
  <View style={styles.container}>
    <Text style={styles.value}>
      <Value />
    </Text>
    <Text style={styles.text}>{text}</Text>
  </View>
);

const StartCountdown = () => {
  useStartCountdown();

  return null;
};

export const FastCountdown = () => (
  <>
    <StartCountdown />
    <FastCountdownItem Value={Days} text="Days" />
    <FastCountdownItem Value={Hours} text="Hours" />
    <FastCountdownItem Value={Minutes} text="Min" />
    <FastCountdownItem Value={Seconds} text="Sec" />
  </>
);
