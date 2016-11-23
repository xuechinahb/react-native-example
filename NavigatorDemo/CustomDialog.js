
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  BackAndroid,
  TouchableOpacity,
} from 'react-native';

import Dimensions from 'Dimensions';
let totalWidth = Dimensions.get('window').width;
let totalHeight = Dimensions.get('window').height;

export default class CustomDialog extends Component{
//--begin--使用于Android：按返回键，dialog消失
  componentDidMount(){
    // BackAndroid.removeEventListener('NaviModuleListener');
    let getDialogStatus = this.props.getDialogStatus;
    BackAndroid.addEventListener('CustomDialogListener', ()=>{
      if (getDialogStatus()) {
        console.log('1-----------');
        this.props.dialogCancel();
        return true;
      }
      console.log('2-----------');
      return false;
    })
  }

  componentWillUnmount(){
    BackAndroid.removeEventListener('CustomDialogListener');
  }
  //--end--使用于Android：按返回键，dialog消失

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.dialogStyle}>
          <Text style={styles.textPrompt}>
            {this.props.promptToUser}
          </Text>
          <View style={[styles.btnView, styles.confirmView]}>
            <Text style={styles.btnText}
              onPress={this.props.dialogConfirm}
              >
              确 定
            </Text>
          </View>

          <View style={[styles.btnView, styles.cancelView]}>
            <Text style={styles.btnText}
              onPress={this.props.dialogCancel}
              >
              取 消
            </Text>
          </View>


        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    top: 0,
    position: 'absolute',
    width: totalWidth,
    height: totalHeight,
    backgroundColor: 'rgba(52,52,52,0.5)',
  },
  dialogStyle: {
    position: 'absolute',
    top: totalHeight * 0.3,
    left: totalWidth * 0.1,
    width: totalWidth * 0.8,
    height: totalHeight * 0.3,
    backgroundColor: 'white',
    borderRadius: 6,
  },
  textPrompt: {
    top: 10,
    width: totalWidth * 0.8,
    fontSize: 26,
    color: '#bdbdbd',
    textAlign: 'center',
  },

  btnView: {
    width: totalWidth * 0.35,
    height: totalHeight * 0.12,
    backgroundColor: '#00bcd4',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 28,
    color: '#fff',
  },
  confirmView: {
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  cancelView: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  }
})
