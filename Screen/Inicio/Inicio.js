import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, Dimensions } from 'react-native';
import { Ionicons, Feather, Entypo, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window'); 
const itemWidth = (width / 2) - 30; 

import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function Inicio() {
    const navigation = useNavigation();

    const navigateToFlow = (flowName) => {
        navigation.navigate(flowName);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#00f0ff" /> {/* Estilo de la barra de estado */}
            <ScrollView style={styles.container}>
                {/* Encabezado */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Bienvenidos</Text>
                </View>

                {/* Contenedor de las casillas de la cuadrícula */}

<View style={styles.gridContainer}>
    {/* Casilla de Citas */}
    <TouchableOpacity
        style={styles.gridItem}
        onPress={() => navigateToFlow('CitasFlow')}
    >
        <Fontisto name="date" size={24} color="white" />
        <Text style={styles.gridItemText}>Citas</Text>
    </TouchableOpacity>

    {/* Casilla de Pacientes */}
    <TouchableOpacity
        style={styles.gridItem}
        onPress={() => navigateToFlow('PacientesFlow')}
    >
        <FontAwesome6 name="user-injured" size={24} color="white" />
        <Text style={styles.gridItemText}>Pacientes</Text>
    </TouchableOpacity>

    {/* Casilla de Medicos */}
    <TouchableOpacity
        style={styles.gridItem}
        onPress={() => navigateToFlow('MedicosFlow')}
    >
        <Fontisto name="doctor" size={24} color="white" />
        <Text style={styles.gridItemText}>Medicos</Text>
    </TouchableOpacity>

    {/* Casilla de Consultorios */}
    <TouchableOpacity
        style={styles.gridItem}
        onPress={() => navigateToFlow('ConsultoriosFlow')}
    >
        <MaterialIcons name="health-and-safety" size={24} color="white" />
        <Text style={styles.gridItemText}>Consultorios</Text>
    </TouchableOpacity>

    {/* Casilla de Especialidades */}
    <TouchableOpacity
        style={styles.gridItem}
        onPress={() => navigateToFlow('EspecialidadesFlow')}
    >
<FontAwesome6 name="notes-medical" size={24} color="white" />
        <Text style={styles.gridItemText}>Especialidades</Text>
    </TouchableOpacity>

    {/* Casilla de Eps */}
    <TouchableOpacity
        style={styles.gridItem}
        onPress={() => navigateToFlow('EpsFlow')}
    >
        <FontAwesome6 name="hospital" size={24} color="white" />
        <Text style={styles.gridItemText}>Eps</Text>
    </TouchableOpacity>

    {/* Casilla de Sedes */}
    <TouchableOpacity
        style={styles.gridItem}
        onPress={() => navigateToFlow('SedesFlow')}
    >
<FontAwesome6 name="building" size={24} color="white" />
        <Text style={styles.gridItemText}>Sedes</Text>
    </TouchableOpacity>
</View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#101522', // Fondo oscuro
    },
    container: {
        flex: 1,
        backgroundColor: '#101522',
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
        color: '#00f0ff',
        marginBottom: 5,
        textShadowColor: '#00f0ff99', // Sombra
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
    headerSubtitle: {
        fontSize: 18,
        color: '#5edfff', 
        textShadowColor: '#00f0ff55',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 6,
    },
    statusText: {
        fontWeight: 'bold',
        color: '#00f0ff', 
        textShadowColor: '#00f0ff99',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 8,
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
        backgroundColor: '#181f2f', // Casilla oscura
        borderRadius: 15,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 12,
        shadowColor: '#00f0ff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.7,
        shadowRadius: 16,
        borderWidth: 2,
        borderColor: '#00f0ff', // Borde 
    },
    gridItemText: {
        marginTop: 15,
        fontSize: 17,
        fontWeight: '600',
        color: '#00f0ff', 
        textAlign: 'center',
        textShadowColor: '#00f0ff99',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 8,
    },
});
