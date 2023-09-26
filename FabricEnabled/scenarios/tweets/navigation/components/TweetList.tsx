import React from 'react';
import {ScrollView, View} from 'react-native';
import {Feed, Tweet} from '../Tweet';
import {TweetItem} from './TweetItem';

const ItemSeparatorComponent = () => (
  <View style={{height: 1, backgroundColor: '#eee', marginVertical: 10}} />
);

const renderItem = ({item}: {item: Tweet}) => <TweetItem tweet={item} />;
const keyExtractor = ({id}: Tweet) => id;

export const TweetList = ({feed}: {feed: Feed}) => {
  return (
    <ScrollView
      style={{
        backgroundColor: 'white',
      }}>
      <View style={{paddingVertical: 10}}>
        {feed.tweets.map((item, index) => (
          <React.Fragment key={index}>
            {renderItem({item})}
            <ItemSeparatorComponent />
          </React.Fragment>
        ))}
      </View>
    </ScrollView>
  );

  // return (
  //   <FlashList
  //     estimatedItemSize={360}
  //     contentContainerStyle={{
  //       paddingVertical: 10,
  //       backgroundColor: 'white',
  //     }}
  //     ItemSeparatorComponent={ItemSeparatorComponent}
  //     keyExtractor={keyExtractor}
  //     renderItem={renderItem}
  //     data={feed.tweets}
  //     contentInsetAdjustmentBehavior="automatic"
  //   />
  // );
};
