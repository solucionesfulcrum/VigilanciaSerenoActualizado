import React, {useState, useEffect} from 'react'
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
    subTitleError:{
      fontSize: 12,  
      color: 'red',  
    },
    view:{
        marginVertical: 10,
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

const Login=({navigation})=>{
  
    const [usuario, setUsuario] = useState();
    const [clave, setClave] = useState();
    const [data, setData] = useState();
    const [error, setError] = useState(false);
    const [war, setWar] = useState('');

    useEffect(()=>{
      axios.post('http://192.168.1.37:8000/api/token/',{
          "username": 'Vigilancia',
          "password": '123456'
        })
        .then(
        (response)=>{
          const auth="Bearer "+response.data.access
          axios.get('http://192.168.1.37:8000/Usuario/',
          {
            headers:{'Authorization': auth}
          }
          )
          .then(
            (res)=>{
              console.warn('exito', res.data)
              setWar(res+'then')
              setData(res.data)
            }
          )
          .catch(
            (res)=>{
              console.warn('Error:', res)
              setWar(res+'catch1')
            }
          )
        }
        )
        .catch(
          (response)=>{
            setWar(response+'catch2')
            response===404 ? console.warn('lo sientimos no tenemos servicios') :console.warn('Error:' ,response)
          }
        )  
    },[clave])

    const login = () => {
      for (let x in data){
        
        if ( data[x].usuario === usuario && data[x].password === clave && data[x].tipo_user === "Sereno"){
          navigation.navigate('MenuPrincipal', data[x])
          setError(false)
        }else{
          setError(true)
        }
      }
    }

    return(
        <View style={styles.container}>
        <Image
            style={{width: windowWidth/4.5, height: windowHeight/7}}
            source={require('../../resource/static/images/Escudo.png')}
        />
        <View style={styles.view}>
        <Text style={styles.title}>Bienvenidos</Text>
        <Text style={styles.subTitle}>Ingrese para continuar</Text>
        </View>
        <View style={styles.view}>
        <InputText 
        label={'USUARIO'} 
        windowWidth={(windowWidth/1.5)} 
        windowHeight={(windowHeight/13)} 
        numberOfLines={10} 
        numberOfLines={1} 
        onChangeText={(e) => {setUsuario(e)}}></InputText>
        </View>
        <View style={styles.view}>
        <InputText 
        label={'CONTRASEÑA'} 
        windowWidth={(windowWidth/1.5)} 
        windowHeight={(windowHeight/13)} 
        numberOfLines={10}
        secureTextEntry={true} 
        numberOfLines={1} 
        onChangeText={(e) => {setClave(e)}}></InputText>
        </View>
        {error != false ? <Text style={styles.subTitleError}>Usuario o contraseña incorrecta</Text> : <Text style={styles.subTitle}></Text> }
        <View style={styles.view}>
        <Text style={styles.link}>Recuperar contraseña</Text>
        </View>
        <View style={styles.view}>
        <Button label={'LOGIN'} windowWidth={windowWidth/1.5} windowHeight={windowHeight/16}  onPress={login}></Button>
        </View>
        <View style={styles.create}>
        <Text style={styles.subTitle}>¿No tiene cuenta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
        <Text style={styles.link}>crear cuenta</Text>
        </TouchableOpacity>
        </View>
        </View>
    )
}

export default Login;