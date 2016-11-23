import React, {Component} from 'react';
import {
   View,
   TextInput,
   Text,
   StyleSheet,
   TouchableOpacity,
 } from 'react-native';
 import PixelRatio from 'PixelRatio';
 import Dimensions from 'Dimensions';
 import CustomDialog from './CustomDialog';

 // import ModuleEg from './ModuleEg';
 let totalWidth = Dimensions.get('window').width;
 let leftStartPoint = totalWidth * 0.1;
 let componentWidth = totalWidth * 0.8;
 let borderWidth = 1/PixelRatio.get();


 export default class RegisterPage extends Component{
   constructor(props){
     super(props);
     this.state = {
       phoneNumber: '',
       password: '',
       showDialogFlag: false
     }
   }
  updatePhoneNumber(newText){
    this.setState({
      phoneNumber: newText
    });
  }

  updatePW(newText){
    this.setState({
      password: newText
    });
  }

  userPressConfirm(){
    this.props.navigator.push({
      phoneNumber: this.state.phoneNumber,
      password: this.state.password,
      name: 'DetailPage'
    })
  }

  showDialog(){
    this.setState({
      showDialogFlag: true
    })
  }

  dialogConfirm(){
    this.setState({
      showDialogFlag: false
    })
    this.props.navigator.replace({
      phoneNumber: this.state.phoneNumber,
      password: this.state.password,
      name: 'DetailPage'
    })
  }

  dialogCancel(){
    this.setState({
      showDialogFlag: false
    })
  }

  getDialogStatus(){
    return this.state.showDialogFlag;
  }

  render(){
    console.log('PixelRatio get is ' + PixelRatio.get());
    var dialog;
    if (this.state.showDialogFlag) {
      dialog = <CustomDialog dialogConfirm={this.dialogConfirm.bind(this)}
          dialogCancel={this.dialogCancel.bind(this)}
          promptToUser={'使用' + this.state.phoneNumber + '号码登录？'}
          getDialogStatus={this.getDialogStatus.bind(this)}
        />
    }
    return (
      <View style={styles.container}>
        <TextInput style={styles.TextInputStyle}
          autoFocus={true}
          keyboardType ={'numeric'}
          placeholder={'请输入手机号'}
          onChangeText={this.updatePhoneNumber.bind(this)}
          underlineColorAndroid='transparent'
        />
        <Text style={styles.textPromptStyle}>
          您输入的手机号：{this.state.phoneNumber}
        </Text>
        <TextInput style={styles.TextInputStyle}
          placeholder={'请输入密码'}
          password={true}
          onChangeText={this.updatePW.bind(this)}
          underlineColorAndroid='transparent'
        />

          <View style={styles.emptyView}/>

          <TouchableOpacity onPress={this.userPressConfirm.bind(this)}
            activeOpacity = {0.8}>
            <View style={styles.btnView}>
              <Text style={styles.btnText}>
                确 定
              </Text>
            </View>
          </TouchableOpacity>

          <View style={styles.emptyView}/>


          <TouchableOpacity onPress={this.showDialog.bind(this)}
            >
            <View style={styles.btnView}>
              <Text style={styles.btnText}>
                Custom Dialog
              </Text>
            </View>
          </TouchableOpacity>

        {dialog}
      </View>
    )
  }
 }

 const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: 'white',
     paddingTop: 20,
   },
   TextInputStyle: {
     marginTop: 15,
     left: leftStartPoint,
     width: componentWidth,
     height: 45,
     borderColor: '#bdbdbd',
     borderWidth: borderWidth,
     borderRadius: 6,
     paddingLeft: 10,
     fontSize: 20,
   },
   textPromptStyle: {
     marginTop: 15,
     left: leftStartPoint,
     width: componentWidth,
     fontSize: 20,
   },
   emptyView:{
     height: 60
   },
   btnView:{
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: '#bdbdbd',
     borderRadius: 6,
     height: 60,
     marginLeft: leftStartPoint,
     width: componentWidth,
   },
   btnText: {
     color: 'white',
     textAlign: 'center',
     fontSize: 28,
   },


 })
