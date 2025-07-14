import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const citasEjemplo = [
  {
    id: '1',
    fecha: '10/07/2025',
    hora: '12:30',
    medico: 'Dr.Jhon',
    especialidad: 'Neurogia',
    descripcion: 'Praparativos'
  },
  {
    id: '2',
    fecha: '24/06/2025',
    hora: '15:35',
    medico: 'Dra. Galindo',
    especialidad: 'Neurología',
    descripcion: 'Revisión de tratamiento'
  }
];

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
        backgroundColor: "#000"
    },
    titulo: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 30,
        textAlign: "center",
        color: "#00b4ff",
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
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 5,
    },
    textArea: {
        height: 120,
        textAlignVertical: "top"
    },
    boton: {
        backgroundColor: "transparent",
        borderWidth: 2,
        borderColor: "#00b4ff",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        shadowColor: "#00b4ff",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 10,
        marginTop: 10,
    },
    textoBoton: {
        color: "#00b4ff",
        fontWeight: "bold",
        fontSize: 16,
  }
});

export default DetalleCitas;
