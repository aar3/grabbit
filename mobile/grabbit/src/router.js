import React from 'react';
import {View} from 'react-native';
import StackViewStyleInterpolator from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/Feather';
import {Router, Scene, Stack, Tabs} from 'react-native-router-flux';

import {EntryView, LoginView, SignupView} from 'grabbit/src/views';

export default class Router_ extends React.Component {
  render() {
    return (
      <Router>
        <Stack key="root" transitionConfig={transitionConfig}>
          <Scene key="entry" component={EntryView} title="Entry" hideNavBar={true} initial />
          <Scene key="login" component={LoginView} title="Login" hideNavBar={true} />
          <Scene key="signup" component={SignupView} title="Sign Up" hideNavBar={true} />
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
