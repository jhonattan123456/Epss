import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";

export default function DetalleActividad({ route }) {
    const [modoEdicion, setModoEdicion] = useState(false);
    const [id, setId] = useState("");
    const [nombre, setNombre] = useState("");
    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");
    const [descripcion, setDescripcion] = useState("");

    useEffect(() => {
        if (route.params?.cita) {
            setModoEdicion(true);
            setId(route.params.cita.id || "");
            setNombre(route.params.cita.nombre || "");
            setFecha(route.params.cita.fecha || "");
            setHora(route.params.cita.hora || "");
            setDescripcion(route.params.cita.descripcion || "");
        }
    }, [route.params?.cita]);

    const handleGuardar = () => {
        if (!nombre || !fecha || !hora) {
            Alert.alert("Error", "Por favor complete todos los campos requeridos");
            return;
        }

        const nuevaCita = {
            id: modoEdicion ? id : Date.now().toString(),
            nombre,
            fecha,
            hora,
            descripcion
        };

        console.log(nuevaCita);
        Alert.alert("Éxito", modoEdicion ? "Cita actualizada correctamente" : "Cita creada correctamente");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>{modoEdicion ? "Editar Cita" : "Nueva Cita"}</Text>
            
            <Text style={styles.label}>Nombre del paciente*</Text>
            <TextInput
                style={styles.input}
                placeholder="Ingrese el nombre completo"
                placeholderTextColor="#A7C7E7"
                value={nombre}
                onChangeText={setNombre}
            />

            <Text style={styles.label}>Fecha*</Text>
            <TextInput
                style={styles.input}
                placeholder="DD/MM/AAAA"
                placeholderTextColor="#A7C7E7"
                value={fecha}
                onChangeText={setFecha}
            />

            <Text style={styles.label}>Hora*</Text>
            <TextInput
                style={styles.input}
                placeholder="HH:MM"
                placeholderTextColor="#A7C7E7"
                value={hora}
                onChangeText={setHora}
            />

            <Text style={styles.label}>Descripción</Text>
            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Detalles adicionales"
                placeholderTextColor="#A7C7E7"
                multiline
                numberOfLines={4}
                value={descripcion}
                onChangeText={setDescripcion}
            />

            <TouchableOpacity 
                style={styles.boton} 
                onPress={handleGuardar}
                activeOpacity={0.8}
            >
                <Text style={styles.textoBoton}>
                    {modoEdicion ? "Actualizar Cita" : "Crear Cita"}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f9ff"
    },
    titulo: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 30,
        textAlign: "center",
        color: "#89CFF0",
        textShadowColor: "rgba(137, 207, 240, 0.5)",
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
    label: {
        color: "#555",
        fontSize: 16,
        marginBottom: 8,
        marginLeft: 4,
        fontWeight: "500",
    },
    input: {
        height: 50,
        borderColor: "#B5EAD7",
        borderWidth: 2,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 20,
        color: "#555",
        backgroundColor: "#fff",
        shadowColor: "rgba(181, 234, 215, 0.3)",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 3,
    },
    textArea: {
        height: 120,
        textAlignVertical: "top"
    },
    boton: {
        backgroundColor: "#89CFF0",
        borderWidth: 0,
        borderRadius: 8,
        paddingVertical: 16,
        alignItems: "center",
        shadowColor: "rgba(137, 207, 240, 0.5)",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.6,
        shadowRadius: 8,
        elevation: 6,
        marginTop: 20,
    },
    textoBoton: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    }
});