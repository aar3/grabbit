import React from 'react';
import {StyleSheet} from 'react-native';
import {Router, Scene, Stack} from 'react-native-router-flux';
import {Color} from 'grabbit/src/Const';
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
  EditAccountView,
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
            // initial
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
            title={'Settings'}
            hideNavBar={false}
            key="settings"
            component={SettingsView}
            navigationBarStyle={styles.NavbarContainer}
            style={styles}
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
            initial
            key="listDeal"
            component={ListDealsView}
          />
          <Scene
            title={'Notifications'}
            hideNavBar={false}
            key="notifications"
            component={NotificationsView}
            navigationBarStyle={styles.NavbarContainer}
            style={styles}
          />
          <Scene
            title={'Watch List'}
            hideNavBar={false}
            key="watchList"
            component={WatchListView}
            navigationBarStyle={styles.NavbarContainer}
            style={styles}
          />
          <Scene
            title={'Edit Account'}
            hideNavBar={false}
            key="editAccount"
            component={EditAccountView}
            navigationBarStyle={styles.NavbarContainer}
            style={styles}
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
