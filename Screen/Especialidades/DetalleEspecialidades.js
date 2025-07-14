import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const especialidadesEjemplo = [
  {
    id: '1',
    nombre: 'Cardiología',
    descripcion: 'Especialidad médica que estudia el corazón y el sistema cardiovascular',
    doctores: ['Dr. García', 'Dr. Martínez'],
  },
  {
    id: '2',
    nombre: 'Dermatología',
    descripcion: 'Especialidad médica enfocada en el cuidado de la piel y sus enfermedades',
    doctores: ['Dra. López', 'Dra. Rodríguez'],
  },
  {
    id: '3',
    nombre: 'Pediatría',
    descripcion: 'Especialidad médica dedicada a la salud de niños y adolescentes',
    doctores: ['Dr. Pérez', 'Dra. Gómez'],
  }
];

const DetalleEspecialidades = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Nuestras Especialidades</Text>
      
      <FlatList
        data={especialidadesEjemplo}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.especialidadContainer}>
            <View style={styles.imagenContainer}>
              <Text style={styles.imagenTexto}>{item.nombre}</Text>
            </View>
            
            <View style={styles.detalleContainer}>
              <Text style={styles.nombre}>{item.nombre}</Text>
              <Text style={styles.descripcion}>{item.descripcion}</Text>
              
              <Text style={styles.subtitulo}>Doctores:</Text>
              {item.doctores.map((doctor, index) => (
                <Text key={index} style={styles.doctor}>{doctor}</Text>
              ))}
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#000'
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00b4ff',
    marginBottom: 25,
    textAlign: 'center',
    textShadowColor: '#0077ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10
  },
  especialidadContainer: {
    backgroundColor: '#111',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#00b4ff',
    shadowColor: '#00b4ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5
  },
  imagenContainer: {
    height: 150,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#00b4ff'
  },
  imagenTexto: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00b4ff',
    textShadowColor: '#0077ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10
  },
  detalleContainer: {
    padding: 15
  },
  nombre: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00b4ff',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 180, 255, 0.3)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5
  },
  descripcion: {
    fontSize: 14,
    color: '#7fcdff',
    marginBottom: 12,
    lineHeight: 20
  },
  subtitulo: {
    fontSize: 16,
    fontWeight: '600',
    color: '#00b4ff',
    marginBottom: 5,
    textShadowColor: 'rgba(0, 180, 255, 0.3)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 3
  },
  doctor: {
    fontSize: 14,
    color: '#7fcdff',
    marginBottom: 3
  }
});

export default DetalleEspecialidades;
