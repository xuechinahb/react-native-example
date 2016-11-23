import React, {Component} from 'react';
import {
  Navigator,
  BackAndroid,
  Text,
} from 'react-native';

import RegisterPage from './RegisterPage';
import DetailPage from './DetailPage';

export default class MainIOS extends Component{

  // configureScene(route){
  //   return Navigator.SceneConfigs.FadeAndroid;
  // }

  renderScene(router, navigator){
    this._navigator = navigator;
    switch (router.name) {
      case 'RegisterPage':
        return <RegisterPage navigator={navigator}/>
        break;
      case 'DetailPage':
        return <DetailPage phoneNumber={router.phoneNumber}
            password={router.password} navigator={navigator}/>
        break;
      default:

    }
  }

  render(){
    return (
      <Navigator
        initialRoute={{name: 'RegisterPage'}}
        configureScene={this.configureScene}
        renderScene={(router, navigator) =>this.renderScene(router, navigator)}
        style={{padding:0}}
      />
    )

  }



}
