import React, {useState,useEffect} from 'react'
import {StyleSheet, View, Image, Text, Animated, TouchableOpacity,scrollX, Modal, FlatList} from 'react-native'
import {windowWidth,windowHeight} from '../../resource/Dimensions'
import Button from '../../component/button/Button'
import Footer from '../../component/footer/Footer'
import ResumenSlider from '../../component/tabla/ResumenSlider'
import { color, cos } from 'react-native-reanimated'
import axios from 'axios'
import CartMainLI from '../../component/cardMenu/CartMainLI'

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
    containerCenter1:{
        flex: 0.7,
        alignItems: 'center',
        marginTop: windowWidth/15,
    },
    containerCenter:{
        flex: 0.1,
        alignItems: 'center',
        marginTop: windowWidth/15,
    },
    titulo:{
        fontSize: 20,
        color: '#ffffff',
        fontWeight: 'bold',
    },
    TextoForm:{
        fontSize: 18,
        color: 'black',
        marginBottom: 10,
    },
    containerEnd:{
        flex: 0.10
    },
    containerTitle:{
        flexDirection: 'row',
        marginLeft: 35,
        marginTop: 10,
        marginBottom: -40,
        flex: 0.1
    },
    fotoVideo:{
        flexDirection: 'column'
    },
    agregarFotoVideo:{
        borderWidth: 1,
        width: windowWidth/1.5,
        height: windowHeight/15,
        borderColor: 'black',
        flexDirection: 'row',
        borderRadius: 5,
        marginVertical: 20
    },
    agregarFotImage:{
        width: windowWidth/9,
        height: windowHeight/18,   
        marginLeft: windowWidth/15,
    },
    boton:{
        borderColor: 'black',
        backgroundColor: '#2ec28a',
    },
    textmensaje:{
        marginHorizontal: 20,
        marginVertical: 10,
        color: '#ffffff',
    },
    cardOption:{
        borderWidth: 1,
        marginBottom: 10
    },
    textoOption:{
        marginHorizontal:10,
        marginVertical: 5
    },
    otroInci:{
        marginVertical: 10
    },
    autocompleteContainer: {
        marginLeft: 1,
        marginRight: 1
    },
    itemText:{
        fontSize: 12,
    },
    subtitle:{
        marginRight: 18,
        width: windowWidth/5.5
    },
    modal:{
        alignItems: 'center'
    }
});  

const RecorIncidencia = ({navigation, route}) =>{
    console.log("algo", route.params)

    const Enviar = () =>{ 
        navigation.navigate('MenuPrincipal', route.params) 
    }
    
    const cerrar = () =>{
        setVisible(false)
        setOpacado(1)
    }
    

    const [data, setData] = useState(null)
    const [visible, setVisible] = useState(false)
    const [opacado, setOpacado] = useState(1)
    const [idIncidence, setIdIncidence] = useState(null)
    
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
        
    } 

    const estadoFalsa=()=>{

    }

    useEffect (()=>{
        axios.post('http://192.168.1.37:8000/api/token/',{
            "username": 'Vigilancia',
            "password": '123456'
          })
          .then(
          (res)=>{
            const auth="Bearer "+res.data.access
            axios.get('http://192.168.1.37:8000/Incidencias/',
            {              
              headers : {'Authorization': auth,}
            }
            )
            .then(
              (res)=>{
                console.log("data", res)
                setData(res.data)
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
    },[])

    return(
    <>
    <View style={styles.containerInit} opacity={opacado}>
        <Text style={styles.titulo}>Record Incidencias</Text>
    </View>
    <View style={styles.containerCenter1} opacity={opacado}>
    <FlatList
            data={data}
            keyExtractor={(item, index) => 'key' + index}
            vertical
            scrollEnabled        
            snapToAlignment="center"
            scrollEventThrottle={16}
            decelerationRate="fast"
            showsVerticalScrollIndicator={false}
            renderItem={(item) => {
                //fecha registro
                let fechaAM1 = item.item.reg.split('-')
                let fechaD1 = fechaAM1[2].split('T')
                let tiempoHM1 = fechaD1[1].split(':')
                //fecha cambio estado
                let fechaAM = item.item.reg_estado.split('-')
                let fechaD = fechaAM[2].split('T')
                let tiempoHM = fechaD[1].split(':')
                let minutos
                {tiempoHM[1]-tiempoHM1[1] < 0 ? minutos = parseInt(tiempoHM[1])+60 : minutos = tiempoHM[1] }
          
                const tiempo = (tiempoHM[0]-tiempoHM1[0]).toString() + "h:" +(minutos-tiempoHM1[1]).toString() + "min"

                const selecionar = () =>{
                    setVisible(true)
                    setOpacado(0.5)
                }
                 
                //console.log("holaaaa", item.item.url.split("/")[4])
                return <CartMainLI onPress={()=>{setVisible(true),setOpacado(0.5),setIdIncidence(item.item.url.split("/")[4])}} tiempo={tiempo} windowWidth={windowWidth/1.2} windowHeight={windowHeight/8} item={item.item}></CartMainLI>;
            }}
        />
    </View>    
    <View style={styles.containerCenter} opacity={opacado}>
        <Button label={'Salir'} windowWidth={windowWidth/1.5} windowHeight={windowHeight/16} onPress={Enviar}></Button>
    </View>
    <View style={styles.containerEnd} opacity={opacado}>
        <Footer navigation={navigation} route={route.params}></Footer>
    </View>
    <View style={styles.modal}>
        <Modal visible={visible} transparent={true} animationType='fade' presentationStyle='overFullScreen'>
            <View style={{alignItems: 'center',marginTop: windowHeight/3}}>
            <View style={{margin: 20,padding: 35, alignItems: 'center',backgroundColor: 'white',shadowColor: '#000000', shadowOpacity: 1,shadowOffset: {width:0,height:2}, shadowRadius: 10, elevation: 5}}>
             <View style={{marginVertical: 10}}>
             <Button label={"Atendido"} windowHeight={windowHeight/20} windowWidth={windowWidth/3} onPress={estadoAtendido}></Button>
             </View>
             <View style={{marginVertical: 10}}>
             <Button label={"Espera"} windowHeight={windowHeight/20} windowWidth={windowWidth/3} onPress={estadoEspera}></Button>
             </View>
             <View style={{marginVertical: 10}}>
             <Button label={"Falsa"} windowHeight={windowHeight/20} windowWidth={windowWidth/3} onPress={estadoFalsa}></Button>
             </View>
             <View style={{marginVertical: 10}}>
             <TouchableOpacity style={{backgroundColor: '#18586C'}} onPress={cerrar}>
                 <Text style={{color: '#ECF1F3',marginVertical: 10, marginHorizontal: 20}}>Cerrar</Text>
             </TouchableOpacity>
             </View>
            </View>
            </View>
        </Modal>
    </View>
    </>
    )    
}

export default RecorIncidencia;