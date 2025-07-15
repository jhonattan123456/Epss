import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const DetallePaciente = ({ route }) => {
  const { paciente } = route.params || {};

  const datosEjemplo = {
    id: '1',
    nombre: 'Elisabet',
    apellido: 'Garcia',
    edad: '32 años',
    fechaNacimiento: '15/05/1990',
    genero: 'Femenino',
    telefono: '323809923',
    correo: 'Elisabet.com',
    direccion: 'Carera 24 con 11, Ciudad',
    alergias: 'Ninguna',
    historial: '1 cirugía de senos (2015)',
    imagen: 'https://placehold.co/300x300?text=Ana+Martínez'
  };

  const datos = paciente || datosEjemplo;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Header con foto y nombre */}
      <View style={styles.header}>
        <Image 
          source={{ uri: datos.imagen }}
          style={styles.fotoPerfil}
          onError={() => console.log("Error cargando imagen")}
        />
        <Text style={styles.nombreCompleto}>{`${datos.nombre} ${datos.apellido}`}</Text>
        <Text style={styles.infoBasica}>
          {datos.edad || calcularEdad(datos.fechaNacimiento)} • {datos.genero}
        </Text>
      </View>

      {/* Sección de información de contacto */}
      <View style={styles.seccion}>
        <Text style={styles.tituloSeccion}>Información de contacto</Text>
        
        <View style={styles.item}>
          <Text style={styles.label}>Teléfono:</Text>
          <Text style={styles.valor}>{datos.telefono}</Text>
        </View>
        
        <View style={styles.item}>
          <Text style={styles.label}>Correo electrónico:</Text>
          <Text style={[styles.valor, styles.link]}>{datos.correo}</Text>
        </View>
        
        <View style={styles.item}>
          <Text style={styles.label}>Dirección:</Text>
          <Text style={styles.valor}>{datos.direccion}</Text>
        </View>
      </View>

      {/* Sección médica */}
      <View style={styles.seccion}>
        <Text style={styles.tituloSeccion}>Información médica</Text>
        
        <View style={styles.item}>
          <Text style={styles.label}>Alergias conocidas:</Text>
          <Text style={styles.valor}>{datos.alergias}</Text>
        </View>
        
        {datos.historial && (
          <View style={styles.item}>
            <Text style={styles.label}>Historial médico:</Text>
            <Text style={styles.valor}>{datos.historial}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

// Función para calcular edad si tenemos fecha de nacimiento
function calcularEdad(fechaNacimiento) {
  if (!fechaNacimiento) return '';
  
  const fechaNac = new Date(fechaNacimiento);
  const hoy = new Date();
  let edad = hoy.getFullYear() - fechaNac.getFullYear();
  const m = hoy.getMonth() - fechaNac.getMonth();
  
  if (m < 0 || (m === 0 && hoy.getDate() < fechaNac.getDate())) {
    edad--;
  }
  
  return `${edad} años`;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f9ff'
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40
  },
  header: {
    alignItems: 'center',
    marginBottom: 30
  },
  fotoPerfil: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#89CFF0',
    backgroundColor: '#E0F7FA',
    shadowColor: 'rgba(137, 207, 240, 0.5)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 5
  },
  nombreCompleto: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#555',
    textAlign: 'center',
    marginBottom: 5
  },
  infoBasica: {
    fontSize: 18,
    color: '#89CFF0',
    textAlign: 'center',
    fontWeight: '600'
  },
  seccion: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 25,
    borderLeftWidth: 6,
    borderLeftColor: '#89CFF0',
    shadowColor: 'rgba(181, 234, 215, 0.3)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5
  },
  tituloSeccion: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#89CFF0',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0F7FA'
  },
  item: {
    marginBottom: 15
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
    fontWeight: '500'
  },
  valor: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24
  },
  link: {
    color: '#89CFF0',
    fontWeight: '500'
  }
});

export default DetallePaciente;