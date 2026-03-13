import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';

import { colors, fonts } from '../theme';

import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import ApplicationScreen from '../screens/ApplicationScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TheCircleScreen from '../screens/TheCircleScreen';
import ChatScreen from '../screens/ChatScreen';
import EventsScreen from '../screens/EventsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import MemberDetailScreen from '../screens/MemberDetailScreen';
import { useApp } from '../context/AppContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabIcon({ label, focused }) {
  return (
    <Text style={{
      fontFamily: fonts.mono,
      fontSize: 9,
      letterSpacing: 2,
      textTransform: 'uppercase',
      color: focused ? colors.cream : colors.creamDim,
      marginTop: 4,
    }}>
      {label}
    </Text>
  );
}

function MainTabs() {
  const { unreadCount } = useApp();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: 70,
          paddingBottom: 12,
          paddingTop: 8,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon label="Feed" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Events"
        component={EventsScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon label="Events" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Circle"
        component={TheCircleScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center' }}>
              <Text style={{
                fontFamily: fonts.mono,
                fontSize: 9,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: focused ? colors.cream : colors.creamDim,
                marginTop: 4,
              }}>Circle</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon label="Profile" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center' }}>
              <Text style={{
                fontFamily: fonts.mono,
                fontSize: 9,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: focused ? colors.cream : colors.creamDim,
                marginTop: 4,
              }}>
                {unreadCount > 0 ? `(${unreadCount})` : 'Inbox'}
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const [appState, setAppState] = useState('splash'); // splash | onboarding | apply | main

  const handleSplashDone = () => setAppState('onboarding');
  const handleOnboardingDone = () => setAppState('apply');
  const handleApplicationDone = () => setAppState('main');

  if (appState === 'splash') {
    return <SplashScreen onDone={handleSplashDone} />;
  }

  if (appState === 'onboarding') {
    return <OnboardingScreen onDone={handleOnboardingDone} />;
  }

  if (appState === 'apply') {
    return <ApplicationScreen onDone={handleApplicationDone} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="MemberDetail" component={MemberDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
