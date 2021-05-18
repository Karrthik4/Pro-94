import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, KeyboardAvoidingView, Alert, ScrollView, Image } from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context'
import { RFValue } from "react-native-responsive-fontsize";
import db from '../config'
import firebase from 'firebase'

export default class WelcomeScreen extends Component{
    constructor(){
        super();
        this.state={
            emailId: "",
            password: "",
            firstName: "",
            lastName: "",
            address: "",
            contact: "",
            confirmPassword: "",
            isModalVisible: "false"
        }
    }

    static navigationOptions = {
      title : "Home"
      }

    userLogin = (emailId, password) => {
        firebase.auth().signInWithEmailAndPassword(emailId, password).then(() => {
            this.props.navigation.navigate("AddReminder");
          })
          .catch(error => {
            var errorCode = error.code;
            var errorMessage = error.message;
            return Alert.alert(errorMessage);
          });
      };

      userSignUp = (emailId, password,confirmPassword) =>{
        if(password !== confirmPassword){
            return Alert.alert("password doesn't match\nCheck your password.")
        }else{
          firebase.auth().createUserWithEmailAndPassword(emailId, password)
          .then(()=>{
            db.collection('users').add({
              first_name:this.state.firstName,
              last_name:this.state.lastName,
              contact:this.state.contact,
              email_id:this.state.emailId,
              address:this.state.address
            })
            return  Alert.alert(
                 'User Added Successfully',
                 '',
                 [
                   {text: 'OK', onPress: () => this.setState({"isModalVisible" : false})},
                 ]
             );
          })
          .catch((error)=> {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            return Alert.alert(errorMessage)
          });
        }
      }

