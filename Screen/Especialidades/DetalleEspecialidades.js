import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';


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
              <Text style={styles.imagenTexto}>{item.nombre.charAt(0)}</Text>
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
    padding: 20,
    backgroundColor: '#f5f9ff'
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#89CFF0',
    marginBottom: 25,
    textAlign: 'center',
    textShadowColor: 'rgba(137, 207, 240, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10
  },
  especialidadContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#B5EAD7',
    shadowColor: 'rgba(181, 234, 215, 0.3)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5,
    flexDirection: 'row'
  },
  imagenContainer: {
    width: 80,
    backgroundColor: '#E0F7FA',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#B5EAD7'
  },
  imagenTexto: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#89CFF0',
  },
  detalleContainer: {
    flex: 1,
    padding: 15
  },
  nombre: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 8
  },
  descripcion: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20
  },
  subtitulo: {
    fontSize: 16,
    fontWeight: '600',
    color: '#89CFF0',
    marginBottom: 5
  },
  doctor: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
    marginLeft: 10
  }
});

export default DetalleEspecialidades;