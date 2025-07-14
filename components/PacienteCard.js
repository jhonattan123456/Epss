import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PacienteCard = ({ paciente, onEdit, onDelete }) => {
    return (
        <View style={styles.card}>
            <View style={styles.infoContainer}>
                <Text style={styles.nombre}>{paciente.nombre}</Text>
                <Text style={styles.documento}>Documento: {paciente.documento}</Text>
                <Text style={styles.telefono}>Teléfono: {paciente.telefono}</Text>
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={onEdit} style={styles.button}>
                    <Ionicons name="pencil" size={24} color="#00b4ff" />
                </TouchableOpacity>
                <TouchableOpacity onPress={onDelete} style={styles.button}>
                    <Ionicons name="trash" size={24} color="#ff3b30" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#1a1a1a',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#00b4ff',
    },
    infoContainer: {
        flex: 1,
    },
    nombre: {
        color: '#00b4ff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    documento: {
        color: '#ccc',
        fontSize: 14,
        marginBottom: 3,
    },
    telefono: {
        color: '#ccc',
        fontSize: 14,
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    button: {
        marginLeft: 15,
    },
});

export default PacienteCard;