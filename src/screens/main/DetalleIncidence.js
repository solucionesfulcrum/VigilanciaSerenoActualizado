import React, { useState } from 'react';
import {StyleSheet, SafeAreaView, Text, View, TouchableOpacity, Modal, Image} from 'react-native';
import Footer from '../../component/footer/Footer';
import InputText from '../../component/inputText/InputText'
import Button from '../../component/button/Button'
import {windowWidth,windowHeight} from '../../resource/Dimensions'
import VideoPlayer from 'react-native-video-controls';
import axios from 'axios'
import ModalMensajeExitoso from '../../component/modal/ModalMensajeExitoso'

const DetalleIncidence = ({navigation, route}) => {

    const [visible, setVisible] = useState(false)
    const [opacado, setOpacado] = useState(1)
    const [visibleAte, setVisibleAte] = useState(false)
    const [idIncidence, setIdIncidence] = useState(null)
    const [visibleExitoso, setVisibleExitoso] = useState(false)

    console.log("Detalle incidencia",route.params[0].foto_video)
    
    let EstadoLabel
    let EstadoColor

    if (route.params[0].estado==1){
      EstadoLabel= "Atendido"
      EstadoColor= "#2ec28a"
    }else if(route.params[0].estado==0){
      EstadoLabel= "pendiente"
      EstadoColor= "#A7541D"
    }else if(route.params[0].estado==2){
      EstadoLabel= "Espera"
      EstadoColor= "#D9D23B"
    }else if(route.params[0].estado==3){
      EstadoLabel= "Falsa"
      EstadoColor= "#DD3950"
    }

    const styles = StyleSheet.create({
        containerInit:{
            flex: 0.08,
            backgroundColor: '#2ec28a',
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row'
        },
        titulo:{
            fontSize: 20,
            color: '#ffffff',
            fontWeight: 'bold',
        },
        containerEnd:{
            flex: 0.10
        },
        containerCenter:{
            flex: 0.82,
            flexDirection: 'row'
        },
        textoDetalle:{
            fontSize: 15,
            marginHorizontal: 2,
            marginVertical: 10
        },
        textoTituloDetalle:{
            fontSize: 20,
            fontWeight: 'bold',
            marginHorizontal: 2
        },
        textoLinkIV:{
            fontSize: 20,
            fontWeight: 'bold',
            marginHorizontal: 2,
            color: 'blue',
            marginVertical: 2,
            marginHorizontal: 4
        },
        centerColum:{
            flex: 0.5,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 2,
            borderRadius: 10,
            marginHorizontal: 2,
            marginVertical: 5
        },
        borderLink:{
            borderWidth: 2,
            borderRadius: 10,
        },
        textoEstado:{
            fontSize: 25,
            marginHorizontal: 2,
            marginVertical: 10,
            color: EstadoColor,
            fontWeight: 'bold'
        },
        modal:{
            alignItems: 'center',
        },
        imagen:{
            width:  windowWidth/1.5,
            height: windowHeight/2
        },
        cerrarImage:{
            borderRadius: 4,
            marginTop: 10,
            backgroundColor: '#2ec28a'
        },
        textoBoton:{
            marginHorizontal: 10,
            marginVertical: 8,
            color: '#ffffff',
        }
    });

    const estadoAtendido=()=>{
        axios.post('http://192.168.1.37:8000/api/token/',{
            "username": 'Vigilancia',
            "password": '123456'
          })
          .then(
          (res)=>{
            const auth="Bearer "+res.data.access
            axios.patch('http://192.168.1.37:8000/Incidencias/'+idIncidence+'/', {estado: "1"},
            {              
              headers : {'Authorization': auth,}
            }
            )
            .then(
              (res)=>{
                console.log("data", res)
                setOpacado(0.2)
                setVisibleAte(false)
                setVisibleExitoso(true)
                setTimeout(()=>{navigation.navigate("RecordIncidencia")},3000)
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

    const estadoEspera=()=>{
        axios.post('http://192.168.1.37:8000/api/token/',{
            "username": 'Vigilancia',
            "password": '123456'
          })
          .then(
          (res)=>{
            const auth="Bearer "+res.data.access
            axios.patch('http://192.168.1.37:8000/Incidencias/'+idIncidence+'/', {estado: "2"},
            {              
              headers : {'Authorization': auth,}
            }
            )
            .then(
              (res)=>{
                console.log("data", res)
                setOpacado(0.2)
                setVisibleAte(false)
                setVisibleExitoso(true)
                setTimeout(()=>{navigation.navigate("RecordIncidencia")},3000)
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

    const estadoFalsa=()=>{
        axios.post('http://192.168.1.37:8000/api/token/',{
            "username": 'Vigilancia',
            "password": '123456'
          })
          .then(
          (res)=>{
            const auth="Bearer "+res.data.access
            axios.patch('http://192.168.1.37:8000/Incidencias/'+idIncidence+'/', {estado: "3"},
            {              
              headers : {'Authorization': auth,}
            }
            )
            .then(
              (res)=>{
                console.log("data", res)
                setOpacado(0.2)
                setVisibleAte(false)
                setVisibleExitoso(true)
                setTimeout(()=>{navigation.navigate("RecordIncidencia")},3000)
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


    return(
    <>  
        <ModalMensajeExitoso visible={visibleExitoso} label={"Cambio exitoso"} setVisible={setVisibleExitoso} setOpacado={setOpacado}></ModalMensajeExitoso>
        <View style={styles.modal}>
            <Modal visible={visible} transparent={true} animationType='fade' presentationStyle='overFullScreen'>
                <View style={{alignItems: 'center',marginTop: windowHeight/5}}>
                <View style={{margin: 10,padding: 20, alignItems: 'center',backgroundColor: 'white',shadowColor: '#000000', shadowOpacity: 1,shadowOffset: {width:0,height:2}, shadowRadius: 10, elevation: 5}}>
                    {route.params[0].foto_video.split(".")[4]=='jpg'?
                    <Image
                        source={{
                        uri: route.params[0].foto_video,
                        }}
                        style={styles.imagen}> 
                    </Image>:
                    <VideoPlayer
                    source={{uri: route.params[0].foto_video}}
                    title={"Video Evidencia"}
                    onBack={()=>null}
                    ></VideoPlayer>
                    }
                    <TouchableOpacity style={styles.cerrarImage}>
                        <Text style={styles.textoBoton} onPress={()=>{setVisible(false),setOpacado(1)}}>Cerrar</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </Modal>
            <Modal visible={visibleAte} transparent={true} animationType='fade' presentationStyle='overFullScreen'>
                <View style={{alignItems: 'center',marginTop: windowHeight/5}}>
                <View style={{margin: 10,padding: 20, alignItems: 'center',backgroundColor: 'white',shadowColor: '#000000', shadowOpacity: 1,shadowOffset: {width:0,height:2}, shadowRadius: 10, elevation: 5}}> 
                    <View style={{marginVertical: 10}}>
                    <Button label={"Atendido"} windowHeight={windowHeight/20} windowWidth={windowWidth/3} onPress={estadoAtendido}></Button>
                    </View>
                    <View style={{marginVertical: 10}}>
                    <Button label={"Espera"} windowHeight={windowHeight/20} windowWidth={windowWidth/3} onPress={estadoEspera}></Button>
                    </View>
                    <View style={{marginVertical: 10}}>
                    <Button label={"Falsa"} windowHeight={windowHeight/20} windowWidth={windowWidth/3} onPress={estadoFalsa}></Button>
                    </View>
                    <TouchableOpacity style={styles.cerrarImage} onPress={()=>{setVisibleAte(false),setOpacado(1)}}>
                        <Text style={styles.textoBoton}>Cerrar</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </Modal>
        </View>
        <View style={styles.containerInit} opacity={opacado}>
            <Text style={styles.titulo}>Detalle Incidencia</Text>
        </View>
        <View style={styles.containerCenter} opacity={opacado}>
            <View style={styles.centerColum}>
                <Text style={styles.textoTituloDetalle}>Tipo de Incidencia / Otros</Text>
                <Text style={styles.textoDetalle}>{route.params[0].tipo_in}</Text>
                <Text style={styles.textoTituloDetalle}>Fecha / Hora</Text>
                <Text style={styles.textoDetalle}>{route.params[0].reg.split('.')[0]}</Text>
                <Text style={styles.textoTituloDetalle}>Nombres y Apellidos</Text>
                <Text style={styles.textoDetalle}>{route.params[0].datosUsuarios.nombres}</Text>
                <Text style={styles.textoTituloDetalle}>Telefono</Text>
                <Text style={styles.textoDetalle}>{route.params[0].datosUsuarios.phone}</Text>
                <Text style={styles.textoTituloDetalle}>Correo</Text>
                <Text style={styles.textoDetalle}>{route.params[0].datosUsuarios.email}</Text>
            </View>
            <View style={styles.centerColum}>
                <Text style={styles.textoTituloDetalle}>Foto</Text>
                <TouchableOpacity style={styles.borderLink} onPress={()=>{setVisible(true),setOpacado(0.5)}}>
                    <Text style={styles.textoLinkIV}>Ver Foto o Video</Text>
                </TouchableOpacity>
                <Text style={styles.textoTituloDetalle}>Estado:</Text>
                <Text style={styles.textoEstado}>{EstadoLabel}</Text>
                <Text style={styles.textoTituloDetalle}>Nombre Sereno</Text>
                <Text style={styles.textoDetalle}>{route.params[0].datosUsuarios.nombres}</Text>
                <TouchableOpacity style={styles.cerrarImage} onPress={()=>{setVisibleAte(true),setOpacado(0.5),setIdIncidence(route.params[0].url.split("/")[4])}}>
                        <Text style={styles.textoBoton}>ATENDER</Text>
                </TouchableOpacity>
            </View>
        </View>
        <View style={styles.containerEnd} opacity={opacado}>
            <Footer navigation={navigation} route={route.params[1]}></Footer>
        </View>
    </>
    )
}
export default DetalleIncidence;
