import React from 'react';
import {Text, View, FlatList, Image, TouchableOpacity, Clipboard} from 'react-native';

import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';

import {Color} from 'grabbit/src/const';
import REDUX_ACTIONS from 'grabbit/src/actions';

class V extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {clearClipboardCopy} = this.props;
    return clearClipboardCopy();
  }

  renderCopiedCodeText() {
    const {hasCopiedCurrentCampaignCode} = this.props;
    if (!hasCopiedCurrentCampaignCode) {
      return null;
    }
    return (
      <View
        style={{
          flexDirection: 'row',
          // borderWidth: 1,
          // borderColor: 'red',
          width: '90%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: Color.Pink2,
          }}>
          Code Copied to Clipboard
        </Text>
        <Icon
          name={'check'}
          size={10}
          color={Color.ForestGreen}
          style={{
            marginLeft: 20,
          }}
        />
      </View>
    );
  }

  render() {
    const {brands, showSuccessfulClipboardCopy} = this.props;
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
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 20,
          }}>
          {this.renderCopiedCodeText()}
          <FlatList
            style={{
              width: 375,
              marginTop: 10,
              // borderWidth: 1,
              // borderColor: 'blue',
            }}
            data={brands.all}
            keyExtractor={(_item, index) => index.toString()}
            renderItem={({item, index}) => {
              const campaignCode = item.latest_campaign_code || {code: 'No Current Campaign'};
              return (
                <TouchableOpacity
                  onPress={() => {
                    Clipboard.setString(campaignCode.code);
                    showSuccessfulClipboardCopy();
                  }}>
                  <View
                    style={{
                      // borderWidth: 1,
                      // borderColor: 'red',
                      width: '100%',
                      height: 80,
                      alignItems: 'center',
                      flexDirection: 'row',
                      borderWidth: 1,
                      borderColor: Color.LightGrey,
                      borderRadius: 10,
                      marginBottom: 10,
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
                      <Text
                        style={{
                          marginBottom: 5,
                        }}>
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 11,
                          color: Color.ReadableGreyText,
                        }}>
                        {campaignCode.code}
                      </Text>
                    </View>
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
    clearClipboardCopy: () => {
      return dispatch({
        type: REDUX_ACTIONS.CLEAR_CURRENT_CAMPAIGN_CODE_COPIED,
      });
    },

    showSuccessfulClipboardCopy: () => {
      return dispatch({
        type: REDUX_ACTIONS.CURRENT_CAMPAIGN_CODE_COPIED,
      });
    },
  };
};

const mapStateToProps = (state) => {
  const {brokerDiscover} = state;
  return {
    hasCopiedCurrentCampaignCode: brokerDiscover.hasCopiedCurrentCampaignCode,
    brands: brokerDiscover.brands,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(V);
