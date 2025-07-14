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
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>{modoEdicion ? "Editar Cita" : "Nueva Cita"}</Text>
            
            <TextInput
                style={styles.input}
                placeholder="Nombre del paciente*"
                value={nombre}
                onChangeText={setNombre}
            />

            <TextInput
                style={styles.input}
                placeholder="Fecha* (DD/MM/AAAA)"
                value={fecha}
                onChangeText={setFecha}
            />

            <TextInput
                style={styles.input}
                placeholder="Hora* (HH:MM)"
                value={hora}
                onChangeText={setHora}
            />

            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Descripción"
                multiline
                numberOfLines={4}
                value={descripcion}
                onChangeText={setDescripcion}
            />

            <TouchableOpacity style={styles.boton} onPress={handleGuardar}>
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
        backgroundColor: "#000"
    },
    titulo: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 30,
        textAlign: "center",
        color: "#00b4ff",
        textShadowColor: "#0077ff",
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
    input: {
        height: 50,
        borderColor: "#00b4ff",
        borderWidth: 2,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 20,
        color: "#fff",
        backgroundColor: "#111",
        shadowColor: "#00b4ff",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 5,
    },
    textArea: {
        height: 120,
        textAlignVertical: "top"
    },
    boton: {
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: "#00b4ff",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        shadowColor: "#00b4ff",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 10,
        marginTop: 10,
    },
    textoBoton: {
        color: "#00b4ff",
        fontWeight: "bold",
        fontSize: 16,
        textShadowColor: "rgba(0, 180, 255, 0.5)",
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 4,
    }
});
