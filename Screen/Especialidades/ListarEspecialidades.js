import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function ListarEspecialidades({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Especialidades Médicas</Text>
            
            <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => navigation.navigate("DetalleEspecialidades")}
                activeOpacity={0.8}
            >
                <Text style={styles.primaryButtonText}>Ver Todas las Especialidades</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => navigation.navigate("EditarEspecialidades")}
                activeOpacity={0.8}
            >
                <Text style={styles.secondaryButtonText}>Gestionar Especialidades</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f9ff",
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 40,
        color: "#89CFF0",
        textShadowColor: "rgba(137, 207, 240, 0.5)",
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
    primaryButton: {
        backgroundColor: "#89CFF0",
        padding: 16,
        borderRadius: 10,
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
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
    },
    secondaryButton: {
        backgroundColor: "#fff",
        borderWidth: 2,
        borderColor: "#89CFF0",
        padding: 16,
        borderRadius: 10,
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
        color: "#89CFF0",
        fontSize: 18,
        fontWeight: "600",
    },
});