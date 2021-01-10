import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import ReduxActions from 'grabbit/src/Actions';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import {getStateForKey} from 'grabbit/src/Utils';
import {Color} from 'grabbit/src/Const';

class V extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <FlatList
          style={{
            width: '100%',
          }}
          data={this.props.links}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity onPress={() => Actions[item.routeKey]()}>
                <View
                  style={{
                    height: 60,
                    padding: 10,
                    width: '100%',
                    alignItems: 'center',
                    borderBottomColor: Color.BorderLightGrey,
                    borderBottomWidth: 1,
                    flexDirection: 'row',
                  }}>
                  <Icon style={{marginLeft: 20}} name={item.icon} size={20} color={Color.ReadableGreyText} />
                  <View
                    style={{
                      // borderWidth: 1,
                      // borderColor: 'blue',
                      marginLeft: 20,
                    }}>
                    <Text
                      style={{
                        color: Color.ReadableGreyText,
                        fontWeight: '500',
                      }}>
                      {item.title}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        color: Color.LessReadableGreyText,
                      }}>
                      {item.description}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = function (state) {
  return {
    links: getStateForKey('state.account.links', state),
  };
};

const mapDispatchToProps = function (dispatch) {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(V);
