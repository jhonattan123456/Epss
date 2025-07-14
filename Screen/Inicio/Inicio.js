// src/Screen/Inicio/Inicio.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, Dimensions } from 'react-native';
import { AntDesign, FontAwesome6, Fontisto, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window'); // Obtener el ancho de la pantalla para estilos responsivos
const itemWidth = (width / 2) - 30; // 2 ítems por fila con margen

export default function Inicio() {
    const navigation = useNavigation();

    const navigateToFlow = (flowName) => {
        navigation.navigate(flowName);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="black" /> {/* Estilo de la barra de estado */}
            <View style={styles.container}>
                {/* Encabezado */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>SE BIENVENIDO</Text>
                    <Text style={styles.headerSubtitle}>A tu EPS de confianza</Text>
                    <Text style={styles.headerSubtitle}>Selecciona una opción</Text>
                    
                </View>

                {/* Contenedor de las casillas de la cuadrícula */}
                <View style={styles.gridContainer}>
                    {/* Casilla de Asociados */}
                    <TouchableOpacity
                        style={styles.gridItem}
                        onPress={() => navigateToFlow('CitasFlow')}
                    >
                        <AntDesign name="medicinebox" size={24} color="black" />
                        <Text style={styles.gridItemText}>Citas</Text>
                    </TouchableOpacity>

                    {/* Casilla de Actividades */}
                    <TouchableOpacity
                        style={styles.gridItem}
                        onPress={() => navigateToFlow('EspecialidadesFlow')}
                    >
                        <MaterialIcons name="folder-special" size={24} color="black" />
                        <Text style={styles.gridItemText}>Especialidades</Text>
                    </TouchableOpacity>

                    {/* Casilla de Participaciones */}
                    <TouchableOpacity
                        style={styles.gridItem}
                        onPress={() => navigateToFlow('MedicosFlow')}
                    >
                        <FontAwesome6 name="user-doctor" size={24} color="black" />
                        <Text style={styles.gridItemText}>Medicos</Text>
                    </TouchableOpacity>

                    {/* Casilla de Préstamos */}
                    <TouchableOpacity
                        style={styles.gridItem}
                        onPress={() => navigateToFlow('PacienteFlow')}
                    >
                        <Fontisto name="bed-patient" size={24} color="black" />
                        <Text style={styles.gridItemText}>Pacientes</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#000',
    },
    container: {
        flex: 1,
        backgroundColor: '#000',
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
        marginTop: 20,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: '800',
        color: '#00b4ff',
        marginBottom: 5,
        textShadowColor: '#0077ff',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
    headerSubtitle: {
        fontSize: 18,
        color: '#7fcdff',
        textShadowColor: 'rgba(0, 180, 255, 0.3)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 3,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        paddingHorizontal: 5,
    },
    gridItem: {
        width: itemWidth,
        height: itemWidth,
        borderRadius: 15,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 10,
    },
    gridItemPrimary: {
        backgroundColor: '#111',
        borderColor: '#00b4ff',
        shadowColor: '#00b4ff',
    },
    gridItemSecondary: {
        backgroundColor: '#111',
        borderColor: '#7fcdff',
        shadowColor: '#7fcdff',
    },
    gridItemText: {
        marginTop: 15,
        fontSize: 17,
        fontWeight: '600',
        color: '#00b4ff',
        textAlign: 'center',
        textShadowColor: 'rgba(0, 180, 255, 0.3)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 3,
    },
});
