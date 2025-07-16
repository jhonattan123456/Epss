import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { crearMedicos, editarMedicos } from "../../Src/Services/MedicosService";
import { Picker } from "@react-native-picker/picker";

export default function EditarMedicos() {
  const navigation = useNavigation();
  const route = useRoute();
  const medico = route.params?.medico || {};

  // Estados para los campos
  const [nombre, setNombre] = useState(medico.nombre || "");
  const [tipoDocumento, setTipoDocumento] = useState(medico.tipo_documento || "CC"); // Corregido
  const [numDocumento, setNumDocumento] = useState(medico.num_documento || ""); // Corregido
  const [telefono, setTelefono] = useState(medico.telefono || "");
  const [correo, setCorreo] = useState(medico.correo || "");
  const [especialidadid, setEspecialidad_id] = useState (medico?.especialidad_id?.toString()|| 2 );
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const esEdicion = !!route.params?.medico;

  const validarTelefono = (telefono) => {
    const soloNumeros = telefono.replace(/[^0-10]/g, '');
    
    if (soloNumeros.length > 10) {
      setErrors({...errors, telefono: "El teléfono debe tener máximo 10 dígitos"});
      return false;
    }
    
    setErrors({...errors, telefono: null});
    return true;
  };

  const handleGuardar = async () => {
    const nuevosErrores = {};
    if (!nombre) nuevosErrores.nombre = "El nombre es obligatorio";
    if (!numDocumento) nuevosErrores.numDocumento = "El documento es obligatorio";
    if (!telefono) nuevosErrores.telefono = "El teléfono es obligatorio";
    if (!validarTelefono(telefono)) return;
    if (!correo) nuevosErrores.correo = "El correo es obligatorio";
    if (!/^\S+@\S+\.\S+$/.test(correo)) nuevosErrores.correo = "Correo inválido";

    if (Object.keys(nuevosErrores).length > 0) {
      setErrors(nuevosErrores);
      Alert.alert("Error", "Por favor complete todos los campos requeridos correctamente");
      return;
    }

    setLoading(true);
    try {
      const datosMedicos = {
        nombre,
        tipo_documento: tipoDocumento, // Corregido
        num_documento: numDocumento,   // Corregido
        telefono: telefono.replace(/[^0-9]/g, ''),
        correo,
        especialisaciones_id:especialidadid
      };

      const result = esEdicion 
        ? await editarMedicos(medico.id, datosMedicos)
        : await crearMedicos(datosMedicos);

      if (result.success) {
        Alert.alert(
          "Éxito",
          esEdicion ? "Medicos actualizado" : "Medicos creado",
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
      <Text style={styles.titulo}>{esEdicion ? "Editar Medicos" : "Nuevo Medicos"}</Text>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.label}>Nombre *</Text>
        <TextInput
          style={[styles.input, errors.nombre && styles.inputError]}
          placeholder="Nombre del medico"
          placeholderTextColor="#A7C7E7"
          value={nombre}
          onChangeText={(text) => {
            setNombre(text);
            setErrors({...errors, nombre: null});
          }}
        />
        {errors.nombre && <Text style={styles.errorText}>{errors.nombre}</Text>}
        
        <Text style={styles.label}>Tipo de Documento *</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={tipoDocumento}
            onValueChange={setTipoDocumento}
            style={styles.picker}
          >
            <Picker.Item label="Cédula" value="CC" />
            <Picker.Item label="Tarjeta de Identidad" value="TI" />
            <Picker.Item label="Pasaporte" value="PA" />
            <Picker.Item label="Cédula Extranjería" value="CE" />
          </Picker>
        </View>
        
        <Text style={styles.label}>Número de Documento *</Text>
        <TextInput
          style={[styles.input, errors.numDocumento && styles.inputError]}
          placeholder="Número de documento"
          placeholderTextColor="#A7C7E7"
          value={numDocumento}
          onChangeText={(text) => {
            setNumDocumento(text);
            setErrors({...errors, numDocumento: null});
          }}
          keyboardType="numeric"
        />
        {errors.numDocumento && <Text style={styles.errorText}>{errors.numDocumento}</Text>}
        
        <Text style={styles.label}>Teléfono *</Text>
        <TextInput
          style={[styles.input, errors.telefono && styles.inputError]}
          placeholder="Teléfono (10 dígitos)"
          placeholderTextColor="#A7C7E7"
          value={telefono}
          onChangeText={(text) => {
            setTelefono(text);
            validarTelefono(text);
          }}
          keyboardType="phone-pad"
          maxLength={10}
        />
        {errors.telefono && <Text style={styles.errorText}>{errors.telefono}</Text>}
        
        <Text style={styles.label}>Correo Electrónico *</Text>
        <TextInput
          style={[styles.input, errors.correo && styles.inputError]}
          placeholder="ejemplo@dominio.com"
          placeholderTextColor="#A7C7E7"
          value={correo}
          onChangeText={(text) => {
            setCorreo(text);
            setErrors({...errors, correo: null});
          }}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.correo && <Text style={styles.errorText}>{errors.correo}</Text>}
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
            {esEdicion ? "Actualizar Medicos" : "Registrar Medicos"}
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