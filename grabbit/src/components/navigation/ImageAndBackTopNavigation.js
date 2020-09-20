import React from 'react';
import {View} from 'react-native';

import {styles} from 'grabbit/src/components/navigation/BasicTopNavigation';
import {ImageButton, BackButton} from 'grabbit/src/components/navigation/buttons';
import {FakeImage} from 'grabbit/src/const';

export default class ImageAndBackTopNavigationBar extends React.Component {
  render() {
    return (
      <View style={styles.BasicTopNavigation__ContentContainer}>
        <View style={styles.BasicTopNavigation__ContentContainer__CenterContent}>
          <BackButton />
        </View>
        <View style={styles.BasicTopNavigation__ContentContainer__CenterContent}>
          {<ImageButton imageURI={FakeImage} onPress={() => console.log('image button clicked')} />}
        </View>
      </View>
    );
  }
}
