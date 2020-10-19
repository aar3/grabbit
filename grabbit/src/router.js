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
  BrokerHistoryView,
  BrokerAllBrandsView,
  BrokerWalletView,
  BrokerWalletEntryView,
  BrokerProfileView,
  LoginView,
  MerchantDashboardView,
  MerchantAddCampaignView,
  MerchantProfileSettingsView,
  MerchantCampaignCodesView,
} from 'grabbit/src/views';
import {TabIconSize, Color, UserType} from 'grabbit/src/const';
import BasicTopNavigationBar from 'grabbit/src/components/navigation/BasicTopNavigation';
import BackOnlyTopNavigationBar from 'grabbit/src/components/navigation/BackOnlyTopNavigation';
import AccountSettingsTopNavigationBar from 'grabbit/src/components/navigation/AccountSettingsTopNavigation';
import ActivityTopNavigationBar from 'grabbit/src/components/navigation/ActivityTopNavigation';
import DiscoverTopNvigationBar from 'grabbit/src/components/navigation/DiscoverTopNavigation';
import ImageAndBackTopNavigationBar from 'grabbit/src/components/navigation/ImageAndBackTopNavigation';
import ImageCenterTopNavigation from 'grabbit/src/components/navigation/ImageCenterTopNavigation';

const BottomTabNavigation = ({userType, hasNewNotification}) => {
  if (userType === UserType.Broker) {
    return (
      <Tabs
        style={{
          activeBackgroundColor: Color.Black,
        }}
        duration={0}
        animationEnabled={false}
        key="tabStart"
        hideNavBar={true}
        showLabel={false}
        tabBarPosition="bottom"
        activeBackgroundColor="white"
        lazy>
        <Scene
          key="brokerDiscoverView"
          component={BrokerDiscoverView}
          navBar={DiscoverTopNvigationBar}
          title="Discover"
          hideNavBar={false}
          icon={({focused}) => (
            <Icon name={'search'} size={TabIconSize} color={focused ? Color.Black : Color.LightGrey} />
          )}
        />
        <Scene
          key="notifications"
          navBar={BasicTopNavigationBar}
          component={NotificationsView}
          title="Notifications"
          hideNavBar={false}
          icon={({focused}) => (
            <Icon name={'message-circle'} size={TabIconSize} color={focused ? Color.Black : Color.LightGrey} />
          )}
        />
        <Scene
          key="brokerWalletView"
          navBar={BasicTopNavigationBar}
          component={BrokerWalletView}
          title="Wallet"
          hideNavBar={false}
          icon={({focused}) => (
            <Icon name={'credit-card'} size={TabIconSize} color={focused ? Color.Black : Color.LightGrey} />
          )}
        />
        <Scene
          key="brokerProfileView"
          navBar={AccountSettingsTopNavigationBar}
          component={BrokerProfileView}
          title="Broker Profile View"
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
        key="merchantDashboardView"
        component={MerchantDashboardView}
        navBar={DiscoverTopNvigationBar}
        title="Merchant Dashboard"
        hideNavBar={false}
        icon={({focused}) => (
          <Icon name={'activity'} size={TabIconSize} color={focused ? Color.Black : Color.LightGrey} />
        )}
      />
      {/* <Scene
        key="merchantAddCampaignView"
        component={MerchantAddCampaignView}
        navBar={BasicTopNavigationBar}
        title="Merchant Add Campaign"
        hideNavBar={false}
        icon={({focused}) => (
          <Icon name={'plus-circle'} size={TabIconSize} color={focused ? Color.Black : Color.LightGrey} />
        )}
      /> */}
      <Scene
        key="notifications"
        navBar={BasicTopNavigationBar}
        component={NotificationsView}
        title="Notifications"
        hideNavBar={false}
        icon={({focused}) => (
          <Icon
            name={'message-circle'}
            size={TabIconSize}
            color={hasNewNotification ? Color.Pink2 : focused ? Color.Black : Color.LightGrey}
          />
        )}
      />
      <Scene
        key="merchantProfileSettingsView"
        navBar={BasicTopNavigationBar}
        component={MerchantProfileSettingsView}
        title="Merchant Profile Settings"
        hideNavBar={false}
        icon={({focused}) => (
          <Icon
            name={'user'}
            size={TabIconSize}
            color={hasNewNotification ? Color.Pink2 : focused ? Color.Black : Color.LightGrey}
          />
        )}
      />
    </Tabs>
  );
};

class AppRouter extends React.Component {
  render() {
    const {userType, hasNewNotification} = this.props;
    return (
      <Router>
        <Stack key="root" transitionConfig={transitionConfig}>
          <Scene key="entryView" component={EntryView} title="Entry" hideNavBar={true} initial />
          <Scene
            key="brokerSignupView"
            navBar={BackOnlyTopNavigationBar}
            component={BrokerSignupView}
            title={null}
            hideNavBar={false}
            renderBackButton={() => <View />}
          />
          <Scene
            key="brokerEntryView"
            navBar={BackOnlyTopNavigationBar}
            component={BrokerEntryView}
            title={null}
            hideNavBar={true}
            renderBackButton={() => <View />}
          />
          <Scene
            key="merchantEntryView"
            navBar={BackOnlyTopNavigationBar}
            component={MerchantEntryView}
            title={null}
            hideNavBar={true}
            renderBackButton={() => <View />}
          />
          <Scene
            key="merchantSignupView"
            navBar={BackOnlyTopNavigationBar}
            component={MerchantSignupView}
            title={null}
            hideNavBar={false}
            renderBackButton={() => <View />}
          />
          <Scene
            key="loginView"
            navBar={BackOnlyTopNavigationBar}
            component={LoginView}
            title={null}
            hideNavBar={false}
            renderBackButton={() => <View />}
          />
          <Scene
            key="generalInfoView"
            navBar={BackOnlyTopNavigationBar}
            component={GeneralInfoView}
            title={null}
            hideNavBar={false}
            renderBackButton={() => <View />}
          />
          <Scene
            key="chatView"
            navBar={ImageAndBackTopNavigationBar}
            component={ChatView}
            title={null}
            hideNavBar={false}
            renderBackButton={() => <View />}
          />
          <Scene
            key="conversationsView"
            navBar={BackOnlyTopNavigationBar}
            component={ConversationsView}
            title={null}
            hideNavBar={false}
            renderBackButton={() => <View />}
          />
          <Scene
            key="feedbackView"
            navBar={BackOnlyTopNavigationBar}
            component={FeedbackView}
            title={null}
            hideNavBar={false}
            renderBackButton={() => <View />}
          />
          <Scene
            key="termsAndConditionsView"
            navBar={BackOnlyTopNavigationBar}
            component={TermsAndConditionsView}
            title={null}
            hideNavBar={false}
            renderBackButton={() => <View />}
          />
          <Scene
            key="privacyPolicyView"
            navBar={BackOnlyTopNavigationBar}
            component={PrivacyPolicyView}
            title={null}
            hideNavBar={false}
            renderBackButton={() => <View />}
          />
          <Scene
            key="aboutGrabbitView"
            navBar={BackOnlyTopNavigationBar}
            component={AboutGrabbitView}
            title={null}
            hideNavBar={false}
            renderBackButton={() => <View />}
          />
          <Scene
            key="brokerAllBrandsView"
            navBar={BackOnlyTopNavigationBar}
            component={BrokerAllBrandsView}
            title={null}
            hideNavBar={false}
            renderBackButton={() => <View />}
          />
          <Scene
            key="brokerWalletEntryView"
            navBar={ImageAndBackTopNavigationBar}
            component={BrokerWalletEntryView}
            title={null}
            hideNavBar={false}
            renderBackButton={() => <View />}
          />
          <Scene
            key="merchantCampaignCodesView"
            navBar={BasicTopNavigationBar}
            component={MerchantCampaignCodesView}
            title={null}
            hideNavBar={false}
            renderBackButton={() => <View />}
          />
          {BottomTabNavigation({userType, hasNewNotification})}
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
  const {session, notifications} = state;
  return {
    userType: session.userType,
    hasNewNotification: notifications.hasNewNotification,
  };
};

export default connect(mapStateToProps)(AppRouter);