      showModal = () => {
        return (
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.isModalVisible}
          >
              <ScrollView style={styles.scrollview}>
                <View style={styles.signupView}>
                  <Text style={styles.signupText}> SIGN UP </Text>
                </View>
                <View style={{ flex: 0.95, backgroundColor:"#B1D4E0" }}>
                  <Text style={styles.label}>First Name </Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder={"First Name"}
                    maxLength={12}
                    onChangeText={text => {
                      this.setState({
                        firstName: text
                      });
                    }}
                  />
      
                  <Text style={styles.label}>Last Name </Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder={"Last Name"}
                    maxLength={12}
                    onChangeText={text => {
                      this.setState({
                        lastName: text
                      });
                    }}
                  />
      
                  <Text style={styles.label}>Contact </Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder={"Contact"}
                    maxLength={10}
                    keyboardType={"numeric"}
                    onChangeText={text => {
                      this.setState({
                        contact: text
                      });
                    }}
                  />
      
                  <Text style={styles.label}> Address </Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder={"Address"}
                    multiline={true}
                    onChangeText={text => {
                      this.setState({
                        address: text
                      });
                    }}
                  />
      
                  <Text style={styles.label}>Email </Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder={"Email"}
                    keyboardType={"email-address"}
                    onChangeText={text => {
                      this.setState({
                        emailId: text
                      });
                    }}
                  />
      
                  <Text style={styles.label}> Password </Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder={"Password"}
                    secureTextEntry={true}
                    onChangeText={text => {
                      this.setState({
                        password: text
                      });
                    }}
                  />
      
                  <Text style={styles.label}>Confirm Password</Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder={"Confrim Password"}
                    secureTextEntry={true}
                    onChangeText={text => {
                      this.setState({
                        confirmPassword: text
                      });
                    }}
                  />
                </View>
      
                <View style={{ flex: 0.2, alignItems: "center" }}>
                  <TouchableOpacity
                    style={styles.registerButton}
                    onPress={() =>
                      this.userSignUp(
                        this.state.emailId,
                        this.state.password,
                        this.state.confirmPassword
                      )
                    }
                  >
                    <Text style={styles.registerButtonText}>Register</Text>
                  </TouchableOpacity>
                  <Text
                    style={styles.cancelButtonText}
                    onPress={() => {
                      this.setState({ isModalVisible: false });
                    }}
                  >
                    Cancel
                  </Text>
                </View>
              </ScrollView>
          </Modal>
        );
      };
    render(){
        return(
          <SafeAreaProvider>
            <View style={styles.container}>
              {this.showModal()}
            <View style={{ flex: 0.5 }}>
                <View style = {styles.profileContainer}>
                    <Text style = {styles.title}>Reminder App</Text>
                </View>

                <Image
                  source={require("../assets/Reminder.png")}
                  style={styles.reminderImage}
                />
            </View>
            <View style={{ flex:0.4}}>
              <View style={styles.buttonContainer}>
                <KeyboardAvoidingView style={styles.keyBoardStyle}>
                  <TextInput
                    style={styles.loginBox}
                    placeholder="abc@example.com"
                    placeholderTextColor="silver"
                    keyboardType="email-address"
                    onChangeText={text => {
                      this.setState({
                        emailId: text
                      });
                    }}
                  />
                  <TextInput
                    style={[styles.loginBox]}
                    secureTextEntry={true}
                    placeholder="Enter Password"
                    placeholderTextColor="silver"
                    onChangeText={text => {
                      this.setState({
                        password: text
                      });
                    }}
                  />
              </KeyboardAvoidingView>
            </View>
              <View style={{ flex: 0.8, alignItems: "center" }}>
                <TouchableOpacity
                  style={[styles.button,{marginBottom:20,marginTop:20}]}
                  onPress={() => {
                    this.userLogin(this.state.emailId, this.state.password);
                  }}
                >
                  <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
    
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.setState({ isModalVisible: true })}
                >
                  <Text style={styles.buttonText}>SignUp</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaProvider>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'#3D550C',
      borderWidth:7,
      borderColor:'#59981A'
    },
    keyBoardStyle : {
      flex:1,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'#59981A'
    },
    profileContainer:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
    },
    title:{
      fontSize:50,
      fontWeight:'300',
      textAlign:'center',
      paddingBottom:10,
      color : '#ECF87F'
    },
    loginBox:{
      width: 300,
      height: 40,
      borderWidth: 1.5,
      borderColor : '#81B622',
      fontSize: 20,
      margin:10,
      marginLeft:25,
      marginRight:25,
      paddingLeft:10
    },
    button:{
      width:300,
      height:50,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:25,
      top:1,
      backgroundColor:"#81B622",
      shadowColor: "#000",
      bottom:20,
      shadowOffset: {
         width: 0,
         height: 8,
      },
      shadowOpacity: 0.30,
      shadowRadius: 10.32,
      elevation: 16,
    },
    buttonText:{
      color:'#ffff',
      fontWeight:'200',
      fontSize:20
    },
    label: {
      fontSize: RFValue(13),
      color: "#717D7E",
      fontWeight: "bold",
      paddingLeft: RFValue(10),
      marginLeft: RFValue(20)
    },
    formInput: {
      width: "90%",
      height: RFValue(45),
      padding: RFValue(10),
      borderWidth: 1,
      borderRadius: 2,
      borderColor: "#145DA0",
      paddingBottom: RFValue(10),
      marginLeft: RFValue(20),
      marginBottom: RFValue(14)
    },
    registerButton: {
      width: "75%",
      height: RFValue(50),
      marginTop: RFValue(20),
      justifyContent: "center",
      alignItems: "center",
      borderRadius: RFValue(3),
      backgroundColor: "#0C2D48",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 8
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,
      elevation: 16,
      marginTop: RFValue(10)
    },
    registerButtonText: {
      fontSize: RFValue(23),
      fontWeight: "bold",
      color: "#fff"
    },
    cancelButtonText: {
      fontSize: RFValue(20),
      fontWeight: "bold",
      color: "#0B1F65",
      marginTop: RFValue(10)
    },
    scrollview: {
      flex: 1,
      backgroundColor: "#fff"
    },
    signupView: {
      flex: 0.05,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#0C2D48"
    },
    signupText: {
      fontSize: RFValue(20),
      fontWeight: "bold",
      color: "silver"
    },
    buttonContainer:{
      flex:1,
      alignItems:'center',
      justifyContent: 'center'
    },
    reminderImage: {
      width: "40%",
      height: "40%",
      left: 110,
      bottom:10
    }
  });