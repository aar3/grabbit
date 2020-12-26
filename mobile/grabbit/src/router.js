import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {Router, Scene, Stack, Tabs} from 'react-native-router-flux';
import {Color, TabIconSize} from 'grabbit/src/Const';
import {BasicTopNavigationBar} from 'grabbit/src/components/navigation/Top';
import {
  EntryView,
  LoginView,
  SignupView,
  ListRewardsView,
  LinkAccountView,
  AccountView,
  RewardFocusView,
} from 'grabbit/src/views';

export default class Router_ extends React.Component {
  render() {
    return (
      <Router>
        <Stack key="root" transitionConfig={transitionConfig}>
          <Scene key="entry" component={EntryView} title="Entry" hideNavBar={true} initial />
          <Scene key="login" component={LoginView} title="Login" hideNavBar={true} />
          <Scene key="signup" component={SignupView} title="Sign Up" hideNavBar={true} />
          <Scene key="rewardFocus" component={RewardFocusView} title="Reward Focus" hideNavBar={true} />
          <Tabs
            duration={0}
            animationEnabled={false}
            key="tabRoot"
            hideNavBar={true}
            showLabel={false}
            tabBarPosition={'bottom'}
            activeBackgroundColor={Color.White}
            lazy>
            <Scene
              navBar={BasicTopNavigationBar}
              title={null}
              hideNavBar={false}
              renderBackButton={() => <View />}
              key="listRewards"
              icon={({focused}) => (
                <Icon name={'menu'} size={TabIconSize} color={focused ? Color.Purple : Color.ReadableGreyText} />
              )}
              component={ListRewardsView}
            />
            <Scene
              navBar={BasicTopNavigationBar}
              title={null}
              hideNavBar={false}
              renderBackButton={() => <View />}
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
              navBar={BasicTopNavigationBar}
              title={null}
              hideNavBar={false}
              renderBackButton={() => <View />}
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
