import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function ListarCitas({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mis Citas</Text>
            
            <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => navigation.navigate("DetalleCitas")}
                activeOpacity={0.8}
            >
                <Text style={styles.primaryButtonText}>Ver Detalles de Citas</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => navigation.navigate("EditarCitas")}
                activeOpacity={0.8}
            >
                <Text style={styles.secondaryButtonText}>Agregar/Editar Citas</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f9ff", // Fondo azul pastel claro
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 40,
        color: "#89CFF0", // Azul bebé pastel
        textShadowColor: "rgba(137, 207, 240, 0.5)",
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
    primaryButton: {
        backgroundColor: "#89CFF0", // Fondo azul pastel
        padding: 16,
        borderRadius: 8,
        marginVertical: 12,
        width: "100%",
        maxWidth: 300,
        alignItems: "center",
        shadowColor: "rgba(137, 207, 240, 0.5)",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.6,
        shadowRadius: 8,
        elevation: 6,
    },
    primaryButtonText: {
        color: "#fff", // Texto blanco para máximo contraste
        fontSize: 18,
        fontWeight: "600",
    },
    secondaryButton: {
        backgroundColor: "#fff", // Fondo blanco
        borderWidth: 2,
        borderColor: "#89CFF0", // Borde azul pastel
        padding: 16,
        borderRadius: 8,
        marginVertical: 12,
        width: "100%",
        maxWidth: 300,
        alignItems: "center",
        shadowColor: "rgba(137, 207, 240, 0.3)",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
        elevation: 4,
    },
    secondaryButtonText: {
        color: "#89CFF0", // Texto azul pastel
        fontSize: 18,
        fontWeight: "600",
    },
});