import React from 'react';
import {StyleSheet, Text, View, FlatList, Image} from 'react-native';

import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Feather';

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
            data={brands}
            keyExtractor={(_item, index) => index.toString()}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: 'red',
                    width: '100%',
                    height: 60,
                  }}></View>
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
