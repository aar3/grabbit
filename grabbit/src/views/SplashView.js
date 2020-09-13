import React from 'react';
import {StyleSheet, View, Image} from 'react-native';

import {Color} from 'grabbit/src/const';

export default class SplashView extends React.Component {
  render() {
    return (
      <View style={styles.SplashView}>
        <View style={styles.SplashView__Image}>
          <Image
            source={require('../../assets/imgs/Grabbit_White_Letters_222x1000.png')}
            style={{flex: 1, height: undefined, width: undefined}}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  SplashView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.Pink2,
  },
  SplashView__Image: {
    // borderWidth: 1,
    // borderColor: 'red',
    width: 320,
    height: 70,
    marginBottom: 50,
  },
});
