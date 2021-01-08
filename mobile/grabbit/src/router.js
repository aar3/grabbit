import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {connect} from 'react-redux';
import ReduxActions from 'grabbit/src/Actions';
import {Router, Scene, Stack, Tabs} from 'react-native-router-flux';
import {Color, TabIconSize} from 'grabbit/src/Const';
import {
  BasicTopNavigationBar,
  MainTopNavigationBar,
  AccountTopNavigationBar,
  LinkAccountTopNavigationBar,
} from 'grabbit/src/components/navigation/Top';
import {getStateForKey, NewNotificationIcon} from 'grabbit/src/Utils';
import {
  EntryView,
  LoginView,
  SignupView,
  ListDealsView,
  LinkAccountView,
  AccountView,
  RewardFocusView,
  SettingsView,
  ContactView,
  AboutView,
  TermsView,
  PrivacyView,
  NotificationsView,
} from 'grabbit/src/views';

export default class Router_ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <Stack key="root" transitionConfig={transitionConfig}>
          <Scene
            key="entry"
            component={EntryView}
            title="Entry"
            gesturesEnabled={false}
            drawerLockMode="locked-closed"
            hideNavBar={true}
          />
          <Scene
            key="login"
            component={LoginView}
            gesturesEnabled={false}
            drawerLockMode="locked-closed"
            title="Login"
            hideNavBar={true}
          />
          <Scene
            key="signup"
            component={SignupView}
            gesturesEnabled={false}
            drawerLockMode="locked-closed"
            title="Sign Up"
            hideNavBar={true}
          />
          <Scene
            key="settings"
            backButton={true}
            component={SettingsView}
            title="Settings"
            hideNavBar={false}
            navBar={BasicTopNavigationBar}
          />
          <Tabs
            key="tabRoot"
            showLabel={false}
            tabBarPosition={'bottom'}
            hideNavBar={true}
            activeBackgroundColor={Color.White}
            initial
            lazy>
            <Scene
              navBar={MainTopNavigationBar}
              title={'Deals'}
              hideNavBar={false}
              key="listDeal"
              icon={({focused}) => (
                <Icon name={'menu'} size={TabIconSize} color={focused ? Color.Black : Color.BorderLightGrey} />
              )}
              component={ListDealsView}
            />
            <Scene
              navBar={LinkAccountTopNavigationBar}
              title={'Linked Accounts'}
              hideNavBar={false}
              key="linkAccount"
              icon={({focused}) => (
                <Icon name={'toggle-right'} size={TabIconSize} color={focused ? Color.Black : Color.BorderLightGrey} />
              )}
              component={LinkAccountView}
            />
            <Scene
              navBar={MainTopNavigationBar}
              title={'Notifications'}
              hideNavBar={false}
              key="notifications"
              icon={({focused}) => {
                if (this.props.hasUnseenNotifications) {
                  return <NewNotificationIcon focused={focused} />;
                }
                return (
                  <Icon
                    name={'message-circle'}
                    size={TabIconSize}
                    color={focused ? Color.Black : Color.BorderLightGrey}
                  />
                );
              }}
              component={NotificationsView}
            />
            {/* <Scene
              navBar={AccountTopNavigationBar}
              title={'Account'}
              hideNavBar={true}
              key="account"
              icon={({focused}) => (
                <Icon name={'user'} size={TabIconSize} color={focused ? Color.Black : Color.BorderLightGrey} />
              )}
              component={AccountView}
            /> */}
          </Tabs>
        </Stack>
      </Router>
    );
  }
}

// const mapStateToProps = function (state) {
//   const notifications = Object.values(getStateForKey('state.notifications.list.items', state));
//   const unseenNotifications = notifications.filter((item) => !item.seen_at);
//   return {
//     hasUnseenNotifications: unseenNotifications.length > 0,
//     user: getStateForKey('state.session.user', state),
//   };
// };

// export default connect(mapStateToProps)(Router_);

const MyTransitionSpec = {
  duration: 0,
};

const transitionConfig = function () {
  return {
    transitionSpec: MyTransitionSpec,
    screenInterpolator: (sceneProps) => {
      const {layout, position, scene} = sceneProps;
      const {index} = scene;
      const width = layout.initWidth;

      const inputRange = [index - 1, index, index + 1];

      const opacity = position.interpolate({
        inputRange,
        outputRange: [0, 1, 0],
      });

      const translateX = position.interpolate({
        inputRange,
        outputRange: [width, 0, 0],
      });

      return {
        opacity,
        transform: [{translateX}],
      };
    },
  };
};
