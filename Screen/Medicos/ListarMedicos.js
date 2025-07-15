import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function ListarMedicos({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Listar Médicos</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("DetalleMedicos")}
            >
                <Text style={styles.buttonText}>Ver Médicos</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("EditarMedicos")}
            >
                <Text style={styles.buttonText}>Editar Médicos</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f5f9ff'
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 25,
        color: '#89CFF0',
        textAlign: 'center',
        textShadowColor: 'rgba(137, 207, 240, 0.5)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10
    },
    button: {
        backgroundColor: '#89CFF0',
        borderWidth: 0,
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        marginTop: 15,
        shadowColor: 'rgba(137, 207, 240, 0.5)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.6,
        shadowRadius: 8,
        elevation: 6
    },
    secondaryButton: {
        backgroundColor: '#FF9AA2',
        shadowColor: 'rgba(255, 154, 162, 0.5)',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600'
    },
    secondaryButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600'
    }
});
