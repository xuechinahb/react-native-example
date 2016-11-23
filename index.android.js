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


// import MainAndroid from './NavigatorDemo/MainAndroid';
// AppRegistry.registerComponent('ExampleApp', () => MainAndroid);
import NativeModule from './NativeModule';
AppRegistry.registerComponent('ExampleApp', () => NativeModule);
