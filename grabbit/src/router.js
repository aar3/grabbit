import React from 'react';
import {View} from 'react-native';

import StackViewStyleInterpolator from 'react-navigation-stack';
import {Router, Scene, Stack, Tabs} from 'react-native-router-flux';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';

import {
  BrokerLoginView,
  BrokerSignupView,
  EntryView,
  BrokerDiscoverView,
  BrokerActivityView,
  NotificationsView,
  BrokerEditProfileView,
  BrokerFurtherDetailsView,
  ProductInfoView,
  LikedProductsView,
  MatchesView,
  GrabbedView,
  MerchantSignupView,
  MerchantLoginView,
  MerchantExploreView,
  MerchantProductsView,
  MerchantAddProductView,
  MerchantEditProfileView,
  BrokerFeedbackView,
  BrokerEntryView,
  MerchantEntryView,
  BrokerGrabItemView,
  OffersView,
  GeneralInfoView,
  ChatView,
  ConversationsView,
  BrokerSuccessfulGrabView,
  FeedbackView,
  PrivacyPolicyView,
  TermsAndConditionsView,
  AboutGrabbitView,
} from 'grabbit/src/views';
import {TabIconSize, Color, UserType} from 'grabbit/src/const';
import BasicTopNavigationBar from 'grabbit/src/components/navigation/BasicTopNavigation';
import BackOnlyTopNavigationBar from 'grabbit/src/components/navigation/BackOnlyTopNavigation';
import AccountSettingsTopNavigationBar from 'grabbit/src/components/navigation/AccountSettingsTopNavigation';
import ActivityTopNavigationBar from 'grabbit/src/components/navigation/ActivityTopNavigation';
import MerchantExploreTopNavigation from 'grabbit/src/components/navigation/MerchantExploreTopNavigation';

const BottomTabNavigation = ({userType}) => {
  if (userType === UserType.Broker) {
    return (
      <Tabs
        duration={0}
        animationEnabled={false}
        key="tabStart"
        hideNavBar={true}
        showLabel={false}
        tabBarPosition="bottom"
        activeBackgroundColor="white"
        lazy>
        <Scene
          key="brokerDiscoverscover"
          component={BrokerDiscoverView}
          navBar={MerchantExploreTopNavigation}
          title="Discover"
          hideNavBar={false}
          icon={({focused}) => (
            <Icon name={'search'} size={TabIconSize} color={focused ? Color.Black : Color.LightGrey} />
          )}
        />
        <Scene
          key="likedProducts"
          component={LikedProductsView}
          navBar={ActivityTopNavigationBar}
          title="Liked Products"
          hideNavBar={false}
          icon={({focused}) => (
            <Icon name={'grid'} size={TabIconSize} color={focused ? Color.Black : Color.LightGrey} />
          )}
        />
        <Scene
          key="notifications"
          navBar={BasicTopNavigationBar}
          component={NotificationsView}
          title="Notifications"
          hideNavBar={false}
          icon={({focused}) => (
            <Icon name={'message-square'} size={TabIconSize} color={focused ? Color.Black : Color.LightGrey} />
          )}
        />
        <Scene
          key="editBrokokerProfile"
          navBar={AccountSettingsTopNavigationBar}
          component={BrokerEditProfileView}
          title="Edit User Profile"
          hideNavBar={false}
          icon={({focused}) => (
            <Icon name={'user'} size={TabIconSize} color={focused ? Color.Black : Color.LightGrey} />
          )}
        />
      </Tabs>
    );
  }
  return (
    <Tabs
      animationEnabled={false}
      key="tabStart"
      hideNavBar={true}
      showLabel={false}
      tabBarPosition="bottom"
      activeBackgroundColor="white"
      lazy>
      <Scene
        key="merchantDashboard"
        component={MerchantExploreView}
        navBar={MerchantExploreTopNavigation}
        title="Merchant Dashboard"
        hideNavBar={false}
        icon={({focused}) => (
          <Icon name={'search'} size={TabIconSize} color={focused ? Color.Black : Color.LightGrey} />
        )}
      />
      <Scene
        key="merchantProducts"
        component={MerchantProductsView}
        navBar={ActivityTopNavigationBar}
        title="Merchant Products"
        hideNavBar={false}
        icon={({focused}) => <Icon name={'grid'} size={TabIconSize} color={focused ? Color.Black : Color.LightGrey} />}
      />
      <Scene
        key="merchantAddProduct"
        component={MerchantAddProductView}
        navBar={BasicTopNavigationBar}
        title="Merchant Add Products"
        hideNavBar={false}
        icon={({focused}) => (
          <Icon name={'plus-circle'} size={TabIconSize} color={focused ? Color.Black : Color.LightGrey} />
        )}
      />
      <Scene
        key="notifications"
        navBar={BasicTopNavigationBar}
        component={NotificationsView}
        title="Notifications"
        hideNavBar={false}
        icon={({focused}) => (
          <Icon name={'message-square'} size={TabIconSize} color={focused ? Color.Black : Color.LightGrey} />
        )}
      />
      <Scene
        key="editMerchantProfile"
        navBar={AccountSettingsTopNavigationBar}
        component={MerchantEditProfileView}
        title="Edit User Profile"
        hideNavBar={false}
        icon={({focused}) => <Icon name={'user'} size={TabIconSize} color={focused ? Color.Black : Color.LightGrey} />}
      />
    </Tabs>
  );
};

