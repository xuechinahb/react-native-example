import React, {Component} from 'react';
import {
   View,
   TextInput,
   Text,
   StyleSheet,
   TouchableOpacity,
 } from 'react-native';

 export default class DetailPage extends Component{

   goBack(){
    //  this.props.navigator.pop();
     this.props.navigator.push({
       name:'RegisterPage'
     })
   }

   render(){
    return (
       <View style={styles.container}>
         <View style={styles.item}>
           <Text style={styles.textStyle}>
             手机号：{this.props.phoneNumber}
           </Text>
         </View>

         <View style={styles.item}>
           <Text style={styles.textStyle}>
             密码：{this.props.password}
           </Text>
         </View>

         <TouchableOpacity onPress={this.goBack.bind(this)}>
           <View style={styles.item}>
             <Text style={styles.textStyle}>
               返回
             </Text>
           </View>
         </TouchableOpacity>


       </View>
     )

   }
 }

 const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: '#F5FCFF',
     justifyContent: 'center',
   },
   item: {
     backgroundColor: '#00bcd4',
     borderRadius: 6,
     margin: 10,
     justifyContent: 'center',
     alignItems: 'center',
     minHeight: 60,
   },
   textStyle: {
     fontSize: 20,
     color: '#fff',
   },
   
 })
