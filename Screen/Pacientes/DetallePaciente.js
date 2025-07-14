import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const DetallePaciente = ({ route }) => {
  const { paciente } = route.params || {};

  const datosEjemplo = {
    id: '1',
    nombre: 'Mia',
    apellido: 'Kaulifa',
    edad: '32 años',
    fechaNacimiento: '15/05/1990',
    genero: 'Femenino',
    telefono: '323809923',
    correo: 'Mia@kaulifa.com',
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

      {/* Sección adicional para citas recientes podría ir aquí */}
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
    backgroundColor: '#000'
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
    borderColor: '#00b4ff',
    shadowColor: '#00b4ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5
  },
  nombreCompleto: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00b4ff',
    textAlign: 'center',
    textShadowColor: '#0077ff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    marginBottom: 5
  },
  infoBasica: {
    fontSize: 18,
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
    color: '#fff',
    lineHeight: 24
  },
  link: {
    color: '#00b4ff',
    textShadowColor: 'rgba(0, 180, 255, 0.3)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 3
  }
});

export default DetallePaciente;
