import React, {memo} from 'react';
import {Image} from 'react-native';

export const AnimatedReactNativeEU = memo(() => (
  <Image
    style={{height: 100, width: 100}}
    source={require('./animation.gif')}
  />
));
