import React, {useMemo} from 'react';
import {useQuery} from 'react-query';
import {TweetList} from '../components/TweetList';
import {getLikes, getMedia, getReplies} from '../Api';

const getOtherTabs = ({queryName, queryFn, displayName}) => {
  const Component = () => {
    const {data: tweets, isLoading} = useQuery(queryName, queryFn);
    const feed = useMemo(() => ({tweets: tweets || []}), [tweets]);

    return isLoading ? null : <TweetList feed={feed} />;
  };

  Component.displayName = displayName;

  return Component;
};

export const LikesTab = getOtherTabs({
  queryName: 'likes',
  displayName: 'LikesTab',
  queryFn: getLikes,
});
export const MediaTab = getOtherTabs({
  queryName: 'media',
  displayName: 'MediaTab',
  queryFn: getMedia,
});
export const RepliesTab = getOtherTabs({
  displayName: 'RepliesTab',
  queryName: 'replies',
  queryFn: getReplies,
});
