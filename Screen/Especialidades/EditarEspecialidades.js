import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { crearEspecialidades, editarEspecialidades } from "../../Src/Services/EspecialidadesService";
import { Picker } from "@react-native-picker/picker";

export default function EditarEspecialidad() {
  const navigation = useNavigation();
  const route = useRoute();
  const especialidad = route.params?.especialidad || {};

  // Estados para los campos
  const [nombre, setNombre] = useState(especialidad.nombre || "");
  const [descripcion, setDescripcion] = useState(especialidad.descripcion || "");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const esEdicion = !!route.params?.especialidad;

  const handleGuardar = async () => {
    const nuevosErrores = {};
    if (!nombre) nuevosErrores.nombre = "El nombre es obligatorio";
    if (!descripcion) nuevosErrores.descripcion = "El descripcion es obligatorio";

    if (Object.keys(nuevosErrores).length > 0) {
      setErrors(nuevosErrores);
      Alert.alert("Error", "Por favor complete todos los campos requeridos correctamente");
      return;
    }

    setLoading(true);
    try {
      const datosEspecialidad = {
        nombre,
        descripcion,

      };

      const result = esEdicion 
        ? await editarEspecialidades(especialidad.id, datosEspecialidad)
        : await crearEspecialidades(datosEspecialidad);

      if (result.success) {
        Alert.alert(
          "Éxito",
          esEdicion ? "Especialidad actualizado" : "Especialidad creado",
          [{ text: "OK", onPress: () => navigation.goBack() }]
        );
      } else {
        if (result.errors) {
          setErrors(result.errors);
          Alert.alert("Error", "Por favor corrija los errores en el formulario");
        } else {
          Alert.alert("Error", result.message || "Error al guardar");
        }
      }
    } catch (error) {
      Alert.alert("Error", "Ocurrió un error al guardar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{esEdicion ? "Editar Especialidad" : "Nuevo Especialidad"}</Text>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.label}>Nombre *</Text>
        <TextInput
          style={[styles.input, errors.nombre && styles.inputError]}
          placeholder="Nombre del especialidad"
          placeholderTextColor="#A7C7E7"
          value={nombre}
          onChangeText={(text) => {
            setNombre(text);
            setErrors({...errors, nombre: null});
          }}
        />
        {errors.nombre && <Text style={styles.errorText}>{errors.nombre}</Text>}
        
        <Text style={styles.label}>Descripcion *</Text>
        <TextInput
          style={[styles.input, errors.descripcion && styles.inputError]}
          placeholder="Apellido del especialidad"
          placeholderTextColor="#A7C7E7"
          value={descripcion}
          onChangeText={(text) => {
            setDescripcion(text);
            setErrors({...errors, descripcion: null});
          }}
        />
        {errors.descripcion && <Text style={styles.errorText}>{errors.descripcion}</Text>}
      </ScrollView>

      <TouchableOpacity
        style={styles.boton}
        onPress={handleGuardar}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.botonTexto}>
            {esEdicion ? "Actualizar Especialidad" : "Registrar Especialidad"}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f9ff',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#89CFF0',
    textAlign: 'center',
    marginVertical: 20,
    textShadowColor: 'rgba(137, 207, 240, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#B5EAD7',
    borderRadius: 8,
    padding: 15,
    marginBottom: 5,
    fontSize: 16,
    color: '#555',
  },
  inputError: {
    borderColor: '#FF9AA2',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#B5EAD7',
    borderRadius: 8,
    marginBottom: 5,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#555',
  },
  errorText: {
    color: '#FF9AA2',
    fontSize: 14,
    marginBottom: 15,
    marginLeft: 5,
  },
  boton: {
    backgroundColor: '#89CFF0',
    padding: 16,
    borderRadius: 8,
    margin: 20,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 20,
    right: 20,
    shadowColor: 'rgba(137, 207, 240, 0.5)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 6,
  },
  botonTexto: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});