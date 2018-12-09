import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import { StackNavigator } from 'react-navigation';
import AboutACHS from './screens/SettingsScreens/AboutACHS'



export default class App extends React.Component { 

  state = {
    isLoadingComplete: false,
    sharedProps : sharedProps
  };
 render() {

    return <AppNavigator />
    }
}
