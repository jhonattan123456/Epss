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
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        {modoEdicion ? 'Editar Especialidad' : 'Nueva Especialidad'}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre de la especialidad*"
        value={nombre}
        onChangeText={setNombre}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Descripción"
        multiline
        numberOfLines={4}
        value={descripcion}
        onChangeText={setDescripcion}
      />

      <TextInput
        style={styles.input}
        placeholder="Doctores (separados por comas)"
        value={doctores}
        onChangeText={setDoctores}
      />

      <TextInput
        style={styles.input}
        placeholder="URL de imagen (opcional)"
        value={imagen}
        onChangeText={setImagen}
      />

      <TouchableOpacity style={styles.botonGuardar} onPress={handleGuardar}>
        <Text style={styles.textoBoton}>
          {modoEdicion ? 'Actualizar' : 'Guardar'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000'
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#00b4ff',
    textAlign: 'center',
    textShadowColor: '#0077ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10
  },
  input: {
    backgroundColor: '#111',
    borderWidth: 2,
    borderColor: '#00b4ff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
    color: '#fff',
    shadowColor: '#00b4ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top'
  },
  botonGuardar: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#00b4ff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
    shadowColor: '#00b4ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10
  },
  textoBoton: {
    color: '#00b4ff',
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 180, 255, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4
  }
});

export default EditarEspecialidades;
