import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import BottonComponent from "../../components/BottonComponent";
import { useState } from "react";
import { loginUser } from "../../Src/Services/AuthService";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    try {
      const result = await loginUser(email, password);
      if (result.success) {
        Alert.alert("Éxito", "Inicio de sesión exitoso", [
          { text: "OK", onPress: () => console.log("Login exitoso, redirigiendo automáticamente...") },
        ]);
      } else {
        Alert.alert("Error de Login", result.message || "Ocurrió un error al iniciar sesión");
      }
    } catch (error) {
      console.error("Error inesperado en login:", error);
      Alert.alert("Error", "Ocurrió un error inesperado al intentar iniciar sesión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        placeholderTextColor="#A7C7E7"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!loading}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#A7C7E7"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        editable={!loading}
      />
      <BottonComponent
        title="Iniciar Sesión"
        onPress={handleLogin}
        disabled={loading}
        loading={loading}
        style={styles.primaryButton}
        textStyle={styles.primaryButtonText}
      />

      <BottonComponent
        title="¿No tienes cuenta? Regístrate"
        onPress={() => navigation.navigate("Registro")}
        style={styles.primaryButton} // Mismo estilo que el botón principal
        textStyle={styles.primaryButtonText} // Mismo estilo de texto
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
    marginBottom: 40,
    textAlign: "center",
    color: "#89CFF0",
    textShadowColor: "rgba(137, 207, 240, 0.5)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  input: {
    height: 50,
    borderColor: "#B5EAD7",
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 20,
    color: "#555",
    backgroundColor: "#fff",
    shadowColor: "rgba(181, 234, 215, 0.5)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3,
  },
  primaryButton: {
    backgroundColor: "#89CFF0", // Fondo azul pastel
    borderWidth: 0,
    borderRadius: 8,
    paddingVertical: 14,
    marginBottom: 10,
    elevation: 3,
    marginTop: 10, // Añadido para separación uniforme
  },
  primaryButtonText: {
    color: "#ffffff", // Texto blanco
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});