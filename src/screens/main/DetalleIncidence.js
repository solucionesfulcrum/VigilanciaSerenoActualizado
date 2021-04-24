import React from 'react';
import {StyleSheet, SafeAreaView, Text, View, TouchableOpacity} from 'react-native';
import Footer from '../../component/footer/Footer';
import InputText from '../../component/inputText/InputText'
import Button from '../../component/button/Button'
import {windowWidth,windowHeight} from '../../resource/Dimensions'



const DetalleIncidence = ({navigation, route}) => {

    console.log("Detalle incidencia",route.params)
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
            color: route.params.estado == 1?'green':'red',
            fontWeight: 'bold'
        }
    });
    return(
    <>
        <View style={styles.containerInit}>
            <Text style={styles.titulo}>Detalle Incidencia</Text>
        </View>
        <View style={styles.containerCenter}>
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
                <TouchableOpacity style={styles.borderLink}>
                    <Text style={styles.textoLinkIV}>Ver Foto o Video</Text>
                </TouchableOpacity>
                <Text style={styles.textoTituloDetalle}>Estado:</Text>
                <Text style={styles.textoEstado}>{route.params[0].estado == 1?'Atendido':'No Atendido'}</Text>
                <Text style={styles.textoTituloDetalle}>Nombre Sereno</Text>
                <Text style={styles.textoDetalle}>{route.params[0].datosUsuarios.nombres}</Text>
            </View>
        </View>
        <View style={styles.containerEnd}>
            <Footer navigation={navigation} route={route.params[1]}></Footer>
        </View>
    </>
    )
}
export default DetalleIncidence;
