import {isWeekend} from 'date-fns';
import {Tweet} from '../Tweet';

export const filterTweets = (tweets: Tweet[]) => {
  return tweets.filter(tweet => !isWeekend(new Date(tweet.createdAt)));
};
