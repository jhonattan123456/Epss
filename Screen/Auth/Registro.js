import { View, Text, TextInput, StyleSheet } from "react-native";
import BottonComponent from "../../components/BottonComponent";
import React, { useState } from "react";

export default function RegistroScreen({ navigation }) {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    const [password, setPassword] = useState("");
    const [confirmarPassword, setConfirmarPassword] = useState("");

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registro</Text>
            
            <Text style={styles.label}>Nombre Completo</Text>
            <TextInput
                style={styles.input}
                placeholder="Ingrese su nombre completo"
                placeholderTextColor="#888"
                value={nombre}
                onChangeText={setNombre}
            />
            
            <Text style={styles.label}>Correo Electrónico</Text>
            <TextInput
                style={styles.input}
                placeholder="Ingrese su correo electrónico"
                placeholderTextColor="#888"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            
            <Text style={styles.label}>Teléfono</Text>
            <TextInput
                style={styles.input}
                placeholder="Ingrese su número telefónico"
                placeholderTextColor="#888"
                value={telefono}
                onChangeText={setTelefono}
                keyboardType="phone-pad"
            />
            
            <Text style={styles.label}>Contraseña</Text>
            <TextInput
                style={styles.input}
                placeholder="Cree una contraseña"
                placeholderTextColor="#888"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            
            <Text style={styles.label}>Confirmar Contraseña</Text>
            <TextInput
                style={styles.input}
                placeholder="Repita su contraseña"
                placeholderTextColor="#888"
                secureTextEntry
                value={confirmarPassword}
                onChangeText={setConfirmarPassword}
            />
            
            <BottonComponent
                title="Registrarse"
                onPress={() => console.log("Registro")}
            />
            <BottonComponent
                title="Iniciar Sesión"
                onPress={() => navigation.navigate("Login")}
                
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 16,
        backgroundColor: "#000",
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
        color: "#00b4ff",
        textShadowColor: "#0077ff",
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
    label: {
        color: "#fff",
        fontSize: 16,
        marginBottom: 8,
        marginLeft: 4,
    },
    input: {
        height: 50,
        borderColor: "#00b4ff",
        borderWidth: 2,
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 20,
        color: "#fff",
        backgroundColor: "#111",
        shadowColor: "#00b4ff",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 5,
    },
    neonButton: {
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: "#00b4ff",
        shadowColor: "#00b4ff",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 10,
    },
    neonButtonSecondary: {
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: "#7fcdff",
        shadowColor: "#7fcdff",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 8,
        elevation: 8,
        marginTop: 15,
    },
});