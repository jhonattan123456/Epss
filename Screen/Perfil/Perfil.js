import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
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
            `Error ${error.response.status}: ${
              error.response.data?.message || "No se pudo cargar el perfil"
            }`,
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
        <ActivityIndicator size="large" color="#89CFF0" />
      </View>
    );
  }

  if (!usuario) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Perfil de Usuario</Text>
        <View style={styles.ContainerPerfil}>
          <Text style={styles.errorText}>
            No se pudo cargar la información del perfil
          </Text>
        </View>
      </View>
    );
  }



  
  //funcion de redireccion para editar perfil
  const editarPerfil = (usuario) => {
    navigation.navigate("EditarPerfil", { usuario });
  };




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

      <BottonComponent
        title="Editar Perfil"
        onPress={editarPerfil}
        style={styles.primaryButton}
        textStyle={styles.primaryButtonText}
      />
      <BottonComponent
        title="Cerrar Sesión"
        onPress={async () => {
          await logoutUser();
        }}
        style={styles.secondaryButton}
        textStyle={styles.secondaryButtonText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: "#f5f9ff",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 28,
    marginBottom: 30,
    textAlign: "center",
    color: "#89CFF0",
    textShadowColor: "rgba(137, 207, 240, 0.5)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  ContainerPerfil: {
    width: "100%",
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderLeftWidth: 6,
    borderLeftColor: "#89CFF0",
    shadowColor: "rgba(181, 234, 215, 0.3)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 30,
  },
  profileText: {
    fontSize: 18,
    color: "#555",
    marginBottom: 15,
    lineHeight: 24,
  },
  errorText: {
    fontSize: 18,
    color: "#FF9AA2",
    textAlign: "center",
    fontWeight: "500",
  },
  primaryButton: {
    backgroundColor: "#89CFF0",
    borderWidth: 0,
    borderRadius: 8,
    padding: 16,
    marginBottom: 15,
    shadowColor: "rgba(137, 207, 240, 0.5)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "#FF9AA2",
    borderWidth: 0,
    borderRadius: 8,
    padding: 16,
    shadowColor: "rgba(255, 154, 162, 0.5)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 6,
  },
  secondaryButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
