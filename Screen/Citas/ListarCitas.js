import { View, Text, FlatList, Alert, ActivityIndicator, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { eliminarCitas, listarCitas } from "../../Src/Services/CitasService";
import EspecialidadCard from "../../components/CitasComponent";


export default function ListarEspecialidadScreen() {
    const [especialidad, setEspecialidad] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    const handleEspecialidad = async () => {
        setLoading(true);
        try {
            const result = await listarCitas();
            if (result.success) {
                setEspecialidad(result.data);
            } else {
                Alert.alert("Error", result.message || "Error al cargar especialidad");
            }
        } catch (error) {
            Alert.alert("Error", "Error al cargar especialidad");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', handleEspecialidad);
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
                            const result = await eliminarCitas(id);
                            if (result.success) {
                                handleEspecialidad();
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

    const handleEditar = (especialidad) => {
        navigation.navigate("EditarCitas", { especialidad }); // Corregido a singular
    };

    const handleCrear = () => {
        navigation.navigate("EditarCitas"); // Corregido a singular
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
            {especialidad.length === 0 ? (
                <Text style={styles.empty}>No hay especialidad registrados</Text>
            ) : (
                <FlatList
                    data={especialidad}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContent}
                    renderItem={({ item }) => (
                        <EspecialidadCard
                            especialidad={item}
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
                <Text style={styles.textoBoton}>+ Nueva especialidad</Text>
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