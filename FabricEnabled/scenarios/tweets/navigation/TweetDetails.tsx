import React from 'react';
import {useRoute} from '@react-navigation/native';
import {useMemo} from 'react';
import {TweetList} from './components/TweetList';
import {useFeed} from './feed/useFeed';

export const TweetDetails = () => {
  const {tweetId} = useRoute().params;
  const {tweets, isLoading} = useFeed();
  const feedStartingWithCurrentTweet = useMemo(
    () => ({
      tweets:
        tweets.slice(tweets.findIndex(tweet => tweet.id === tweetId)) || [],
    }),
    [tweets, tweetId],
  );

  return isLoading ? null : <TweetList feed={feedStartingWithCurrentTweet} />;
};
