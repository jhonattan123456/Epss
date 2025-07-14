import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function ActividadCard ({actividad, oneEdit, oneDelete}) {
    return (
    <View style={styles.card}>
        <View style={styles.info}>
            <Text style={styles.nombre}>{actividad.nombre}</Text>
            <Text style={styles.detalle}>Fecha: {actividad.fecha_evento}</Text>
            <Text style={styles.detalle}>Municipio: {actividad.municipio}</Text>
            <Text style={styles.detalle}>Total recaudado: {actividad.fecha_recaudado}</Text>
        </View>
        <View style={styles.actions}>
            <TouchableOpacity onPress={oneEdit} style={styles.iconBtn}>
                <Ionicons name="create-outline" size={24} color="#1976D2"/>
            </TouchableOpacity>
            <TouchableOpacity onPress={oneDelete} style={styles.iconBtn}>
                <Ionicons name="trash-outline" size={24} color="#D32F2F"/>
            </TouchableOpacity>
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    info: {
        flex: 1,
    },
    nombre: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1976D2',
        marginBottom: 4,
    },
    detalle: {
        fontSize: 14,
        color: '#333',
        marginBottom: 2,
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 12,
    },
    iconBtn: {
        marginHorizontal: 4,
        padding: 6,
        borderRadius: 20,
    },
});

    