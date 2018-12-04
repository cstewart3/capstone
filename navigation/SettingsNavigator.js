import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { YellowBox } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation';
import MainSettings from '../screens/SettingsScreens/MainSettings';
import AboutACHS from '../screens/SettingsScreens/AboutACHS';

const SettingsNavStack = createStackNavigator(
  {
    MainScreen: { screen: MainSettings },
    AboutScreen: { screen: AboutACHS }
  },
  {
    initialRouteName: 'MainScreen',
    headerMode: "none"
  }
);

export default SettingsNavStack;