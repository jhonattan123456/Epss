import { createStackNavigator } from "@react-navigation/stack";
import ListarPaciente from "../../../Screen/Paciente/ListarPaciente";
import DetallePaciente from "../../../Screen/Paciente/DetallePaciente";
import EditarPaciente from "../../../Screen/Paciente/EditarPaciente";
import AgregarPaciente from "../../../Screen/Paciente/NuevoPaciente";
import { Button } from "react-native";

const Stack = createStackNavigator();

export default function PacientesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ListarPaciente"
        component={ListarPaciente}
        options={{ title: "Lista de Pacientes" }}
      />
      <Stack.Screen
        name="DetallePaciente"
        component={DetallePaciente}
        options={{ title: "Detalle del Paciente",
          headerRight: () => (
            <Button
              onPress={() => alert("!Boton en el header!")}
              title="INFORMACION"
              color="red"
            />
          ),
         }}
      />
      <Stack.Screen
        name="EditarPaciente"
        component={EditarPaciente}
        options={{ title: "Editar Paciente" }}
      />
      <Stack.Screen
        name="NuevoPaciente"
        component={AgregarPaciente}
        options={{ title: "Agregar Paciente" }}
      />
    </Stack.Navigator>
  );
}