class AppRouter extends React.Component {
  render() {
    const {userType} = this.props;
    return (
      <Router>
        <Stack key="root" transitionConfig={transitionConfig}>
          <Scene key="entry" component={EntryView} title="Entry" hideNavBar={true} initial />
          <Scene
            key="brokerSignup"
            navBar={BackOnlyTopNavigationBar}
            component={BrokerSignupView}
            title={null}
            hideNavBar={false}
            renderBackButton={() => <View />}
          />
          <Scene
            key="brokerEntry"
            navBar={BackOnlyTopNavigationBar}
            component={BrokerEntryView}
            title={null}
            hideNavBar={true}
            renderBackButton={() => <View />}
          />
          <Scene
            key="grabItem"
            navBar={BackOnlyTopNavigationBar}
            component={BrokerGrabItemView}
            title={null}
            hideNavBar={false}
            renderBackButton={() => <View />}
          />
          <Scene
            key="merchantEntry"
            navBar={BackOnlyTopNavigationBar}
            component={MerchantEntryView}
            title={null}
            hideNavBar={true}
            renderBackButton={() => <View />}
          />
          <Scene
            key="merchantSignup"
            navBar={BackOnlyTopNavigationBar}
            component={MerchantSignupView}
            title={null}
            hideNavBar={false}
            renderBackButton={() => <View />}
          />
          <Scene
            key="brokerLogin"
            navBar={BackOnlyTopNavigationBar}
            component={BrokerLoginView}
            title={null}
            hideNavBar={false}
            renderBackButton={() => <View />}
          />
          <Scene
            key="merchantLogin"
            navBar={BackOnlyTopNavigationBar}
            component={MerchantLoginView}
            title={null}
            hideNavBar={false}
            renderBackButton={() => <View />}
          />
          <Scene
            key="brokerFurtherDetails"
            component={BrokerFurtherDetailsView}
            hideNavBar={true}
            renderBackButton={() => <View />}
          />
          <Scene
            key="productInfo"
            navBar={BackOnlyTopNavigationBar}
            component={ProductInfoView}
            title={null}
            hideNavBar={false}
            renderBackButton={() => <View />}
          />
          <Scene
            key="matches"
            navBar={ActivityTopNavigationBar}
            component={MatchesView}
            title={null}
            hideNavBar={false}
            renderBackButton={() => <View />}
          />
          <Scene
            key="offers"
            navBar={ActivityTopNavigationBar}
            component={OffersView}
            title={null}
            hideNavBar={false}
            renderBackButton={() => <View />}
          />
          <Scene
            key="grabbed"
            navBar={ActivityTopNavigationBar}
            component={GrabbedView}
            title={null}
            hideNavBar={false}
            renderBackButton={() => <View />}
          />
          {/* <Scene
            key="brokerFeedback"
            navBar={BasicTopNavigationBar}
            component={BrokerFeedbackView}
            title={null}
            hideNavBar={false}
            renderBackButton={() => <View />}
          /> */}
          <Scene
            key="generalInfo"
            navBar={BackOnlyTopNavigationBar}
            component={GeneralInfoView}
            title={null}
            hideNavBar={false}
            renderBackButton={() => <View />}
          />
          <Scene
            key="chat"
            navBar={BackOnlyTopNavigationBar}
            component={ChatView}
            title={null}
            hideNavBar={false}
            renderBackButton={() => <View />}
          />
          <Scene
            key="conversations"
            navBar={BackOnlyTopNavigationBar}
            component={ConversationsView}
            title={null}
            hideNavBar={false}
            renderBackButton={() => <View />}
          />
          {/* <Scene
            key="brokerSuccessfulGrab"
            navBar={BasicTopNavigationBar}
            component={BrokerSuccessfulGrabView}
            title={null}
            hideNavBar={false}
            renderBackButton={() => <View />}
          /> */}
          <Scene
            key="feedback"
            navBar={BackOnlyTopNavigationBar}
            component={FeedbackView}
            title={null}
            hideNavBar={false}
            renderBackButton={() => <View />}
          />
          <Scene
            key="termsAndConditions"
            navBar={BackOnlyTopNavigationBar}
            component={TermsAndConditionsView}
            title={null}
            hideNavBar={false}
            renderBackButton={() => <View />}
          />
          <Scene
            key="privacyPolicy"
            navBar={BackOnlyTopNavigationBar}
            component={PrivacyPolicyView}
            title={null}
            hideNavBar={false}
            renderBackButton={() => <View />}
          />
          <Scene
            key="aboutGrabbit"
            navBar={BackOnlyTopNavigationBar}
            component={AboutGrabbitView}
            title={null}
            hideNavBar={false}
            renderBackButton={() => <View />}
          />
          {BottomTabNavigation({userType})}
        </Stack>
      </Router>
    );
  }
}

const MyTransitionSpec = {
  duration: 0,
  // easing: Easing.bezier(0.2833, 0.99, 0.31833, 0.99),
  // timing: Animated.timing,
};

const transitionConfig = () => ({
  transitionSpec: MyTransitionSpec,
  // screenInterpolator: StackViewStyleInterpolator.forFadeFromBottomAndroid,
  screenInterpolator: (sceneProps) => {
    const {layout, position, scene} = sceneProps;
    const {index} = scene;
    const width = layout.initWidth;

    //right to left by replacing bottom scene
    // return {
    //     transform: [{
    //         translateX: position.interpolate({
    //             inputRange: [index - 1, index, index + 1],
    //             outputRange: [width, 0, -width],
    //         }),
    //     }]
    // };

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

    //from center to corners
    // const inputRange = [index - 1, index, index + 1];
    // const opacity = position.interpolate({
    //     inputRange,
    //     outputRange: [0.8, 1, 1],
    // });

    // const scaleY = position.interpolate({
    //     inputRange,
    //     outputRange: ([0.8, 1, 1]),
    // });

    // return {
    //     opacity,
    //     transform: [
    //         { scaleY }
    //     ]
    // };
  },
});

const mapStateToProps = (state) => {
  const {userType} = state;
  return {
    userType,
  };
};

export default connect(mapStateToProps)(AppRouter);
