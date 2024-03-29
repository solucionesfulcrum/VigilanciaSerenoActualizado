import React, {useState,useEffect} from 'react'
import {StyleSheet, View, Image, Text, Animated, TouchableOpacity, Modal, FlatList} from 'react-native'
import {windowWidth,windowHeight} from '../../resource/Dimensions'
import Button from '../../component/button/Button'
import Footer from '../../component/footer/Footer'
import ResumenSlider from '../../component/tabla/ResumenSlider'
import { color, cos } from 'react-native-reanimated'
import axios from 'axios'

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
        flex: 0.46,
        alignItems: 'center',
        marginTop: windowWidth/15,
    },
    containerCenter2:{
        flex: 0.17,
        width: windowWidth/1.2,
        marginLeft: 30,
        flexDirection: 'column',
        backgroundColor: '#E1EAFA',
        borderRadius: 20
    },
    containerCenter:{
        flex: 0.12,
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
        marginLeft: -7,
        marginRight: 18,
        width: windowWidth/5
    },
    subtitle1:{
        marginLeft: -7,
        marginRight: 18,
        width: windowWidth/4
    }
});  

const ResumenEstadistico = ({navigation, route}) =>{

    const Enviar = () =>{ navigation.navigate('MenuPrincipal', route.params) }
    
    const [data, setData] = useState(null)
    const [countTR, setCountTR]=useState(0)
    const [countIA, setCountIA]=useState(0) 
    const [countSeg, setCountSeg]=useState(0)   

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
                //console.warn('resumenEstadistico', res.data)
                setData(res.data)
                let c = 0
                let c1 = 0 
                let dat
                for(dat in res.data){
                    if(res.data[dat].estado==1){
                        let time1 = ((res.data[dat].reg.split('-')[2]).split('T')[1]).split(':')
                        let time2 = ((res.data[dat].reg_estado.split('-')[2]).split('T')[1]).split(':')
                        let min 
                        {time2[1]-time1[1] < 0 ? min = parseInt(time2[1])+60 : min = time2[1] }
                        c = c + (parseInt((time2[0]-time1[0])*60)+parseInt(min-time1[1]))
                        c1 = c1 + 1
                    }
                    
                }
                //console.log((c1/(parseInt(dat)+1))*100)
                setCountTR((c/c1).toFixed(2))
                setCountIA(((c1/(parseInt(dat)+1))*100).toFixed(2))
                setCountSeg((c1/(parseInt(dat)+1)).toFixed(2))
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


    //console.warn('resumenEstadistico', route.params)

    return(
    <>
    <View style={styles.containerInit}>
        <Text style={styles.titulo}>Resumen Estadistico</Text>
    </View>
    <View style={styles.containerTitle}>
        <Text style={styles.subtitle}>Nombre</Text>
        <Text style={styles.subtitle}>T. Reacción</Text>
        <Text style={styles.subtitle}>I. Atendida</Text>
        <Text style={styles.subtitle1}>Satisfacción</Text>
    </View>
    <View style={styles.containerCenter1}>
    <FlatList
        data={data}
        keyExtractor={(Data, index) => 'key' + index}
        scrollEnabled
        horizontal = {false}
        snapToAlignment="center"
        scrollEventThrottle={16}
        decelerationRate="fast"
        renderItem={(item, index) => {            
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
        return (
            <ResumenSlider tiempo = {tiempo} item = {item.item}  onPress={()=>navigation.navigate('DetalleIncidence', [item.item, route.params])} />                  
        );
        }}
    />
    </View>
    <View style={styles.containerCenter2}>
        <View style={{flexDirection: 'row', marginTop: 10}}>
            <Text style={{width: windowWidth/2, marginLeft: 15}}>Promedio Tiempo Reaccion</Text>
            <Text style={{marginLeft: 40}}>{countTR} min</Text>
        </View>        
        <View style={{flexDirection: 'row', marginTop: 10}}>
            <Text style={{width: windowWidth/2, marginLeft: 15}}>Tasa Promedio de Incidencias Atendidas</Text>
            <Text style={{marginLeft: 40}}>{countIA}%</Text>
        </View>  
        <View style={{flexDirection: 'row', marginTop: 10}}>
            <Text style={{width: windowWidth/2, marginLeft: 15}}>Nivel de Seguridad</Text>
            <Text style={{marginLeft: 40}}>{countSeg}</Text>
        </View>  
    </View>   
    <View style={styles.containerCenter}>
        <Button label={'Salir'} windowWidth={windowWidth/1.5} windowHeight={windowHeight/16} onPress={Enviar}></Button>
    </View>
    <View style={styles.containerEnd}>
        <Footer navigation={navigation} route={route.params}></Footer>
    </View>
    </>
    )    
}

export default ResumenEstadistico;