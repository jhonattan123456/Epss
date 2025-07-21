import { View, Text, FlatList, Alert, ActivityIndicator, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import PacienteCard from "../../components/PacienteCard";
import { useNavigation } from "@react-navigation/native";
import { listarMedicos, eliminarMedicos } from "../../Src/Services/MedicosService";
import MedicosCard from "../../components/MedicosCard";

export default function ListarMedicosScreen() {
    // Estados para almacenar la lista de médicos y el estado de carga
    const [medicos, setMedicos] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    // Función para cargar la lista de médicos
    const handleMedicos = async () => {
        setLoading(true);
        try {
            const result = await listarMedicos();
            if (result.success) {
                setMedicos(result.data); // Actualiza el estado con los médicos obtenidos
            } else {
                Alert.alert("Error", result.message || "Error al cargar medicos");
            }
        } catch (error) {
            Alert.alert("Error", "Error al cargar medicos");
        } finally {
            setLoading(false); // Finaliza el estado de carga
        }
    };

    // Efecto para cargar los médicos cuando la pantalla obtiene foco
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', handleMedicos);
        return unsubscribe; // Limpieza del listener al desmontar
    }, [navigation]);

    // Función para eliminar un médico con confirmación
    const handleEliminar = (id) => {
        Alert.alert(
            "Confirmar Eliminación",
            "¿Estás seguro de que deseas eliminar esta medico?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const result = await eliminarMedicos(id);
                            if (result.success) {
                                handleMedicos(); // Recarga la lista después de eliminar
                                Alert.alert("Éxito", "Paciente eliminado correctamente");
                            } else {
                                Alert.alert("Error", result.message || "Error al eliminar medico");
                            }
                        } catch (error) {
                            Alert.alert("Error", "Error al eliminar medico");
                        }
                    },
                }
            ]
        );
    };

    // Función para navegar a la pantalla de edición con los datos del médico
    const handleEditar = (medico) => {
        navigation.navigate("EditarMedicos", { medico }); // Pasa el médico como parámetro
    };

    // Función para navegar a la pantalla de creación de nuevo médico
    const handleCrear = () => {
        navigation.navigate("EditarMedicos", { medico: null }); // Pasa null para indicar creación
    };

    // Muestra un indicador de carga mientras se obtienen los datos
    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#89CFF0" />
            </View>
        );
    }

    // Renderizado principal de la pantalla
    return (
        <View style={styles.container}>
            {/* Muestra mensaje si no hay médicos o la lista */}
            {medicos.length === 0 ? (
                <Text style={styles.empty}>No hay medicos registrados</Text>
            ) : (
                <FlatList
                    data={medicos}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContent}
                    renderItem={({ item }) => (
                        <MedicosCard
                            medico={item}
                            onEdit={() => handleEditar(item)} // Pasa función de edición
                            onDelete={() => handleEliminar(item.id)} // Pasa función de eliminación
                        />
                    )}
                />
            )}
            {/* Botón para crear nuevo médico */}
            <TouchableOpacity 
                style={styles.botonCrear} 
                onPress={handleCrear}
                activeOpacity={0.8}
            >
                <Text style={styles.textoBoton}>+ Nuevo Medico</Text>
            </TouchableOpacity>
        </View>
    );
}

// Estilos de la pantalla
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f9ff', // Fondo claro azulado
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#f5f9ff',
    },
    empty: {
        textAlign: "center",
        marginTop: 40,
        color: "#89CFF0", // Color azul claro
        fontSize: 18,
        fontWeight: '500'
    },
    listContent: {
        padding: 15, // Espaciado para la lista
    },
    botonCrear: {
        backgroundColor: '#89CFF0', // Color azul claro
        borderWidth: 0,
        borderRadius: 8,
        padding: 16,
        margin: 16,
        alignItems: "center",
        shadowColor: 'rgba(137, 207, 240, 0.5)', // Sombra con opacidad
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.6,
        shadowRadius: 8,
        elevation: 6, // Sombra en Android
    },
    textoBoton: {
        color: "#fff", // Texto blanco
        fontWeight: "600",
        fontSize: 18,
    }
});