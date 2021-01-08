import React from "react";
import { render } from "react-dom";
import {TouchableOpacity,StyleSheet,Text,View,KeyboardAvoidingView,Image} from "react-native";
import db from "../Config";
import firebase from "firebase";
import {MaterialIcons} from "@expo/vector-icons";

export default class ProfessionScreen extends React.Component{
    render(){
        return(
            <View style={styles.container}>
             <TouchableOpacity>
                 <Image source={require("../assets/doctorIcon.jpg")} style={{width:250,height:250}}/>
             </TouchableOpacity>
             <Text style={styles.doctorsText}>Doctors</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        alignItems:"center",
        justifyContent:"center",
    },
    doctorsText:{
        color:"#00A4CCFF",
        fontSize:33,
        fontWeight:"bold"
    }
})