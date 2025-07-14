// MenuScreen.js
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  Entypo,
  FontAwesome6,
  FontAwesome5,
  AntDesign,
} from "@expo/vector-icons";

export function MenuScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a EPS</Text>
      <View style={styles.gridContainer}>
        <TouchableOpacity
          style={[styles.button, styles.pacientesButton]}
          onPress={() => navigation.navigate("PacienteStack")}
        >
          <AntDesign name="user" size={50} color="white" />
          <Text style={styles.buttonText}>Gestión de Pacientes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.citasButton]}
          onPress={() => navigation.navigate("CitaStack")}
        >
          <FontAwesome5 name="hospital-user" size={50} color={"white"} />
          <Text style={styles.buttonText}>Gestión de Citas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.doctorButton]}
          onPress={() => navigation.navigate("DoctorStack")}
        >
          <FontAwesome6 name="user-doctor" size={50} color="white" />
          <Text style={styles.buttonText}>Gestión de Doctores</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.especialidadButton]}
          onPress={() => navigation.navigate("EspecialidadStack")}
        >
          <FontAwesome5 name="university" size={50} color={"white"} />
          <Text style={styles.buttonText}>Gestión de Especialidades</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.consultorioButton]}
          onPress={() => navigation.navigate("ConsultorioStack")}
        >
          <AntDesign name="customerservice" size={50} color={"white"} />
          <Text style={styles.buttonText}>Gestión de Consultorios</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const itemWidth = 140; // Puedes ajustar este valor según el diseño

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#101522', // Fondo oscuro
  },
  container: {
    flex: 1,
    backgroundColor: '#101522',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#00f0ff',
    marginBottom: 5,
    textShadowColor: '#00f0ff99', // Sombra
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  headerSubtitle: {
    fontSize: 18,
    color: '#5edfff', 
    textShadowColor: '#00f0ff55',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
  statusText: {
    fontWeight: 'bold',
    color: '#00f0ff', 
    textShadowColor: '#00f0ff99',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 5,
  },
  gridItem: {
    width: itemWidth,
    height: itemWidth,
    backgroundColor: '#181f2f', // Casilla oscura
    borderRadius: 15,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 12,
    shadowColor: '#00f0ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 16,
    borderWidth: 2,
    borderColor: '#00f0ff', // Borde 
  },
  gridItemText: {
    marginTop: 15,
    fontSize: 17,
    fontWeight: '600',
    color: '#00f0ff', 
    textAlign: 'center',
    textShadowColor: '#00f0ff99',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
});
