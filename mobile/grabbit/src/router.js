import React from 'react';
import {Router, Scene, Stack, Tabs} from 'react-native-router-flux';
import {Color} from 'grabbit/src/Const';
import {MainTopNavigationBar} from 'grabbit/src/components/navigation/Top';
import {
  EntryView,
  LoginView,
  SignupView,
  ListDealsView,
  LinkAccountView,
  AccountView,
  RewardFocusView,
  SettingsView,
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
            component={SettingsView}
            title="Settings"
            hideNavBar={false}
            navigationBarStyle={{
              backgroundColor: Color.TopNavBackground,
            }}
            // navBar={BasicTopNavigationBar}
          />
          <Scene
            key="account"
            component={AccountView}
            navigationBarStyle={{
              backgroundColor: Color.TopNavBackground,
            }}
            hideNavBar={false}
          />
          <Scene
            navBar={MainTopNavigationBar}
            title=""
            hideNavBar={false}
            initial
            key="listDeal"
            component={ListDealsView}
          />
          <Scene title={'Link Account'} hideNavBar={false} key="linkAccount" component={LinkAccountView} />
          <Scene title={'Notifications'} hideNavBar={false} key="notifications" component={NotificationsView} />
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
