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

    try{
      const result = await loginUser(email, password);
      if (result.success) {
        Alert.alert("Éxito", "Inicio de sesión exitoso", [
          {Text: "OK", onPress: () => console.log("Login exitoso, redirigiendo automanticanente....")},
        ]);
      }else {
        Alert.alert("Error de Login", result.message || "ocurrio un error al iniciar sesión", );
      }
    }catch (error) {
      console.error("Error inesperado en login:", error);
      Alert.alert("Error", "Ocurrió un error inesperado al intentar inciar secion.");
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
        placeholderTextColor="#7fcdff"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!loading}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#7fcdff"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        editable={!loading}
      />
      <BottonComponent
        title="Iniciar Sesión"
        onPress={handleLogin}
        disabled={!loading}
        style={styles.neonButton}
      />

      <BottonComponent
        title="¿No tienes cuenta? Regístrate"
        onPress={() => navigation.navigate("Registro")}
        style={styles.neonButtonSecondary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#000",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
    color: "#00b4ff",
    textShadowColor: "#0077ff",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  input: {
    height: 50,
    borderColor: "#00b4ff",
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 20,
    color: "#fff",
    backgroundColor: "#111",
    shadowColor: "#00b4ff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
  },
  neonButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#00b4ff",
    shadowColor: "#00b4ff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  neonButtonSecondary: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#7fcdff",
    shadowColor: "#7fcdff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 8,
    marginTop: 15,
  },
});
