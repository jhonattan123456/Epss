import { View, Text, FlatList, Alert, ActivityIndicator, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import PacienteCard from "../../components/PacienteCard";
import { useNavigation } from "@react-navigation/native";
import { listarPacientes as fetchPacientes, eliminarPaciente } from "../../Src/Services/PacienteService";

export default function ListarPacientesScreen() {
    const [pacientes, setPacientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    const handlePacientes = async () => {
        setLoading(true);
        try {
            const result = await fetchPacientes();
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
        navigation.navigate("EditarPaciente", { paciente });
    };

    const handleCrear = () => {
        navigation.navigate("EditarPacientes");
    };

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#0000ff" />
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
            <TouchableOpacity style={styles.botonCrear} onPress={handleCrear}>
                <Text style={styles.textoBoton}>+ Nuevo paciente</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#000',
    },
    empty: {
        textAlign: "center",
        marginTop: 40,
        color: "#7fcdff",
        fontSize: 18,
        textShadowColor: 'rgba(0, 180, 255, 0.3)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 3,
    },
    listContent: {
        padding: 15,
    },
    botonCrear: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#00b4ff',
        padding: 16,
        borderRadius: 8,
        margin: 16,
        alignItems: "center",
        shadowColor: '#00b4ff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 10,
    },
    textoBoton: {
        color: "#00b4ff",
        fontWeight: "bold",
        fontSize: 18,
        textShadowColor: 'rgba(0, 180, 255, 0.5)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 4,
    }
});