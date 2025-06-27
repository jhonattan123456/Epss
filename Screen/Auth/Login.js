import { View, Text, TextInput, StyleSheet } from "react-native";
import BottonComponent from "../../components/BottonComponent";
import { useState } from "react";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setloading]= useState("");

  const handleLogin = async () =>{
    setloading(true); //Activar el indicador de carga

    try{
      const result = await loginUser(email, password);
      if (result.succes) {
        Alert.alert("Exito", "Bienvenido", [
        {text: "ok", 
          onPrees: ()=> {
            console.log ("Login exitoso, redirigiendo auntomaticamente.....");
          }
        }
      ]);
    } else {
      Alert.alert(
        "error de login",
        result.message
      );
    }
    } catch (error) {
      Alert.alert(
        "Error",
        "Ocurrió un error durante el inicio de sesión"
      );
      console.error(error);
    } finally {
      setloading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo Electronico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <BottonComponent
        title="Iniciar Sesión"
        onPress={handleLogin}
      />
      <BottonComponent
        title="Registrarse"
        onPress={() => navigation.navigate("Registro")}
        style={{backgroundColor: "#4CAF50"}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },

  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
});
