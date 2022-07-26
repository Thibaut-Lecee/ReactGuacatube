/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */

import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

// import NotFoundScreen from '../screens/NotFoundScreen';
import VideoScreen from '../../Video/VideoScreen/VideoScreen';
import BottomTabNavigator from './BottomTabNavigator';
import HomeStack from "./HomeStack";
export default function Navigation({colorScheme}) {
  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal

const Stack = createStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen name="VideoScreen" component={VideoScreen} />
      {/*<Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />*/}
    </Stack.Navigator>
  );
}
