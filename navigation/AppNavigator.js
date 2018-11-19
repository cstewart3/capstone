import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import SettingsNavigator from './SettingsNavigator'

export default createSwitchNavigator({
  Main: MainTabNavigator
});