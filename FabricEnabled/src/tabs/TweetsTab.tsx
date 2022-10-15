import React from 'react';
import {Image, Text, View} from 'react-native';
import {useQuery} from 'react-query';
import {getUser, getUserStats} from '../Api';
import {ListContainer, SkeletonContainer} from '../ListContainer';
import {TweetList} from '../components/TweetList';
import {AnimatedReactNativeEU} from '../components/AnimatedReactNativeEU';
import {useFeed} from '../feed/useFeed';
import {FastCountdown} from '../components/FastCountdown/FastCountdown';

const UserHeader = () => {
  const {data: user} = useQuery('user', getUser);
  const {data: userStats} = useQuery('useStats', getUserStats);

  return (
    <View style={{flexDirection: 'row', padding: 10}}>
      <Text style={{color: 'black'}}>
        {user?.tweetCount} Tweets from{' '}
        <Text style={{fontWeight: 'bold'}}>{user?.name} 👇</Text>
      </Text>
    </View>
  );
};

const ReactNativeEUBanner = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#282C34',
      }}>
      <Image
        source={{uri: 'https://marmelab.com/images/blog/react.png'}}
        style={{height: 100, width: 100, marginHorizontal: 10}}
      />
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          padding: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <FastCountdown />
        </View>

        <Text
          style={{
            color: '#61DAFB',
            fontWeight: '600',
            marginTop: 10,
          }}>
          {' '}
          until React Native's birthday 🎂
        </Text>
      </View>
    </View>
  );
};

export const TweetsTab = () => {
  const feed = useFeed();

  return (
    <>
      <UserHeader />
      <View style={{flex: 1, backgroundColor: 'white'}}>
        {feed.isLoading ? <SkeletonContainer /> : <TweetList feed={feed} />}
      </View>
      <ReactNativeEUBanner />
    </>
  );
};
