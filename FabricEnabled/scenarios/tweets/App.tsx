import React, {useEffect, useState} from 'react';
import {Button} from 'react-native';
import {getTweets} from '../navigation/Api';
import {TweetList} from '../navigation/components/TweetList';
import {Tweet} from '../navigation/Tweet';

const TWEET_COUNT = 100;

const App = () => {
  const [show, setShow] = useState(false);
  const [tweets, setTweets] = useState<Tweet[]>([]);

  useEffect(() => {
    getTweets().then(apiTweets =>
      setTweets(apiTweets.slice(1, TWEET_COUNT + 1)),
    );
  }, []);

  if (tweets.length === 0) {
    return null;
  }

  return show ? (
    <TweetList feed={{tweets, isLoading: false}} />
  ) : (
    <Button title="SHOW TWEETS" onPress={() => setShow(true)} />
  );
};

export default App;
