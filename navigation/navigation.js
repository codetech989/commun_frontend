import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, View, Text, Platform} from 'react-native';
import BusinessAds from '../screens/BusinessAds';
import ChatScreen from '../screens/ChatScreen';
import ChatListScreen from '../screens/ChatListScreen';
import ContactList from '../screens/ContactList';
import CreateGroup from '../screens/CreateGroup';
import GroupDetail from '../screens/GroupDetail';
import Invite from '../screens/Invite';
import InviteList from '../screens/InviteList';
import MobileLogin from '../screens/mobileLogin';
import onboardingScreen from '../screens/onboardingScreen';
import OtpScreen from '../screens/otpScreen';
import Profile from '../screens/Profile';
import SettingScreen from '../screens/SettingScreen';
import TourScreen from '../screens/TourScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SpacesScreen from '../screens/SpacesScreen';
import CallsScreen from '../screens/CallsScreen';
import AmaLiveScreen from '../screens/AmaLiveScreen';
import SpacesView from '../screens/SpacesView';
import AmaLiveDetail from '../screens/AmaLiveDetail';
import CallInfoScreen from '../screens/CallInfoScreen';
import GetPaidScreen from '../screens/GetPaidScreen';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Navigation = () => {
  const INTRO_STACK = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="onboarding" component={onboardingScreen} />
        <Stack.Screen name="login" component={MobileLogin} />
        <Stack.Screen name="otp" component={OtpScreen} />
        <Stack.Screen name="Invite" component={Invite} />
        <Stack.Screen name="InviteList" component={InviteList} />
        <Stack.Screen name="Tour" component={TourScreen} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    );
  };

  const CHAT_STACK = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="ChatList" component={ChatListScreen} />
        <Stack.Screen name="Chats" component={ChatScreen} />
        <Stack.Screen name="Create New Group" component={CreateGroup} />
        <Stack.Screen name="Group Detail" component={GroupDetail} />
        <Stack.Screen name="Contact List" component={ContactList} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Business Ads" component={BusinessAds} />
        <Stack.Screen name="Settings" component={SettingScreen} />
        <Stack.Screen name="Get Paid" component={GetPaidScreen} />
      </Stack.Navigator>
    );
  };

  const SPACES_STACK = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Spaces" component={SpacesScreen} />
        <Stack.Screen name="SpaceView" component={SpacesView} />
      </Stack.Navigator>
    );
  };

  const AMALIVE_STACK = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="AMA Live" component={AmaLiveScreen} />
        <Stack.Screen name="AMA Live Detail" component={AmaLiveDetail} />
      </Stack.Navigator>
    );
  };

  const CALL_STACK = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Calls" component={CallsScreen} />
        <Stack.Screen name="Call Info" component={CallInfoScreen} />
      </Stack.Navigator>
    );
  };

  const HOME = () => {
    return (
      <Tab.Navigator
        tabBarOptions={{
          showLabel: false,
          inactiveTintColor: 'rgba(0,0,0,0.25)',
          activeTintColor: '#128C7E',
          style: {height: 60},
          labelStyle: {
            fontSize: 14,
            fontWeight: '600',
            paddingRight: 15,
          },
        }}>
        <Tab.Screen
          options={{
            tabBarIcon: ({focused, color}) => {
              return (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '60%',
                    borderTopWidth: focused ? 3 : 0,
                    borderTopColor: '#000000',
                  }}>
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: color,
                      position: 'absolute',
                      right: 0,
                      bottom: 35,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '600',
                      color: color,
                      paddingVertical: 15,
                      marginTop: Platform.OS == 'android' ? 5 : 10,
                    }}>
                    Chats
                  </Text>
                </View>
              );
            },
          }}
          name="Chats"
          component={CHAT_STACK}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({focused, color}) => {
              return (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '60%',
                    borderTopWidth: focused ? 3 : 0,
                    borderTopColor: '#000000',
                  }}>
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: color,
                      position: 'absolute',
                      right: 0,
                      bottom: 35,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '600',
                      color: color,
                      paddingVertical: 15,
                      marginTop: Platform.OS == 'android' ? 5 : 10,
                    }}>
                    Spaces
                  </Text>
                </View>
              );
            },
          }}
          name="Spaces"
          component={SPACES_STACK}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({focused, color}) => {
              return (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '60%',
                    borderTopWidth: focused ? 3 : 0,
                    borderTopColor: '#000000',
                  }}>
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: color,
                      position: 'absolute',
                      right: 0,
                      bottom: 35,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '600',
                      color: color,
                      paddingVertical: 15,
                      marginTop: Platform.OS == 'android' ? 5 : 10,
                    }}>
                    Ama Live
                  </Text>
                </View>
              );
            },
          }}
          name="Ama Live"
          component={AMALIVE_STACK}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({focused, color}) => {
              return (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '60%',
                    borderTopWidth: focused ? 3 : 0,
                    borderTopColor: '#000000',
                  }}>
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: color,
                      position: 'absolute',
                      right: 0,
                      bottom: 35,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '600',
                      color: color,
                      paddingVertical: 15,
                      marginTop: Platform.OS == 'android' ? 5 : 10,
                    }}>
                    Calls
                  </Text>
                </View>
              );
            },
          }}
          name="Calls"
          component={CALL_STACK}
        />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="Intro"
          component={INTRO_STACK}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Chats"
          component={HOME}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
