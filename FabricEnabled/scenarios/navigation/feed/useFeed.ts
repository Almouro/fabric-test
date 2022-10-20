import {useQuery} from 'react-query';
import {getTweets} from '../Api';
import {Feed} from '../Tweet';
import {filterTweets} from './filterTweets';

export const useFeed = (): Feed => {
  const {data: tweets, isLoading} = useQuery('tweets', getTweets);

  return {
    tweets: filterTweets(tweets || []),
    isLoading,
  };
};
