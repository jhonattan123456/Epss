import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const EspecialidadCard = ({ especialidad, onEdit, onDelete }) => {
    return (
        <View style={styles.card}>
            <View style={styles.infoContainer}>
                <Text style={styles.nombre}>{especialidad.nombre}</Text>
                <Text style={styles.documento}>Descripcion: {especialidad.descripcion}</Text>

            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={onEdit} style={[styles.button, styles.editButton]}>
                    <Ionicons name="pencil" size={20} color="#5D8BF4" />
                </TouchableOpacity>
                <TouchableOpacity onPress={onDelete} style={[styles.button, styles.deleteButton]}>
                    <Ionicons name="trash" size={20} color="#FF204E" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#B5EAD7',
        shadowColor: 'rgba(181, 234, 215, 0.5)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 8,
        elevation: 3,
    },
    infoContainer: {
        flex: 1,
    },
    nombre: {
        color: '#5D8BF4', // Azul pastel más intenso
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 6,
    },
    documento: {
        color: '#89CFF0', // Azul cielo pastel
        fontSize: 14,
        marginBottom: 4,
    },
    telefono: {
        color: '#A7C7E7', // Azul pastel más suave
        fontSize: 14,
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        padding: 8,
        borderRadius: 8,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    editButton: {
        backgroundColor: 'rgba(93, 139, 244, 0.1)', // Fondo muy claro para el botón de editar
    },
    deleteButton: {
        backgroundColor: 'rgba(255, 32, 78, 0.1)', // Fondo muy claro para el botón de eliminar
    },
});

export default EspecialidadCard;