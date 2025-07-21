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
      <View style={styles.bg1} />
      <View style={styles.bg2} />
      
      <View style={styles.loginCard}>
        <Text style={styles.loginTitle}>Iniciar Sesión</Text>
        <Text style={styles.loginSubtitle}>Ingresa tus credenciales para continuar</Text>
        
        <View style={styles.inputGroup}>
          <TextInput
            style={styles.formInput}
            placeholder="Correo Electrónico"
            placeholderTextColor="#718096"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!loading}
          />
        </View>
        
        <View style={styles.inputGroup}>
          <TextInput
            style={styles.formInput}
            placeholder="Contraseña"
            placeholderTextColor="#718096"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            editable={!loading}
          />
        </View>
        
        <BottonComponent
          title="Iniciar Sesión"
          onPress={handleLogin}
          disabled={loading}
          loading={loading}
          style={styles.btnPrimary}
          textStyle={styles.btnPrimaryText}
        />

        <BottonComponent
          title="¿No tienes cuenta? Regístrate"
          onPress={() => navigation.navigate("Registro")}
          style={styles.btnSecondary}
          textStyle={styles.btnSecondaryText}
        />
      </View>
    </View>
  );
}

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