import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const DetalleCitas = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Mis Citas</Text>
      
      <FlatList
        data={citasEjemplo}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.citaContainer}>
            <View style={styles.fechaHoraContainer}>
              <Text style={styles.fecha}>{item.fecha}</Text>
              <Text style={styles.hora}>{item.hora}</Text>
            </View>
            
            <View style={styles.infoContainer}>
              <Text style={styles.medico}>{item.medico}</Text>
              <Text style={styles.especialidad}>{item.especialidad}</Text>
              
              <View style={styles.descripcionContainer}>
                <Text style={styles.descripcion}>{item.descripcion}</Text>
              </View>
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
    backgroundColor: "#f5f9ff"
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#89CFF0",
    textShadowColor: "rgba(137, 207, 240, 0.5)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  citaContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "rgba(181, 234, 215, 0.5)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
    borderLeftWidth: 6,
    borderLeftColor: "#89CFF0",
  },
  fechaHoraContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E0F7FA",
  },
  fecha: {
    fontSize: 16,
    fontWeight: '600',
    color: "#555",
  },
  hora: {
    fontSize: 16,
    fontWeight: '600',
    color: "#89CFF0",
  },
  infoContainer: {
    marginTop: 8,
  },
  medico: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "#555",
    marginBottom: 4,
  },
  especialidad: {
    fontSize: 16,
    color: "#89CFF0",
    marginBottom: 8,
    fontStyle: 'italic',
  },
  descripcionContainer: {
    backgroundColor: "#F0FDFF",
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
  },
  descripcion: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
});

export default DetalleCitas;