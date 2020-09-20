import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Feather';

import {Color, UserType} from 'grabbit/src/const';
import REDUX_ACTIONS from 'grabbit/src/actions';

class ActivityTopNavigation extends React.Component {
  constructor(props) {
    super(props);
  }

  _deriveIconColor({sceneKey}) {
    const {currentSceneKey} = this.props;
    if (sceneKey === 'likedProducts|merchantProducts') {
      if (currentSceneKey === 'likedProducts' || currentSceneKey === 'merchantProducts') {
        return Color.Pink2;
      }
    }

    return currentSceneKey === sceneKey ? Color.Pink2 : Color.LightGrey;
  }

  render() {
    const {userType, setCurrentSceneKey} = this.props;
    return (
      <View style={styles.ActivityTopNavigation__ContentContainer}>
        <View style={styles.ActivityTopNavigation__ContentContainer__First}>
          <TouchableOpacity
            onPress={() => {
              if (userType === UserType.Broker) {
                setCurrentSceneKey({currentSceneKey: 'likedProducts'});
                return Actions.likedProducts();
              }
              setCurrentSceneKey({currentSceneKey: 'merchantProducts'});
              return Actions.merchantProducts();
            }}>
            <Icon name="heart" size={20} color={this._deriveIconColor({sceneKey: 'likedProducts|merchantProducts'})} />
          </TouchableOpacity>
        </View>
        <View style={styles.ActivityTopNavigation__ContentContainer__Second}>
          <TouchableOpacity
            onPress={() => {
              setCurrentSceneKey({currentSceneKey: 'matches'});
              return Actions.matches();
            }}>
            <Icon name="users" size={20} color={this._deriveIconColor({sceneKey: 'matches'})} />
          </TouchableOpacity>
        </View>
        <View style={styles.ActivityTopNavigation__ContentContainer__Third}>
          <TouchableOpacity
            onPress={() => {
              setCurrentSceneKey({currentSceneKey: 'offers'});
              return Actions.offers();
            }}>
            <Icon name="clock" size={20} color={this._deriveIconColor({sceneKey: 'offers'})} />
          </TouchableOpacity>
        </View>
        <View style={styles.ActivityTopNavigation__ContentContainer__Fourth}>
          <TouchableOpacity
            onPress={() => {
              setCurrentSceneKey({currentSceneKey: 'grabbed'});
              return Actions.grabbed();
            }}>
            <Icon name="check-circle" size={20} color={this._deriveIconColor({sceneKey: 'grabbed'})} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentSceneKey: ({currentSceneKey}) => {
      return dispatch({
        type: REDUX_ACTIONS.SET_CURRENT_SCENE_KEY,
        payload: {currentSceneKey},
      });
    },
  };
};

const mapStateToProps = (state) => {
  const {userType, currentSceneKey} = state;
  return {
    userType,
    currentSceneKey,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivityTopNavigation);

const styles = StyleSheet.create({
  ActivityTopNavigation__ContentContainer: {
    // borderWidth: 1,
    // borderColor: 'orange',
    flexDirection: 'row',
    height: 90,
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: Color.LightGrey,
    width: '100%',
  },
  ActivityTopNavigation__ContentContainer__First: {
    // borderWidth: 1,
    // borderColor: 'green',
    top: 40,
    height: 40,
    position: 'absolute',
    left: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ActivityTopNavigation__ContentContainer__Second: {
    // borderWidth: 1,
    // borderColor: 'black',
    top: 30,
    height: 40,
    left: 130,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ActivityTopNavigation__ContentContainer__Third: {
    // borderWidth: 1,
    // borderColor: 'red',
    top: 30,
    height: 40,
    left: 215,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ActivityTopNavigation__ContentContainer__Fourth: {
    // borderWidth: 1,
    // borderColor: 'red',
    top: 30,
    height: 40,
    left: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ActivityTopNavigation__ContentContainer__HeaderLabel: {
    fontWeight: '900',
    color: Color.LightGrey,
  },
});
