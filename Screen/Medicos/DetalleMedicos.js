import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'; // Importa ScrollView desde react-native

const DetalleMedicos = ({ route }) => {
  const { medico } = route.params || {};
  
  const datosEjemplo = {
    id: '1',
    nombre: 'Dr. Juan Pérez',
    especialidad: 'Cardiología',
    cedula: '12345678',
    telefono: '555-1234',
    correo: 'juan.perez@example.com',
    horario: 'Lunes a Viernes: 8:00 AM - 5:00 PM',
    imagen: 'https://placehold.co/300x300?text=Dr.+Pérez',
    descripcion: 'Cardiólogo con 10 años de experiencia en intervenciones coronarias y manejo de arritmias.'
  };

  const datos = medico || datosEjemplo;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Encabezado con imagen */}
        <View style={styles.header}>
          <Image 
            source={{ uri: datos.imagen }} 
            style={styles.foto}
            resizeMode="cover"
            onError={() => console.log("Error cargando imagen")}
          />
          <Text style={styles.nombre}>{datos.nombre}</Text>
          <Text style={styles.especialidad}>{datos.especialidad}</Text>
        </View>

        {/* Información profesional */}
        <View style={styles.seccion}>
          <Text style={styles.tituloSeccion}>Información Profesional</Text>
          <View style={styles.item}>
            <Text style={styles.label}>Cédula profesional:</Text>
            <Text style={styles.valor}>{datos.cedula}</Text>
          </View>
          
          {datos.descripcion && (
            <View style={styles.item}>
              <Text style={styles.label}>Descripción:</Text>
              <Text style={[styles.valor, styles.descripcion]}>{datos.descripcion}</Text>
            </View>
          )}
        </View>

        {/* Datos de contacto */}
        <View style={styles.seccion}>
          <Text style={styles.tituloSeccion}>Contacto</Text>
          <View style={styles.item}>
            <Text style={styles.label}>Teléfono:</Text>
            <Text style={styles.valor}>{datos.telefono}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>Correo:</Text>
            <Text style={[styles.valor, styles.correo]}>{datos.correo}</Text>
          </View>
        </View>

        {/* Horario */}
        <View style={styles.seccion}>
          <Text style={styles.tituloSeccion}>Horario de atención</Text>
          <Text style={styles.horario}>{datos.horario}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40
  },
  header: {
    alignItems: 'center',
    marginBottom: 30
  },
  foto: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#00b4ff',
    shadowColor: '#00b4ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5
  },
  nombre: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#00b4ff',
    textAlign: 'center',
    textShadowColor: '#0077ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
    marginBottom: 5
  },
  especialidad: {
    fontSize: 20,
    color: '#7fcdff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 180, 255, 0.3)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5
  },
  seccion: {
    backgroundColor: '#111',
    borderRadius: 10,
    padding: 20,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#00b4ff',
    shadowColor: '#00b4ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5
  },
  tituloSeccion: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00b4ff',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#00b4ff',
    textShadowColor: 'rgba(0, 180, 255, 0.3)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5
  },
  item: {
    marginBottom: 15
  },
  label: {
    fontSize: 16,
    color: '#7fcdff',
    marginBottom: 5
  },
  valor: {
    fontSize: 16,
    color: '#fff'
  },
  descripcion: {
    lineHeight: 24,
    textAlign: 'justify'
  },
  correo: {
    color: '#00b4ff'
  },
  horario: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 24
  }
});

export default DetalleMedicos;
