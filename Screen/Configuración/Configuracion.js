import { View, Text, StyleSheet } from "react-native";

export default function Configuración() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notificaciones</Text>
        <Text style={styles.option}>Activar notificaciones</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Apariencia</Text>
        <Text style={styles.option}>Modo oscuro</Text>
        <Text style={styles.option}>Tema de colores</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cuenta</Text>
        <Text style={styles.option}>Editar perfil</Text>
        <Text style={styles.option}>Cambiar contraseña</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f9ff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#89CFF0',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#89CFF0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#89CFF0',
    marginBottom: 10,
  },
  option: {
    fontSize: 16,
    color: '#555',
    paddingVertical: 8,
    paddingLeft: 10,
  },
});