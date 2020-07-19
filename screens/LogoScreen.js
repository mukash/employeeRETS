import React, { Component } from 'react';
import { View,Image, ImageBackground,StyleSheet, Text } from 'react-native';




class LogoScreen extends React.Component {
  constructor(props) {
    super(props);
  
    setTimeout(()=>
{
    this.props.navigation.navigate("Loading");
}, 3000);
  }



  render() {
    return (
    
        <ImageBackground style={styles.logo}>
        <View style={{ flex:1, justifyContent:'center', alignItems:'center'}}>
        <Image source={require('../assets/logo.png')} 
                 style={{height: 320 , width:220}}>
            </Image>
            <View style={styles.text}>
            <Text style={styles.text1}>E M P L O Y E E </Text>
            </View>

            </View>
           </ImageBackground>
       
   
    );
  }
}

export default LogoScreen;
const styles = StyleSheet.create({
    logo: { 
        width: '100%',
        height: '115%',
       
        backgroundColor:'white',
    },
    text: {color: 'black',
    
    fontFamily: 'sans-serif-light',
    

    },
    text1:{
        fontSize: 25, 
        paddingTop:'40%',
        opacity : 0.5
    }


});