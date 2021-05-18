import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, KeyboardAvoidingView, Alert, ScrollView } from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context'
import db from '../config'
import firebase from 'firebase'
import MyHeader from "../components/MyHeader";

export default class AddRemindersScreen extends React.Component {
  constructor(){
    super();
    this.state ={
      userId : firebase.auth().currentUser.email,
      occasionUser:"",
      datePassword:""
    }
  }

  createUniqueId(){
    return Math.random().toString(36).substring(7);
  }

  newReminder =(occasionUser,datePassword)=>{
    var userId = this.state.userId
    var randomRequestId = this.createUniqueId()
    db.collection('addReminder').add({
        "user_id": userId,
        "occasion_user":occasionUser,
        "date_password":datePassword,
        "request_id"  : randomRequestId,
    })

    this.setState({
      occasionUser :'',
      datePassword : ''
    })

    return alert("Reminder Saved")
  }
    render() {
      return (
        <SafeAreaProvider>
          <View style={{ flex: 1, backgroundColor:"#FADCD9"}}>
            <MyHeader title="Add Reminders"/>
            <KeyboardAvoidingView style={styles.keyBoardStyle}>
              <TextInput
                style ={styles.textInputs}
                placeholder={"Occasion/UserId"}
                onChangeText={(text)=>{
                    this.setState({
                      occasionUser:text
                    })
                }}
                value={this.state.occasionUser}
              />
              <TextInput
                style ={styles.textInputs}
                multiline
                numberOfLines ={8}
                placeholder={"Date/Password"}
                onChangeText ={(text)=>{
                    this.setState({
                      datePassword:text
                    })
                }}
                value ={this.state.datePassword}
              />
              <TouchableOpacity
                style={styles.saveButton}
                onPress={()=>{this.newReminder(this.state.occasionUser,this.state.datePassword)}}
                >
                <Text>Save</Text>
              </TouchableOpacity>
          </KeyboardAvoidingView>        
        </View>
      </SafeAreaProvider>
      );
    }
  }

  const styles = StyleSheet.create({
    keyBoardStyle : {
      flex:1,
      alignItems:'center',
      justifyContent:'center'
    },
    textInputs:{
      width:"80%",
      height:40,
      alignSelf:'center',
      borderColor:'#F79489',
      borderRadius:10,
      borderWidth:1,
      marginTop:20,
      padding:10,
    },
    saveButton:{
      width:"75%",
      height:50,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10,
      backgroundColor:"#F79489",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8,
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,
      elevation: 16,
      marginTop:20
      },
    }
  )