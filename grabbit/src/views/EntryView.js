import React from 'react';
import {Text, View, Image, ImageBackground} from 'react-native';

import {Actions} from 'react-native-router-flux';
import {Button} from 'react-native-elements';

import {Color} from 'grabbit/src/const';

export default class V extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: Color.Pink2,
        }}>
        <ImageBackground
          style={{
            flex: 1,
            width: '110%',
            resizeMode: 'cover',
            justifyContent: 'center',
          }}
          source={require('../../assets/imgs/Gradient_Purple_Pink_Background_583x1258.png')}>
          <View
            style={{
              // borderWidth: 1,
              // borderColor: 'green',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 300,
            }}>
            <View
              style={{
                // borderWidth: 1,
                // borderColor: 'red',
                width: 320,
                height: 70,
                marginBottom: 10,
              }}>
              <Image
                source={require('../../assets/imgs/Grabbit_White_Letters_222x1000.png')}
                style={{flex: 1, height: undefined, width: undefined}}
              />
            </View>
            <Text
              style={{
                color: Color.White,
                fontWeight: 'bold',
                fontSize: 22,
                textAlign: 'center',
                marginBottom: 200,
              }}>
              {'Products. For. Promo.'}
            </Text>

            <View
              style={{
                width: '80%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  marginBottom: 20,
                  color: Color.White,
                  textAlign: 'center',
                  fontSize: 10,
                }}>
                {
                  'By tapping Create Account or Sign In, you agree to our Terms. Learn how we process your data in Privacy Policy'
                }
              </Text>
            </View>

            <View
              style={{
                // borderColor: 'red',
                // borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}>
              <Button
                style="outline"
                buttonStyle={{
                  width: 300,
                  height: 50,
                  justifyContent: 'center',
                  backgroundColor: Color.White,
                  alignItems: 'center',
                  borderRadius: 10,
                  marginBottom: 10,
                }}
                titleStyle={{
                  color: Color.Pink2,
                  fontWeight: 'bold',
                  fontSize: 16,
                }}
                title="Grabber"
                onPress={() => Actions.brokerEntryView()}
              />

              <Button
                style="outline"
                buttonStyle={{
                  width: 300,
                  height: 50,
                  borderWidth: 1,
                  backgroundColor: null,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderColor: Color.White,
                  borderRadius: 10,
                  marginBottom: 10,
                }}
                titleStyle={{
                  color: Color.White,
                  fontWeight: 'bold',
                  fontSize: 16,
                }}
                title="Merchant"
                onPress={() => Actions.merchantEntryView()}
              />
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
