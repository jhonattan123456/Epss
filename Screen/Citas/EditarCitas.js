import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { crearCitas, editarCitas } from "../../Src/Services/CitasService";
// import { Picker } from "@react-native-picker/picker";

export default function EditarCitas() {
  const navigation = useNavigation();
  const route = useRoute();
  const cita = route.params?.cita || {};

  // Estados para los campos
  const [nombre, setNombre] = useState(cita.nombre || "");
  const [fecha, setFecha] = useState(cita.fecha || "");
  const [horaIni, setHoraIni] = useState(cita.hora_ini || "");
  const [horaFin, setHoraFin] = useState(cita.hora_fin || "");
  const [dias, setDias] = useState(cita.dias || "");
  const [descripcion, setDescripcion] = useState(cita.descripcion || "");
  const [activo, setActivo] = useState(cita.activo !== undefined ? cita.activo : true);
  const [disponible, setDisponible] = useState(cita.disponible !== undefined ? cita.disponible : true);
  const [idPaciente, setIdPaciente] = useState(cita.idPaciente || "");
  const [idMedico, setIdMedico] = useState(cita.idMedico || "");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const esEdicion = !!route.params?.cita;

  const validarHora = (hora) => {
    const horaRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return horaRegex.test(hora);
  };

  const validarFecha = (fecha) => {
    const fechaRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    return fechaRegex.test(fecha);
  };

  const handleGuardar = async () => {
    const nuevosErrores = {};
    
    if (!nombre) nuevosErrores.nombre = "El nombre es obligatorio";
    if (!fecha) nuevosErrores.fecha = "La fecha es obligatoria";
    else if (!validarFecha(fecha)) nuevosErrores.fecha = "Formato DD/MM/AAAA";
    if (!horaIni) nuevosErrores.horaIni = "La hora inicio es obligatoria";
    else if (!validarHora(horaIni)) nuevosErrores.horaIni = "Formato HH:MM";
    if (!horaFin) nuevosErrores.horaFin = "La hora fin es obligatoria";
    else if (!validarHora(horaFin)) nuevosErrores.horaFin = "Formato HH:MM";
    if (!dias) nuevosErrores.dias = "Los días son obligatorios";
    if (!idPaciente) nuevosErrores.idPaciente = "ID Paciente es obligatorio";
    if (!idMedico) nuevosErrores.idMedico = "ID Médico es obligatorio";

    if (Object.keys(nuevosErrores).length > 0) {
      setErrors(nuevosErrores);
      Alert.alert("Error", "Por favor complete todos los campos requeridos correctamente");
      return;
    }

    setLoading(true);
    try {
      const datosCita = {
        nombre,
        fecha,
        hora_ini: horaIni,
        hora_fin: horaFin,
        dias,
        descripcion,
        activo,
        disponible,
        idPaciente,
        idMedico
      };

      const result = esEdicion 
        ? await editarCitas(cita.id, datosCita)
        : await crearCitas(datosCita);

      if (result.success) {
        Alert.alert(
          "Éxito",
          esEdicion ? "Cita actualizada" : "Cita creada",
          [{ text: "OK", onPress: () => navigation.goBack() }]
        );
      } else {
        if (result.errors) {
          setErrors(result.errors);
          Alert.alert("Error", "Por favor corrija los errores en el formulario");
        } else {
          Alert.alert("Error", result.message || "Error al guardar");
        }
      }
    } catch (error) {
      Alert.alert("Error", "Ocurrió un error al guardar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{esEdicion ? "Editar Cita" : "Nueva Cita"}</Text>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Sección Información Básica */}
        <Text style={styles.sectionTitle}>Información Básica</Text>
        
        <Text style={styles.label}>Nombre del Paciente *</Text>
        <TextInput
          style={[styles.input, errors.nombre && styles.inputError]}
          placeholder="Nombre completo"
          placeholderTextColor="#A7C7E7"
          value={nombre}
          onChangeText={(text) => {
            setNombre(text);
            setErrors({...errors, nombre: null});
          }}
        />
        {errors.nombre && <Text style={styles.errorText}>{errors.nombre}</Text>}
        
        <Text style={styles.label}>ID Paciente *</Text>
        <TextInput
          style={[styles.input, errors.idPaciente && styles.inputError]}
          placeholder="ID del paciente"
          placeholderTextColor="#A7C7E7"
          value={idPaciente}
          onChangeText={(text) => {
            setIdPaciente(text);
            setErrors({...errors, idPaciente: null});
          }}
          keyboardType="numeric"
        />
        {errors.idPaciente && <Text style={styles.errorText}>{errors.idPaciente}</Text>}
        
        <Text style={styles.label}>ID Médico *</Text>
        <TextInput
          style={[styles.input, errors.idMedico && styles.inputError]}
          placeholder="ID del médico"
          placeholderTextColor="#A7C7E7"
          value={idMedico}
          onChangeText={(text) => {
            setIdMedico(text);
            setErrors({...errors, idMedico: null});
          }}
          keyboardType="numeric"
        />
        {errors.idMedico && <Text style={styles.errorText}>{errors.idMedico}</Text>}

        {/* Sección Fecha y Horario */}
        <Text style={styles.sectionTitle}>Fecha y Horario</Text>
        
        <Text style={styles.label}>Fecha * (DD/MM/AAAA)</Text>
        <TextInput
          style={[styles.input, errors.fecha && styles.inputError]}
          placeholder="Ej: 25/12/2023"
          placeholderTextColor="#A7C7E7"
          value={fecha}
          onChangeText={(text) => {
            setFecha(text);
            setErrors({...errors, fecha: null});
          }}
        />
        {errors.fecha && <Text style={styles.errorText}>{errors.fecha}</Text>}

        <View style={styles.timeContainer}>
          <View style={styles.timeInput}>
            <Text style={styles.label}>Hora Inicio * (HH:MM)</Text>
            <TextInput
              style={[styles.input, errors.horaIni && styles.inputError]}
              placeholder="Ej: 09:00"
              placeholderTextColor="#A7C7E7"
              value={horaIni}
              onChangeText={(text) => {
                setHoraIni(text);
                setErrors({...errors, horaIni: null});
              }}
            />
            {errors.horaIni && <Text style={styles.errorText}>{errors.horaIni}</Text>}
          </View>
          
          <View style={styles.timeInput}>
            <Text style={styles.label}>Hora Fin * (HH:MM)</Text>
            <TextInput
              style={[styles.input, errors.horaFin && styles.inputError]}
              placeholder="Ej: 10:00"
              placeholderTextColor="#A7C7E7"
              value={horaFin}
              onChangeText={(text) => {
                setHoraFin(text);
                setErrors({...errors, horaFin: null});
              }}
            />
            {errors.horaFin && <Text style={styles.errorText}>{errors.horaFin}</Text>}
          </View>
        </View>

        <Text style={styles.label}>Días *</Text>
        <TextInput
          style={[styles.input, errors.dias && styles.inputError]}
          placeholder="Ej: Lunes, Miércoles, Viernes"
          placeholderTextColor="#A7C7E7"
          value={dias}
          onChangeText={(text) => {
            setDias(text);
            setErrors({...errors, dias: null});
          }}
        />
        {errors.dias && <Text style={styles.errorText}>{errors.dias}</Text>}

        {/* Sección Estado */}
        <Text style={styles.sectionTitle}>Estado</Text>
        
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Cita activa:</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={activo ? "#f5dd4b" : "#f4f3f4"}
            onValueChange={setActivo}
            value={activo}
          />
        </View>

        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Disponible:</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={disponible ? "#f5dd4b" : "#f4f3f4"}
            onValueChange={setDisponible}
            value={disponible}
          />
        </View>

        {/* Sección Descripción */}
        <Text style={styles.sectionTitle}>Detalles Adicionales</Text>
        
        <Text style={styles.label}>Descripción</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Detalles adicionales sobre la cita"
          placeholderTextColor="#A7C7E7"
          multiline
          numberOfLines={4}
          value={descripcion}
          onChangeText={setDescripcion}
        />
      </ScrollView>

      <TouchableOpacity
        style={styles.boton}
        onPress={handleGuardar}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.botonTexto}>
            {esEdicion ? "Actualizar Cita" : "Crear Cita"}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f9ff',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#89CFF0',
    textAlign: 'center',
    marginVertical: 20,
    textShadowColor: 'rgba(137, 207, 240, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#5D8BF4',
    marginTop: 15,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#B5EAD7',
    paddingBottom: 5,
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#B5EAD7',
    borderRadius: 8,
    padding: 15,
    marginBottom: 5,
    fontSize: 16,
    color: '#555',
  },
  inputError: {
    borderColor: '#FF9AA2',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  timeInput: {
    width: '48%',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 12,
    borderColor: '#B5EAD7',
    borderWidth: 2,
  },
  switchLabel: {
    fontSize: 16,
    color: '#555',
  },
  errorText: {
    color: '#FF9AA2',
    fontSize: 14,
    marginBottom: 15,
    marginLeft: 5,
  },
  boton: {
    backgroundColor: '#89CFF0',
    padding: 16,
    borderRadius: 8,
    margin: 20,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 20,
    right: 20,
    shadowColor: 'rgba(137, 207, 240, 0.5)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 6,
  },
  botonTexto: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});