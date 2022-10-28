import * as React from 'react';
import {View, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from 'react-query';
import {Tabs} from './Tabs';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {TweetDetails} from './TweetDetails';

const queryClient = new QueryClient();

export default function App() {
  const [renderApp, setRenderApp] = React.useState(true);

  // This crashes otherwise - See https://github.com/software-mansion/react-native-screens/issues/1620
  const Stack =
    require('@react-navigation/native-stack').createNativeStackNavigator();

  return (
    <View style={{flex: 1}}>
      <SafeAreaProvider>
        <SafeAreaView style={{flex: 1}} edges={['top']}>
          {renderApp ? (
            <QueryClientProvider client={queryClient}>
              <NavigationContainer>
                <Stack.Navigator>
                  <Stack.Screen
                    name="Home"
                    component={Tabs}
                    options={{headerShown: false}}
                  />
                  <Stack.Screen
                    name="TweetDetails"
                    component={TweetDetails}
                    getId={({params}) => params?.tweetId}
                  />
                </Stack.Navigator>
              </NavigationContainer>
            </QueryClientProvider>
          ) : (
            <Button
              onPress={() => {
                setRenderApp(true);
              }}
              title="Render App"
            />
          )}
        </SafeAreaView>
      </SafeAreaProvider>
    </View>
  );
}
