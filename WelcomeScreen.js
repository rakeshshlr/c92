import React from "react";
import { render } from "react-dom";
import {TouchableOpacity,StyleSheet,Text,TextInput,View,Modal,KeyboardAvoidingView,Alert, Image} from "react-native";
import db from "../Config";
import firebase from "firebase";
import {MaterialIcons} from "@expo/vector-icons";

export default class WelcomeScreen extends React.Component{
    constructor()
    {
        super();
        this.state={
            firstName:"",
            lastName:"",
            emailId:"",
            password:"",
            confirmPassword:"",
            contactNumber:"",
            houseAddress:"",
            ModalVisibility:'false',
            secureTextEntry:'true'
        }
    }

   userSignUp = (emailId,password,confirmPassword) => 
   {
     if(password !== confirmPassword)
     {
         Alert.alert(" Your Password does not match. Please Check again! ")
     }else{
         firebase.auth().createUserWithEmailAndPassword(emailId, password)
         .then(()=>{
             db.collection("Users"),add({
                 first_name:this.state.firstName,
                 last_name:this.state.lastName,
                 contact_number:this.state.contactNumber,
                 address:this.state.houseAddress,
                 email_id:this.state.emailId
             })
             return Alert.alert("Your account have been succesfully added!")
             .catch((error)=> {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                return Alert.alert(errorMessage)
              });
         })
     }
   }

   userLogin = (emailId,password) => 
   {
     firebase.auth().signInWithEmailAndPassword(emailId,password)
     .then(()=>{
       this.props.navigation.navigate("ProfessionScreen")
     })
     .catch((error)=>{
         var errorCode = error.code;
         var errorMessage = error.message;
         return Alert.alert(errorMessage);
     })
   }

 showModal=()=>
 {
   <Modal
   visible={this.state.ModalVisibility}
   animation="fade"
   transparent={true}
   >
     <KeyboardAvoidingView>

    <MaterialIcons
      name = "close"
      size={24}
      onPress={()=>{this.setState({ModalVisibility:false})}}
    />

    <Text style={styles.modalTitle}>Welcome TO Just Ask</Text>
    
    <TextInput 
    style={styles.input} 
    placeholder="First Name"
    maxLength={10}
    onChangeText={(text)=>{this.setState({firstName:text})}}
    />

    <TextInput 
    style={styles.input}
    placeholder="Last Name"
    maxLength={10}
    onChangeText={(text)=>{this.setState({lastName:text})}}
    />

    <TextInput
    style={styles.input}
    placeholder="Email ID"
    onChangeText={(text)=>{this.setState({emailId:text})}}
    />

    <TextInput
    style={styles.input}
    placeholder="Password"
    secureTextEntry={true}
    onChangeText={(text)=>{this.setState({password:text})}}
    />

    <TextInput
    style={styles.input}
    placeholder="Confirm Password"
    secureTextEntry={true}
    onChangeText={(text)=>{this.setState({confirmPassword:text})}}
    />

    <TextInput 
    style={styles.input}
    placeHolder="Contact Number"
    maxLength={10}
    onChangeText={(text)=>{this.setState({contactNumber:text})}}
    />

    <TextInput
    style={styles.input}
    placeholder="Home Address"
    maxLength={30}
    onChangeText={(text)=>{this.setState({houseAddress:text})}}
    />

    <TouchableOpacity 
    style={styles.opacity}
    onPress={()=>
      this.userSignUp(
        this.state.emailId,
        this.state.password, 
        this.state.confirmPassword
      )}
    >
      <Text style={styles.modalText}>Confirm</Text>
    </TouchableOpacity>
    </KeyboardAvoidingView>
    </Modal>
 }
 
  render()
  {
    return(
        <View style={styles.container}>
         <View style={styles.insideContainer}>
         <Text style={styles.homeText}>Just Ask</Text>
         
         <TextInput style={styles.input} placeholder="Email Id"/>
         
         <TextInput 
           style={styles.input} 
           placeholder="Password" 
           secureTextEntry={this.state.secureTextEntry}
         >
           <TouchableOpacity onPress={()=>this.setState({secureTextEntry:'false'})}>
           <Image source={require("../assets/secureImage")} style={{width:20,height:20}}/>
           </TouchableOpacity>
           
         </TextInput>
         
         <TouchableOpacity style={styles.opacity} 
            onPress={()=>
            this.userLogin(this.state.emailId,this.state.password)
          }>
           <Text style={styles.text}>Login In</Text>
         </TouchableOpacity>

         <TouchableOpacity 
         style={styles.opacity} 
         onPress={()=>{
           this.showModal,
           this.setState({ModalVisibility:true})
          }}>
           <Text style={styles.text}>Sign Up</Text>
         </TouchableOpacity>

         </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  modalContainer:{
    flex:1,
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ffff",
    marginRight:30,
    marginLeft : 30,
    marginTop:80,
    marginBottom:80,
  },
  modalTitle:{
    color:"green",
    fontSize:25
  },
  input:{
    marginTop:10,
    height:50,
    width:"75%",
    borderWidth:2,
    borderRadius:10,
    justifyContent:'center',
    alignItems:"center",
    backgroundColor:"white"
  },
  opacity:{
    color:"orange",
    marginTop:10,
    alignSelf:"center",
    alignItems:"center"
  },
  modalText:{
    color:"white",
  },
  homeText:{
    color:"red",
    fontSize:70
  },
  container:{
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#4CB1F7"
  },
  insideContainer:{
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#4CB1F7",
    marginTop:200,
    marginBottom:300,
    marginLeft:500,
    marginRight:500
  },
  text:{
    fontSize:25,
    color:"#FFDF00"
  }
})