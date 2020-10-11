import React from 'react';
import {StyleSheet, Text, View, FlatList, Image, TouchableOpacity} from 'react-native';

import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Feather';

import {Color} from 'grabbit/src/const';
import REDUX_ACTIONS from 'grabbit/src/actions';

class V extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {brands, setCurrentBrand} = this.props;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '100%',
          }}>
          <FlatList
            data={brands.all}
            keyExtractor={(_item, index) => index.toString()}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity onPress={() => {}}>
                  <View
                    style={{
                      // borderWidth: 1,
                      // borderColor: 'red',
                      width: '100%',
                      height: 80,
                      alignItems: 'center',
                      flexDirection: 'row',
                      borderBottomWidth: 1,
                      borderBottomColor: Color.LightGrey,
                    }}>
                    <View
                      style={{
                        height: 60,
                        width: 60,
                        marginLeft: 20,
                        borderRadius: 100,
                        overflow: 'hidden',
                      }}>
                      <Image source={{uri: item.image_url}} style={{height: 60, width: 60}} />
                    </View>
                    <View
                      style={{
                        // borderWidth: 1,
                        // borderColor: 'green',
                        marginLeft: 20,
                      }}>
                      <Text>{item.name}</Text>
                    </View>
                    <Icon
                      name="chevron-right"
                      color={Color.LightGrey}
                      size={20}
                      style={{
                        position: 'absolute',
                        right: 20,
                      }}
                    />
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentBrand: ({brandId}) => {
      return dispatch({
        type: REDUX_ACTIONS.SET_CURRENT_BRAND,
        payload: brandId,
      });
    },
  };
};

const mapStateToProps = (state) => {
  const {brokerDiscover} = state;
  return {
    brands: brokerDiscover.brands,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(V);
