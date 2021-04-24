import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
} from 'react-native';
import { useState } from 'react/cjs/react.development';



const CartMainLI = ({windowWidth,windowHeight,onPress,item,tiempo}) => {
    
    const styles = StyleSheet.create({
        border:{
          borderRadius: 0,
          backgroundColor: '#ffffff',
          width: windowWidth,
          height: windowHeight,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 0.2,
          flexDirection: 'row',
          marginVertical: 4,
        },
        texto:{
          color: 'black',
          fontSize: 16, 
        },
        textoEstado:{
          color: 'blue',
          fontSize: 16,
          marginVertical: 2,
          marginHorizontal: 10,
        },
        textoEstadoAtendido:{
          color: 'blue',
          fontSize: 16,
          marginVertical: 2,
          marginHorizontal: 10,  
        },
        textoEstadoContainer:{
          alignItems: 'center',
          flex: 0.5,
        },
        imageIconCard:{
          width: windowWidth/6,
          height: windowHeight/1.6,
        },
        imagenCardContenedor:{
          flex: 0.2,
          alignItems: 'center'
        },
        datosContenedor:{
          flex: 0.8,
          marginLeft: windowWidth/30,
        },
        imageCalifiacion:{
          width: windowWidth/16,
          height: windowHeight/5,
        },
        calificacionContainer:{
            flexDirection: 'row',
            flex: 0.5,
            marginTop: 2,
        }
      });

    var estrellas = [];

    for (let x = 0; x < item.satisfaccion; x++){
        estrellas.push(<Image style={styles.imageCalifiacion} source={require('../../resource/static/images/estrella.png')} />)
    }  

  return (
    <TouchableOpacity style={styles.border} onPress={onPress}>
        <View style={styles.imagenCardContenedor}>
            <Image 
                style={styles.imageIconCard} 
                source={require('../../resource/static/images/icon_seguridad.png')}>
            </Image>
        </View>
        <View style={styles.datosContenedor}>
            <Text style={styles.texto}>Incidencia: {item.tipo_in}</Text>
            {item.estado==1?
            <Text style={styles.texto}>Tiempo: {tiempo}</Text>
            :
            <Text style={styles.texto}>Tiempo: en espera</Text>
            }
            <View style={{flexDirection: 'row'}}>
              {item.estado==1?
                <View style={styles.calificacionContainer}>
                    {estrellas}
                </View>:
                 <View style={styles.calificacionContainer}>
                 <Image 
                     style={styles.imageCalifiacion} >
                 </Image>
                 <Image 
                     style={styles.imageCalifiacion} >
                 </Image>
                 <Image 
                     style={styles.imageCalifiacion} >
                 </Image>
                 <Image 
                     style={styles.imageCalifiacion} >
                 </Image>
                 <Image 
                     style={styles.imageCalifiacion} >
                 </Image>
             </View>
                 }
                <View style={styles.textoEstadoContainer} >
                    {item.estado==1?
                    <View style={{backgroundColor: '#2ec28a', borderRadius: 8}}>
                        <Text style={styles.textoEstadoAtendido}>Atendido</Text>
                    </View>:
                     <View style={{backgroundColor: '#E5D025', borderRadius: 8}}>
                        <Text style={styles.textoEstado}>Pendiente</Text>
                    </View>
                    }
                </View>
            </View>
        </View>
    </TouchableOpacity> 
  )
};


export default CartMainLI;