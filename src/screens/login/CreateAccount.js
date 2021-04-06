import React, { useEffect, useState } from 'react'
import {StyleSheet,View,Image, Text, TouchableOpacity} from 'react-native'
import Button from '../../component/button/Button'
import {windowWidth,windowHeight} from '../../resource/Dimensions'
import InputText from '../../component/inputText/InputText'
import axios from 'axios'

const styles = StyleSheet.create({
    container:{
      width: windowWidth,
      height: windowHeight,
      justifyContent: 'center',
      alignItems: 'center'
    },
    title:{
      fontSize: 25,
      fontWeight: 'bold'
    },
    subTitle:{
      fontSize: 12,
    },
    view:{
        marginVertical: 5,
        alignItems: 'center'
    },
    create:{
        flexDirection: 'row',
        marginVertical: 5
    },
    link:{
        color:'#2ec28a',
        marginHorizontal: 10,
        fontWeight: 'bold'
    }
  });  

const CreateAccount=({navigation})=>{

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [clave, setClave] = useState('');
  const [confClave, setConfClave] = useState('');

  const create = () =>{
    if (clave === confClave){
      axios.post('http://192.168.1.37:8000/api/token/',{
          "username": 'Fulcrum',
          "password": '123456'
        })
        .then(
        (response)=>{
          const auth="Bearer "+response.data.access
          axios.post('http://192.168.1.37:8000/Usuario/',{
            "nombres": nombre,
            "email": email,
            "phone": phone,
            "usuario": email,
            "password": clave
          },
          {
            headers:{'Authorization': auth}
          }
          )
          .then(
            (res)=>{
              console.warn('exito', res)
              navigation.navigate('Login')
            }
          )
          .catch(
            (res)=>{
              console.warn('Error:', res)
            }
          )
        }
        )
        .catch(
          (response)=>{
            response===404 ? console.warn('lo sientimos no tenemos servicios') :console.warn('Error:' ,response)
          }
        )  
    }
  }

    return(
        <View style={styles.container}>
        <Image
            style={{width: windowWidth/4.5, height: windowHeight/7}}
            source={require('../../resource/static/images/Escudo.png')}
        />
        <View style={styles.view}>
        <Text style={styles.title}>Create Cuenta</Text>
        <Text style={styles.subTitle}>Crear una nueva cuenta</Text>
        </View>
        <View style={styles.view}>
        <InputText 
        label={'NAME'} 
        windowWidth={(windowWidth/1.5)} 
        windowHeight={(windowHeight/13)} 
        numberOfLines={10} 
        numberOfLines={1} 
        onChangeText={(e) => {setNombre(e)}}></InputText>
        </View>
        <View style={styles.view}>
        <InputText 
        label={'EMAIL'} 
        windowWidth={(windowWidth/1.5)} 
        windowHeight={(windowHeight/13)} 
        numberOfLines={10} 
        numberOfLines={1} 
        onChangeText={(e) => {setEmail(e)}}></InputText>
        </View>
        <View style={styles.view}>
        <InputText 
        label={'PHONE'} 
        windowWidth={(windowWidth/1.5)} 
        windowHeight={(windowHeight/13)} 
        numberOfLines={10} 
        numberOfLines={1} 
        onChangeText={(e) => {setPhone(e)}}></InputText>
        </View>
        <View style={styles.view}>
        <InputText 
        label={'CONTRASEÑA'} 
        windowWidth={(windowWidth/1.5)} 
        windowHeight={(windowHeight/13)} 
        numberOfLines={10} 
        numberOfLines={1} 
        onChangeText={(e) => {setClave(e)}}></InputText>
        </View>
        <View style={styles.view}>
        <InputText 
        label={'CONFIRMAR CONTRASEÑA'} 
        windowWidth={(windowWidth/1.5)} 
        windowHeight={(windowHeight/13)} 
        numberOfLines={10} 
        numberOfLines={1} 
        onChangeText={(e) => {setConfClave(e)}}></InputText>
        </View>
        <View style={styles.view}>
        <Button label={'CREATE'} windowWidth={windowWidth/1.5} windowHeight={windowHeight/16} onPress={create}></Button>
        </View>
        <View style={styles.create}>
        <Text style={styles.subTitle}>¿Ya tiene una cuenta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Ingresar </Text>
        </TouchableOpacity>
        </View>
        </View>
    )
}

export default CreateAccount;