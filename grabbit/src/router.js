import React from 'react';
import {View} from 'react-native';

import {Router, Scene, Stack, Tabs} from 'react-native-router-flux';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';

import {
  BrokerLoginView,
  BrokerSignupView,
  EntryView,
  DiscoverView,
  BrokerActivityView,
  NotificationsView,
  EditUserProfileView,
  BrokerFurtherDetailsView,
  ProductInfoView,
  LikedProductsView,
  BrokerMatchesView,
  GrabbedView,
  MerchantSignupView,
  MerchantLoginView,
  MerchantExploreView,
  MerchantProductsView,
  MerchantAddProductView,
  EditMerchantProfileView,
  BrokerFeedbackView,
  BrokerEntryView,
  MerchantEntryView,
  GrabItemView,
  OffersView,
} from 'grabbit/src/views';
import {TabIconSize, Color, UserType} from 'grabbit/src/const';
import BasicTopNavigationBar from 'grabbit/src/components/navigation/BasicTopNavigation';
import BackOnlyTopNavigationBar from 'grabbit/src/components/navigation/BackOnlyTopNavigation';
import ActivityTopNavigationBar from 'grabbit/src/components/navigation/ActivityTopNavigation';
import MerchantExploreTopNavigation from 'grabbit/src/components/navigation/MerchantExploreTopNavigation';

const BottomTabNavigation = ({userType}) => {
  if (userType === UserType.Broker) {
    return (
      <Tabs
        key="tabStart"
        hideNavBar={true}
        showLabel={false}
        tabBarPosition="bottom"
        activeBackgroundColor="white"
        lazy>
        <Scene
          key="discover"
          component={DiscoverView}
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
          navBar={null}
          component={NotificationsView}
          title="Notifications"
          hideNavBar={false}
          icon={({focused}) => (
            <Icon name={'message-square'} size={TabIconSize} color={focused ? Color.Black : Color.LightGrey} />
          )}
        />
        <Scene
          key="editUserProfile"
          navBar={BasicTopNavigationBar}
          component={EditUserProfileView}
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
    <Tabs key="tabStart" hideNavBar={true} showLabel={false} tabBarPosition="bottom" activeBackgroundColor="white" lazy>
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
        navBar={BasicTopNavigationBar}
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
        navBar={BasicTopNavigationBar}
        component={EditMerchantProfileView}
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
        <Stack key="root">
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
            component={GrabItemView}
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
            key="brokerMatches"
            navBar={ActivityTopNavigationBar}
            component={BrokerMatchesView}
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
          <Scene
            key="brokerFeedback"
            navBar={BasicTopNavigationBar}
            component={BrokerFeedbackView}
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

const mapStateToProps = (state) => {
  const {userType} = state;
  return {
    userType,
  };
};

export default connect(mapStateToProps)(AppRouter);
