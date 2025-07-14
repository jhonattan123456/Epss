import {createStackNavigator} from "@react-navigation/stack";
import ListarEspecialidad from "../../../Screen/Especialidad/ListarEspecialidad";
import DetalleEspecialidad from "../../../Screen/Especialidad/DetalleEspecialidad";
import EditarEspecialidad from "../../../Screen/Especialidad/EditarEspcialidad";
import NuevaEspecialidad from "../../../Screen/Especialidad/NuevaEspecialidad";

const Stack = createStackNavigator();

export default function EspecialidadStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="ListarEspecialidad" 
                component={ListarEspecialidad} 
                options={{ title: "Lista de Especialidades" }} 
            />
            <Stack.Screen 
                name="DetalleEspecialidad" 
                component={DetalleEspecialidad} 
                options={{ title: "Detalle de la Especialidad" }} 
            />
            <Stack.Screen 
                name="EditarEspecialidad" 
                component={EditarEspecialidad} 
                options={{ title: "Editar Especialidad" }} 
            />
            <Stack.Screen 
                name="NuevaEspecialidad" 
                component={NuevaEspecialidad} 
                options={{ title: "Nueva Especialidad" }}
            />
        </Stack.Navigator>
    );
}