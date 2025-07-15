import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';

const EditarMedicos = ({ route, navigation }) => {
  const [id, setId] = useState('');
  const [nombre, setNombre] = useState('');
  const [especialidad, setEspecialidad] = useState('');
  const [cedula, setCedula] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [horario, setHorario] = useState('');
  const [modoEdicion, setModoEdicion] = useState(false);

  const [especialidades] = useState([
    'Cardiología',
    'Pediatría',
    'Dermatología',
    'Neurología',
    'Ortopedia'
  ]);

  useEffect(() => {
    if (route.params?.medico) {
      const medico = route.params.medico;
      setId(medico.id);
      setNombre(medico.nombre);
      setEspecialidad(medico.especialidad);
      setCedula(medico.cedula);
      setTelefono(medico.telefono);
      setCorreo(medico.correo);
      setHorario(medico.horario);
      setModoEdicion(true);
    }
  }, [route.params?.medico]);

  const validarFormulario = () => {
    if (!nombre.trim()) {
      Alert.alert('Error', 'El nombre del médico es requerido');
      return false;
    }
    if (!especialidad.trim()) {
      Alert.alert('Error', 'La especialidad es requerida');
      return false;
    }
    if (!cedula.trim()) {
      Alert.alert('Error', 'El número de cédula es requerido');
      return false;
    }
    return true;
  };

  const handleGuardar = () => {
    if (!validarFormulario()) return;

    const medico = {
      id: modoEdicion ? id : Date.now().toString(),
      nombre: nombre.trim(),
      especialidad: especialidad.trim(),
      cedula: cedula.trim(),
      telefono: telefono.trim(),
      correo: correo.trim(),
      horario: horario.trim(),
      imagen: `https://placehold.co/200x200?text=${nombre.trim().charAt(0)}`
    };

    console.log('Médico guardado:', medico);
    Alert.alert('Éxito', modoEdicion ? 'Médico actualizado' : 'Médico registrado');
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>
        {modoEdicion ? 'Editar Médico' : 'Nuevo Médico'}
      </Text>

      <Text style={styles.label}>Nombre completo*</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: Dr. Juan Pérez"
        placeholderTextColor="#A7C7E7"
        value={nombre}
        onChangeText={setNombre}
      />

      <Text style={styles.label}>Especialidad*</Text>
      <TextInput
        style={styles.input}
        placeholder="Seleccione una especialidad"
        placeholderTextColor="#A7C7E7"
        value={especialidad}
        onChangeText={setEspecialidad}
      />

      <Text style={styles.label}>Número de cédula*</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: 12345678"
        placeholderTextColor="#A7C7E7"
        value={cedula}
        onChangeText={setCedula}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Teléfono</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: 555-1234567"
        placeholderTextColor="#A7C7E7"
        value={telefono}
        onChangeText={setTelefono}
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Correo electrónico</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: medico@ejemplo.com"
        placeholderTextColor="#A7C7E7"
        value={correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Horario de atención</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: Lunes a Viernes 8am-5pm"
        placeholderTextColor="#A7C7E7"
        value={horario}
        onChangeText={setHorario}
      />

      <TouchableOpacity 
        style={styles.botonGuardar} 
        onPress={handleGuardar}
        activeOpacity={0.8}
      >
        <Text style={styles.textoBoton}>
          {modoEdicion ? 'Actualizar Médico' : 'Registrar Médico'}
        </Text>
      </TouchableOpacity>

      {modoEdicion && (
        <TouchableOpacity 
          style={styles.botonEliminar} 
          onPress={() => {
            Alert.alert(
              'Confirmar',
              '¿Estás seguro de eliminar este médico?',
              [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Eliminar', onPress: () => {
                  console.log('Médico eliminado ID:', id);
                  Alert.alert('Éxito', 'Médico eliminado correctamente');
                  navigation.goBack();
                }}
              ]
            );
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.textoBotonEliminar}>Eliminar Médico</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  botonGuardar: {
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
  botonEliminar: {
    backgroundColor: '#FF9AA2',
    borderWidth: 0,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 15,
    shadowColor: 'rgba(255, 154, 162, 0.5)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 6
  },
  textoBoton: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600'
  },
  textoBotonEliminar: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600'
  }
});

export default EditarMedicos;