import React from 'react';
import {StyleSheet} from 'react-native';
import {Router, Scene, Stack} from 'react-native-router-flux';
import {Color} from 'grabbit/src/lib/Const';
import {MainTopNavigationBar, BasicTopNavigationBar} from 'grabbit/src/components/navigation/Top';
import {
  EntryView,
  LoginView,
  SignupView,
  ListDealsView,
  // PlaidAccountsView,
  AccountView,
  SettingsView,
  AccountTypeView,
  WatchListView,
  NotificationsView,
  BrandsView,
  EditAccountView,
  MatchedDealsView,
} from 'grabbit/src/views';
import Websocket from 'grabbit/src/lib/Websocket';

export default class Router_ extends React.Component {
  constructor(props) {
    super(props);
    this.ws = Websocket;
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
            initial
            gesturesEnabled={false}
            drawerLockMode="locked-closed"
            hideNavBar={true}
          />
          <Scene
            key="login"
            component={LoginView}
            // initial
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
            navBar={BasicTopNavigationBar}
            title="Settings"
            hideNavBar={false}
            key="settings"
            component={SettingsView}
          />
          <Scene
            navBar={BasicTopNavigationBar}
            title="Account"
            hideNavBar={false}
            key="account"
            component={AccountView}
          />
          <Scene
            navBar={MainTopNavigationBar}
            title=""
            hideNavBar={false}
            // initial
            key="listDeal"
            component={ListDealsView}
          />
          <Scene
            navBar={BasicTopNavigationBar}
            title="Notifications"
            hideNavBar={false}
            key="notifications"
            component={NotificationsView}
          />
          <Scene
            navBar={BasicTopNavigationBar}
            title="Watch List"
            hideNavBar={false}
            key="watchList"
            component={WatchListView}
          />
          <Scene
            navBar={BasicTopNavigationBar}
            title="Edit Account"
            hideNavBar={false}
            key="editAccount"
            component={EditAccountView}
          />
          <Scene navBar={BasicTopNavigationBar} title="Brands" hideNavBar={false} key="brands" component={BrandsView} />
          <Scene
            navBar={BasicTopNavigationBar}
            title="Matched Deals"
            hideNavBar={false}
            key="matchedDeals"
            component={MatchedDealsView}
          />
        </Stack>
      </Router>
    );
  }
}

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

const styles = StyleSheet.create({
  NavbarContainer: {
    // marginTop: 5,
    backgroundColor: Color.TopNavBackground,
  },
});
