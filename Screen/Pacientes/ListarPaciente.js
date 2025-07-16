import { View, Text, FlatList, Alert, ActivityIndicator, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import PacienteCard from "../../components/PacienteCard";
import { useNavigation } from "@react-navigation/native";
import { listarPacientes, eliminarPaciente } from "../../Src/Services/PacienteService";

export default function ListarPacientesScreen() {
    const [pacientes, setPacientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    const handlePacientes = async () => {
        setLoading(true);
        try {
            const result = await listarPacientes();
            if (result.success) {
                setPacientes(result.data);
            } else {
                Alert.alert("Error", result.message || "Error al cargar pacientes");
            }
        } catch (error) {
            Alert.alert("Error", "Error al cargar pacientes");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', handlePacientes);
        return unsubscribe;
    }, [navigation]);

    const handleEliminar = (id) => {
        Alert.alert(
            "Confirmar Eliminación",
            "¿Estás seguro de que deseas eliminar esta paciente?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const result = await eliminarPaciente(id);
                            if (result.success) {
                                handlePacientes();
                                Alert.alert("Éxito", "Paciente eliminado correctamente");
                            } else {
                                Alert.alert("Error", result.message || "Error al eliminar paciente");
                            }
                        } catch (error) {
                            Alert.alert("Error", "Error al eliminar paciente");
                        }
                    },
                }
            ]
        );
    };

    const handleEditar = (paciente) => {
        navigation.navigate("EditarPaciente", { paciente }); // Corregido a singular
    };

    const handleCrear = () => {
        navigation.navigate("EditarPaciente", { paciente: null }); // Corregido a singular
    };

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#89CFF0" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {pacientes.length === 0 ? (
                <Text style={styles.empty}>No hay pacientes registrados</Text>
            ) : (
                <FlatList
                    data={pacientes}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContent}
                    renderItem={({ item }) => (
                        <PacienteCard
                            paciente={item}
                            onEdit={() => handleEditar(item)}
                            onDelete={() => handleEliminar(item.id)}
                        />
                    )}
                />
            )}
            <TouchableOpacity 
                style={styles.botonCrear} 
                onPress={handleCrear}
                activeOpacity={0.8}
            >
                <Text style={styles.textoBoton}>+ Nuevo Paciente</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f9ff',
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
        color: "#89CFF0",
        fontSize: 18,
        fontWeight: '500'
    },
    listContent: {
        padding: 15,
    },
    botonCrear: {
        backgroundColor: '#89CFF0',
        borderWidth: 0,
        borderRadius: 8,
        padding: 16,
        margin: 16,
        alignItems: "center",
        shadowColor: 'rgba(137, 207, 240, 0.5)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.6,
        shadowRadius: 8,
        elevation: 6,
    },
    textoBoton: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 18,
    }
});