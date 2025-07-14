import {View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator} from "react-native";
import React, {useState} from "react";
import {useNavigation, useRoute} from "@react-navigation/native";
import {crearPaciente, editarPaciente} from "../../Src/Services/PacienteService";

export default function EditarPaciente () {
  const navigation = useNavigation();
  const route = useRoute();

  const paciente = route.params?.paciente;

  const [nombre, setNombre] = useState(paciente.nombre || "");
  const [edad, setEdad] = useState(paciente.edad || "");
  const [telefono, setTelefono] = useState(paciente.telefono || "");
  const [direccion, setDireccion] = useState(paciente.direccion || "");
  const [loading, setLoading] = useState(false);

  const esEdicion = !!paciente;

  const handleGuardar = async () => {
        if (!nombre || !edad || !telefono || !direccion) {
            Alert.alert("Error", "Todos los campos son obligatorios");
            return;
        }
        setLoading(true);
        try{
            let  result; 
            if (esEdicion) {
                result = await editarPaciente(paciente.id, { nombre, edad, telefono, direccion });
            } else {
                result = await crearPaciente({ nombre, edad, telefono, direccion });
            } 
            if (result.success) {
                Alert.alert("Éxito", esEdicion ? "Paciente actualizado" : "Paciente creado");
                navigation.goBack();
            } else {
                Alert.alert("Error", result.message || "Error al guardar al paciente");
            }        
        } catch (error) {
            Alert.alert("Error", "Error al guardar al paciente");
        } finally {
            setLoading(false);
        }
    }
    return (
      <View style={Styles.container}>
            <Text style={Styles.titulo}>{esEdicion ? "Editar Paciente" : "Crear Paciente"}</Text>
            <TextInput
                style={Styles.input}
                placeholder="Nombre del paciente"
                value={nombre}
                onChangeText={setNombre}
            />
            <TextInput
                style={Styles.input}
                placeholder="Edad del paciente"
                value={edad}
                onChangeText={setEdad}
            />
            <TextInput
                style={Styles.input}
                placeholder="Telefono"
                value={telefono}
                keyboardType="numeric"
                onChangeText={setTelefono}
            />
            <TextInput
                style={Styles.input}
                placeholder="Dirección"
                value={direccion}
                keyboardType="numeric"
                onChangeText={setDireccion}
            />
            <TouchableOpacity
            style={Styles.boton} onPress={handleGuardar} disabled={loading}>
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={Styles.botonTexto}>{esEdicion ? "Actualizar" : "Crear"}</Text>
                )}
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: "#000",
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#00b4ff",
    textAlign: "center",
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
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  boton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#00b4ff",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    shadowColor: "#00b4ff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  botonTexto: {
    color: "#00b4ff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 180, 255, 0.5)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
    },
});