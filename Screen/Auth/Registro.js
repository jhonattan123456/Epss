import { View, Text, TextInput, StyleSheet, Alert, ActivityIndicator } from "react-native";
import BottonComponent from "../../components/BottonComponent";
import React, { useState } from "react";
import { registroUser } from "../../Src/Services/AuthService";

export default function RegistroScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const newErrors = {};
    
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
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateFields()) return;

    setLoading(true);

    try {
      const result = await registroUser(name, email, password, role);
      
      if (result.success) {
        Alert.alert("Éxito", "Registro de usuario exitoso", [
          {
            text: "OK",
            onPress: () => navigation.navigate("Login")
          },
        ]);
      } else {
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
      console.error("Error inesperado al registrar usuario:", error);
      Alert.alert(
        "Error",
        "Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      
      <Text style={styles.label}>Nombre Completo</Text>
      <TextInput
        style={[styles.input, errors.name && styles.errorInput]}
        placeholder="Ingrese su nombre completo"
        placeholderTextColor="#A7C7E7"
        value={name}
        onChangeText={setName}
      />
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
      
      <Text style={styles.label}>Correo Electrónico</Text>
      <TextInput
        style={[styles.input, errors.email && styles.errorInput]}
        placeholder="Ingrese su correo electrónico"
        placeholderTextColor="#A7C7E7"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        style={[styles.input, errors.password && styles.errorInput]}
        placeholder="Cree una contraseña"
        placeholderTextColor="#A7C7E7"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
      
      <Text style={styles.label}>Confirmar Contraseña</Text>
      <TextInput
        style={[styles.input, errors.confirmarPassword && styles.errorInput]}
        placeholder="Repita su contraseña"
        placeholderTextColor="#A7C7E7"
        secureTextEntry
        value={confirmarPassword}
        onChangeText={setConfirmarPassword}
      />
      {errors.confirmarPassword && <Text style={styles.errorText}>{errors.confirmarPassword}</Text>}
      
      <Text style={styles.label}>Rol</Text>
      <TextInput
        style={[styles.input, errors.role && styles.errorInput]}
        placeholder="Ejemplo: admin, user, etc."
        placeholderTextColor="#A7C7E7"
        value={role}
        onChangeText={setRole}
      />
      {errors.role && <Text style={styles.errorText}>{errors.role}</Text>}

      {loading ? (
        <ActivityIndicator size="large" color="#89CFF0" />
      ) : (
        <BottonComponent
          title="Registrarse"
          onPress={handleRegister}
          style={styles.primaryButton}
          textStyle={styles.primaryButtonText}
        />
      )}
      
      <BottonComponent
        title="Iniciar Sesión"
        onPress={() => navigation.navigate("Login")}
        style={styles.primaryButton}
        textStyle={styles.primaryButtonText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#f5f9ff",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#89CFF0",
    textShadowColor: "rgba(137, 207, 240, 0.5)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  label: {
    color: "#555",
    fontSize: 16,
    marginBottom: 8,
    marginLeft: 4,
    fontWeight: "500",
  },
  input: {
    height: 50,
    borderColor: "#B5EAD7",
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 8,
    color: "#555",
    backgroundColor: "#fff",
    shadowColor: "rgba(181, 234, 215, 0.5)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3,
  },
  errorInput: {
    borderColor: "#FF9AA2",
    shadowColor: "rgba(255, 154, 162, 0.5)",
  },
  errorText: {
    color: "#FF9AA2",
    marginBottom: 12,
    marginLeft: 4,
    fontSize: 14,
  },
  primaryButton: {
    backgroundColor: "#89CFF0",
    borderWidth: 0,
    borderRadius: 8,
    paddingVertical: 14,
    marginTop: 20,
    elevation: 3,
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});