/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

// import MainIOS from './NavigatorDemo/MainIOS';
// AppRegistry.registerComponent('ExampleApp', () => MainIOS);
import NativeModule from './NativeModule';
AppRegistry.registerComponent('ExampleApp', () => NativeModule);
