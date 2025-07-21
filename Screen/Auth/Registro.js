import { View, Text, TextInput, StyleSheet, Alert, ActivityIndicator } from "react-native";
import BottonComponent from "../../components/BottonComponent";
import React, { useState } from "react";
import { registroUser } from "../../Src/Services/AuthService";

export default function RegistroScreen({ navigation }) {
  // Estados para almacenar los valores del formulario
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false); // Estado para manejar el loading durante el registro
  const [errors, setErrors] = useState({}); // Estado para manejar errores de validación

  // Función para validar los campos del formulario
  const validateFields = () => {
    const newErrors = {};
    
    // Validaciones para cada campo
    if (!name.trim()) newErrors.name = "Nombre es requerido";
    if (!email.trim()) newErrors.email = "Email es requerido";
    else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) 
      newErrors.email = "Email no válido";
    if (!password) newErrors.password = "Contraseña es requerida";
    else if (password.length < 6) newErrors.password = "Mínimo 6 caracteres";
    if (password !== confirmarPassword) 
      newErrors.confirmarPassword = "Las contraseñas no coinciden";
    if (!role.trim()) newErrors.role = "Rol es requerido";
    
    setErrors(newErrors);
    // Retorna true si no hay errores
    return Object.keys(newErrors).length === 0;
  };

  // Función para manejar el registro del usuario
  const handleRegister = async () => {
    // Valida los campos antes de continuar
    if (!validateFields()) return;

    setLoading(true); // Activa el loading

    try {
      // Llama al servicio de registro
      const result = await registroUser(name, email, password, role);
      
      // Si el registro es exitoso
      if (result.success) {
        Alert.alert("Éxito", "Registro de usuario exitoso", [
          {
            text: "OK",
            onPress: () => navigation.navigate("Login") // Navega al login después del registro
          },
        ]);
      } else {
        // Maneja errores del backend
        if (result.error?.errors) {
          const backendErrors = {};
          Object.keys(result.error.errors).forEach(key => {
            backendErrors[key] = result.error.errors[key].join(', ');
          });
          setErrors(prev => ({...prev, ...backendErrors}));
        }
        
        Alert.alert(
          "Error de Registro",
          result.error?.message || "Ocurrió un error al registrar el usuario."
        );
      }
    } catch (error) {
      // Maneja errores inesperados
      console.error("Error inesperado al registrar usuario:", error);
      Alert.alert(
        "Error",
        "Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde."
      );
    } finally {
      setLoading(false); // Desactiva el loading
    }
  };

  // Renderizado de la pantalla
  return (
    <View style={styles.container}>
      {/* Fondos decorativos */}
      <View style={styles.bg1} />
      <View style={styles.bg2} />
      
      {/* Tarjeta de registro */}
      <View style={styles.loginCard}>
        <Text style={styles.loginTitle}>Registro</Text>
        <Text style={styles.loginSubtitle}>Crea una cuenta para comenzar</Text>
        
        {/* Grupo de inputs con validación */}
        <View style={styles.inputGroup}>
          <TextInput
            style={[styles.formInput, errors.name && styles.errorInput]}
            placeholder="Nombre completo"
            value={name}
            onChangeText={setName}
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
        </View>
        
        <View style={styles.inputGroup}>
          <TextInput
            style={[styles.formInput, errors.email && styles.errorInput]}
            placeholder="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        </View>

        <View style={styles.inputGroup}>
          <TextInput
            style={[styles.formInput, errors.password && styles.errorInput]}
            placeholder="Contraseña"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
        </View>
        
        <View style={styles.inputGroup}>
          <TextInput
            style={[styles.formInput, errors.confirmarPassword && styles.errorInput]}
            placeholder="Confirmar contraseña"
            secureTextEntry
            value={confirmarPassword}
            onChangeText={setConfirmarPassword}
          />
          {errors.confirmarPassword && <Text style={styles.errorText}>{errors.confirmarPassword}</Text>}
        </View>
        
        <View style={styles.inputGroup}>
          <TextInput
            style={[styles.formInput, errors.role && styles.errorInput]}
            placeholder="Rol (ej. admin, user)"
            value={role}
            onChangeText={setRole}
          />
          {errors.role && <Text style={styles.errorText}>{errors.role}</Text>}
        </View>

        {/* Muestra un loading o el botón de registro según el estado */}
        {loading ? (
          <ActivityIndicator size="large" color="#a8e6cf" />
        ) : (
          <BottonComponent
            title="Registrarse"
            onPress={handleRegister}
            style={styles.btnPrimary}
            textStyle={styles.btnPrimaryText}
          />
        )}
        
        {/* Botón para navegar al login */}
        <BottonComponent
          title="Iniciar Sesión"
          onPress={() => navigation.navigate("Login")}
          style={styles.btnSecondary}
          textStyle={styles.btnSecondaryText}
        />
      </View>
    </View>
  );
}

// Estilos de la pantalla
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "transparent",
  },
  loginCard: {
    backgroundColor: "white",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 25,
    elevation: 5,
    width: "100%",
    maxWidth: 400,
    padding: 32,
    transform: [{ translateY: 0 }],
  },
  loginTitle: {
    color: "#4a5568",
    fontWeight: "700",
    fontSize: 28,
    marginBottom: 16,
  },
  loginSubtitle: {
    color: "#718096",
    marginBottom: 32,
  },
  inputGroup: {
    marginBottom: 24,
  },
  formInput: {
    width: "100%",
    padding: 12,
    borderWidth: 2,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    fontSize: 16,
    color: "#4a5568",
  },
  errorInput: {
    borderColor: "#ffb8b8", // Estilo para inputs con error
  },
  errorText: {
    color: "#ffb8b8",
    fontSize: 14,
    marginTop: 4,
  },
  btnPrimary: {
    backgroundColor: "#a8e6cf",
    borderRadius: 8,
    padding: 12,
    width: "100%",
    borderWidth: 0,
    position: "relative",
  },
  btnPrimaryText: {
    color: "#4a5568",
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
  },
  btnSecondary: {
    backgroundColor: "#ffb8b8",
    borderRadius: 8,
    padding: 12,
    width: "100%",
    borderWidth: 0,
    marginTop: 16,
  },
  btnSecondaryText: {
    color: "#4a5568",
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
  },
  // Estilos para los fondos decorativos
  bg1: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    opacity: 0.5,
    backgroundColor: "#fff8b8",
    top: -50,
    left: -50,
    zIndex: -1,
  },
  bg2: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    opacity: 0.5,
    backgroundColor: "#a8e6cf",
    bottom: -70,
    right: -50,
    zIndex: -1,
  },
});