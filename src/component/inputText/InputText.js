import React from 'react';
import {
  StyleSheet,
  TextInput
} from 'react-native';



const InputText = ({label,windowWidth,windowHeight,numberOfLines,onChangeText,keyboardType}) => {
    const styles = StyleSheet.create({
        border:{
          borderRadius: 5,
          backgroundColor: '#ffffff',
          width: windowWidth,
          height: windowHeight,
          justifyContent: 'center',
          alignItems: 'center',
        },
      });  
      if (label == 'CONTRASEÑA'){
        return (
        <TextInput keyboardType={keyboardType} placeholder={label} style={styles.border} numberOfLines={numberOfLines} onChangeText={onChangeText} secureTextEntry={true}></TextInput> 
      )
      }else{
        return (
          <TextInput keyboardType={keyboardType} placeholder={label} style={styles.border} numberOfLines={numberOfLines} multiline={true} onChangeText={onChangeText} ></TextInput> 
        )
      }
  
};


export default InputText;