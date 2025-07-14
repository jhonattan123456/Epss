import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottonComponent from "../../components/BottonComponent";
import api from "../../Src/Services/conexion";
import { logoutUser } from "../../Src/Services/AuthService";

export default function PantallaPerfil({ navigation }) {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");

        if (!token) {
          console.log("No se encontró token, redirigiendo al login");
          return;
        }

        console.log("Intentando cargar perfil con token:", token);
        const response = await api.get("/listarUsuarios");
        console.log("Respuesta del perfil:", response.data);
        setUsuario(response.data);
      } catch (error) {
        console.error("Error al cargar perfil:", error);

        if (error.isAuthError || error.shouldRedirectToLogin) {
          console.log("Error de autenticación manejado por el interceptor");
          return;
        }

        if (error.response) {
          console.log("Error del servidor:", error.response.status);
          Alert.alert(
            "Error del servidor",
            `Error ${error.response.status}: ${error.response.data?.message || "No se pudo cargar el perfil"}`,
            [
              {
                text: "OK",
                onPress: async () => {
                  await AsyncStorage.removeItem("userToken");
                },
              },
            ]
          );
        } else if (error.request) {
          Alert.alert(
            "Error de conexión",
            "No se pudo conectar con el servidor. Verifica tu conexión a internet.",
            [
              {
                text: "OK",
                onPress: async () => {
                  await AsyncStorage.removeItem("userToken");
                },
              },
            ]
          );
        } else {
          Alert.alert(
            "Error",
            "Ocurrió un error inesperado al cargar el perfil.",
            [
              {
                text: "OK",
                onPress: async () => {
                  await AsyncStorage.removeItem("userToken");
                },
              },
            ]
          );
        }
      } finally {
        setLoading(false);
      }
    };

    cargarPerfil();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#6de2b4" />
      </View>
    );
  }

  if (!usuario) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Perfil de Usuario</Text>
        <View style={styles.ContainerPerfil}>
          <Text style={styles.errorText}>No se pudo cargar la información del perfil</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil de Usuario</Text>

      <View style={styles.ContainerPerfil}>
        <Text style={styles.profileText}>
          Nombre: {usuario.user?.name || "No disponible"}
        </Text>
        <Text style={styles.profileText}>
          Email: {usuario.user?.email || "No disponible"}
        </Text>
      </View>

      <BottonComponent title="Editar Perfil" onPress={() => {}} />
      <BottonComponent
        title="Cerrar Sesión"
        onPress={async () => {
            await logoutUser();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: "#000",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 28,
    marginBottom: 30,
    textAlign: "center",
    color: "#00b4ff",
    textShadowColor: "#0077ff",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  ContainerPerfil: {
    width: "100%",
    padding: 20,
    backgroundColor: "#111",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#00b4ff",
    shadowColor: "#00b4ff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 30,
  },
  profileText: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 15,
    textShadowColor: "rgba(0, 180, 255, 0.3)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 3,
  },
  errorText: {
    fontSize: 18,
    color: "#ff4d4d",
    textAlign: "center",
    textShadowColor: "rgba(255, 77, 77, 0.3)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 3,
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
    marginBottom: 15,
  },
  neonButtonSecondary: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#ff4d4d",
    shadowColor: "#ff4d4d",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
});