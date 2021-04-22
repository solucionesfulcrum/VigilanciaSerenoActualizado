import React, {useState,useEffect} from 'react'
import {StyleSheet, View, Image, Text, Animated, TouchableOpacity, Modal, FlatList} from 'react-native'
import {windowWidth,windowHeight} from '../../resource/Dimensions'
import Button from '../../component/button/Button'
import Footer from '../../component/footer/Footer'
import ResumenSlider from '../../component/tabla/ResumenSlider'
import { color } from 'react-native-reanimated'

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
        marginRight: 18,
        width: windowWidth/5.5
    }
});  

const ResumenEstadistico = ({navigation}) =>{

    const Enviar = () =>{ navigation.navigate('MenuPrincipal') }

    const Data = [
        {id: 1, nombre: 'Juan Perez', tRegistro: 2, tAtencion: 5, satisfaccion: 4},
        {id: 2, nombre: 'Luis Sanchez', tRegistro: 3, tAtencion: 8, satisfaccion: 3},
        {id: 3, nombre: 'Luciana Leon', tRegistro: 3, tAtencion: 4, satisfaccion: 5},
        {id: 4, nombre: 'Juan Perez', tRegistro: 2, tAtencion: 5, satisfaccion: 4},
        {id: 5, nombre: 'Luis Sanchez', tRegistro: 3, tAtencion: 8, satisfaccion: 3},
        {id: 6, nombre: 'Luciana Leon', tRegistro: 3, tAtencion: 4, satisfaccion: 5},
        {id: 7, nombre: 'Juan Perez', tRegistro: 2, tAtencion: 5, satisfaccion: 4},
        {id: 8, nombre: 'Luis Sanchez', tRegistro: 3, tAtencion: 8, satisfaccion: 3},
        {id: 9, nombre: 'Luciana Leon', tRegistro: 3, tAtencion: 4, satisfaccion: 5},
        {id: 10, nombre: 'Juan Perez', tRegistro: 2, tAtencion: 5, satisfaccion: 4},
        {id: 11, nombre: 'Luis Sanchez', tRegistro: 3, tAtencion: 8, satisfaccion: 3},
        {id: 12, nombre: 'Luciana Leon', tRegistro: 3, tAtencion: 4, satisfaccion: 5},
        {id: 13, nombre: 'Juan Perez', tRegistro: 2, tAtencion: 5, satisfaccion: 4},
        {id: 14, nombre: 'Luis Sanchez', tRegistro: 3, tAtencion: 8, satisfaccion: 3},
        {id: 15, nombre: 'Luciana Leon', tRegistro: 3, tAtencion: 4, satisfaccion: 5}
    ]

    return(
    <>
    <View style={styles.containerInit}>
        <Text style={styles.titulo}>Resumen Estadistico</Text>
    </View>
    <View style={styles.containerTitle}>
        <Text style={styles.subtitle}>Nombre</Text>
        <Text style={styles.subtitle}>T. Reacción</Text>
        <Text style={styles.subtitle}>I. Atendidas</Text>
        <Text style={styles.subtitle}>Nivel Seguridad</Text>
    </View>
    <View style={styles.containerCenter1}>
    <FlatList
        data={Data}
        keyExtractor={(Data, index) => 'key' + index}
        scrollEnabled
        horizontal = {false}
        snapToAlignment="center"
        scrollEventThrottle={16}
        decelerationRate="fast"
        renderItem={(item) => {
        return (
            <ResumenSlider item = {item.item}  onPress={()=>navigation.navigate('DetalleIncidence', item.item)} />                  
        );
        }}
    />
    </View>
    <View style={styles.containerCenter2}>
        <View style={{flexDirection: 'row', marginTop: 10}}>
            <Text style={{width: windowWidth/2, marginLeft: 15}}>Promedio Tiempo Reaccion</Text>
            <Text style={{marginLeft: 80}}>3 min</Text>
        </View>        
        <View style={{flexDirection: 'row', marginTop: 10}}>
            <Text style={{width: windowWidth/2, marginLeft: 15}}>Tasa Promedio de Incidencias Atendidas</Text>
            <Text style={{marginLeft: 80}}>6</Text>
        </View>  
        <View style={{flexDirection: 'row', marginTop: 10}}>
            <Text style={{width: windowWidth/2, marginLeft: 15}}>Nivel de seguridad</Text>
            <Text style={{marginLeft: 80}}>5</Text>
        </View>  
    </View>   
    <View style={styles.containerCenter}>
        <Button label={'Salir'} windowWidth={windowWidth/1.5} windowHeight={windowHeight/16} onPress={Enviar}></Button>
    </View>
    <View style={styles.containerEnd}>
        <Footer navigation={navigation}></Footer>
    </View>
    </>
    )    
}

export default ResumenEstadistico;