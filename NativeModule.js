import React , {Component,} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  PixelRatio,
  StyleSheet,
  NativeAppEventEmitter,
  DeviceEventEmitter,
  NativeModules,
  Platform,
} from 'react-native';


let ExampleModule = NativeModules.ExampleModule;

export default class NativeModule extends Component{

  constructor(props){
    super(props);
    this.state={
      message:'Please Click Text'
    }
  }



  componentDidMount(){

    console.log('contantValue: '+ExampleModule.contantName);
    if(Platform.OS === 'ios'){
      NativeAppEventEmitter.addListener('NativeModuleMsg', (reminder)=>{
        this.handleNativeMessage(reminder.message);
      });
    }else{
      DeviceEventEmitter.addListener('NativeModuleMsg', this.handleNativeMessage.bind(this));
    }
  }

  readContact(){
    // var map = {};
    // map['key1'] = 'value1';
    // map['key2'] = 'value2';
    // ExampleModule.sendMessage(map);
    ExampleModule.sendMessage('{\"msgType\":\"pickContact\"}');
  }


  handleNativeMessage(msg){
    console.log('receive msg from native module: '+ msg);
    let obj = JSON.parse(msg);
    this.setState({
      message: 'displayName is ' + obj.displayName + ',\n phoneNumber is ' + obj.phoneNumber
    })
  }

  async promiseEvent() {
    try {
      var event = await ExampleModule.promiseEvent();

      this.setState({ message: event });
    } catch (error) {
      console.log('error msg:' + error.message);
      this.setState({message: error.message})
    }
  }

  // promiseEvent() {
  //   ExampleModule.promiseEvent().then((event)=>{
  //     this.setState({ message: event });
  //   }).catch((error)=>{
  //     console.log('error msg:' + error.message);
  //     this.setState({message: error.message})
  //   })
  // }

  callbackEvent(){
    ExampleModule.callbackEvent((events)=>{
      this.setState({message: events})
    })
  }

  openNativeView(){
    ExampleModule.openNativeView('');
  }

  render(){
    return(
      // <View style={[{top: 40, left:10, right: 10}, {backgroundColor: 'white'}]}>

      <View style={styles.container}>

          <Text style={styles.msgStyle}>
            {this.state.message}
          </Text>

          <TouchableOpacity onPress={this.readContact}
            >
            <View style={styles.item}>
              <Text style={styles.textStyle}>
                read contact
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.promiseEvent.bind(this)}
            >
            <View style={styles.item}>
              <Text style={styles.textStyle}>
                promise
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.callbackEvent.bind(this)}
            >
            <View style={styles.item}>
              <Text style={styles.textStyle}>
                callback
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.openNativeView.bind(this)}
            >
            <View style={styles.item}>
              <Text style={styles.textStyle}>
                open native view
              </Text>
            </View>
          </TouchableOpacity>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: 'white',
    flex: 1,
    marginTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },

  msgStyle:{
    marginTop: 10,
    fontSize: 16,
    backgroundColor: 'gray',
    borderRadius: 5,
    textAlign: 'center',
    backgroundColor: '#bdbdbd',
    // minHeight: 40,
    color: 'red',
    padding: 10,
  },

  item:{
    // marginLeft: 10,
    // marginRight: 10,
    marginTop: 10,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00bcd4',
    // borderColor: 'red',
    // borderWidth: 5/PixelRatio.get(),
    borderRadius: 6,
  },

  textStyle:{
    color: '#fff',
    fontSize: 20,
  },

})
