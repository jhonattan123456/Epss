import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarCitas from "../../../Screen/Citas/ListarCitas";
import DetalleCitas from "../../../Screen/Citas/DetalleCitas";
import EditarCitas from "../../../Screen/Citas/EditarCitas";

const Stack = createStackNavigator();

export default function CitasStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#89CFF0', // Azul pastel principal
          elevation: 0, // Elimina sombra en Android
          shadowOpacity: 0, // Elimina sombra en iOS
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
        },
        headerTitleAlign: 'center',
        cardStyle: {
          backgroundColor: '#f5f9ff', // Fondo pastel claro para todas las pantallas
        },
      }}
    >
      <Stack.Screen
        name="ListarCitas"
        component={ListarCitas}
        options={{
          title: "Mis Citas",
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="DetalleCitas"
        component={DetalleCitas}
        options={{
          title: "Detalle de Cita",
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="EditarCitas"
        component={EditarCitas}
        options={{
          title: "Editar Cita",
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}