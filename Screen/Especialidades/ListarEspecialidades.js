import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function ListarEspecialidades({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Listar Especialidades</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("DetalleEspecialidades")}
            >
                <Text style={styles.buttonText}>Ver Especialidad</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("EditarEspecialidades")}
            >
                <Text style={styles.buttonText}>Editar Especialidad</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000000",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 40,
        color: "#00b4ff",
        textShadowColor: "#0077ff",
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
    button: {
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: "#00b4ff",
        padding: 15,
        borderRadius: 8,
        marginVertical: 15,
        width: "80%",
        alignItems: "center",
        shadowColor: "#00b4ff",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 10,
    },
    secondaryButton: {
        borderColor: "#7fcdff",
        shadowColor: "#7fcdff",
    },
    buttonText: {
        color: "#00b4ff",
        fontSize: 18,
        fontWeight: "600",
        textShadowColor: "rgba(0, 180, 255, 0.5)",
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 4,
    },
});
