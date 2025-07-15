import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const EditarEspecialidades = ({ route, navigation }) => {
  const [modoEdicion, setModoEdicion] = useState(false);
  const [id, setId] = useState('');
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [doctores, setDoctores] = useState('');
  const [imagen, setImagen] = useState('');

  React.useEffect(() => {
    if (route.params?.especialidad) {
      setModoEdicion(true);
      const { id, nombre, descripcion, doctores, imagen } = route.params.especialidad;
      setId(id);
      setNombre(nombre);
      setDescripcion(descripcion);
      setDoctores(doctores.join(', '));
      setImagen(imagen);
    }
  }, [route.params?.especialidad]);

  const handleGuardar = () => {
    if (!nombre.trim()) {
      Alert.alert('Error', 'El nombre de la especialidad es requerido');
      return;
    }

    const listaDoctores = doctores.split(',').map(d => d.trim()).filter(d => d);

    const especialidad = {
      id: modoEdicion ? id : Date.now().toString(),
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      doctores: listaDoctores,
      imagen: imagen.trim() || `https://placehold.co/600x400?text=${nombre.trim()}`
    };

    console.log('Especialidad guardada:', especialidad);
    Alert.alert('Éxito', modoEdicion ? 'Especialidad actualizada' : 'Especialidad creada');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        {modoEdicion ? 'Editar Especialidad' : 'Nueva Especialidad'}
      </Text>

      <Text style={styles.label}>Nombre de la especialidad*</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: Cardiología"
        placeholderTextColor="#A7C7E7"
        value={nombre}
        onChangeText={setNombre}
      />

      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Detalles sobre la especialidad"
        placeholderTextColor="#A7C7E7"
        multiline
        numberOfLines={4}
        value={descripcion}
        onChangeText={setDescripcion}
      />

      <Text style={styles.label}>Doctores</Text>
      <TextInput
        style={styles.input}
        placeholder="Separados por comas (Dr. Pérez, Dra. Gómez)"
        placeholderTextColor="#A7C7E7"
        value={doctores}
        onChangeText={setDoctores}
      />

      <Text style={styles.label}>Imagen (URL opcional)</Text>
      <TextInput
        style={styles.input}
        placeholder="https://ejemplo.com/imagen.jpg"
        placeholderTextColor="#A7C7E7"
        value={imagen}
        onChangeText={setImagen}
      />

      <TouchableOpacity 
        style={styles.botonGuardar} 
        onPress={handleGuardar}
        activeOpacity={0.8}
      >
        <Text style={styles.textoBoton}>
          {modoEdicion ? 'Actualizar Especialidad' : 'Guardar Especialidad'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f9ff'
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 25,
    color: '#89CFF0',
    textAlign: 'center',
    textShadowColor: 'rgba(137, 207, 240, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10
  },
  label: {
    color: '#555',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    marginLeft: 4
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#B5EAD7',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
    color: '#555',
    shadowColor: 'rgba(181, 234, 215, 0.3)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top'
  },
  botonGuardar: {
    backgroundColor: '#89CFF0',
    borderWidth: 0,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: 'rgba(137, 207, 240, 0.5)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 6
  },
  textoBoton: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600'
  }
});

export default EditarEspecialidades;