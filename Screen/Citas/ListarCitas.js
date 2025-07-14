import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function ListarCitas({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Listar Citas</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("DetalleCitas")}
            >
                <Text style={styles.buttonText}>Ver Citas</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("EditarCitas")}
            >
                <Text style={styles.buttonText}>Editar Citas</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000000", // Fondo negro
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 40,
        color: "#00b4ff", // Texto azul neón
        textShadowColor: "#0077ff", // Sombra para efecto neón
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
    button: {
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: "#00b4ff", // Borde azul neón
        padding: 15,
        borderRadius: 8,
        marginVertical: 15,
        width: "80%",
        alignItems: "center",
        shadowColor: "#00b4ff", // Sombra para efecto neón
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 10,
    },
    secondaryButton: {
        borderColor: "#7fcdff", // Borde azul claro para botón secundario
        shadowColor: "#7fcdff",
    },
    buttonText: {
        color: "#00b4ff", // Texto azul neón
        fontSize: 18,
        fontWeight: "600",
        textShadowColor: "rgba(0, 180, 255, 0.5)", // Sombra sutil para texto
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 4,
    },
});
