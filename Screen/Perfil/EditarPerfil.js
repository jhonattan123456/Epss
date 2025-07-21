import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

export default function EditarPerfil() {
  const navigation = useNavigation();
  const route = useRoute();
  const usuario = route.params?.usuario || {};

  // Estados para los campos
  const [name, setName] = useState(usuario.name || "");
  const [email, setEmail] = useState(usuario.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState(usuario.role || "user");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const esEdicion = !!route.params?.usuario;

  const handleGuardar = async () => {
    const nuevosErrores = {};
    
    if (!name) nuevosErrores.name = "El nombre es obligatorio";
    if (!email) nuevosErrores.email = "El email es obligatorio";
    if (!/^\S+@\S+\.\S+$/.test(email)) nuevosErrores.email = "Email inválido";
    
    // Validar contraseña solo si es nuevo usuario o si se está cambiando
    if (!esEdicion || password) {
      if (!password) nuevosErrores.password = "La contraseña es obligatoria";
      else if (password.length < 6) nuevosErrores.password = "La contraseña debe tener al menos 6 caracteres";
      if (password !== confirmPassword) nuevosErrores.confirmPassword = "Las contraseñas no coinciden";
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErrors(nuevosErrores);
      Alert.alert("Error", "Por favor complete todos los campos requeridos correctamente");
      return;
    }

    setLoading(true);
    try {
      const datosUsuario = {
        name,
        email,
        role
      };

      // Solo incluir password si se está cambiando
      if (password) {
        datosUsuario.password = password;
      }

      const result = { success: true };

      if (result.success) {
        Alert.alert(
          "Éxito",
          esEdicion ? "Perfil actualizado" : "Usuario creado",
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
      <Text style={styles.titulo}>{esEdicion ? "Editar Perfil" : "Nuevo Usuario"}</Text>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.label}>Nombre *</Text>
        <TextInput
          style={[styles.input, errors.name && styles.inputError]}
          placeholder="Nombre completo"
          placeholderTextColor="#A7C7E7"
          value={name}
          onChangeText={(text) => {
            setName(text);
            setErrors({...errors, name: null});
          }}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
        
        <Text style={styles.label}>Email *</Text>
        <TextInput
          style={[styles.input, errors.email && styles.inputError]}
          placeholder="ejemplo@dominio.com"
          placeholderTextColor="#A7C7E7"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setErrors({...errors, email: null});
          }}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        
        <Text style={styles.label}>Contraseña {!esEdicion && '*'}</Text>
        <TextInput
          style={[styles.input, errors.password && styles.inputError]}
          placeholder={esEdicion ? "Dejar en blanco para no cambiar" : "Contraseña"}
          placeholderTextColor="#A7C7E7"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setErrors({...errors, password: null, confirmPassword: null});
          }}
          secureTextEntry
        />
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
        
        {(password || !esEdicion) && (
          <>
            <Text style={styles.label}>Confirmar Contraseña *</Text>
            <TextInput
              style={[styles.input, errors.confirmPassword && styles.inputError]}
              placeholder="Confirmar contraseña"
              placeholderTextColor="#A7C7E7"
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                setErrors({...errors, confirmPassword: null});
              }}
              secureTextEntry
            />
            {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
          </>
        )}
        
        <Text style={styles.label}>Rol *</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={role}
            onValueChange={setRole}
            style={styles.picker}
          >
            <Picker.Item label="Usuario" value="user" />
            <Picker.Item label="Administrador" value="admin" />
            {/* Agrega más roles según necesites */}
          </Picker>
        </View>
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
            {esEdicion ? "Actualizar Perfil" : "Crear Usuario"}
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
  pickerContainer: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#B5EAD7',
    borderRadius: 8,
    marginBottom: 5,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
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