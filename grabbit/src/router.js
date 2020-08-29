import React from 'react';
import {View} from 'react-native';
import {Router, Scene, Stack, Tabs} from 'react-native-router-flux';

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
} from 'grabbit/src/views';
import {TabIconSize, Color} from 'grabbit/src/const';
import BasicTopNavigationBar from 'grabbit/src/components/navigation/basic-top-navigation';
import BackOnlyTopNavigationBar from 'grabbit/src/components/navigation/back-only-top-navigation';
import ActivityTopNavigationBar from 'grabbit/src/components/navigation/activity-top-navigation';

export default AppRouter = () => (
  <Router>
    <Stack key="root">
      <Scene
        key="entry"
        component={EntryView}
        title="Entry"
        hideNavBar={true}
        initial
      />
      <Scene
        key="brokerSignup"
        navBar={BackOnlyTopNavigationBar}
        component={BrokerSignupView}
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
      {/* <Scene
        key="likedProducts"
        navBar={ActivityTopNavigationBar}
        component={LikedProductsView}
        title={null}
        hideNavBar={false}
        renderBackButton={() => <View />}
      /> */}
      <Scene
        key="brokerMatches"
        navBar={ActivityTopNavigationBar}
        component={BrokerMatchesView}
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
          navBar={BasicTopNavigationBar}
          title="Discover"
          hideNavBar={false}
          icon={({focused}) => (
            <Icon
              name={'search'}
              size={TabIconSize}
              color={focused ? Color.Black : Color.LightGrey}
            />
          )}
        />
        <Scene
          key="likedProducts"
          component={LikedProductsView}
          navBar={ActivityTopNavigationBar}
          title="Liked Products"
          hideNavBar={false}
          icon={({focused}) => (
            <Icon
              name={'grid'}
              size={TabIconSize}
              color={focused ? Color.Black : Color.LightGrey}
            />
          )}
        />
        <Scene
          key="notifications"
          navBar={BasicTopNavigationBar}
          component={NotificationsView}
          title="Notifications"
          hideNavBar={false}
          icon={({focused}) => (
            <Icon
              name={'message-square'}
              size={TabIconSize}
              color={focused ? Color.Black : Color.LightGrey}
            />
          )}
        />
        <Scene
          key="editUserProfile"
          navBar={BasicTopNavigationBar}
          component={EditUserProfileView}
          title="Edit User Profile"
          hideNavBar={false}
          icon={({focused}) => (
            <Icon
              name={'user'}
              size={TabIconSize}
              color={focused ? Color.Black : Color.LightGrey}
            />
          )}
        />
      </Tabs>
    </Stack>
  </Router>
);
