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
} from 'grabbit/src/components/navigation/Top';
import {getStateForKey, NewNotificationIcon} from 'grabbit/src/Utils';
import {
  EntryView,
  LoginView,
  SignupView,
  ListRewardsView,
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

class Router_ extends React.Component {
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
            initial={!this.props.user}
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
          <Scene key="rewardFocus" component={RewardFocusView} title="Reward Focus" hideNavBar={true} />
          <Scene
            key="settings"
            backButton={true}
            component={SettingsView}
            title="Settings"
            hideNavBar={false}
            navBar={BasicTopNavigationBar}
          />
          <Scene
            key="contact"
            component={ContactView}
            title="Contact"
            hideNavBar={false}
            navBar={BasicTopNavigationBar}
          />
          <Scene key="about" component={AboutView} title="About" hideNavBar={false} navBar={BasicTopNavigationBar} />
          <Scene key="terms" component={TermsView} title="Terms" hideNavBar={false} navBar={BasicTopNavigationBar} />
          <Scene key="privacy" component={PrivacyView} title="Privacy Policy" hideNavBar={false} />
          <Tabs
            key="tabRoot"
            showLabel={false}
            tabBarPosition={'bottom'}
            hideNavBar={true}
            activeBackgroundColor={Color.White}
            initial={this.props.user}
            lazy>
            <Scene
              navBar={MainTopNavigationBar}
              title={'Rewards'}
              hideNavBar={false}
              key="listRewards"
              icon={({focused}) => (
                <Icon name={'menu'} size={TabIconSize} color={focused ? Color.Purple : Color.ReadableGreyText} />
              )}
              component={ListRewardsView}
            />
            <Scene
              navBar={BasicTopNavigationBar}
              title={'Linked Accounts'}
              hideNavBar={false}
              key="linkAccount"
              icon={({focused}) => (
                <Icon
                  name={'toggle-right'}
                  size={TabIconSize}
                  color={focused ? Color.Purple : Color.ReadableGreyText}
                />
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
                    color={focused ? Color.Purple : Color.ReadableGreyText}
                  />
                );
              }}
              component={NotificationsView}
            />
            <Scene
              navBar={AccountTopNavigationBar}
              title={'Account'}
              hideNavBar={true}
              key="account"
              icon={({focused}) => (
                <Icon name={'user'} size={TabIconSize} color={focused ? Color.Purple : Color.ReadableGreyText} />
              )}
              component={AccountView}
            />
          </Tabs>
        </Stack>
      </Router>
    );
  }
}

const mapStateToProps = function (state) {
  const notifications = Object.values(getStateForKey('state.notifications.list.items', state));
  const unseenNotifications = notifications.filter((item) => !item.seen_at);
  return {
    hasUnseenNotifications: unseenNotifications.length > 0,
    user: getStateForKey('state.session.user', state),
  };
};

export default connect(mapStateToProps)(Router_);

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
