import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, Dimensions, Animated, Easing } from 'react-native';
import { AntDesign, FontAwesome6, Fontisto, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const itemWidth = (width / 2) - 30;

export default function Inicio() {
    const navigation = useNavigation();
    const rotateValue = new Animated.Value(0);
    const scaleValues = Array(4).fill().map(() => new Animated.Value(1));

    const navigateToFlow = (flowName, index) => {
        // Animación al presionar
        Animated.sequence([
            Animated.timing(scaleValues[index], {
                toValue: 0.95,
                duration: 100,
                useNativeDriver: true
            }),
            Animated.timing(scaleValues[index], {
                toValue: 1,
                duration: 200,
                useNativeDriver: true
            })
        ]).start(() => navigation.navigate(flowName));
    };

    React.useEffect(() => {
        // Animación de rotación constante para los círculos de fondo
        Animated.loop(
            Animated.timing(rotateValue, {
                toValue: 1,
                duration: 20000,
                easing: Easing.linear,
                useNativeDriver: true
            })
        ).start();
    }, []);

    const rotateInterpolation = rotateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#f5f9ff" />
            <View style={styles.container}>
                {/* Elementos decorativos animados */}
                <Animated.View style={[styles.bgCircle1, { transform: [{ rotate: rotateInterpolation }] }]} />
                <Animated.View style={[styles.bgCircle2, { transform: [{ rotate: rotateInterpolation }] }]} />
                <View style={styles.bgDots} />
                
                {/* Encabezado con efecto "stamp" */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>SE BIENVENIDO</Text>
                    <View style={styles.titleContainer}>
                        <Text style={[styles.headerTitle, styles.titleShadow]}>EPS Paso al Infierno</Text>
                        <Text style={[styles.headerTitle, styles.titleMain]}>EPS Paso al Infierno</Text>
                    </View>
                    <Text style={styles.headerSubtitle}>Selecciona una opción</Text>
                </View>

                {/* Cuadrícula con animaciones */}
                <View style={styles.gridContainer}>
                    {[
                        { icon: <AntDesign name="medicinebox" size={36} color="#4a5568" />, text: 'Citas', flow: 'CitasFlow', color: '#a8e6cf', index: 0 },
                        { icon: <MaterialIcons name="folder-special" size={36} color="#4a5568" />, text: 'Especialidades', flow: 'EspecialidadesFlow', color: '#ffb8b8', index: 1 },
                        { icon: <FontAwesome6 name="user-doctor" size={36} color="#4a5568" />, text: 'Médicos', flow: 'MedicosFlow', color: '#89CFF0', index: 2 },
                        { icon: <Fontisto name="bed-patient" size={36} color="#4a5568" />, text: 'Pacientes', flow: 'PacienteFlow', color: '#fff8b8', index: 3 }
                    ].map((item, index) => (
                        <Animated.View 
                            key={index}
                            style={[styles.gridItemWrapper, { transform: [{ scale: scaleValues[index] }] }]}
                        >
                            <TouchableOpacity
                                style={[
                                    styles.gridItem, 
                                    { 
                                        borderColor: item.color,
                                        transform: [
                                            { rotate: `${index % 2 === 0 ? -1 : 1}deg` },
                                            { perspective: 1000 }
                                        ]
                                    }
                                ]}
                                onPress={() => navigateToFlow(item.flow, index)}
                                activeOpacity={0.7}
                            >
                                <View style={[styles.iconContainer, { backgroundColor: `${item.color}40` }]}>
                                    {item.icon}
                                </View>
                                <Text style={styles.gridItemText}>{item.text}</Text>
                                <View style={[styles.itemCorner, { borderRightColor: item.color, borderTopColor: item.color }]} />
                            </TouchableOpacity>
                        </Animated.View>
                    ))}
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f9ff',
    },
    container: {
        flex: 1,
        backgroundColor: '#f5f9ff',
        padding: 20,
        position: 'relative',
        overflow: 'hidden',
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
        marginTop: 20,
        padding: 25,
        borderRadius: 25,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        shadowColor: "#a8e6cf",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 8,
        borderWidth: 1,
        borderColor: 'rgba(243, 243, 243, 0)',
    },
    titleContainer: {
        position: 'relative',
        marginBottom: 5,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '800',
        color: '#FF204E',
        textAlign: 'center',
    },
    titleMain: {
        position: 'relative',
    },
    titleShadow: {
        position: 'absolute',
        top: 2,
        left: 2,
        color: 'rgba(168, 230, 207, 0.6)',
        zIndex: -1,
    },
    headerSubtitle: {
        fontSize: 18,
        color: '#718096',
        fontWeight: '600',
        textAlign: 'center',
        marginTop: 5,
        letterSpacing: 0.5,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        paddingHorizontal: 5,
    },
    gridItemWrapper: {
        width: itemWidth,
        height: itemWidth,
        marginVertical: 15,
    },
    gridItem: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        backgroundColor: '#ffffff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 8,
        position: 'relative',
        overflow: 'hidden',
    },
    iconContainer: {
        width: 70,
        height: 70,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
    },
    gridItemText: {
        marginTop: 10,
        fontSize: 17,
        fontWeight: '700',
        color: '#4a5568',
        textAlign: 'center',
        paddingHorizontal: 5,
    },
    itemCorner: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 0,
        height: 0,
        borderRightWidth: 20,
        borderTopWidth: 20,
        borderRightColor: 'transparent',
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
        borderBottomColor: 'transparent',
    },
    bgCircle1: {
        position: 'absolute',
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: 'rgba(35, 192, 135, 0.9)',
        top: -100,
        left: -100,
        zIndex: -1,
        borderWidth: 40,
        borderColor: 'rgba(168, 230, 207, 1)',
    },
    bgCircle2: {
        position: 'absolute',
        width: 250,
        height: 250,
        borderRadius: 125,
        backgroundColor: 'rgba(255, 184, 184, 0.97)',
        bottom: -80,
        right: -60,
        zIndex: -1,
        borderWidth: 30,
        borderColor: 'rgba(197, 40, 40, 0.84)',
    },
    bgDots: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: -2,
        backgroundColor: 'transparent',
        backgroundImage: 'radial-gradient(#a8e6cf 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        opacity: 0.1,
    },
});