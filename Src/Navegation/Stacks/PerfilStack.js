import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Perfil from "../../../Screen/Perfil/Perfil";
import EditarPerfil from "../../../Screen/Perfil/EditarPerfil";

const Stack = createStackNavigator();

export default function PerfilesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Perfil"
        component={Perfil}
        options={{ title: "Perfiles" }}
      />
      <Stack.Screen
        name="EditarPerfil"
        component={EditarPerfil}
        options={{ title: "Editar Perfil" }}
      />
    </Stack.Navigator>
  );
}
