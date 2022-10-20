import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/EvilIcons';
import {TweetsTab} from './tabs/TweetsTab';
import {LikesTab, MediaTab, RepliesTab} from './tabs/OtherTabs';

const Tab = createBottomTabNavigator();

export const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Tweets') {
            iconName = 'sc-twitter';
          } else if (route.name === 'Likes') {
            iconName = 'heart';
          } else if (route.name === 'Media') {
            iconName = 'camera';
          } else if (route.name === 'Replies') {
            iconName = 'comment';
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#035166',
        tabBarInactiveTintColor: '#0486aa60',
        header: () => null,
      })}>
      <Tab.Screen name="Tweets" component={TweetsTab} />
      <Tab.Screen name="Likes" component={LikesTab} />
      <Tab.Screen name="Media" component={MediaTab} />
      <Tab.Screen name="Replies" component={RepliesTab} />
    </Tab.Navigator>
  );
};
