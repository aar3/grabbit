import React from 'react';
import {StyleSheet, Text, View, Image, Switch} from 'react-native';

import {connect} from 'react-redux';

import {Color} from 'grabbit/src/const';
import REDUX_ACTIONS from 'grabbit/src/actions';
import LinkInstagramAccountModal from 'grabbit/src/components/modals/LinkInstagramAccount';

class V extends React.Component {
  constructor(props) {
    super(props);
    this.instagramLinkModal = React.createRef();
  }

  render() {
    const {hasInstagramLinked, toggleInstagramLinking} = this.props;
    const modal = <LinkInstagramAccountModal ref={this.instagramLinkModal} />;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {modal}
        <View
          style={{
            // borderWidth: 1,
            // borderColor: 'green',
            width: '100%',
            height: '100%',
            padding: 20,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 22,
              marginBottom: 20,
              marginTop: 20,
            }}>
            Linked Accounts
          </Text>
          <Text
            style={{
              marginBottom: 20,
            }}>
            Connect accounts to win rewards.
          </Text>
          <View style={[styles.AccountSectionContainer, {borderTopWidth: 1, borderTopColor: Color.LightGrey}]}>
            <View
              style={{
                marginLeft: 20,
              }}>
              <Image
                source={{
                  uri: 'https://instagram-brand.com/wp-content/uploads/2016/11/Instagram_AppIcon_Aug2017.png?w=300',
                }}
                style={{height: 60, width: 60}}
              />
            </View>
            <Switch
              style={{
                position: 'absolute',
                right: 20,
              }}
              onValueChange={() => toggleInstagramLinking({hasInstagramLinked})}
              value={hasInstagramLinked}
            />
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const {session, accountLinking} = state;
  return {
    user: session.user,
    hasInstagramLinked: accountLinking.hasInstagramLinked,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleInstagramLinking: ({hasInstagramLinked}) => {
      if (!hasInstagramLinked) {
        dispatch({
          type: REDUX_ACTIONS.SHOW_INSTAGRAM_LINK_ACCOUNT_MODAL,
        });
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(V);

const styles = StyleSheet.create({
  AccountSectionContainer: {
    // borderWidth: 1,
    // borderColor: 'red',
    height: 85,
    alignItems: 'center',
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    borderBottomColor: Color.LightGrey,
    borderBottomWidth: 1,
  },
});
