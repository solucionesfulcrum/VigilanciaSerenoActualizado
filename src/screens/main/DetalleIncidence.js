import React from 'react';
import {StyleSheet, SafeAreaView, Text, View, TouchableOpacity} from 'react-native';
import Footer from '../../component/footer/Footer';
import InputText from '../../component/inputText/InputText'
import Button from '../../component/button/Button'
import {windowWidth,windowHeight} from '../../resource/Dimensions'

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
        color: 'green',
        fontWeight: 'bold'
    }
});

const DetalleIncidence = ({navigation, route}) => {
    console.warn(route.params)
    return(
    <>
        <View style={styles.containerInit}>
            <Text style={styles.titulo}>Detalle Incidencia</Text>
        </View>
        <View style={styles.containerCenter}>
            <View style={styles.centerColum}>
                <Text style={styles.textoTituloDetalle}>Tipo de Incidencia / Otros</Text>
                <Text style={styles.textoDetalle}>Hurto Agrabado</Text>
                <Text style={styles.textoTituloDetalle}>Hora / Fecha</Text>
                <Text style={styles.textoDetalle}>11.30 AM</Text>
                <Text style={styles.textoTituloDetalle}>Nombres y Apellidos</Text>
                <Text style={styles.textoDetalle}>{route.params.nombre}{' '}{'Casas Norberto'}</Text>
                <Text style={styles.textoTituloDetalle}>Telefono</Text>
                <Text style={styles.textoDetalle}>982508182</Text>
                <Text style={styles.textoTituloDetalle}>Correo</Text>
                <Text style={styles.textoDetalle}>{route.params.nombre.split(' ')}{'@gmail.com'}</Text>
            </View>
            <View style={styles.centerColum}>
                <Text style={styles.textoTituloDetalle}>Foto</Text>
                <TouchableOpacity style={styles.borderLink}>
                    <Text style={styles.textoLinkIV}>Ver Foto o Video</Text>
                </TouchableOpacity>
                <Text style={styles.textoTituloDetalle}>Estado:</Text>
                <Text style={styles.textoEstado}>Atendido</Text>
                <Text style={styles.textoTituloDetalle}>Nombre Sereno</Text>
                <Text style={styles.textoDetalle}>Jorge Compañia Silva</Text>
            </View>
        </View>
        <View style={styles.containerEnd}>
            <Footer navigation={navigation}></Footer>
        </View>
    </>
    )
}
export default DetalleIncidence;
