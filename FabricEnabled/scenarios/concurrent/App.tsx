/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {Text, StyleSheet, View, Button, Switch} from 'react-native';

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: 'black',
  },
});

const SlowUI = React.memo(({value}: {value: number}) => (
  <>
    <Text style={styles.text}>SLOW UI Value: {value}</Text>
    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
      {Array(30000)
        .fill(1)
        .map((_, index) => (
          <View
            key={index}
            style={{width: 1, height: 1, backgroundColor: 'green'}}
          />
        ))}
    </View>
  </>
));

const WithStartTransition = () => {
  const [value, setValue] = React.useState(0);
  const [deferredValue, setDeferredValue] = React.useState(0);
  const [isPending, startTransition] = React.useTransition();

  const handleClick = () => {
    const newValue = value + 1;
    setValue(newValue);
    startTransition(() => {
      setDeferredValue(newValue);
    });
  };

  return (
    <>
      <Button onPress={handleClick} title="Increment value" />
      <Text style={styles.text}>Value: {value}</Text>
      <Text style={styles.text}>
        DeferredValue: {deferredValue} {isPending ? 'PENDING' : ''}
      </Text>
      <SlowUI value={deferredValue} />
    </>
  );
};

const WithoutStartTransition = () => {
  const [value, setValue] = React.useState(0);

  const handleClick = () => {
    setValue(value + 1);
  };

  return (
    <>
      <Button onPress={handleClick} title="Increment value" />
      <Text style={styles.text}>Value: {value}</Text>
      <SlowUI value={value} />
    </>
  );
};

const App = () => {
  const [enabled, setEnabled] = React.useState(false);

  return (
    <>
      <View style={{flexDirection: 'row', padding: 30}}>
        <Text style={{color: 'black', fontSize: 20}}>
          Using concurrent features: {enabled ? 'YES' : 'NO'}
        </Text>
        <Switch onValueChange={setEnabled} value={enabled} />
      </View>
      <View style={{padding: 30}}>
        {enabled ? <WithStartTransition /> : <WithoutStartTransition />}
      </View>
    </>
  );
};

export default App;
